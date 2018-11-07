"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.Server(app);
class Server {
    constructor(port, ngxApps) {
        this.ngxApps = ngxApps;
        this.port = port;
    }
    start() {
        this.ngxApps.forEach(ngxApp => {
            app.use(`${ngxApp.route}/`, express.static(path.join(__dirname, ngxApp.path)));
            app.get(`${ngxApp.route}/*`, function (req, res) {
                res.sendFile(path.join(__dirname, `${ngxApp.path}/index.html`));
            });
            server.listen(this.port, () => console.log(`Serving ${this.ngxApps.length} apps on port ${this.port}`));
        });
    }
}
exports.Server = Server;
