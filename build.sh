npx webpack --entry ./build/Main.js --output ./dist-firefox/Main.min.js
uglifycss ./src/style.css > ./dist-firefox/style.min.css

cp ./dist-firefox/Main.min.js ./dist-chrome/
cp ./dist-firefox/style.min.css ./dist-chrome/

echo Done!
