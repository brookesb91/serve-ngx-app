import { Request, Response } from 'express';

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.Server(app);

export interface NgxApp {
  /**
   * Path to application directory
   * @example '/dist/my-app'
   */
  path: string;
  /**
   * URL route for this application
   * @example '/'
   * @example '/dashboard'
   * @example '/web-app'
   */
  route: string;
}

export class Server {
  ngxApps: NgxApp[];
  port: number;

  constructor(port: number, ngxApps: NgxApp[]) {
    this.ngxApps = ngxApps;
    this.port = port;
  }

  start(): void {
    this.ngxApps.forEach(ngxApp => {
      app.use(`${ngxApp.route}/`, express.static(path.join(__dirname, ngxApp.path)));
      app.get(`${ngxApp.route}/*`, function (req: Request, res: Response) {
        res.sendFile(path.join(__dirname, `${ngxApp.path}/index.html`));
      });
      server.listen(this.port, () => console.log(`Serving ${this.ngxApps.length} apps on port ${this.port}`));
    });
  }
}