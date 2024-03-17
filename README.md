# PUPPETEER CHALLENGE

### Objective

Create a Puppeteer script to automate data extraction and interaction with the given website. Script should navigate through the site, extract product information, and simulate a user journey from product discovery to checkout.

### Prerequisites

- npm
- Node.js

To see if you already have Node.js and npm installed and check the installed version, run the following commands:

    npm -v
    node -v

Downloading and installing Node.js and npm instructions: https://nodejs.org/en/download/package-manager

### Installation

1.  Clone the repo

        git clone git@github.com:dragon13v77/puppeteer_challenge.git

2.  Install all dependencies

        npm install

3.  Compile all typescript files to javascript files.

        npm run build

### Usage

1.  Start the script

        npm start

### Configuration

Config parameters are located inside the file on this path

    src/constants/index.ts

1. **itemsCount**  - Adjust how many items should be extracted. Default = 10.

2. **searchPhrase**  - Adjust search phrase.

3. **guestUser**  - Adjust data for the guest user when filling the checkout form.