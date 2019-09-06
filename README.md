# Better Netflix

Better Netflix is an Add-on for Firefox and Chrome that adds various features to Netflix:
*   Ultrawide display support (21:9 aspect ratio)
*   Zoom in and out of the video
*   Show the elapsed time of the video
*   Disable mouse movement on button press
*   Statistics: current FPS and resolution of the video
*   Use the mouse wheel to change the volume
*   Button to pick a random video of the Netflix list

## Build

### Prerequisites
The following npm packages are required:
*   typescript
*   @types/chrome
*   webpack
*   webpack-cli

### TypeScript

#### Visual Studio Code
To build TypeScript with Visual Studio Code:

Press `CTRL + SHIFT + B`

Select `tsc: build`

#### Build script
The -t or --typescript parameter can be used to build TypeScript. JavaScript is being built for Browsers as well.

Run `python build.py -t`


### Build JavaScript for Browsers
Run `python build.py`

### Distribution
To create the zip files use the -z or --zip parameter:

`python build.py -z`
