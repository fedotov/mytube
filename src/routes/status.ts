import { get } from 'lodash';
import * as packageJson from '../../package.json';

module.exports = {
  get: (req, res) => {
    res.status(200).json({
      app_name: get(packageJson, 'name', 'missed in package.json'),
      app_version: get(packageJson, 'version', 'missed in package.json'),
      status_message: 'ok',
      status: 'UP',
    });
  },
};
