import { App } from './App';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import { initialize } from 'express-openapi';
import { readFileSync } from 'fs';
import * as http from 'http';
import * as yaml from 'js-yaml';
import { resolve as pathResolve } from 'path';
import * as swaggerUi from 'swagger-ui-express';

const docsPath = pathResolve(__dirname, '../config/api-doc.yaml');
const apiDoc = readFileSync(docsPath, 'utf8');

const swaggerDocument = yaml.safeLoad(apiDoc);

const paths = pathResolve(__dirname, './routes');
const promiseMode = true;

/**
 * Web server of the application based on Express
 */
export class Server {
  private readonly expressApp: express.Application;
  private httpServer: http.Server;

  constructor() {
    const app = express();
    const errorMiddleware = Server.ERROR_MIDDLEWARE;

    this.expressApp = app;
    this.initMiddlewares();
    initialize({apiDoc, app, paths, promiseMode, errorMiddleware});
  }

  public static ERROR_MIDDLEWARE(err, req, res, next): void {
    App.logger.error(err);
    res.status(err.status || 500).json(err);
    next();
  }

  public get express(): express.Application {
    return this.expressApp;
  }

  public listen(port: number): void {
    this.httpServer = this.expressApp.listen(port, () => {
      App.logger.info(`Listening on ${this.httpServer.address().port}`);
    });
  }

  public async close(): Promise<void> {
    if (!this.httpServer) {
      return Promise.resolve();
    }

    App.logger.info('Start close connections with server');

    try {
      await new Promise((resolve, reject) => {
        this.httpServer.close((err) => err ? reject(err) : resolve());
      });
      this.httpServer = null;
      App.logger.info('Server is closed');
    } catch (err) {
      App.logger.error(err);
    }
  }

  private initMiddlewares(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({extended: false}));
    this.expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.expressApp.get('/api', (req, res) => res.json(apiDoc));
    this.expressApp.use((req, res, next) => {
      App.logger.info(`Incoming request ${req.path}. Body: ${ JSON.stringify(req.body)}. Query: ${JSON.stringify(req.query)}`);
      next();
    });
  }
}
