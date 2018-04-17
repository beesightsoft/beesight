const print = require('chalk-printer');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const minimist = require('minimist');
const Spinner = require('clui').Spinner;
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const replace = require('replace');
const files = require('./files');
const gjs = require('./gradle_parser');

const log = console.log;

const getAppId = (projectPath) => {
    return Promise.resolve()
        .then(() => gjs.parseFile(projectPath + '/android/app/build.gradle'))
        .then((representation) => representation.android.defaultConfig.applicationId);
}

const npmResetSync = (projectPath) => {
    try {
        var curDir = files.getCurrentDirectory();

        shell.cd(projectPath);
        shell.exec("npm cache verify", { silent: false });

        shell.rm('-rf', './ios/*.xcworkspace');
        shell.rm('-rf', './ios/*-tvOS');
        shell.rm('-rf', './ios/*Tests-tvOSTests');
        shell.rm('-rf', './ios/Pods');
        shell.rm('-rf', './ios/Podfile.lock');
        shell.rm('-rf', './ios/build');
        shell.rm('-rf', './node_modules');
        shell.rm('-rf', '$TMPDIR/react-*');
        shell.cd(curDir);

        return true;
    } catch (e) {
        return e;
    }
}

/**
 * @param projectPath /Volumes/Data/ReactNative/test-project
 * @param newAppName
 */
const changeAppNameSync = (projectPath, appId, newAppName, currentAppName) => {
    if (newAppName != currentAppName) {
        print.log("Change app name.");

        /*
        Modified
            app.json
            index.js
            package.json
            android/settings.gradle
            android/app/src/main/res/values/strings.xml
            ios/Podfile
            ios/NhanCaoTesresr/AppDelegate.m
            ios/NhanCaoTesresr/Info.plist
            ios/NhanCaoTesresr.xcodeproj/project.pbxproj
            ios/NhanCaoTesresr.xcodeproj/xcshareddata/xcschemes/NhanCaoTesresr.xcscheme
            ios/NhanCaoTesresr.xcodeproj/xcshareddata/xcschemes/NhanCaoTesresr-tvOS.xcscheme
            ios/NhanCaoTesresrTests/NhanCaoTesresrTests.m
            ios/NhanCaoTesresr/NhanCaoTesresr.entitlements
            storybook/storybook.js
            android/app/src/main/java/com/beesightsoft/rct/MainActivity.java

        Rename
            ios/NhanCaoTesresr/*
            ios/NhanCaoTesresr-tvOS/*
            ios/NhanCaoTesresrTests/*
            ios/NhanCaoTesresrTests-tvOSTests/*

        Remove pod files
            ios/NhanCaoTesresr.xcworkspace
            ios/Podfile.lock
            ios/Pods

         */
        //Remove pod files & node modules
        try {
            shell.rm('-rf', projectPath + '/ios/' + currentAppName + '.xcworkspace');
            shell.rm('-rf', projectPath + '/ios/' + currentAppName + "-tvOS");
            shell.rm('-rf', projectPath + '/ios/' + currentAppName + "Tests-tvOSTests");
            shell.rm('-rf', projectPath + '/ios/' + currentAppName + '.xcodeproj/xcshareddata/xcschemes/' + currentAppName + '-tvOS.xcscheme');
            shell.rm('-rf', projectPath + '/ios/Pods');
            shell.rm('-rf', projectPath + '/ios/Podfile.lock');
            shell.rm('-rf', projectPath + '/node_modules')
        } catch (e) {
            print.warn(e);
        }

        //Rename folder name
        files.renamePath(projectPath + '/ios/' + currentAppName, projectPath + '/ios/' + newAppName);
        files.renamePath(projectPath + '/ios/' + currentAppName + "Tests", projectPath + '/ios/' + newAppName + "Tests");

        //Rename file name
        files.renamePath(projectPath + '/ios/' + currentAppName + '.xcodeproj', projectPath + '/ios/' + newAppName + '.xcodeproj');
        files.renamePath(projectPath + '/ios/' + newAppName + '.xcodeproj/xcshareddata/xcschemes/' + currentAppName + '.xcscheme',
            projectPath + '/ios/' + newAppName + '.xcodeproj/xcshareddata/xcschemes/' + newAppName + '.xcscheme');

        files.renamePath(projectPath + '/ios/' + newAppName + '/' + currentAppName + '.entitlements',
            projectPath + '/ios/' + newAppName + '/' + newAppName + '.entitlements');
        files.renamePath(projectPath + '/ios/' + newAppName + 'Tests/' + currentAppName + 'Tests.m',
            projectPath + '/ios/' + newAppName + 'Tests/' + newAppName + 'Tests.m');

        //Replace content file
        try {

            var paths = [
                projectPath + '/app.json',
                projectPath + '/index.js',
                projectPath + '/package.json',
                projectPath + '/storybook/storybook.js',
                projectPath + '/android/settings.gradle',
                projectPath + '/android/app/src/main/java/' + appId.split('.').join('/') + '/MainActivity.java',
                projectPath + '/android/app/src/main/res/values/strings.xml',
                projectPath + '/ios/Podfile',
                projectPath + '/ios/' + newAppName + '/AppDelegate.m',
                projectPath + '/ios/' + newAppName + '/Info.plist',
                projectPath + '/ios/' + newAppName + '.xcodeproj/project.pbxproj',
                projectPath + '/ios/' + newAppName + '.xcodeproj/xcshareddata/xcschemes/' + newAppName + '.xcscheme',
                projectPath + '/ios/' + newAppName + 'Tests/' + newAppName + 'Tests.m',
                projectPath + '/ios/' + newAppName + '/' + newAppName + '.entitlements',
            ];

            for (let i = 0; i < paths.length; i++) {
                if (!files.fileExists(paths[i])) {
                    paths.splice(i, 1); i--;
                    print.error(`${paths[i]} is not exist`)
                }
            }

            replace({
                regex: currentAppName,
                replacement: newAppName,
                paths: paths,
                recursive: true,
                silent: false,
            });
        } catch (e) {
            print.warn(e);
        }

        print.ok("Update app name successfully.");
        return true;
    } else {
        print.log("App name does not change.");
        return false;
    }
}

