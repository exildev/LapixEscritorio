const path = require('path');
const url = require('url');
var utils = {
    load: function(c, u, p ){
        c.loadURL(url.format({
            pathname: u,
            protocol: p+':',
            slashes: true
        }));
    },
    loadFile: function(c, f){
        this.load(c, path.join(__dirname, f), 'file');
    }
};
module.exports = utils;
