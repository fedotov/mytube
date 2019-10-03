import { resolve } from 'path';

import { Sequelize } from 'sequelize';
import * as YouTube from 'simple-youtube-api';
import { DB } from './DB';
import { BaseApp, Config, Logger } from './modules/coreServices/node-services';

/**
 * Access point for modules/services in the application
 */
export class App extends BaseApp {
  private static database: Sequelize;
  private static youTube: YouTube;

  public static get config(): Config {
    return BaseApp.config;
  }

  public static get logger(): Logger {
    return BaseApp.logger;
  }

  public static get db(): Sequelize {
    return this.database;
  }

  public static get youTubeClient(): YouTube {
    return this.youTube;
  }

  public static async INIT() {

    const configPath = resolve(__dirname, '../config/app.json');
    BaseApp.config = new Config(configPath);

    const logLevel = App.config.get('logger:level');
    const appName = App.config.get('name');

    BaseApp.logger = new Logger(logLevel, {application: appName});

    const db = new DB();
    this.database = await db.connect();

    this.youTube = new YouTube(App.config.get('YOUTUBE:KEY'));
  }
}
