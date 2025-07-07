# Firebase Setup Instructions for Haven App

Follow these steps to set up Firebase authentication for your Haven app.

## 1. Create Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `haven-app` (or your preferred name)
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click "Get started" if this is your first time
3. Go to the **Sign-in method** tab
4. Enable **Email/Password** authentication:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

## 3. Get Firebase Configuration

1. Go to **Project Settings** (gear icon in sidebar)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon `</>`
4. Enter app nickname: `haven-web`
5. Click "Register app"
6. Copy the Firebase configuration object (it looks like this):

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 4. Configure Environment Variables

1. In your `xUSD-App` directory, create a `.env` file:
   ```bash
   cp firebase.env.template .env
   ```

2. Open the `.env` file and replace the placeholder values with your actual Firebase config:
   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

3. Add `.env` to your `.gitignore` file to keep your keys secure:
   ```
   echo ".env" >> .gitignore
   ```

## 5. Test the Setup

1. Start your Expo development server:
   ```bash
   npm start
   ```

2. Open the app on your device/simulator
3. Try creating a new account with email and password
4. Test signing in with the created account
5. Test signing out

## 6. Verify in Firebase Console

1. Go to **Authentication > Users** in Firebase Console
2. You should see the users you created during testing
3. Check that the authentication is working properly

## Security Notes

- Never commit your `.env` file to version control
- Your Firebase API key is safe to use in client-side code (it's designed for that)
- Consider setting up Firebase Security Rules for production use
- For production apps, enable email verification and password reset features

## Next Steps

Once Firebase email/password authentication is working:

1. **Add Email Verification**: Require users to verify their email addresses
2. **Password Reset**: Implement "Forgot Password" functionality
3. **Social Authentication**: Add Google and Apple sign-in using Web3Auth
4. **Web3Auth Integration**: Connect Firebase JWT tokens to Web3Auth for Algorand wallet generation
5. **User Profile**: Store additional user data in Firestore

## Troubleshooting

### Common Issues:

1. **"Firebase not initialized" error**:
   - Check that your `.env` file exists and has the correct values
   - Restart your Expo development server after adding `.env`

2. **"Auth domain not authorized" error**:
   - Go to Firebase Console > Authentication > Settings
   - Add your domain to the authorized domains list

3. **"Invalid API key" error**:
   - Double-check your API key in the `.env` file
   - Make sure there are no extra spaces or quotes

4. **App not loading**:
   - Check the Expo terminal for error messages
   - Verify all environment variables are set correctly

Need help? Check the [Firebase Auth documentation](https://firebase.google.com/docs/auth) or create an issue in the repository. 