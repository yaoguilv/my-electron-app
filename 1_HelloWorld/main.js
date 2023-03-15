// console.log(`Hello from Electron 👋`)

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    // 在加载html之前，写好事件监听（句柄）。这样，前端触发时，后端可以处理
    ipcMain.handle('ping', () => 'pong')
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
    console.log(process.platform)

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
