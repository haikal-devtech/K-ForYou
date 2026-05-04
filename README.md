# K-For You Diaspora Marketplace

A curate Indonesian diaspora marketplace. "A Piece of Home Delivered to Your Doorstep".

## Setup Instructions

1. **Firebase Configuration**
   The automatic Firebase setup encountered an internal platform error, so you will need to manually provide your Firebase credentials.
   Duplicate `.env.example` to `.env.local` and add your Firebase configuration variables.

2. **Gemini API Key**
   Make sure to configure the Gemini API Key in the AI Studio platform Secrets, or `NEXT_PUBLIC_GEMINI_API_KEY` in `.env.local` if running locally.

3. **Running Locally**
   \`\`\`bash
   npm run dev
   \`\`\`

## Architecture
- **Framework**: Next.js 14+ App Router
- **Styling**: Tailwind CSS v4
- **State Mgmt**: Zustand (Cart)
- **Database**: Firebase Firestore
- **AI**: Gemini 1.5 Flash (Product generation)
