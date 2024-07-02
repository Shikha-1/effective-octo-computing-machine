# Overview

This project demonstrates setting up a localhost environment using a REST API and provides a basic UI to interact with this data.

# Prerequisites

Ensure Node.js and npm are installed on your machine.

# Project Structure

- **src/**: This directory houses the frontend code of the project.
- **src/components/**: Contains all the stateless components necessary for the application.
- **src/hooks/**: Includes custom hooks utilized in the project, such as those for fetching data or managing localStorage operations.
- **src/tests/**: Holds files dedicated to unit testing coverage.
- **src/types/**: Consists of type definition files used throughout the project.
- **src/utils/**: Houses utility functions used across the application.
- **src/state-management/**: Contains the context and provider setup along with all the logic for state management.

# Features

This SPA contains Some cards (i.e. event cards) in which we have all the information of events like event name, event timing, and event category. Along with the details, there's a button to select the details.

- There are some constraints in the selection of events such as:

1. They can select two events with the same timing or conflicting timing. Conflicting timing means one event starts at 1 PM and ends at 2 PM, and the other starts at 1.30 PM, still, the user can't choose a second event as it will conflict with half an hour of the user's timing.
2. The user can't select more than 3 events.
3. UI will show the list of selected and non-selected events. Once the event is selected, conflicting events will be greyed out (disabled), and the event that got non-selected won't appear in Selected events.
4. Same in the case of selected events, if it got deselected, it won't appear in selected events.
5. The user is allowed to deselect all the selected events.
6. This application is designed with a focus on accessibility, ensuring it meets the needs of all users regardless of their abilities.

# Important Commands:

`npm start`
- Starts the React development server.

`npm run build`
- Builds the app for production to the build folder.

`npm test`
- Launches the test runner in interactive watch mode, with coverage reporting.

`npm run eject`
**Note: This is a one-way operation. Once you eject, you can't go back!**

- Ejects the project from react scripts, allowing customization of build configurations and dependencies.

# Prototypes

![Screenshot (2)](https://github.com/Shikha-1/effective-octo-computing-machine/assets/72983644/931af664-79e2-4185-a2df-613e9940d0e0)
![Screenshot (3)](https://github.com/Shikha-1/effective-octo-computing-machine/assets/72983644/ba1c3bf5-c4b4-477f-8810-095248af865b)
![Screenshot (4)](https://github.com/Shikha-1/effective-octo-computing-machine/assets/72983644/dce07173-c9f9-4107-8c99-fdacd4628660)
