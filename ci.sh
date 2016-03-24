#!/bin/sh
git add .  >> gitadd.txt
git commit -m "automated commit for CI"  >>gitcommit.txt
git pull origin master -X theirs >> git pull.txt
forever stopall >> foreverstopall.txt
webpack >> webpack.txt
forever start ./src/server/index.js >> foreverstart.txt


