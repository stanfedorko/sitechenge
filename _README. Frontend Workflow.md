# Gulp.js Template for Design to HTML Work

SASS/Pug Compilcation, Server/Livereload, Images Optimization, CSS minification.

## Quick Start
You should have installed Node.js

```bash
# Navigate to project folder and Install Gulp dependencies
npm install

# Default task - for development. Provides SASS/SCSS Sourcemaps and NOT-minified CSS. Starts Server/Livereload, SASS, Pug
gulp

# Production task - provides minified CSS, deletes HTML files. Then starts Server/Livereload, SASS, Pug
gulp prod

# Optimize images
gulp img
