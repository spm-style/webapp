"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var yargs_1 = require("yargs");
// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
// require('dotenv').config();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Nydi93ZWItYXBwL3NjcmlwdC9zZXQtZW52LnRzIiwic291cmNlcyI6WyIvc3J2L3dlYi1hcHAvc2NyaXB0L3NldC1lbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBK0I7QUFDL0IsK0JBQTZCO0FBRTdCLCtEQUErRDtBQUMvRCxnRUFBZ0U7QUFFaEUsOEJBQThCO0FBRTlCLHVDQUF1QztBQUN2Qyx5Q0FBeUM7QUFDekMscUNBQXFDO0FBQ3JDLHdDQUF3QztBQUN4QyxJQUFNLE1BQU0sR0FBRyxZQUFJLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQztBQUUzQyxJQUFNLFVBQVUsR0FBRyxxQ0FBa0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBRSxDQUFDO0FBQ2pGLElBQU0sYUFBYSxHQUFHLDhMQU1QLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxhQUVsQyxDQUFBO0FBQ0QsY0FBUyxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsVUFBVSxHQUFHO0lBQ2hELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF1QixVQUFZLENBQUMsQ0FBQztBQUNuRCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdyaXRlRmlsZSB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IGFyZ3YgfSBmcm9tICd5YXJncyc7XG5cbi8vIFRoaXMgaXMgZ29vZCBmb3IgbG9jYWwgZGV2IGVudmlyb25tZW50cywgd2hlbiBpdCdzIGJldHRlciB0b1xuLy8gc3RvcmUgYSBwcm9qZWN0cyBlbnZpcm9ubWVudCB2YXJpYWJsZXMgaW4gYSAuZ2l0aWdub3JlJ2QgZmlsZVxuXG4vLyByZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTtcblxuLy8gV291bGQgYmUgcGFzc2VkIHRvIHNjcmlwdCBsaWtlIHRoaXM6XG4vLyBgdHMtbm9kZSBzZXQtZW52LnRzIC0tZW52aXJvbm1lbnQ9ZGV2YFxuLy8gd2UgZ2V0IGl0IGZyb20geWFyZ3MncyBhcmd2IG9iamVjdFxuLy8gY29uc3QgZW52aXJvbm1lbnQgPSBhcmd2LmVudmlyb25tZW50O1xuY29uc3QgaXNQcm9kID0gYXJndi5lbnZpcm9ubWVudCA9PT0gJ3Byb2QnO1xuXG5jb25zdCB0YXJnZXRQYXRoID0gYC4vc3JjL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudC4ke2lzUHJvZCA/IFwicHJvZC50c1wiIDogXCJ0c1wifWA7XG5jb25zdCBlbnZDb25maWdGaWxlID0gYFxuZXhwb3J0IGNvbnN0IGVudmlyb25tZW50ID0ge1xuICBwcm9kdWN0aW9uOiBmYWxzZSxcbiAgY2RuVXJsOiAnaHR0cDovL2Nkbi5zcG0tc3R5bGUuY29tJyxcbiAgYXBpVXJsOiAnaHR0cDovL2FwaS5zcG0tc3R5bGUuY29tJyxcbiAgd3d3VXJsOiAnaHR0cDovL3d3dy5zcG0tc3R5bGUuY29tJyxcbiAgaG9zdG5hbWU6IFwiJHtwcm9jZXNzLmVudi5IT1NUTkFNRX1cIlxufTtcbmBcbndyaXRlRmlsZSh0YXJnZXRQYXRoLCBlbnZDb25maWdGaWxlLCBmdW5jdGlvbiAoZXJyKSB7XG4gIGlmIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9XG5cbiAgY29uc29sZS5sb2coYE91dHB1dCBnZW5lcmF0ZWQgYXQgJHt0YXJnZXRQYXRofWApO1xufSk7XG4iXX0=