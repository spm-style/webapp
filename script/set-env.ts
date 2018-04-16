import { writeFile } from 'fs';
import { argv } from 'yargs';

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file

// require('dotenv').config();

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
// const environment = argv.environment;
const isProd = argv.environment === 'prod';

const targetPath = `./src/environments/environment.${isProd ? "prod.ts" : "ts"}`;
const envConfigFile = `
export const environment = {
  production: false,
  cdnUrl: 'http://cdn.spm-style.com',
  apiUrl: 'http://api.spm-style.com',
  wwwUrl: 'http://www.spm-style.com',
  hostname: "${process.env.HOSTNAME}"
};
`
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
