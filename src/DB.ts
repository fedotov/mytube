import { Sequelize } from 'sequelize';
import { App } from './App';

import { History, init as HistoryInit } from './models/History.model';

/**
 * Access point for database usage in app
 */
export class DB {

  private db: Sequelize;
  private readonly dbName: string;
  private readonly dbUser: string;
  private readonly dbPassword: string;
  private readonly dbHost: string;
  private readonly dbPort: number;
  private readonly dbLogging: boolean;

  constructor() {
    this.dbName = App.config.get('DB:NAME');
    this.dbUser = App.config.get('DB:USER');
    this.dbPassword = App.config.get('DB:PASSWORD');
    this.dbHost = App.config.get('DB:HOST') || 'localhost';
    this.dbPort = App.config.get('DB:PORT') || 3306;
    this.dbLogging = App.config.get('DB:LOGGING') === 'true' || false;
  }

  public async connect(): Promise<Sequelize> {
    App.logger.info(`Trying to connect to ${this.dbName} database with user ${this.dbUser} and host ${this.dbHost}:${this.dbPort} `);
    this.db = new Sequelize(this.dbName, this.dbUser, this.dbPassword, {
      host: this.dbHost,
      port: this.dbPort,
      dialect: 'mysql',
      logging: this.dbLogging,
    });

    try {
      await this.db.authenticate();
      App.logger.info(`Connection to ${this.dbName} database has been established successfully.`);
    } catch (err) {
      App.logger.error(`Unable to connect to ${this.dbName} database`);
      throw err;
    }

    HistoryInit(this.db);
    await History.drop();
    await History.sync();

    return this.db;
  }

  public async close(): Promise<void> {
    App.logger.info('Close connection with database');
    await this.db.close();
  }

}
