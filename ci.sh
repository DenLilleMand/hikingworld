#!/bin/sh


echo 'this is a test file' > foo.txt
git add .
git commit -m "automated commit for CI"
git pull origin master
forever stopall
webpack
npm run deploy


