# Barsaati Media

Implement Twitter Trends Scrapper

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Usage](#usage)
- [Contributors](#contributors)
- [Tasks](#Tasks)


## Overview

A scraping code which is modified to take your twitter id and pass and scrap the trending div in twitter and fetch the data to html page. The documentation are provided below for the same.

## Features

- Provide your twitter account details to get your trending feed
- Secured and Safe to use 

## Dependencies

- express
- selenium-webdriver
- chrome driver

## Setup

1. Clone the repository:

```bash
git clone https://github.com/shaurya35/Barsaati-Films-Task
cd Barsaati-Films-Task
```
2. cd to folder:

```bash
cd server
```

3. Install the dependencies:

```bash
npm install
```

## Usage

In server.js:
```bash
Change the following:
const proxies = [
  "<your proxies>",
];
```

Run the server:

```bash
npm run dev
```

Access the app in your web browser at `http://localhost:3000/`.

## Contributors

- Shaurya Jha ([Linkedin](https://www.linkedin.com/in/shaurya--jha/))

## Tasks

What you have to do:
<br>
<br>
[x] Write a Selenium script that can read the Twitter home page (on your local
computer) and fetch the top 5 trending topics under “What’s Happening”
section from the homepage.
<br>
<br>
[x] To access Twitter, create/use your own Twitter account, since log in
required to see this page.
<br>
<br>
[x] 3. Use ProxyMesh such that each new request to scrape the trending topics
is sent from a new IP address.
<br>
<br>
[x] Create a unique ID for each time the Selenium script is run and store the
results in a MongoDB database (fields required – unique ID, name of
trend1, 2, 3, 4, 5, date and time of end of Selenium script, IP address
used). We won’t need anything else.
<br>
<br>
[x] Create a simple HTML page which has a button, which when clicked, will
run the Selenium script, and then show results in the following manner:
