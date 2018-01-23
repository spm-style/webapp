import { enableProdMode }                                                       from '@angular/core';
import * as express                                                             from 'express';
import { join }                                                                 from 'path';
import { ngExpressEngine }                                                      from '@nguniversal/express-engine';
import { provideModuleMap }                                                     from '@nguniversal/module-map-ngfactory-loader';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { SERVER_PUBLIC_ROUTES, SERVER_USER_ROUTES, SERVER_ADMIN_ROUTES }        from './server.routes';
const { AppServerModuleNgFactory, LAZY_MODULE_MAP }                             = require('./dist/server/main.bundle');

enableProdMode();

const Express = express();
const PORT = process.argv[2];
const DIST_FOLDER = join(process.cwd(), 'dist');


Express.engine('html', ngExpressEngine({ bootstrap: AppServerModuleNgFactory, providers: [ provideModuleMap(LAZY_MODULE_MAP) ] }));

Express.set('view engine', 'html');
Express.set('views', join(DIST_FOLDER, 'browser'));

// Server static files from /browser
Express.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// Server public route
// for(let route of SERVER_PUBLIC_ROUTES){
//   Express.get(route, (req, res) => {
//     // res.cookie("mycookie", "1234567890", { secure:false, maxAge:120000, httpOnly: true });
//     res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
//   });
// }

// // Server user route
// for(let route of SERVER_USER_ROUTES){
//   Express.get(route, (req, res) => {
//     // check cookie if scope user
//     res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
//   });
// }

// // Server admin route
// for(let route of SERVER_ADMIN_ROUTES){
//   Express.get(route, (req, res) => {
//     // check cookie if scope admin
//     res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
//   });
// }

// Server default route
// Express.get('*', (req, res) => { res.redirect('/not-found') });

Express.get('*', (req, res) => {
  // res.cookie("mycookie", "1234567890", { secure:false, maxAge:120000, httpOnly: true });
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

Express.listen(PORT, () => { console.log(`Node server listening on http://localhost:${PORT}`) });


// TODO: send cookie httpOnly after request with token { uuid: jdi0md303dk0d0d30dk0d03k } for identify
// TODO: need check scope of user in cookie
