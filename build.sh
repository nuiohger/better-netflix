#!/bin/bash

# saner programming env: these switches turn some bugs into errors
set -o errexit -o pipefail -o noclobber -o nounset

! getopt --test > /dev/null 
if [[ ${PIPESTATUS[0]} -ne 4 ]]; then
    echo "I’m sorry, `getopt --test` failed in this environment."
    exit 1
fi

OPTIONS=z
LONGOPTS=zip

# -use ! and PIPESTATUS to get exit code with errexit set
# -temporarily store output to be able to check for errors
# -activate quoting/enhanced mode (e.g. by writing out “--options”)
# -pass arguments only via   -- "$@"   to separate them correctly
! PARSED=$(getopt --options=$OPTIONS --longoptions=$LONGOPTS --name "$0" -- "$@")
if [[ ${PIPESTATUS[0]} -ne 0 ]]; then
    # e.g. return value is 1
    #  then getopt has complained about wrong arguments to stdout
    exit 2
fi
# read getopt’s output this way to handle the quoting right:
eval set -- "$PARSED"

z=n
# now enjoy the options in order and nicely split until we see --
while true; do
    case "$1" in
        -z|--zip)
            z=y
            shift
            ;;
        --)
            shift
            break
            ;;
        *)
            echo "Programming error"
            exit 3
            ;;
    esac
done


rm -r ./dist-firefox/options
mkdir ./dist-firefox/options

# Do not minify (mode none). To minify use mode production.
npx webpack --entry ./build/Main.js --output ./dist-firefox/Main.js --mode none
cp -r ./src/options ./dist-firefox/
cp ./src/style.css ./dist-firefox/
echo "JavaScript created and Options, Style and JavaScript copied"

cp ./dist-firefox/Main.js ./dist-chrome/
cp ./dist-firefox/style.css ./dist-chrome/
cp -r ./dist-firefox/options ./dist-chrome/
printf "\n\nCopied to dist-chrome\n"

echo

if [ $z = y ]; then
    echo "Zipping..."
    echo "Firefox:"
    rm dist-firefox.zip
    cd dist-firefox
    zip -r ../dist-firefox.zip *
    cd ..
    echo
    echo "Chrome:"
    rm dist-chrome.zip
    cd dist-chrome
    zip -r ../dist-chrome.zip *
    cd ..

    echo
    echo "Creating Source Code package for Firefox because of the source code submission policy:"
    rm source-code.zip
    zip source-code.zip build dist-chrome dist-firefox src build.sh README

    echo
fi

echo "Done!"
