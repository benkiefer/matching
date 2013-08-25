#Matching
A simple matching game written as a demo for my daughter's class at school.

[Check it out](http://benkiefer.github.com/matching)

##Supported Browsers
 - Chrome
 - Firefox
 - Amazon Silk (Fire 7 HD, Fire 8.9 HD, not for Fire 7)
 
##Todo
 - Restore previous game
 - New game button?
 - Different Difficulties?

## Issues
[Go take a look](https://github.com/benkiefer/matching/issues). Feel free to fix anything [sherzberg](https://github.com/sherzberg) posts.
 
##Usage
If you are interested in making your own version of the matching game, here are some tips:
 - Clone this repository.
 - Create your own sprite sheet using the sources in the 'Thanks' section and replace "images/catsheet.png" with your new sprites.
 - Use Sprite Cow to generate your own "css/sprites.css" file.
 - Update the 'coffee/matching-game.coffee' cards variable with the names of the classes you want to use. Compile the coffeescript file and replace the js/matching-game.js file with the new file.
 
##Thanks
 - The [Github Octocat](http://octodex.github.com/) is property of Github, and the usage of the various Octocat images in this game are intended solely for the entertainment of four-year-olds. I'm happy to change the images used upon request.
 - [sherzberg](https://github.com/sherzberg) for testing.
 - Thanks to David Walsh for a nice tutorial on [flipping with CSS](http://davidwalsh.name/css-flip).
 - [Sprite Cow](http://www.spritecow.com/) saved me a lot of time trying to figure out the coordinates for all of the images on my sprite sheet.
 - [Pixlr](http://pixlr.com/) was used to make my sprite sheet and resolve some transparency issues with the source image.
 - [Modernizr](http://modernizr.com/) was used to warn users trying to access with incompatible browsers.
 
##License
For license information, see the License.txt file. License does not extend to image files, which are property of Github, as described above.