const changeAppIdSync = (projectPath, appName, newAppId, currentAppId) => {
    if (newAppId != currentAppId) {
        print.log("Update app id: " + newAppId);

        var paths = [
            projectPath + '/ios/' + appName + '.xcodeproj/project.pbxproj',
            projectPath + '/android/app/build.gradle',
            projectPath + '/android/app/BUCK',
            projectPath + '/android/app/src/main/AndroidManifest.xml',
            projectPath + '/android/app/src/main/java/' + currentAppId.split('.').join('/') + '/MainActivity.java',
            projectPath + '/android/app/src/main/java/' + currentAppId.split('.').join('/') + '/MainApplication.java',
        ];

        for (let i = 0; i < paths.length; i++) {
            if (!files.fileExists(paths[i])) {
                paths.splice(i, 1); i--;
            }
        }


        replace({
            regex: currentAppId,
            replacement: newAppId,
            paths: paths,
            recursive: true,
            silent: false,
        });

        const srcPath = projectPath + '/android/app/src/main/java';
        const currPath = srcPath + '/com/beesightsoft/rct/';
        const newPath = srcPath + '/' + newAppId.split('.').join('/') + '/';
        const tmpPath = projectPath + '/android/_tmp/';

        print.log("Change android package folder.");

        shell.mv(currPath, tmpPath);
        shell.rm('-rf', srcPath + '/com/');

        shell.mkdir('-p', newPath);
        shell.mv(tmpPath + "*", newPath);
        shell.rm('-rf', tmpPath);

        print.ok("Update app id successfully.");
        return true;
    } else {
        print.log("App id does not change.");
        return false;
    }
}

/**
 * codeFixPath = path to react.gradle.fix file
 * @param {*} projectPath 
 * @param {*} codeFixPath 
 */
const fixReleaseAndroid = (projectPath, codeFixPath) => {
    try {
        var file = projectPath + '/node_modules/react-native/react.gradle'
        var dataFix = fs.readFileSync(codeFixPath, 'utf8')
        var data = fs.readFileSync(file, 'utf8')

        var doLast = "doLast \{"
        if (data.indexOf(doLast) !== -1) {
            throw "Already fixed."
        }

        var result = data.replace(/                \/\/ Set up inputs and outputs so gradle can cache the result/g, dataFix);
        fs.writeFileSync(file, result, 'utf8')
        return true
    } catch (error) {
        return error
    }
}

module.exports = {
    getAppId: getAppId,
    changeAppNameSync: changeAppNameSync,
    changeAppIdSync: changeAppIdSync,
    npmResetSync: npmResetSync,
    fixReleaseAndroid: fixReleaseAndroid
};