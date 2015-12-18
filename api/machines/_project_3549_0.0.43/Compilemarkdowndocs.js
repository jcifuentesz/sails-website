module.exports = {
  "inputs": {
    "path": {
      "id": "39a8f72e-cb11-4f72-b9a0-06d6be90d453",
      "friendlyName": "path",
      "description": "The path in the GitHub repo to pull from.",
      "example": "anatomy",
      "requiredManually": true,
      "addedManually": true,
      "required": true
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "success": {
      "void": true,
      "friendlyName": "then",
      "variableName": "result",
      "description": "Normal outcome."
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    /**
     * Module dependencies
     */

    var path = require('path');
    var cheerio = require('cheerio');
    var DocTemplater = require('doc-templater');
    var Filesystem = require('machinepack-fs');


    // This function is applied to each template before the markdown is converted to markup
    function beforeConvert(mdString, done) {

      // This is an HTML comment because it is easy to over-match and "accidentally"
      // add it underneath each code block as well (being an HTML comment ensures it
      // doesn't show up or break anything)
      // var TMP_LANG_MARKER_EXPR = /<!-- __LANG=\%[^%]*\%__ -->/;
      var LANG_MARKER_PREFIX = '<!-- __LANG=%';
      var LANG_MARKER_SUFFIX = '%__ -->';

      // Based on the github-flavored markdown's language annotation, (e.g. ```js```)
      // add a temporary marker to code blocks that can be parsed post-md-compilation
      // by the `afterConvert()` lifecycle hook
      mdString = mdString.replace(/(```)([a-zA-Z]*)(\s*\n)/g, '$1\n' + LANG_MARKER_PREFIX + '$2' + LANG_MARKER_SUFFIX + '$3');

      return done(null, mdString);
    }

    // This function is applied to each template after the markdown is converted to markup
    function afterConvert(html, done) {

      // Replace github emoji with HTML
      html = html.replace(/\:white_check_mark\:/g, '<div class="replacementIcon yes"></div>');
      html = html.replace(/\:white_large_square\:/g, '<div class="replacementIcon no"></div>');
      html = html.replace(/\:heavy_multiplication_x\:/g, '<div class="replacementIcon never"></div>');

      // Replace ((bubble))s with HTML
      html = html.replace(/\(\(([^())]*)\)\)/g, '<bubble type="$1" colors="true"></bubble>');

      // Flag <h2>, <h3>, <h4>, and <h5> tags
      // with the `permalinkable` directive
      //
      // e.g.
      // if the page is #/documentation/reference/req
      // and the slug is "transport-compatibility"
      // then the final URL will be #/documentation/reference/req?q=transport-compatibility
      var $ = cheerio.load(html);
      $('h2, h3, h4, h5').each(function() {
        var content = $(this).text() || '';

        // build the URL slug suffix
        var slug = content
          .replace(/[\?\!\.\-\_\:\;\'\"]/g, '') // punctuation => gone
          .replace(/\s/g, '-') // spaces => dashes
          .toLowerCase();

        // set the permalink attr
        $(this).attr('permalink', slug);

        // this was throwing ".wrap is undefined"
        if ($(this) && typeof $(this).wrap === 'function') {
          $(this).wrap('<div class="permalink-header"></div>');
        }

      });
      html = $.html();

      // Convert URL fragment links (i.e. for client-side routes) into
      // web-root-relative URLs (i.e. they'll have a leading slash).
      // (this is because there are lots of links left over from when sailsjs.org
      // used client-side routes for navigation around the documentation pages.)
      html = html.replace(/(href=")\.?\/?#\/?([^"]*)"/g, '$1/$2"');

      // e.g.
      //   href="/#/asdjgasdg"     =>  href="/asdjgasdg"
      //   href="#/asdjgasdg"      =>  href="/asdjgasdg"
      //   href="/#/"              =>  href="/"
      //   href="#/asdjgasdg"      =>  href="/asdjgasdg"

      // Get rid of the '.html' at the end of ANY internal web-root-relative URL that
      // point at the documentation pages. Any links form the docs that start with 
      // '/documentation' and ends in '.html' will have the file extension stripped off.
      html = html.replace(/(href="\/documentation)([^"]*)\.html"/g, '$1$2"');

      // Add target=_blank to external links (e.g. http://google.com or https://chase.com)
      html = html.replace(/(href="https?:\/\/([^"]+)")/g, '$1 target="_blank"');


      // Add the appropriate `data-language` based on the temporary marker
      // (TMP_LANG_MARKER_EXPR) that was added in the `beforeConvert()` lifecycle
      // hook above
      // console.log('RAN AFTER HOOK, found: ',html.match(/(<code)([^>]*)(>\s*)(\&lt;!--\s*__LANG=\%[^\%]*\%__\s*--\&gt;)/g));

      // Interpret `js` as `javascript`
      html = html.replace(
        // $1     $2     $3   $4
        /(<code)([^>]*)(>\s*)(\&lt;!-- __LANG=\%js\%__ --\&gt;)\s*/gm,
        '$1 data-language="javascript"$2$3'
      );

      // Interpret `sh` and `bash` as `shell`
      html = html.replace(
        // $1     $2     $3   $4
        /(<code)([^>]*)(>\s*)(\&lt;!-- __LANG=\%(bash|sh)\%__ --\&gt;)\s*/gm,
        '$1 data-language="javascript"$2$3'
      );

      // When unspecified, default to `javascript`
      html = html.replace(
        // $1     $2     $3   $4
        /(<code)([^>]*)(>\s*)(\&lt;!-- __LANG=\%\%__ --\&gt;)\s*/gm,
        '$1 data-language="javascript"$2$3'
      );

      // Finally, nab the rest
      html = html.replace(
        // $1     $2     $3   $4               $5    $6
        /(<code)([^>]*)(>\s*)(\&lt;!-- __LANG=\%)([^%]+)(\%__ --\&gt;)\s*/gm,
        '$1 data-language="$5"$2$3'
      );

      return done(null, html);
    }

    // Delete current rendered partials if they exist
    Filesystem.rmrf({
      dir: path.resolve(env.sails.config.appPath, 'views/partials/doc-templates/', inputs.path),
    }).exec({

      // An unexpected error occurred.
      error: exits.error,

      // OK.
      success: function() {
        // Compile the markdown into HTML templates
        DocTemplater()
          .build([{
            remote: 'git://github.com/balderdashy/sails-docs.git',
            branch: '0.11.3',
            remoteSubPath: inputs.path,
            htmlDirPath: path.join('views/partials/doc-templates/', inputs.path),
            jsMenuPath: path.join('views/partials/doc-menus', inputs.path + '.jsmenu'),
            outputExtension: 'ejs',
            beforeConvert: beforeConvert,
            afterConvert: afterConvert,
          }], function(err) {
            if (err) return exits.error(err);
            return exits.success();
          });
      }
    });
  },
  "identity": "Compilemarkdowndocs"
};
