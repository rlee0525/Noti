const { app, Tray, Menu, BrowserWindow, nativeImage } = require('electron');
const path = require('path');
const url = require('url');

const iconTemplatePath = path.join(__dirname, 'app', 'assets', 'iconTemplate.png');
const iconHightlightPath = path.join(__dirname, 'app', 'assets', 'iconHighlight.png');
let appIcon = null;
let win = null;

const createWindow = () => {

  appIcon = new Tray(iconTemplatePath);
  appIcon.setPressedImage(iconHightlightPath);

  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mute'
    },
    {
      label: 'Settings',
      click: function() {
        win.show();
      }
    },
    {
      label: 'Toggle DevTools',
      accelerator: 'Alt+Command+I',
      click: function() {
        win.show();
        win.toggleDevTools();
      }
    },
    { 
      label: 'Quit',
      accelerator: 'Command+Q',
      selector: 'terminate:',
    }
  ]);

  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);

  win = new BrowserWindow({
    minWidth: 530,
    minHeight: 330,
    width: 800,
    height: 600,
    show: true
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });

};


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) createWindow();
});
