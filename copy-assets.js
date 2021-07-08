/**
 * Needed to keep file stimestamps and avoid undesired uploads
 */

var copy = require('recursive-copy');

copy('./public', './dist', function (error, results) {
    if (error) {
        console.error('Copy assets failed: ' + error);
    } else {
        console.info('Copy assets: Copied ' + results.length + ' files');
    }
});
