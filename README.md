# Painterly

Painterly is an Art sharing platform. Where user's can share their artistic drawing.

## Tech Stack

- ReactJs Framework - NextJs
- Material UI
- Firebase Realtime database, firestore, Firebase Auth
- Typescript

## Highlighted Feature

- Share art on your feed
- Add Friends or Follow your favorite artist
- Get Feedback from the Mentors at the platform
- React on other user's art with choice of different emoji
- Comments on Art
- Get notification when someone likes or comments on your post
- Get Friend request and followers notifications.

## How to run dev server locally

Clone the repository

```
 git clone https://github.com/Shubhdeeps/painterly.git
```

cd into the directory and open terminal to install the dependencies

`npm install` or `yarn`

Create a .env file with the following content

```
NEXT_PUBLIC_FIREBASE_API_KEY = "Firebase API Key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "Firebase domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID = "Firebase Project Id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "Firebase storage bucker"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "Firebase sender ID"
NEXT_PUBLIC_FIREBASE_APP_ID = "Firebase App Id"
```

Then run the dev server
`npm run dev` or `yarn`
