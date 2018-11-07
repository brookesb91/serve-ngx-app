"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.Server(app);
var Server = /** @class */ (function () {
    function Server(port, ngxApps) {
        this.ngxApps = ngxApps;
        this.port = port;
    }
    Server.prototype.start = function () {
        var _this = this;
        this.ngxApps.forEach(function (ngxApp) {
            app.use(ngxApp.route + "/", express.static(path.join(__dirname, ngxApp.path)));
            app.get(ngxApp.route + "/*", function (req, res) {
                res.sendFile(path.join(__dirname, ngxApp.path + "/index.html"));
            });
            server.listen(_this.port, function () { return console.log("Serving " + _this.ngxApps.length + " apps on port " + _this.port); });
        });
    };
    return Server;
}());
exports.Server = Server;
