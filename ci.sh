#!/bin/sh
git add .
git commit -m "automated commit for CI"
git pull origin master
forever stopall
webpack
forever start ./src/server/index.js


