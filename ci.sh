#!/bin/sh
git add .
git commit -m "automated commit for CI"
git pull origin master -X theirs
forever stopall
webpack
forever start ./src/server/index.js


