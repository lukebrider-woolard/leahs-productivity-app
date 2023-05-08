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

### Magnets Data

This is the main data display page for Leah's magnets. Out of stock magnets are highlighted. Each column is sortable. There is a floating action button for adding new magnets.

#### Adding Magnets

This form allows you to enter a new magnet to the catalogue. You will need to provide a unique id (currently the app does not validate this). You will also need to provide a name, the number currently in stock (accepts zero and negatives), and you can optionally assign the new magnet to bundles. You can also create a new bundle if necessary. 

### Sales

This page enables you to enter a comma separated list of magnet ids in order to generate an alphabetised list of magnets that a customer has ordered. There is also the ability to select a bundle if the customer has purchased one of those. This list also shows the current stock of each magnet. When ready, you need to enter the country that the customer is ordering from (to update this property of each magnet in the order). You can then hit the `Complete` button to process the order - automatically updating the stock, sold, and country properties of each magnet in the order. 
Note that this page can be opened from the Previous Orders page. When opened in this way the magnet IDs from the previous order are present in the URL - allowing the sales page to display the sold magnets from that order. When viewed in this way the `Complete` button is permanently disabled to avoid accidental order duplication. 

### Stock Management

Here you can view a streamlined view of the current magnet stock. You can use the `+` and `-` buttons in the Edit column to alter the stock level of each magnet. Any magnet that has been edited but not saved will have the stock number highlighted. There is a floating action button for saving edits. 

### Previous Orders

This page displays a simple table showing the magnets ids purchased in each order and the date the order was completed using this app. You can click on a row to load the magnets in the Sales page - making it easier to view which magnets were sold.

## Testing

Testing of this app is coded in Jest. This includes unit, UI, and snapshot testing as appropriate. To run these tests, use the command `yarn test` in a terminal pointed at this repository. 
