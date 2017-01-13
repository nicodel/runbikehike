# Run, Bike, Hike...

## Description

Run, Bike, Hike... is a personal and open source sports log. What ever you  sport activity is, you can use Run, Bike, Hike... to keep track of it and follow your progress across time.
It allows you to follow your running or biking sessions. You can be a running expert or an occasional hiker, Run, Bike, Hike... is giving simple and essentials functionalities. You can use the Run, Bike, Hike... mobile application to record your track while practicing outdoor, or use your favorite GPS device to do so. As long as it allows you to retreive the data it has been recording, you will be able to import them in Run, Bike, Hike...
You can also use Run, Bike, Hike... to follow your weight training or swimming sessions, by entering the figures.
Run, Bike, Hike... is a web application. It means that it can on any device using any browser. It will need a server (for the moment it runs on [Node.js](https://nodejs.org) server)in order to store all your data. And the good news is that you can host the server yourself in order to keep your data private.

# How to install it in my Cozy instance?

If you already have a Cozy instance setup, then you ~~can~~ (soon) will be able to install Run, Bike, Hike... either
from the Marketplace or by hopping on the machine and running the following
command:

```
cozy-monitor install runbikehike -r https://github.com/nicodel/runbikehike
```

# How to install it on a Node server?

Run, Bike, Hike... can run in a [Node.js](https://nodejs.org) server. To do so, run the following
command:

```
sudo apt-get install node
git clone https://github.com/nicodel/runbikehike
cd runbikehike
npm install
npm run build
npm start
```

## Hack

If you want to hack on Run, Bike, Hike..., be sure to have installed [Mocha](https://mochajs.org) on your machine. It will be used for testing.

```
npm install -g mocha
```

(of course, install dependencies for the application)

```
npm install
```

Then you can build and start Run, Bike, Hike... this way:

```
npm run build
npm start
```

An alternate start command enable you to run the unbuild source od Run, Bike, Hike... from the `sources/` directory:

```
npm run dev
```

In order to try it on a Cozy Cloud dev environment, you need to install the following:

```
sudo apt-get install git nodejs nodejs-legacy npm virtualbox-4.3 vagrant
sudo npm install -g cozy-dev
mkdir cozy-dev && cd cozy-dev
cozy-dev vm:init

# Start the environment
cozy-dev vm:start

# Check that the environment is properly started
cozy-dev vm:status

# Update the environment (strongly recommended)
cozy-dev vm:update
```

### Can i propose a pull request?

Oh yeah, that'd be awesome! If you think about it, create a branch on your fork
and if you feel like sending a pull request, please propose to merge into the
`master` branch. Then I'll give it a look and will most
certainly accept it!

## What is Cozy?

![Cozy Logo](https://raw.github.com/cozy/cozy-setup/gh-pages/assets/images/happycloud.png)

[Cozy](https://cozy.io) is a platform that brings all your web services in the
same private space.  With it, your web apps and your devices can share data
easily, providing you with a new experience. You can install Cozy on your own
hardware where no one profiles you.

## Release notes
* Migrating from a FirefoxOS client application, to a client/server application that can be hosted on any server and launched from any device and browser.

### v0.2.0 - xx/xx/xxxx
* Fix issue #24: Sorting dashboard entries.
* Fix issue #22: Definig one and for all how data will be declared and used.


## Licence
Run, Bike, Hike... is distributed under the [MPL2.0 licence](http://www.mozilla.org/MPL/2.0/)
