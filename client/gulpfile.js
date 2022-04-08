const gulp = require('gulp');
const gap = require('gulp-append-prepend');

const year = new Date().getFullYear();

gulp.task('licenses', (done) => {
  // This is to add DigiBlock licenses in the production mode for the minified js
  gulp
    .src('build/static/js/*chunk.js', { base: './' })
    .pipe(
      gap.prependText(`/*!

=======================================================================
* DigiBlock - v0.1.0
=======================================================================

* Copyright ${year} DigiBlock

* Coded by Pinaki Bhattacharjee, Sakshi Gairola, Chandra Prakash

=======================================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest('./', { overwrite: true }));

  // This is to add DigiBlock licenses in the production mode for the minified html
  gulp
    .src('build/index.html', { base: './' })
    .pipe(
      gap.prependText(`<!--

=======================================================================
* DigiBlock - v0.1.0
=======================================================================

* Copyright ${year} DigiBlock

* Coded by Pinaki Bhattacharjee, Sakshi Gairola, Chandra Prakash

=======================================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

-->`)
    )
    .pipe(gulp.dest('./', { overwrite: true }));

  // This is to add DigiBlock licenses in the production mode for the minified css
  gulp
    .src('build/static/css/*chunk.css', { base: './' })
    .pipe(
      gap.prependText(`/*!

=======================================================================
* DigiBlock - v0.1.0
=======================================================================

* Copyright ${year} DigiBlock

* Coded by Pinaki Bhattacharjee, Sakshi Gairola, Chandra Prakash

=======================================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest('./', { overwrite: true }));

  done();
});
