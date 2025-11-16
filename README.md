# Voicebot Frontend

Professional AI Interview Assistant interface for Gangadhar K's 100x job application.

## Features

- Clean, modern UI with smooth animations
- Text-based chat interface
- Voice recording and playback
- Real-time conversation with AI
- Mobile-responsive design
- Professional color scheme
- Audio response playback

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Axios for API calls
- Lucide React for icons
- Web Speech API for voice

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Backend URL

Create `.env` file:

```bash
cp .env.example .env
```

For local development (default):
```
VITE_API_URL=http://localhost:8000
```

For production:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

### 3. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Project Structure

```
src/
├── components/
│   ├── Header.jsx           # App header with user info
│   ├── ChatInterface.jsx    # Main chat component
│   ├── ChatMessage.jsx      # Individual message display
│   ├── VoiceButton.jsx      # Voice recording button
│   └── LoadingSpinner.jsx   # Loading indicator
├── hooks/
│   └── useVoiceRecorder.js  # Voice recording hook
├── services/
│   └── api.js               # API service layer
├── config.js                # API configuration
├── App.jsx                  # Main app component
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub

2. Go to [vercel.com](https://vercel.com)

3. Import your repository

4. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com`

5. Deploy

### Deploy to Netlify

1. Push code to GitHub

2. Go to [netlify.com](https://netlify.com)

3. Import repository

4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

5. Add environment variable:
   - `VITE_API_URL=https://your-backend-url.onrender.com`

6. Deploy

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari

**Note:** Voice recording requires HTTPS in production.

## API Integration

The frontend connects to the FastAPI backend via:

- `/api/chat` - Text messages
- `/api/voice-chat` - Voice messages
- `/api/tts` - Text-to-speech
- `/api/audio/{id}` - Audio playback

## Customization

### Change Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: {
    // Your color palette
  }
}
```

### Modify UI

All components are in `src/components/` - customize as needed.

## Troubleshooting

### Microphone Not Working

- Check browser permissions
- Ensure HTTPS in production
- Try different browser

### API Connection Failed

- Verify backend is running
- Check `VITE_API_URL` in `.env`
- Check CORS settings in backend

### Build Errors

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## License

MIT
