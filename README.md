# Better Netflix

## Build

##### Visual Studio Code
To build JavaScript from TypeScript:

CTRL + SHIFT + B

tsc: build


##### Build JavaScript for Browsers
Run build.sh


##### Testing
To disable minification add the following parameter to the webpack command in build.sh:

--mode none



## Todo

- IMDB integration: rating, how many raters, link to imdb page, rate directly on netflix?, show reviews in popup (or show whole imdb page in popup or show reviews in reviews section of netflix)?

- Custom video playback speed: video has defaultPlaybackRate (before starting to play) and playbackRate variables:         
 [https://stackoverflow.com/questions/3027707/how-to-change-the-playing-speed-of-videos-in-html5]

- Options: custom keyboard shortcuts, automatically zoom into videos, automatically zoom to 21:9 (or specified percentage)

- maybe: auto detect black bars and zoom accordingly (if user has specified in options)

- Skip intro (automatically, shortcut already exists: s)

- Custom Subtitles

- Video Bitrate Automatically highest? button for menu?

