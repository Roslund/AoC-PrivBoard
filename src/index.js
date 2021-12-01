import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import routes from './routes.js'


const __dirname = path.resolve(path.dirname(decodeURI(new URL(import.meta.url).pathname)));
const PORT = process.env.PORT || 5000
const app = express();


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


// Load routes from the file routes.js
app.use('/', routes())


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
