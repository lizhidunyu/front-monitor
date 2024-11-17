const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.all('/report', (req, res) => {
  // 从请求中获取回调函数的名称
  // const callback = req.query.callback
  // 模拟返回的数据
  // const responseData = {
  //   status: 'success',
  //   user: req.query.user || 'guest'
  // }
  // 返回 JSONP 格式的数据
  // res.setHeader('Content-Type', 'application/javascript')
  // console.log(`${callback}(${JSON.stringify(responseData)});`)
  // res.send(`${callback}(${JSON.stringify(responseData)});`)
  // res.send(JSON.stringify(req))
  res.send('OK---')
})

// 启动服务器
app.listen(8000, () => {
  console.log('Server is running on port 8000')
})
