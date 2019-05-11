# Better Netflix

Better Netflix is an Add-on for Firefox and Chrome that adds various features to Netflix:
*   Ultrawide display support (21:9 aspect ratio)
*   Zoom in and out of the video
*   Show the elapsed time of the video
*   Disable mouse movement on button press
*   Statistics: current FPS and resolution of the video
*   Menu to select video bitrate (video quality)
*   Option to automatically select the highest video bitrate available. This option is enabled by default. It can be disabled on the options page (Add-ons → Better Netflix → Preferences).
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

##### Visual Studio Code
To build TypeScript with Visual Studio Code:

Press `CTRL + SHIFT + B`

Select `tsc: build`

#### Terminal
To build TypeScript from a terminal:

$`tsc --build tsconfig.json`


#### Build JavaScript for Browsers
Run `python build.py`

### Distribution
To create the zip files use the -z or --zip parameter:

`python build.py -z`
