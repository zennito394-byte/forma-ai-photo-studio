# Forma — AI Photo Studio starter

This is the first frontend stage of the AI photo-generation website.

## What works now
- Responsive landing page and photo studio UI
- Local image selection, preview and removal
- Image type and 10 MB size validation
- Photography category selection
- Example prompts
- Custom prompt input
- Aspect ratio and variation selectors
- Clear message explaining that AI generation is not connected yet

## What is intentionally not connected yet
- AI image generation
- User accounts
- Cloud image storage
- Credit deductions and payments
- Admin dashboard

The Generate button does not fake a result or charge anything. The real image API will be connected in a later stage using a secure server-side function.

## Run locally
You need Node.js installed.

1. Open this project folder in a terminal.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local address printed by Vite.

## Next stage
Connect Supabase authentication and private storage, then integrate a real image-to-image AI API. Never put secret API keys in browser code.
