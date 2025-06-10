# Audex - AI-Powered Audio Transcription

A full-stack web application that converts audio files and voice recordings to text using AI-powered transcription (Whisper model via Groq API).

![Audex](https://img.shields.io/badge/Audex-Audio%20Transcription-22d3ee?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0-6DB33F?style=flat-square&logo=spring-boot)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite)

## ✨ Features

- 🎤 **Voice Recording** - Record audio directly from your browser
- 📁 **File Upload** - Upload audio files (MP3, WAV, M4A, FLAC, OGG, WebM)
- 🌍 **Multi-language Support** - Transcribe audio in 28+ languages
- 📋 **Copy & Download** - Easy copy to clipboard and download as text file
- 🌙 **Dark/Light Theme** - Beautiful UI with theme toggle
- ⚡ **Fast Processing** - Powered by Whisper Large V3 model via Groq API
- 🔒 **Secure** - Files are processed and immediately deleted

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite 6** - Fast build tool
- **Axios** - HTTP client
- **FileSaver.js** - File download utility
- **CSS Variables** - Theming system

### Backend
- **Spring Boot 4.0** - Java framework
- **Java 21** - Latest LTS version
- **Groq API** - AI transcription service (Whisper Large V3)
- **Spring WebFlux** - Reactive web support

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

## 📁 Project Structure

```
Audex/
├── Audex-Frontend/          # React frontend
│   ├── src/
│   │   ├── App.jsx          # Main app component
│   │   ├── AudioUploder.jsx # Audio upload & recording component
│   │   ├── App.css          # Styling with theme support
│   │   └── index.css        # Global styles
│   └── package.json
│
├── Audex-Backend/           # Spring Boot backend
│   ├── src/main/java/com/audio/transcribe/
│   │   ├── AudioTranscribeApplication.java
│   │   ├── TranscriptionController.java
│   │   ├── WebConfig.java   # CORS configuration
│   │   └── WebClientConfig.java
│   └── pom.xml
│
└── README.md
```

## 🔧 API Endpoints

### POST `/api/transcribe`
Transcribes an audio file to text.

**Parameters:**
- `file` (required) - Audio file
- `language` (optional) - Language code (default: "en")

**Response:**
```json
{
  "text": "Transcribed text content..."
}
```

## 🎨 Screenshots

The application features a modern, responsive design with:
- Gradient backgrounds with blur effects
- Animated recording indicator
- Progress tracking during transcription
- Word count and character statistics

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Ayush Gupta**
- GitHub: [@ayuxsh009](https://github.com/ayuxsh009)

---

⭐ Star this repository if you found it helpful!
