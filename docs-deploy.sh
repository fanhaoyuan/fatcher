#!/usr/bin/env sh

set -e

npm run docs:build

cd docs-dist

git init
git add -A
git commit -m '🚀 docuement deploy'

git push -f git@github.com:fanhaoyuan/fatcher.git master:gh-pages

cd -