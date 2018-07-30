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


npx webpack --entry ./build/Main.js --output ./dist-firefox/Main.min.js
rm ./dist-firefox/style.min.css
uglifycss ./src/style.css > ./dist-firefox/style.min.css

cp ./dist-firefox/Main.min.js ./dist-chrome/
cp ./dist-firefox/style.min.css ./dist-chrome/

echo

if [ $z = y ]; then
    echo "Zipping..."
    echo "Firefox:"
    zip -r dist-firefox.zip dist-firefox
    echo
    echo "Chrome:"
    zip -r dist-chrome.zip dist-chrome
    echo
fi

echo "Done!"
