# beesight
```
Usage: beesight <feature>
where <feature> is on of:
	rct, rct_reset, rct_appname, v, h

```

### Features

```
h   Help.
v   Version.
rct Generate react-native project.
rct_reset   Reset cache react-native project.
rct_appname Change app name react-native project.
rct_appid   Change app id react-native project
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