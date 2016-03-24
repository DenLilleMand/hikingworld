#!/bin/sh
git add .  >> logs/gitadd.txt
git commit -m "automated commit for CI"  >> logs/gitcommit.txt
git pull origin master -X theirs >> logs/pull.txt
forever stopall >> logs/foreverstopall.txt
webpack >> logs/webpack.txt
forever start ./src/server/index.js >> logs/foreverstart.txt


