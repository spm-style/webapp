"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var yargs_1 = require("yargs");
// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();
// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
// const environment = argv.environment;
var isProd = yargs_1.argv.environment === 'prod';
var targetPath = "./src/environments/environment." + (isProd ? "prod.ts" : "ts");
var envConfigFile = "\nexport const environment = {\n  production: false,\n  cdnUrl: 'http://cdn.spm-style.com',\n  apiUrl: 'http://api.spm-style.com',\n  wwwUrl: 'http://www.spm-style.com',\n  hostname: \"" + process.env.HOSTNAME + "\"\n};\n";
fs_1.writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Output generated at " + targetPath);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Nydi93ZWItYXBwL3NjcmlwdC9zZXQtZW52LnRzIiwic291cmNlcyI6WyIvc3J2L3dlYi1hcHAvc2NyaXB0L3NldC1lbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBK0I7QUFDL0IsK0JBQTZCO0FBRTdCLCtEQUErRDtBQUMvRCxnRUFBZ0U7QUFDaEUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTNCLHVDQUF1QztBQUN2Qyx5Q0FBeUM7QUFDekMscUNBQXFDO0FBQ3JDLHdDQUF3QztBQUN4QyxJQUFNLE1BQU0sR0FBRyxZQUFJLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQztBQUUzQyxJQUFNLFVBQVUsR0FBRyxxQ0FBa0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBRSxDQUFDO0FBQ2pGLElBQU0sYUFBYSxHQUFHLDhMQU1QLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxhQUVsQyxDQUFBO0FBQ0QsY0FBUyxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsVUFBVSxHQUFHO0lBQ2hELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF1QixVQUFZLENBQUMsQ0FBQztBQUNuRCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdyaXRlRmlsZSB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IGFyZ3YgfSBmcm9tICd5YXJncyc7XG5cbi8vIFRoaXMgaXMgZ29vZCBmb3IgbG9jYWwgZGV2IGVudmlyb25tZW50cywgd2hlbiBpdCdzIGJldHRlciB0b1xuLy8gc3RvcmUgYSBwcm9qZWN0cyBlbnZpcm9ubWVudCB2YXJpYWJsZXMgaW4gYSAuZ2l0aWdub3JlJ2QgZmlsZVxucmVxdWlyZSgnZG90ZW52JykuY29uZmlnKCk7XG5cbi8vIFdvdWxkIGJlIHBhc3NlZCB0byBzY3JpcHQgbGlrZSB0aGlzOlxuLy8gYHRzLW5vZGUgc2V0LWVudi50cyAtLWVudmlyb25tZW50PWRldmBcbi8vIHdlIGdldCBpdCBmcm9tIHlhcmdzJ3MgYXJndiBvYmplY3Rcbi8vIGNvbnN0IGVudmlyb25tZW50ID0gYXJndi5lbnZpcm9ubWVudDtcbmNvbnN0IGlzUHJvZCA9IGFyZ3YuZW52aXJvbm1lbnQgPT09ICdwcm9kJztcblxuY29uc3QgdGFyZ2V0UGF0aCA9IGAuL3NyYy9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQuJHtpc1Byb2QgPyBcInByb2QudHNcIiA6IFwidHNcIn1gO1xuY29uc3QgZW52Q29uZmlnRmlsZSA9IGBcbmV4cG9ydCBjb25zdCBlbnZpcm9ubWVudCA9IHtcbiAgcHJvZHVjdGlvbjogZmFsc2UsXG4gIGNkblVybDogJ2h0dHA6Ly9jZG4uc3BtLXN0eWxlLmNvbScsXG4gIGFwaVVybDogJ2h0dHA6Ly9hcGkuc3BtLXN0eWxlLmNvbScsXG4gIHd3d1VybDogJ2h0dHA6Ly93d3cuc3BtLXN0eWxlLmNvbScsXG4gIGhvc3RuYW1lOiBcIiR7cHJvY2Vzcy5lbnYuSE9TVE5BTUV9XCJcbn07XG5gXG53cml0ZUZpbGUodGFyZ2V0UGF0aCwgZW52Q29uZmlnRmlsZSwgZnVuY3Rpb24gKGVycikge1xuICBpZiAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGBPdXRwdXQgZ2VuZXJhdGVkIGF0ICR7dGFyZ2V0UGF0aH1gKTtcbn0pO1xuIl19