#!/usr/bin/env node

let {spawn,exec} = require('child_process');

process.env.WEBROOT = process.argv.pop();

var free = exec('npm run dev');

free.stdout.on('data', function(data) {
    console.log(data.toString());
});
free.stderr.on('data', function(data) {
    console.error(data.toString());
});
free.on('exit', function(code, signal) {
    console.log(code.toString());
});