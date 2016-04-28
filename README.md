[![Build Status](https://travis-ci.org/sedovalx/oauth2-tester.svg?branch=master)](https://travis-ci.org/sedovalx/oauth2-tester)

# oauth2-tester
Pet application aimed to try a few frameworks/tools:
* [ECMAScript 2015](https://babeljs.io/docs/learn-es2015/)
* [Webpack](https://webpack.github.io/)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Sass](http://sass-lang.com/)
* [Gradle](http://gradle.org/)
* [Kotlin](https://kotlinlang.org/)

The base of the project is greatly influenced by the awesome https://github.com/geowarin/boot-react. 

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
