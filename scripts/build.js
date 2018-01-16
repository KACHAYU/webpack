#!/usr/bin/env node

let { spawn, exec } = require('child_process');

process.env.WEBROOT = process.argv.pop();

let free = exec('npm run ant');

let root = './' + process.env.WEBROOT + '/dist';

exec('rm -rf ' + root);//清除原打包文件夹

free.stdout.on('data', function(data) {
    console.log(data.toString());
});
free.stderr.on('data', function(data) {
    console.error(data.toString());
});
free.on('exit', function(code, signal) {
    replaceHtml()
});

//替换html引用图片目录地址
function replaceHtml() {
    var fs = require("fs");
    var path = require('path');
    fs.readdir(root, function(code, ls) {
        ls.forEach(function(item) {
            if (/\.html$/.test(item)) {
                var data = fs.readFileSync(path.join(root, item), "utf-8");
                fs.writeFile(path.join(root, item), data.replace(/\.\.\/images\//g, 'images/'), (err) => {
                    if (err) throw err;
                });
            }
        })
    });
}