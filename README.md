# Leah's Productivity App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It is designed to provide simple tools to help Leah with her various business needs. 
Due to the single use nature of this project, it is run as a localhost react app and stores all data in the user's browser's local storage. 

## First Time Setup

### Prerequisits:

- VS Code
- NodeJS

### Setup

1. Clone this repo to your machine.
2. Open VS Code and run the command `npm install --global yarn` in a terminal to globally install yarn (package manager used by this project).
3. Open this repo folder in VS Code and checkout to the `main` branch. 
4. Open a terminal pointed at the repo folder and run the command `yarn` to install the packages used by this project.

### Running The App

This react app is run in localhost. To run the app follow these steps:

1. Open VS Code.
2. Open this repo folder in VS Code and checkout to the `main` branch.
3. Open a terminal pointed at the repo folder and run the command `yarn start` to launch the app in your default browser.
4. To store the app's data on your browser, you will need to initialise. Click the button `Initialise App Data` on the app dashboard. 

The app should now be ready to use.

## App Features

### Dashboard

Here you can manage the local storage data used by the app. Within this repo are json files containing the data consumed by the app. When first run you will need to initialise this data into your browser's local storage (as per the setup instructions above). At any time, you can click the button `Write Stored Data To Console` to get a log of the data currently on your browser's local storage. This can then be pasted over the existing data within the json files. It is recommended to do this periodically to avoid losing data. If you make any mistakes whilst using the app and need to reset the local storage data back to what was last saved in the json files, you can click the `Reset Local Storage` button and then reinitialise the data.
