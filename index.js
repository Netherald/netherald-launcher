const {app, BrowserWindow} = require('electron')
const path = require('path')
const ejse = require('ejs-electron')
const ipcMain = require('electron')

function createWindow () {

    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation : false,
            nodeIntegration : true
        }
    })

    mainWindow.loadFile('./app/index.ejs')
    mainWindow.maximize()
    mainWindow.setMenuBarVisibility(false)
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})