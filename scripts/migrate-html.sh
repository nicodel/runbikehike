#! /bin/bash

echo "Removing JS files lines from index.html..."
sed -i 's/src="js\/app.js/src="app.js/g' ./public/index.html
echo "Replacing with single JS file..."
sed -i '/src="js/d' ./public/index.html
echo 'Done !'

#echo "Removing CSS files lines from index.html..."
#sed -i 's/href="css\/app.css/href="app.css/g' ./public/index.html
#echo "Replacing with single CSS file..."
#sed -i '/href="css/d' ./public/index.html
#echo 'Done !'
