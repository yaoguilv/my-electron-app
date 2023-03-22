const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')
require('update-electron-app')({
    repo: 'yaoruilv/my-electron-app',
    updateInterval: '1 hour'
})

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    // 在加载html之前，写好事件监听（句柄）。这样，前端触发时，后端可以处理
    // ipcMain.handle('ping', () => 'pong')
    ipcMain.handle('dark-mode:toggle', () => {
        // shouldUseDarkColors的布尔型变量：当前页面应该是黑色调
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'
        } else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    })

    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    })

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