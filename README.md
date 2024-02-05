# Project Name

Brief description of your project goes here.

## Table of Contents

- [Purpose](#purpose)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Purpose

This mock HTTP server has been created to assist frontend and mobile engineer candidates with their take-home assignment. It offers all the expected backend functionalities that are assumed in the assignment. The primary purpose of this server is to facilitate testing and development of the frontend applications created by candidates.

## Prerequisites

Before you can use this mock HTTP server, ensure you have the following software installed on your system:

- **Node.js**: This project requires Node.js. We recommend using [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) to manage your Node.js installations. You can follow these steps to install Node.js with NVM:

  1. Install NVM by following the instructions on the [NVM GitHub repository](https://github.com/nvm-sh/nvm#installing-and-updating).

  2. Once NVM is installed, open a new terminal window and install Node.js version 20.11.0 or higher using the following command:

     ```bash
     nvm install v20
     ```
  
  3. Set Node.js version 20.11.0 as the default for this project:

     ```bash
     nvm use v20
     ```

- **Yarn**: You can install Yarn globally using npm (Node Package Manager) with the following command:

```bash
npm install -g yarn
```

Once you have Node.js and Yarn installed as specified above, you'll be ready to set up and run the mock server.

## Installation

To install the necessary dependencies for this mock HTTP server, navigate to the project directory in your terminal and run the following command:

```bash
yarn install
```

This will fetch and install all the required packages and dependencies for the project within the project directory.

After the installation is complete, you can further ensure that everything is set up correctly by running the tests using the following command:

```bash
yarn test
```

A successful test run with all green results not only indicates that the installation and setup are correct but also assures that the running server is functioning as expected.

## Usage

To start the mock HTTP server, along with the specifying the Basic authentication password, use the following command within your project directory:

```bash
PASSWORD=examplepassword yarn start
```

Ensure that you replace `examplepassword` with your desired password. This command is necessary to set the required password and start the server simultaneously.

By default, the server will be running on port 3000. If you want to specify an alternative port for the server, you can use the PORT environment variable. Here's an example of how to do so:

```bash
PASSWORD=examplepassword PORT=8080 yarn start
```

Replace 8080 with the port number you prefer.

Once you've executed the command with the correct password and, if needed, an alternative port, the server will be launched and it will be ready to respond to incoming HTTP requests.

## Documentation

We provide a comprehensive OpenAPI specification of the API, which details the expected request body and parameters, response statuses and bodies, as well as the authentication mechanism.

To access the API documentation, please refer to the `openapi.yml` file located in the project directory. This file contains a detailed description of the API endpoints, request and response formats, and the required authentication process.

By consulting the OpenAPI specification, you'll have a clear understanding of how to interact with the mock HTTP server and utilize its features effectively.

## License

This project contains proprietary code, and all rights are reserved by PT DayaTani Digital Indonesia. Unauthorized use, reproduction, or distribution of this code is strictly prohibited.
