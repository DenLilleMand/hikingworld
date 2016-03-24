#!/bin/sh


echo 'this is a test file' > foo.txt
git add .
git commit -m "automated commit for merge"
git pull origin master


