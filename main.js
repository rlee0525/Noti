const { app, Tray, Menu, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

const iconTemplatePath = path.join(__dirname, 'app', 'assets', 'iconTemplate.png');
const iconHightlightPath = path.join(__dirname, 'app', 'assets', 'iconHighlight.png');

app.on('ready', () => {
  
  let appIcon = null;
  let win = null;

  const initializeMenu = () => {
    let template = [
      {
        label: 'Mute'
      },
      {
        label: 'Settings',
        accelerator: "Command+,",
        click: function() {
          appIcon.window.show();
        }
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+Command+I',
        click: function() {
          appIcon.window.show();
          appIcon.window.toggleDevTools();
        }
      },
      { 
        label: 'Quit',
        accelerator: 'Command+Q',
        selector: 'terminate:',
      }
    ];

    appIcon = new Tray(iconTemplatePath);

    var contextMenu = Menu.buildFromTemplate(template);

    appIcon.setToolTip('All your notifications on your menu bar.');
    appIcon.setContextMenu(contextMenu);

  };

  const hideWindow = () => {
    if(!appIcon.window) { return; }
    appIcon.window.hide();
  };

  const showWindow = () => {
    if(appIcon.window) { return; }
    appIcon.window.show();
  };

  const createWindow = () => {
    initializeMenu();

    let windowParams = {
      width: 400,
      height: 600,
      resizeable: false,
      show: false,
      webPreferences: {
        overlayScrollbars: true
      }
    };

    appIcon.window = new BrowserWindow(windowParams);

    appIcon.window.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));

    // appIcon.window.on('blur', hideWindow);

    appIcon.window.webContents.openDevTools();

    appIcon.window.on('closed', () => {
      appIcon.window = null;
    });

    appIcon.window.webContents.on('devtools-opened', (event, deviceList, callback) => {
      appIcon.window.setSize(800, 600);
      appIcon.window.setResizable(true);
    });

    appIcon.window.webContents.on('devtools-closed', (event, deviceList, callback) => {
      appIcon.window.setSize(400, 600);
      appIcon.window.setResizable(false);
    });

    ipcMain.on('update-icon', (event, arg) => {
      if (arg === 'HaveNotifications') {
        appIcon.setImage(iconHightlightPath);
      } else {
        appIcon.setImage(iconTemplatePath);
      }
    });
  };

  createWindow();
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});
