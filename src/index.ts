import { App } from './App';
import { Server } from './Server';

let server: Server;

async function init() {
  await App.INIT();

  server = new Server();
  server.listen(<number> App.config.get('server:httpPort'));
}

async function errorHandler(err: Error) {
  App.logger.error(`App down: "${err.message})" Stack:${err.stack}`);

  const promises = [];

  if (server) {
    promises.push(server.close());
  }
  if (App.db) {
    promises.push(App.db.close());
  }

  await Promise.all(promises);

  process.exit(1);
}

init().catch(errorHandler);

process.on('unhandledRejection', App.logger.error.bind(App.logger));
