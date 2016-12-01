const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const utils = require('./main-utils.js');
const path = require('path');

let win;
let dt;

function init() {
    win = new BrowserWindow({
        icon: path.join(__dirname, '../images/test tube.png'),
        width: 800,
        height: 600,
        show: false
    });
    utils.loadFile(win, '../login.html');
    win.once('ready-to-show', () => {
        win.show();
    });
    win.on('closed', () => {
        win = null;
    });
}

function createDialogTheme(){
    if(win){
        dt = new BrowserWindow({
            parent: win
        });
        utils.loadFile(dt, '../src/app/dialog-theme.html');
    }
}

app.on('ready', init);


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        init();
    }
});

ipcMain.on('devtools', (e) => {
    win.webContents.openDevTools();
});

ipcMain.on('go-to', (e, args) => {
    utils.loadFile(win, '../'+args.file);
});

ipcMain.on('win-reload', () =>{
    utils.loadFile(win, '../index.html');
});
