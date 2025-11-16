# Deployment Guide

## Step-by-Step Deployment

### Phase 1: Test Locally

1. **Start Backend:**
```bash
cd voicebot-backend
uvicorn app.main:app --reload
```

2. **Start Frontend:**
```bash
cd voicebot-frontend
npm install
npm run dev
```

3. **Test Everything:**
- Send text messages
- Try voice recording
- Verify responses work
- Check audio playback

### Phase 2: Deploy Backend

**Option: Render.com**

1. Push backend to GitHub

2. Create new Web Service on Render

3. Add environment variables:
   - `OPENAI_API_KEY=sk-your-key`
   - `CORS_ORIGINS=https://your-frontend.vercel.app`

4. Deploy and get URL: `https://voicebot-backend-xxxx.onrender.com`

5. Test: `https://your-backend-url.com/api/health`

### Phase 3: Update Frontend

1. Create `.env` file:
```
VITE_API_URL=https://voicebot-backend-xxxx.onrender.com
```

2. Test locally with deployed backend:
```bash
npm run dev
```

3. Verify all features work with deployed backend

### Phase 4: Deploy Frontend

**Option: Vercel**

1. Push frontend to GitHub

2. Import project on Vercel

3. Add environment variable:
   - `VITE_API_URL=https://your-backend-url.onrender.com`

4. Deploy

5. Your app is live at: `https://your-app.vercel.app`

### Phase 5: Final Testing

1. Test on desktop browser
2. Test on mobile device
3. Test voice features (requires HTTPS)
4. Verify all interactions work
5. Check console for errors

### Phase 6: Submit

Email to: bhumika@100x.inc

Subject: "GEN AI: GEN AI ROUND 1 ASSESSMENT (LINKEDIN - GANGADHAR K)"

Include:
- Frontend URL: `https://your-app.vercel.app`
- Backend URL: `https://your-backend.onrender.com`
- Your resume

## Quick Fixes

### CORS Error
Update backend `.env`:
```
CORS_ORIGINS=https://your-frontend.vercel.app,https://your-frontend-staging.vercel.app
```

### Voice Not Working
- Check HTTPS is enabled
- Verify browser permissions
- Test in Chrome/Edge

### API Timeout
- Render free tier sleeps after 15 min
- First request takes 30-60s to wake up
- Consider adding loading message

## Environment Variables Summary

**Backend (.env):**
```
OPENAI_API_KEY=sk-your-key
CORS_ORIGINS=https://your-frontend.vercel.app
ENVIRONMENT=production
```

**Frontend (.env):**
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## Cost Estimate

- Backend: Free (Render)
- Frontend: Free (Vercel)
- OpenAI API: ~$0.50 per demo
- Total: $0.50 per demo session
