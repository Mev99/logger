import e from "express"
import { addLogger } from "./utils/logger.js"
const app = e()

app.listen(8080, ()=> {console.log("port 8080")})

app.use(addLogger)

app.get('/loggerTest', (req, res) => {
    req.logger.debug('debug')
    req.logger.http('http')
    req.logger.warning('warning')
    req.logger.error('error')
    res.send('Logger test')
  })

