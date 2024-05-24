import 'dotenv/config';
import express from 'express';
import alumnosRoute from './routes/alumnos.route.js'

const app = express();

//habiliar req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/alumnos', alumnosRoute)



const PORT = process.env.PORT || 5050
app.listen(PORT, console.log(`Servidor funcionando en http://localhost:${PORT}`))
