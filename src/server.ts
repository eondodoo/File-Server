import express from 'express'
import fileUpload from 'express-fileupload'
import expressLayouts from "express-ejs-layouts";
import * as dotenv from 'dotenv'
import adminRoutes from './router/admin/admin'
import mainRoutes from './router/main/main'
import authRoutes from './router/authRoute'

dotenv.config()

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.set('layout', './layouts/main')

app.use(fileUpload()) 

// ROutes
app.use('/items', mainRoutes)
app.use('/admin', adminRoutes)
app.use('/users', authRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{ 
    console.log('Server up and running')    
})