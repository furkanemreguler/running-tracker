# 🏃 Running Tracker

A web application to track and visualize running statistics for me and my friend Umit Erkut Colak. Built with React and Firebase.

## 🎯 Purpose

This app was created to help two friends track their running activities, compare performance, and stay motivated together. We can log our runs, view statistics, and see each other's progress in real-time.

## ✨ Features

- **User Authentication**: Secure login system for both runners
- **Add Runs**: Log distance (km), duration (minutes), and date for each run
- **Automatic Calculations**: 
  - Speed (km/h)
  - Pace (min/km)
  - Calories burned
- **Dashboard Statistics**:
  - Total runs
  - Total distance covered
  - Total duration
  - Total calories burned
  - Average speed
  - Average pace
- **Toggle View**: Switch between "All Runs" and "My Runs Only"
- **Performance Charts**: Visual representation of distance and speed over time
- **Run History**: Complete table of all runs with ability to delete entries
- **Real-time Sync**: All data updates instantly across devices

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Styling**: Inline CSS (formerly Tailwind CSS)
- **Backend & Database**: Firebase
  - Firebase Authentication (Email/Password)
  - Cloud Firestore (Real-time database)
- **Charts**: Recharts
- **Hosting**: Vercel
- **Version Control**: GitHub

## 📦 Project Structure
```
running-tracker/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Login.js          # Authentication component
│   │   ├── Dashboard.js      # Statistics and charts
│   │   ├── RunForm.js        # Add new run form
│   │   └── RunList.js        # Display all runs in table
│   ├── firebase.js           # Firebase configuration
│   ├── App.js                # Main application component
│   └── index.css             # Global styles
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/furkanemreguler/running-tracker.git
cd running-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create a Firestore Database
   - Copy your Firebase config

4. Update `src/firebase.js` with your Firebase configuration

5. Run the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📊 How to Use

1. **Sign Up**: Create an account with your email and password
2. **Add a Run**: Enter distance, duration, and date
3. **View Statistics**: See your overall performance on the dashboard
4. **Toggle Views**: Switch between all runs and your personal runs
5. **Track Progress**: Monitor your improvement through charts
6. **Compare**: See your friend's runs in the Run History table

## 🌐 Live Demo

Visit the live application: [https://running-tracker-delta.vercel.app](https://running-tracker-delta.vercel.app)

## 📱 Features in Detail

### Dashboard
- Six key metrics displayed in cards
- Interactive line chart showing distance and speed trends
- Filter to view all runs or personal runs only

### Add Run Form
- Distance input (km) with decimal support
- Duration input (minutes)
- Date picker with today's date as default
- Automatic calculation of speed, pace, and calories

### Run History Table
- Chronological list of all runs
- Shows runner name (from email)
- All key metrics displayed
- Delete functionality for each run

## 🔒 Security

- Firebase Authentication for secure user management
- Firestore security rules (currently in test mode for development)
- Environment variables for sensitive data (recommended for production)

## 📈 Future Enhancements

Potential features to add:
- Weekly/Monthly summary reports
- Goal setting and tracking
- Personal records (PR) highlighting
- Export data to CSV
- Mobile app version
- Weather data integration
- Route mapping with GPS
- Social sharing features

## 🤝 Contributors

- **Furkan Emre Guler** - Developer and Runner
- **Umit Erkut Colak** - Co-Runner and Tester

## 📝 License

This project is open source and available for personal use.

## 🙏 Acknowledgments

- Built with Create React App
- Charts powered by Recharts
- Backend infrastructure by Firebase
- Deployed on Vercel

## 📞 Contact

For questions or suggestions, feel free to open an issue on GitHub.

---

**Happy Running! 🏃‍♂️💨**
