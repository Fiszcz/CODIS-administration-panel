# CODIS - CODIS-ADMINISTRATION-PANEL

**CODIS** - A system for distributed computing using JS engines in web browsers.

**CODIS-ADMINISTRATION-PANEL** - system administration panel.

- preview of tasks (that are being performed, that are waiting for a free working thread, that have been solved)
- the ability to solve or reject tasks
- previewing the list of execution nodes
- preview of system notification consoles
- displaying task content and task solutions

The server part of the system:
[CODIS-MASTER](https://www.npmjs.com/package/codis-master)

## Installation

```bash
$ yarn add codis-administration-panel
```
or
```$bash
$ npm install codis-administration-panel
```

## Getting Started
After installation, to start the administration panel:

```bash
$ codis-administration-panel
```

The panel will be available at ``localhost: 9928``

After entering the address of the administration panel, enter the access key to log in. Access key was displayed at the **CODIS-MASTER** startup in the console.

And check address of the our system API. 

Make sure that **CODIS-MASTER** enable API sharing in the configuration.

## Screenshots

<img src="https://raw.githubusercontent.com/Fiszcz/CODIS-administration-panel/master/screenshots/login.png">

<img src="https://raw.githubusercontent.com/Fiszcz/CODIS-administration-panel/master/screenshots/system.png">

<img src="https://raw.githubusercontent.com/Fiszcz/CODIS-administration-panel/master/screenshots/tasks.png">
Tasks marked in green indicate that the task has been solved.

Task in yellow color that the task is still performed.

<img src="https://raw.githubusercontent.com/Fiszcz/CODIS-administration-panel/master/screenshots/resolve.png">

<img src="https://raw.githubusercontent.com/Fiszcz/CODIS-administration-panel/master/screenshots/nodes.png">

## Notices

The system / library was created by [Filip Szcześniak](https://github.com/Fiszcz).

For contact purposes, please write to email: [fiszczu@gmail.com](fiszczu@gmail.com)

The system is fully functional with the functions given above. The system is constantly evolving.

*If you want to help in the development of the application, write to me!*

*If you notice any mistake, write to me!*

*If you want to offer some important functionality, write to me!*
