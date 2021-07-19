<br></br>
<img src="./.readme-assets/shopkeep.jpg">
Background image credit to [emre](https://www.pexels.com/@emrecan)
<h1 align="center">
  Shopkeep - <strong><em>the</em></strong>  goto project shop
  <br>
  <small>❗This project is a work in progress❗</small>
</h1>

<p align="center">
  The solution for starting a project. Handles incorporating your front-end, back-end, GitHub with any CI/CD you might desire. A one stop shop to getting your project off the ground so you can jump straight into coding what you truly want. 
  <br>
<p>

<div style="display:flex; align-items:center; justify-content:center;">
 <strong>CSS</strong>&nbsp;  <img src="./.readme-assets/css.png">&nbsp; &nbsp; <strong>Vanilla</strong> &nbsp; <img src="./.readme-assets/javascript.png"> &nbsp; &nbsp; <strong>React</strong>&nbsp;  <img src="./.readme-assets/react.png"> &nbsp; &nbsp; <strong>Svelte</strong> &nbsp; <img src="./.readme-assets/svelte.png"> &nbsp; &nbsp; <strong>NodeJS</strong> &nbsp; <img src="./.readme-assets/nodejs.png"> &nbsp; &nbsp; <strong>Github</strong> &nbsp; <img src="./.readme-assets/github.png"> &nbsp; &nbsp; 
</div>

<br>
<p align="center">
    <img src="https://img.shields.io/github/last-commit/shopkeepjs/shopkeepjs?style=flat-square" />
  <a href='https://simple.wikipedia.org/wiki/MIT_License'>
      <img src="https://img.shields.io/badge/license-MIT-lightgrey" />
  </a>
  <img src="https://img.shields.io/github/issues/shopkeepjs/shopkeepjs" />
</p>

<p align="center">
<img src="/.readme-assets/working.gif">
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [**Option 1** - Global Install From NPM:](#option-1---global-install-from-npm)
  - [**Option 2** - Git Clone:](#option-2---git-clone)
- [Features](#features)
- [Upcoming Features](#upcoming-features)
- [FAQ](#faq)
  - [I'm getting an error message about Subversion - what's the deal?](#im-getting-an-error-message-about-subversion---whats-the-deal)
  - [I'm getting an error message about requiring GH - what's the deal?](#im-getting-an-error-message-about-requiring-gh---whats-the-deal)
  - [Why even create this with so many other options out there?](#why-even-create-this-with-so-many-other-options-out-there)
  - [Can I suggest a framework/module/technology for you to adapt in?](#can-i-suggest-a-frameworkmoduletechnology-for-you-to-adapt-in)
  - [I mostly like what you've done, but I want to tweak a few things. Can I fork this and use it myself?](#i-mostly-like-what-youve-done-but-i-want-to-tweak-a-few-things-can-i-fork-this-and-use-it-myself)

## Installation

### **Option 1** - Global Install From NPM:

```sh
npm i -g shopkeep
```

The Shopkeep CLI will then be available globally. Just type `shopkeep` into your terminal and follow the on screen prompts to bootstrap your project!

> You will need to install [Apache's Subversion](https://subversion.apache.org/) to get this method to work. Subversion is required to be able to specifically extract **only** the chosen directories from this repository rather than forcing you to clone the entire repo.  

### **Option 2** - Git Clone:

```sh
git clone https://github.com/shopkeepjs/shopkeepjs.git
```

Clone this repo into your folder of choice and cherry pick the features you want from the `/store` folder.

## Features

- Can framework as much or as little as you like
- Uses many front end web frameworks including VanillaJS and React
- Includes various examples for backend needs, ranging from a simple frame
- Continuous Integration and Deployment with Github Actions and Docker images
  
> In order to use the github feature of **creating** a *new repo* on Github, you will need to have `gh` installed on your system. If you don't have gh, you can still request that the project can become a new git project and it will set up your branches, origins and do an initial commit.

## Upcoming Features

- Vue and Svelte projects
- Apollo (including various client side implementations!)
- FeathersJS
- A custom CSS toolkit
  


## FAQ

### I'm getting an error message about Subversion - what's the deal?

> [Apache's Subversion](https://subversion.apache.org/) is required to use Shopkeep. It was a tough decision to make between requiring a 3rd party installation or requiring every user to clone this entire repo, selectively cherry pick the requested frameworks and then delete everything that was no longer needed. I welcome any feedback regarding this requirement.

### I'm getting an error message about requiring GH - what's the deal?

> Along the same lines as Subversion, there needed to be some way to create a new repo via the command line. GH is the least intrusive and, in my opinion, best option. Just like with Subversion - I welcome all feedback regarding this design choice.

### Why even create this with so many other options out there?

>Everyone has their own way of starting a project, and no one solution fit perfectly with what I was looking for. As soon as I thought of the name Shopkeep, I knew I needed to make something that worked for <strong><em> me </em></strong>. Use whatever solution makes the time spent from idea to code the shortest possible!

### Can I suggest a framework/module/technology for you to adapt in?

>Absolutely! Just open an issue with the recommendation tag and I will respond. The time it takes might depend on how much I already know and how complicated of a tool it is, but I am always open to learning and trying new things out. If you think you fit my design style, you can always implement this yourself and submit a pull request and I will take a look!

### I mostly like what you've done, but I want to tweak a few things. Can I fork this and use it myself?

> Of course you can! I initially made this tool primarily for myself, but have released it to the wild to help anyone. Take it, change it, morph it and squash it to your heart's desire. 
