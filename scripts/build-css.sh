#! /bin/bash

sed -i 's/href="css\/app.css/href="app.css/g' ./public/index.html
sed -i '/href="css/d' ./public/index.html
./node_modules/uglifycss/uglifycss ./sources/css/*.css > ./public/app.css

