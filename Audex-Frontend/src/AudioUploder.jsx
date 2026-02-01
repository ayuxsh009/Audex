import { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './App.css';

const MicrophoneIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

const UploadIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17,8 12,3 7,8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

const FileAudioIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
    <polyline points="14,2 14,7 19,7" />
    <path d="M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0" />
  </svg>
);

const SparklesIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
  </svg>
);

const CheckIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const CopyIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const DownloadIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const ClockIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

const LetterTextIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h12" />
  </svg>
);

const GlobeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const ZapIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
  </svg>
);

const LockIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const StopCircleIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <rect width="6" height="6" x="9" y="9" />
  </svg>
);

const TrashIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const countWords = (text) => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
  { code: 'id', name: 'Indonesian' },
  { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'cs', name: 'Czech' },
  { code: 'el', name: 'Greek' },
  { code: 'he', name: 'Hebrew' },
  { code: 'ro', name: 'Romanian' },
  { code: 'hu', name: 'Hungarian' },
];

const GitHubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const SunIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export default function AudioTranscriber() {
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState(null);
  const [waveformLevels, setWaveformLevels] = useState(Array(40).fill(10));
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const streamRef = useRef(null);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('audio/')) {
        setFile(droppedFile);
        setError('');
        setTranscription('');
      } else {
        setError('Please upload an audio file');
      }
    }
  }, []);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
      setTranscription('');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordingBlob(audioBlob);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingBlob(null);
      setError('');
      setTranscription('');
      
      // Start waveform animation
      const updateWaveform = () => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          const levels = Array.from(dataArray.slice(0, 40)).map(v => Math.max(10, v * 0.4));
          setWaveformLevels(levels);
        }
        animationRef.current = requestAnimationFrame(updateWaveform);
      };
      updateWaveform();
    } catch (err) {
      setError('Could not access microphone. Please allow microphone access.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      streamRef.current?.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setWaveformLevels(Array(40).fill(10));
    }
  };

  const handleTranscribe = async () => {
    const audioFile = activeTab === 'upload' ? file : recordingBlob;
    if (!audioFile) {
      setError('Please upload or record an audio file first');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    if (activeTab === 'upload') {
      formData.append('file', audioFile);
    } else {
      formData.append('file', audioFile, 'recording.webm');
    }
    formData.append('language', selectedLanguage);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    
    try {
      const response = await axios.post(`${API_URL}/api/transcribe`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTranscription(response.data.text || response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Transcription failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(transcription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAs = (format) => {
    const filename = `transcription-${Date.now()}`;
    let content, type;

    switch (format) {
      case 'txt':
        content = transcription;
        type = 'text/plain;charset=utf-8';
        break;
      case 'json':
        content = JSON.stringify({ transcription, timestamp: new Date().toISOString() }, null, 2);
        type = 'application/json;charset=utf-8';
        break;
      case 'doc':
        content = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><p>${transcription.replace(/\n/g, '</p><p>')}</p></body></html>`;
        type = 'application/msword;charset=utf-8';
        break;
      default:
        return;
    }

    const blob = new Blob([content], { type });
    saveAs(blob, `${filename}.${format}`);
  };

  const clearFile = () => {
    setFile(null);
    setRecordingBlob(null);
    setTranscription('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div className="app">
      {/* Background Effects */}
      <div className="bg-effects">
        <div className="bg-gradient bg-gradient-1"></div>
        <div className="bg-gradient bg-gradient-2"></div>
        <div className="bg-gradient bg-gradient-3"></div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <div className="logo-icon">
              <MicrophoneIcon />
              <span className="logo-status"></span>
            </div>
            <span className="logo-text">Audex</span>
            <span className="logo-badge">AI</span>
          </div>
          <div className="nav-actions">
            <button onClick={toggleTheme} className="btn btn-theme" title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="https://github.com/ayuxsh009/audio-transcribe" target="_blank" rel="noopener noreferrer" className="btn btn-github">
              <GitHubIcon /> GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-badge">
            <div className="hero-badge-dot"></div>
            <span className="hero-badge-text">Powered by Groq Whisper</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-title-gradient">Audio</span> to Text
          </h1>
          <p className="hero-description">
            Experience lightning-fast, <strong>AI-powered</strong> audio transcription 
            with exceptional accuracy in multiple languages.
          </p>
          <div className="tech-badges">
            <div className="tech-badge"><ZapIcon /><span>Fast Processing</span></div>
            <div className="tech-badge"><GlobeIcon /><span>Multi-Language</span></div>
            <div className="tech-badge"><LockIcon /><span>Secure</span></div>
          </div>
        </section>

        {/* Main Card */}
        <div className="main-card">
          <div className="tabs-container">
            <div className="tabs-list">
              <button 
                className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
                onClick={() => { setActiveTab('upload'); clearFile(); }}
              >
                <UploadIcon /> Upload Audio
              </button>
              <button 
                className={`tab-btn ${activeTab === 'record' ? 'active' : ''}`}
                onClick={() => { setActiveTab('record'); clearFile(); }}
              >
                <MicrophoneIcon /> 
                {isRecording ? <span className="recording-dot"></span> : null}
                Live Recording
              </button>
            </div>
          </div>

          <div className="content-area">
            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <>
                <div 
                  className={`upload-area ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                  {file ? (
                    <>
                      <div className="upload-icon success"><FileAudioIcon /></div>
                      <p className="file-name">{file.name}</p>
                      <p className="file-size">{formatFileSize(file.size)}</p>
                      <p className="file-ready">Ready to transcribe</p>
                    </>
                  ) : (
                    <>
                      <div className="upload-icon"><UploadIcon /></div>
                      <p className="upload-title">Drop your audio file here</p>
                      <p className="upload-subtitle">or click to browse from your device</p>
                      <div className="file-formats">
                        <span className="format-badge mp3">MP3</span>
                        <span className="format-badge wav">WAV</span>
                        <span className="format-badge m4a">M4A</span>
                        <span className="format-badge flac">FLAC</span>
                        <span className="format-badge ogg">OGG</span>
                      </div>
                    </>
                  )}
                </div>

                {file && (
                  <div className="action-row">
                    <button className="btn btn-outline" onClick={clearFile}>
                      <TrashIcon /> Remove
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Record Tab */}
            {activeTab === 'record' && (
              <div className="recording-area">
                <div className="mic-container">
                  {isRecording && <div className="mic-pulse"></div>}
                  <button 
                    className={`mic-button ${isRecording ? 'recording' : ''}`}
                    onClick={isRecording ? stopRecording : startRecording}
                  >
                    {isRecording ? <StopCircleIcon /> : <MicrophoneIcon />}
                  </button>
                </div>
                
                <p className="recording-text">
                  {isRecording 
                    ? 'Recording in progress... Click to stop' 
                    : recordingBlob 
                      ? 'Recording saved!' 
                      : 'Click to start recording'}
                </p>

                {recordingBlob && !isRecording && (
                  <div className="recording-saved">
                    <CheckIcon /> Recording ready for transcription
                  </div>
                )}

                {isRecording && (
                  <div className="waveform-visualizer">
                    <div className="waveform-bars">
                      {waveformLevels.map((level, i) => (
                        <div 
                          key={i} 
                          className="waveform-bar" 
                          style={{ height: `${level}%` }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {recordingBlob && (
                  <div className="action-row" style={{ marginTop: '20px' }}>
                    <button className="btn btn-outline" onClick={() => setRecordingBlob(null)}>
                      <TrashIcon /> Discard
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="message error">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                {error}
              </div>
            )}

            {/* Language Selector */}
            <div className="language-selector">
              <label className="language-label">
                <GlobeIcon size={16} />
                <span>Transcription Language:</span>
              </label>
              <select 
                className="language-dropdown"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button 
              className="btn btn-primary submit-btn"
              onClick={handleTranscribe}
              disabled={isLoading || (activeTab === 'upload' ? !file : !recordingBlob)}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Transcribing...
                </>
              ) : (
                <>
                  <SparklesIcon /> Transcribe with AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Transcription Result */}
        {transcription && (
          <div className="result-card">
            <div className="result-header">
              <div className="result-title-area">
                <div className="result-icon">
                  <FileAudioIcon />
                  <div className="result-icon-badge">
                    <CheckIcon />
                  </div>
                </div>
                <div>
                  <h3 className="result-title">Transcription Complete</h3>
                  <p className="result-subtitle">Processed with Groq Whisper AI</p>
                </div>
              </div>
              <div className="result-actions">
                <button className={`result-btn ${copied ? 'copied' : ''}`} onClick={copyToClipboard}>
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button className="result-btn" onClick={() => downloadAs('txt')}>
                  <DownloadIcon /> .txt
                </button>
                <button className="result-btn" onClick={() => downloadAs('doc')}>
                  <DownloadIcon /> .doc
                </button>
                <button className="result-btn" onClick={() => downloadAs('json')}>
                  <DownloadIcon /> .json
                </button>
              </div>
            </div>

            <div className="result-stats">
              <div className="stat-item">
                <div className="stat-icon words"><LetterTextIcon /></div>
                <div className="stat-info">
                  <span className="stat-label">Word Count</span>
                  <span className="stat-value">{countWords(transcription)} words</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon duration"><ClockIcon /></div>
                <div className="stat-info">
                  <span className="stat-label">Characters</span>
                  <span className="stat-value">{transcription.length} chars</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon language"><GlobeIcon /></div>
                <div className="stat-info">
                  <span className="stat-label">Language</span>
                  <span className="stat-value">{LANGUAGES.find(l => l.code === selectedLanguage)?.name || 'English'}</span>
                </div>
              </div>
            </div>

            <div className="result-text-container">
              <p className="result-text">{transcription}</p>
            </div>
          </div>
        )}

        {/* Features Section */}
        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon yellow"><ZapIcon /></div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">Get your transcriptions in seconds with our optimized Groq Whisper API integration.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon blue"><GlobeIcon /></div>
              <h3 className="feature-title">Multi-Language</h3>
              <p className="feature-description">Support for multiple languages with automatic detection and translation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon green"><CheckIcon /></div>
              <h3 className="feature-title">High Accuracy</h3>
              <p className="feature-description">Industry-leading accuracy powered by state-of-the-art AI models.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon purple"><LockIcon /></div>
              <h3 className="feature-title">Secure & Private</h3>
              <p className="feature-description">Your audio files are processed securely and never stored on our servers.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="footer-logo"><MicrophoneIcon /></div>
            <span className="footer-name">Audex</span>
            <span className="footer-copy">© 2026</span>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
