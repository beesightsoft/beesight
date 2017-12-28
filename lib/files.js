const print = require('chalk-printer');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const getDirectoryBase = () => {
    return path.dirname(path.dirname(fs.realpathSync(__filename)));
}

const getCurrentDirectory = () => {
    return process.cwd();

}
const directoryExists = (filePath) => {
    try {
        return fs.statSync(filePath).isDirectory();
    } catch (err) {
        return false;
    }
}

const fileExists = (filePath) => {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

const renamePath = (currentPath, newPath) => {
    try {
        if (directoryExists(currentPath) || fileExists(currentPath)) {
            fs.renameSync(currentPath, newPath);
            print.log("Rename %s -> %s", currentPath, newPath);
            return true;
        } else {
            return false;
        }
    } catch (e) {
        print.warn(e);
    }
}


module.exports = {
    getDirectoryBase: getDirectoryBase,
    getCurrentDirectory: getCurrentDirectory,
    directoryExists: directoryExists,
    fileExists: fileExists,
    renamePath: renamePath,
};