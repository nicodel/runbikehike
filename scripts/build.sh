#! /bin/bash

rm -rf public/*
echo "Syncing static files..."
mkdir -p ./public/img
rsync -a --delete ./sources/img/ ./public/img/
mkdir -p ./public/styles/fonts
rsync -a --delete ./sources/css/fonts/ ./public/styles/fonts
mkdir -p ./public/locales
rsync -a --delete ./sources/locales/ ./public/locales/
mkdir -p ./public/lib
rsync -a --delete ./sources/js/lib/ ./public/lib/

#cp package.json ./public/
cp ./sources/index.html ./public/

echo "Migrating HTML file..."
# ./scripts/migrate-html.sh
#rsync -a --delete ./sources/js/ ./public/js/

echo "Uglifying CSS files into build directory..."
./scripts/build-css.sh

echo "Uglifying JS files into build directory..."
./scripts/build-js.sh

echo "Done!"
