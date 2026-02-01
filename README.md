# Audex - AI-Powered Audio Transcription

A full-stack web application that converts audio files and voice recordings to text using AI-powered transcription (Whisper Large V3 model via Groq API).

![Audex](https://img.shields.io/badge/Audex-Audio%20Transcription-22d3ee?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0-6DB33F?style=flat-square&logo=spring-boot)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite)
![Java](https://img.shields.io/badge/Java-21-ED8B00?style=flat-square&logo=openjdk)

## 🌐 Live Demo

- **Frontend**: [audexai.vercel.app](https://audexai.vercel.app)
- **Backend**: [audex-backend.onrender.com](https://audex-backend.onrender.com)

---

## 📖 Project Overview

**Audex** is a full-stack web application that converts audio files and voice recordings into text using AI-powered transcription. It leverages the **Whisper Large V3** model via **Groq's ultra-fast inference API** to deliver lightning-fast, highly accurate transcriptions in 28+ languages.

---

## 🔧 How It Works

### Architecture Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   User Upload   │     │  Spring Boot    │     │    Groq API     │
│   Audio File    │────▶│    Backend      │────▶│  (Whisper V3)   │
│   or Record     │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                │                       │
                                │◀──────────────────────┘
                                │    Transcription JSON
                                ▼
                        ┌─────────────────┐
                        │  React Frontend │
                        │  Display Result │
                        └─────────────────┘
```

### Step-by-Step Process

1. **Audio Input**: User uploads an audio file (MP3, WAV, M4A, FLAC, OGG, WebM) OR records live audio using browser microphone
2. **Language Selection**: User selects transcription language from 28 supported languages
3. **API Request**: Frontend sends audio as `multipart/form-data` to Spring Boot backend
4. **Groq Processing**: Backend forwards the audio to Groq's Whisper API for transcription
5. **Response**: Transcribed text is returned and displayed with word/character stats
6. **Export**: User can copy text or download as `.txt`, `.doc`, or `.json`

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🎤 **Live Recording** | Record audio directly in browser using MediaRecorder API |
| 📁 **File Upload** | Drag & drop or click to upload audio files |
| 🌍 **28+ Languages** | English, Spanish, French, Hindi, Chinese, Arabic, etc. |
| 🌙 **Dark/Light Theme** | Toggle between themes with smooth transitions |
| 📊 **Statistics** | Word count, character count, language info |
| 📋 **Multiple Export** | Copy to clipboard, download as TXT/DOC/JSON |
| 🎨 **Waveform Visualizer** | Real-time audio visualization during recording |
| ⚡ **Fast Processing** | Groq's inference is 10x faster than OpenAI |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library with hooks |
| **Vite 6** | Fast build tool & dev server |
| **Axios** | HTTP client for API calls |
| **FileSaver.js** | Client-side file downloads |
| **CSS Variables** | Dark/Light theme system |
| **Web Audio API** | Live recording & waveform visualization |

### Backend

| Technology | Purpose |
|------------|---------|
| **Spring Boot 4.0** | Java REST API framework |
| **Java 21** | Latest LTS version |
| **Spring WebFlux** | Reactive HTTP client |
| **RestTemplate** | Multipart file forwarding |
| **Groq API** | AI transcription (Whisper Large V3) |

### Deployment

| Service | Component |
|---------|-----------|
| **Vercel** | Frontend hosting (React) |
| **Render** | Backend hosting (Docker/Java) |
| **GitHub** | Source control & CI/CD trigger |

---

## 🚀 Novelty & Unique Aspects

### 1. Groq-Powered Speed
Unlike traditional OpenAI Whisper API, Audex uses **Groq's LPU (Language Processing Unit)** which provides:
- **~10x faster inference** than GPU-based solutions
- Near real-time transcription
- Free tier with generous limits

### 2. Full-Stack Java + React Architecture
- Modern **Spring Boot 4.0** with Java 21
- Clean separation of concerns
- Production-ready Docker deployment

### 3. Browser-Native Recording
- Uses **MediaRecorder API** for recording
- **Web Audio API** for real-time waveform visualization
- No external dependencies for audio capture

### 4. Multi-Format Export
- Plain text (`.txt`)
- Microsoft Word compatible (`.doc`)
- Structured JSON with metadata (`.json`)

### 5. Privacy-First Design
- Audio files are processed and **immediately deleted**
- No permanent storage on server
- Secure HTTPS communication

---

## 📁 Project Structure

```
Audex/
├── Audex-Frontend/              # React + Vite
│   ├── src/
│   │   ├── App.jsx              # Main component
│   │   ├── AudioUploder.jsx     # Core transcription UI (700+ lines)
│   │   ├── App.css              # Theming & styles (1500+ lines)
│   │   └── index.css            # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── Audex-Backend/               # Spring Boot
│   ├── src/main/java/com/audio/transcribe/
│   │   ├── AudioTranscribeApplication.java
│   │   ├── TranscriptionController.java   # POST /api/transcribe
│   │   ├── WebConfig.java                 # CORS configuration
│   │   └── WebClientConfig.java
│   ├── Dockerfile
│   └── pom.xml
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Java 21+
- Maven 3.9+

### Backend Setup

```bash
cd Audex-Backend
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

```bash
cd Audex-Frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## 🔌 API Endpoint

### `POST /api/transcribe`

**Request:**
```
Content-Type: multipart/form-data
- file: (audio file)
- language: "en" | "es" | "hi" | ... (optional, default: "en")
```

**Response:**
```json
{
  "text": "Transcribed audio content..."
}
```

---

## 🌍 Supported Languages

| Language | Code | Language | Code |
|----------|------|----------|------|
| English | en | Japanese | ja |
| Spanish | es | Korean | ko |
| French | fr | Chinese | zh |
| German | de | Arabic | ar |
| Italian | it | Hindi | hi |
| Portuguese | pt | Turkish | tr |
| Dutch | nl | Vietnamese | vi |
| Polish | pl | Thai | th |
| Russian | ru | Indonesian | id |
| Swedish | sv | Ukrainian | uk |
| Danish | da | Czech | cs |
| Finnish | fi | Greek | el |
| Norwegian | no | Hebrew | he |
| Romanian | ro | Hungarian | hu |

---

## 🎯 Use Cases

1. **Students** - Transcribe lectures and study materials
2. **Journalists** - Convert interviews to text
3. **Content Creators** - Generate subtitles and captions
4. **Accessibility** - Make audio content accessible
5. **Researchers** - Transcribe qualitative interviews
6. **Podcasters** - Create show notes and transcripts

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────────┐
│                         FRONTEND                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React Components                                     │  │
│  │  • Theme Toggle (Dark/Light)                         │  │
│  │  • File Upload with Drag & Drop                      │  │
│  │  • Live Recording with Waveform                      │  │
│  │  • Language Selector (28 options)                    │  │
│  │  • Result Display with Stats                         │  │
│  │  • Export Options (Copy/Download)                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│                     Axios POST                              │
│                           ▼                                 │
└────────────────────────────────────────────────────────────┘
                            │
                      HTTPS Request
                            │
┌────────────────────────────────────────────────────────────┐
│                         BACKEND                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Spring Boot REST Controller                          │  │
│  │  • Receive multipart file                            │  │
│  │  • Create temp file                                  │  │
│  │  • Forward to Groq API                               │  │
│  │  • Return transcription                              │  │
│  │  • Delete temp file                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│                     RestTemplate                            │
│                           ▼                                 │
└────────────────────────────────────────────────────────────┘
                            │
                      HTTPS Request
                            │
┌────────────────────────────────────────────────────────────┐
│                      GROQ API                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Whisper Large V3 Model                               │  │
│  │  • 10x faster than GPU inference                     │  │
│  │  • High accuracy transcription                       │  │
│  │  • Multi-language support                            │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Ayush Gupta**
- GitHub: [@ayuxsh009](https://github.com/ayuxsh009)

---

⭐ Star this repository if you found it helpful!
