import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

//routes
import announcementRoutes from './routes/announcement.route.js'
import userRoutes from './routes/user.route.js'
import scheduleRoutes from './routes/schedule.route.js'
import barangayRoutes from './routes/barangay.route.js'
import collectionRoutes from './routes/collection.route.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))

app.use(cors())
app.get('/', (req, res)=>{
    res.send('welcome to Etapon mo! API')
})
app.use('/users', userRoutes)
app.use('/announcements', announcementRoutes)
app.use('/schedules', scheduleRoutes)
app.use('/barangays/', barangayRoutes)
app.use('/collections/', collectionRoutes)

const PORT = process.env.PORT;
// const PORT = 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(()=> app.listen(PORT, ()=> console.log(`Server running port: ${PORT}`)))
    .catch((error)=> console.log(error));

