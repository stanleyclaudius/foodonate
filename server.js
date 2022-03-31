const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')

dotenv.config({
  path: './config/.env'
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/v1/auth', require('./routes/auth.route'))
app.use('/api/v1/donator', require('./routes/donator.route'))
app.use('/api/v1/event', require('./routes/event.route'))
app.use('/api/v1/news', require('./routes/news.route'))
app.use('/api/v1/user', require('./routes/user.route'))
app.use('/api/v1/dashboard', require('./routes/dashboard.route'))

connectDB()
app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`))