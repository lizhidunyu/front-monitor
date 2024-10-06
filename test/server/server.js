const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'src')))

// 返回 index.html 作为 fallback 路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src'))
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
