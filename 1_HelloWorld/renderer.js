const information = document.getElementById('info')

information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const func = async () => {
    const response = await window.versions.ping()
    // 2023 0303 这一段有待调试验证，下面的控制台应该指的是浏览器控制台
    // main.js中的控制台应该指的是VSCode的调试控制台
    console.log(response)
}