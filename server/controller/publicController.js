'use strict';
var utils = require('../lib/utils');
var helpers = require('../lib/helpers');
var rootFolder = require('../../rootPath');

// /download/:snippetID

// Takes the snippet ID and does a look up
// when it finds the Snippet, it writes it to file, then sends it out as a download
module.exports = {
  downloadSnippet: function (req, res) {
    var snippetID = req.params.snippetId;
    var folder = rootFolder + '/server/tmp/' + Date.now() + '/';
    helpers.getSnippet(snippetID)
            .then(function (result) {
              utils.writeSnippetFile(result.toJSON(), folder).then(function (file) {
                res.download(file.filePath, file.fileName, function (err) {
                if (err) {
                  console.log(res.headersSent);
                }
                utils.cleanFolder(folder);
              });
            });
           })
          .catch(function (err) {
           res.redirect('/');
          });
  }
};
