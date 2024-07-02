# Overview

This project demonstrates setting up a localhost environment using json-server to simulate a REST API on localhost:5000 and provides a basic UI on localhost:3000 to interact with this data.

# Prerequisites

Ensure Node.js and npm are installed on your machine.

# Project Structure

- src/data.json: Mock data file for json-server.
- src/: Directory containing frontend code.

# Notes

Ensure ports 5000 and 3000 are free and accessible.

# Features

This SPA basically contains Some cards (i.e. event cards) in which we have all the information of of events like event name, event timing, and event category. Along with the details there's a button to select the details.
There's some constraint in selection of events such as:

1. The can select two ebvents with same timing or conflicting timing. Conflicting timing means one event is starting from 1PM and ending at 2PM, other is starting from 1.30PM, still user can't choose second event as it will conflict half an hour of user's timing.
2. The user can't select more than 3 events.

- UI will show list of selected and non-selected events. Once the event will be selected, conflicting events will be grey-out(disabled), and the event which got non-selected won't appear in Selected events.
- Same in the case of selected events, if it got deselected, it wont appear in selected events.
- User is allowed to deselect all the selected events.
- This application is designed with a focus on accessibility, ensuring it meets the needs of all users regardless of their abilities.

# Important Commands:

`npm start`

- Runs the JSON server (json-server) and starts the React development server concurrently.

`npm run build`

- Builds the app for production to the build folder.

`npm test`

- Launches the test runner in interactive watch mode, with coverage reporting.

`npm run eject`

# Note: This is a one-way operation. Once you eject, you can't go back!

- Ejects the project from react-scripts, allowing customization of build configurations and dependencies.
