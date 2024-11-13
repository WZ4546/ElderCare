# OldCare Project

## Overview

OldCare is a cross-platform mobile application designed to assist elderly users in managing their health, daily activities, and communication with family members. By incorporating real-time health monitoring and interactive features, this application enhances the safety and quality of life for elderly users while providing peace of mind for family caregivers.

## Features

- **Health Monitoring**: Real-time collection and analysis of health data, with alerts for any detected abnormalities.
- **Activity Tracking**: Reminders for users to log daily activities, with data stored for future analysis.
- **Emergency Response**: Automatic contact with designated family members or caregivers in case of emergencies.
- **Real-Time Communication**: Direct communication channels between elderly users and their family members or caregivers.
- **Appointment Management**: Assistance with scheduling and managing health-related appointments.

## Advanced Technologies

- **React Native**: Facilitates cross-platform mobile application development, ensuring a consistent and optimized user experience on both iOS and Android devices.
- **Expo**: Enables rapid prototyping and simplifies the deployment process.
- **Google Cloud Speech-to-Text API**: Powers the speech-to-text functionality, allowing users to interact with the app via voice commands.
Integrated within the health and activity modules to enable easier access for elderly users.
- **Google Cloud Text-to-Speech API**: Converts text notifications and alerts into spoken audio, enhancing accessibility for elderly users. Applied in reminder and notification modules to ensure important messages are heard, even if the user has visual limitations.
- **React Native Voice**: Integrates voice recognition capabilities within the app, enhancing usability for elderly users.
- **Supabase**: Serves as a backend-as-a-service (BaaS) solution, offering authentication, database management, and API support, thereby streamlining backend development and maintenance.

## Configuration

1. **Install Dependencies**:
   npm install
2. Google Cloud API: Set up a Google Cloud account and enable the Speech API. Create a service account, download the key file, and add its path to your environment variables as GOOGLE_APPLICATION_CREDENTIALS.
3. Supabase Setup: Register for a Supabase account, create a project, and set up the necessary tables. Add the Supabase URL and API key to your environment variables.

## Deployment
1. Development Mode:

    1. Start the development server:
            expo start
    2. Use Expo Go to scan the QR code or run the app on an emulator.

2. Building for Production:

    1. For Android, build the APK using:
        expo build:android
    2. For iOS, generate the IPA file:
        expo build:ios
    3. Follow Expo’s documentation for publishing to the Google Play Store or the Apple App Store.