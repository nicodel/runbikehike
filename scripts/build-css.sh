#! /bin/bash

mkdir -p ./public/styles
sed -i 's/href="css\/app.css/href="styles\/app.css/g' ./public/index.html
sed -i '/href="css/d' ./public/index.html
./node_modules/uglifycss/uglifycss ./sources/css/*.css > ./public/styles/app.css
