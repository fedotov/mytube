import * as supertest from 'supertest';

import { Server } from '../../../src/Server';
import { ServerInstance } from '../ServerInstance';

describe('#api/status', () => {
  let server: Server;

  it('should return 200 status', async () => {
    server = await ServerInstance.getServer();

    const res = await supertest(server.express).get('/status');

    expect(res.status).toBe(200);
    expect(res.body.status_message).toEqual('ok');
    expect(res.body.app_version).toEqual('1.0.0');
    expect(res.body.app_name).toEqual('mytube');
  });
});
