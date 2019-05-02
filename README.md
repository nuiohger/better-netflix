# Better Netflix

Better Netflix is an Add-on for Firefox that adds various features to Netflix:
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

##### Visual Studio Code
To build JavaScript from TypeScript:

Press `CTRL + SHIFT + B`

Select `tsc: build`


##### Build JavaScript for Browsers
Run `build.sh`

### Distribution
To create the zip files use the -z or --zip parameter:

`build.sh -z`
