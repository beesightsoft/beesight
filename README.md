# beesight

![npm](https://img.shields.io/npm/v/beesight.svg) ![license](https://img.shields.io/npm/l/beesight.svg) ![github-issues](https://img.shields.io/github/issues/beesightsoft/beesight.svg)

Awesome cli generate anything

[![nodei.co](https://nodei.co/npm/beesight.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/beesight)

```
Usage: beesight h
```

### Features

```
h   Help.
v   Version.
avd Start Android emulator.
font Read font info.
rct Generate react-native project.
rct_reset   Reset cache react-native project.
rct_appname Change app name react-native project.
rct_appid   Change app id react-native project.
rct_release_fix	Fix 'Duplicate file' error when build android release.
```

### Installation
`npm install -g beesight`

### Requirements
```
node: v7.10.1
npm: 4.2.0
react-native-cli: 2.0.1
git: 2.14.3 (Apple Git-98)
```

### How it's work?

Feature name is the name of js file place in f folder. The index.js will call js file match with feature name and execute main function from it. So you can feel free to add more and more feaure same with with feature file name and place it in f folder.

### Contribution

Please feel free to contribute more and more feature generate or configuration project template.