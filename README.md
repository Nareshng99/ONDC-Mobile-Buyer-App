# Mobile Buyer App 📱

This project is designed as a reference application for buyers on the ONDC platform, providing a comprehensive mobile shopping solution.

## 📋 Prerequisites

Ensure you have the following installed:
- [Node.js > 12](https://nodejs.org) and npm 📦 (Use [nvm](https://github.com/nvm-sh/nvm) for managing Node versions)
- [Watchman](https://facebook.github.io/watchman) 🕵️‍♂️
- [Xcode 12](https://developer.apple.com/xcode) 🛠️
- [Cocoapods 1.10.1](https://cocoapods.org) 🥥
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) ☕
- [Android Studio and Android SDK](https://developer.android.com/studio) 🤖

## 🧰 Base Dependencies

To facilitate various features, the project utilizes:
- [@invertase/react-native-apple-authentication](https://www.npmjs.com/package/@invertase/react-native-apple-authentication) for Apple login on iPhones
- [@react-native-google-signin/google-signin](https://www.npmjs.com/package/@react-native-google-signin/google-signin) for Google login
- [@react-navigation/native](https://www.npmjs.com/package/@react-navigation/native) and [@react-navigation/native-stack](https://www.npmjs.com/package/@react-navigation/native-stack) for app navigation
- [axios](https://www.npmjs.com/package/axios) for API requests
- [formik](https://www.npmjs.com/package/formik) and [yup](https://www.npmjs.com/package/yup) for form handling and validation
- [moment](https://www.npmjs.com/package/moment) for date and time functions
- Many more utilities for UI and state management listed in the `package.json` file.

## 🚀 Usage

### 📦 Quick Start

#### Option 1: Use as a Template

1. Clone this repository.
2. Use [react-native-rename](https://github.com/junedomingo/react-native-rename) to customize the project name.
3. Remove existing node modules and reinstall: 
4. Run `npm run ios` or `npm run android` to start your application.

#### Option 2: Copy to Your Project

1. Create a new project and copy the `/src` folder.
2. Update `index.js` and install all dependencies.
3. Link native code as necessary for each library.

## 🖌️ Customizing the Splash Screen

Follow the [official guide](https://github.com/zoontek/react-native-bootsplash#assets-generation) to customize your app's splash screen.

## ⚙️ Setup Environments

### Scripts for Environment Management

- Run `yarn ios` or `yarn android` for development.
- For staging: `yarn ios:stg` or `yarn android:stg`.
- Modify `.env.development`, `.env.staging` files as needed.

### Android and iOS Specifics

Refer to `app/build.gradle` for Android and manage schemes in Xcode for iOS to handle different environments.

## 📦 Generate Production Version

### Android

1. Generate an upload key.
2. Set up gradle variables.
3. Navigate to the android folder and run:

### iOS

1. Open Xcode.
2. Select the schema and target.
3. Archive for production using:

For detailed steps, refer to the [official React Native documentation](https://reactnative.dev/docs/publishing-to-app-store).

