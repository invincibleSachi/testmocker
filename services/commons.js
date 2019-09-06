var crypto = require("crypto");
const uuidv4 = require("uuid/v4");
var mkdirp = require("mkdirp");
const fs = require("fs");
const os = require("os");
const  execSync = require("child_process").execSync;
var options = {
  encoding: 'utf8'
};
module.exports = {
  getRandomNumber: function(size) {
    let max = Math.pow(10, size) - 1;
    let min = Math.pow(10, size - 1);
    return Math.floor(Math.random() * (max - min) + min);
  },
  getRandomText: function(size) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < size; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },
  getTimeByOffset: function(seconds) {
    let d = new Date();
    return new Date(d.getTime() + seconds * 1000);
  },
  getPwdHash: function(password) {
    // creating a unique salt for a every user
    var salt = crypto.randomBytes(16).toString("hex");
    var hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return [hash, salt];
  },
  comparePwd: function(password, salt, stored_hash) {
    var new_pwd_hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return new_pwd_hash === stored_hash;
  },
  getRandomToken: function() {
    return uuidv4();
  },
  createDirectory: function(dir) {
    this.executeOsCommand('mkdir '+dir);
  },
  copyFile: function(srcFile, destFile) {
    fs.copyFileSync(srcFile, destFile, err => {
      if (err) throw err;
      console.log(err);
    });
  },
  deleteFolder: function(folderPath) {
    let cmd = "rm -rf " + folderPath;
    if(fs.existsSync(folderPath)){
      this.executeOsCommand(cmd);
      if(fs.existsSync(folderPath)){
        cmd = "rmdir " + folderPath;
        this.executeOsCommand(cmd);
      }
      
    }
    
  },
  copyFolder: function(srcFolder, destFolder) {
    let cmd = "rsync -r " + srcFolder + "/ " + destFolder;
    this.executeOsCommand(cmd);
  },
  executeOsCommand: function(cmd) {
    console.log(cmd);
    console.log(execSync(cmd).toString());
  },
  readFileGetContent: function(fileName) {
    return fs.readFileSync(fileName);
  },
  append2File: function(filename, appendStr) {
    console.log(filename);

    return fs.appendFileSync(filename,appendStr);
  },
  replaceAll: function(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
};
