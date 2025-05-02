const fs = require('fs');
const util = require('util');
// import { create } from 'domain';

const mkDir = util.promisify(fs.mkdir);
const baseDir = 'tmp/code-executions';

const createDir = async (dir) => {
  try {
    await mkDir(baseDir, { recursive: true });
    console.log(`Directory created already `);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
createDir();
