import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { App } from '../../src/App';
import { Server } from '../../src/Server';

const path = resolve(__dirname, '../../.test.env');
dotenv.config({ path });

export namespace ServerInstance {
    export async function getServer(): Promise<Server> {
      await App.INIT();

      return new Server();
    }
}
