# oauth2-tester
[![Build Status](https://travis-ci.org/sedovalx/oauth2-tester.svg?branch=master)](https://travis-ci.org/sedovalx/oauth2-tester)

This is a Web application to explore responses from an OAuth 2.0 server. To try it you should 
* Run application and copy provided callback URI
* Use this URI for registration on an OAuth 2.0 server like GitHub, Facebook, Google and etc.
* Copy the client ID, the client secret, authorization and token endpoint addresses after the registration
* Add a new OAuth server item in the application and fill it with copied registration information
* Try to request OAuth server and explore the response

The application will suggest you the proper URI to get auth information. The suggestions dependes on the currently selected server item state and selected type of the OAuth grant. 

Under the hood:
* [ECMAScript 2015](https://babeljs.io/docs/learn-es2015/)
* [Webpack](https://webpack.github.io/)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Sass](http://sass-lang.com/)
* [Gradle](http://gradle.org/)
* [Kotlin](https://kotlinlang.org/)

The base of the project is greatly influenced by the awesome https://github.com/geowarin/boot-react. 

## Build
Just run `gradlew build` in the root of the project.

## Prerequisites
* Install Java SE 8
* Install NodeJS 4.4.2
* Install MongoDB 3.2.5
    * [Windows](http://stackoverflow.com/questions/2438055/how-to-run-mongodb-as-windows-service) (as administrator)
        * Install it as service `>mongod --install --dbpath=D:\mongodb --logpath=D:\mongodb\log.txt`
        * Run it `net start MongoDB`
    * [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04)
        * `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10`
        * `echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list`
        * `sudo apt-get update`
        * `sudo apt-get install -y mongodb-org`
        
## Installation for Ubuntu
* Copy the jar to the target host
* [Create upstart script](http://stackoverflow.com/questions/24268890/run-jar-file-as-daemon-on-linux-ubuntu)
    * `sudo touch /etc/init/oauth2tester.conf`
    * `sudo vi /etc/init/oauth2tester.conf`
    
```
description "oauth2tester"
author "sedov.alx"

start on runlevel [3]
stop on shutdown

expect fork

script
	cd /home/ubuntu/apps/oauth2tester/
	sudo -u ubuntu java -jar /home/ubuntu/apps/oauth2tester/oauth2tester-0.0.1-SNAPSHOT.jar >/home/ubuntu/apps/oauth2tester/log.txt 2>&1
	emit oauth2tester_running
end script
```

And finally run `sudo start oauth2tester`. 
