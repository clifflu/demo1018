const app = require('express')()
const handler_get_ip = require('./src/ip').handler_get
const PORT = process.env.PORT || 3000

app.get('/ip', handler_get_ip)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
