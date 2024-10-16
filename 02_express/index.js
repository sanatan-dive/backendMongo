import express from "express";
import 'dotenv/config' 
import logger from './logger.js'
import morgan from "morgan";

 const morganFormat = ':method :url :status  :response-time ms'
const app = express();

const port = process.env.PORT || 3000;

app.use(morgan(morganFormat,{
    stream:{
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3]
            };
            logger.info(JSON.stringify(logObject));
    }
}}));

app.use(express.json())

let teaData = []
let nextId = 1
//add a tea
app.post('/teas', (req, res) => {
    logger.info("a post req was made")
    const {name,price} = req.body
    const newTea = { id: nextId++, name, price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})
//get a tea
app.get('/teas', (req, res) => {
    
    res.send(teaData)
})

//get a tea with id

app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(tea => tea.id === parseInt(req.params.id))
    res.send(tea)
    if(!tea){
        res.status(404).send('tea not found')
    }
})

//update a tea
app.put('/teas/:id', (req, res) => {
    const teaId = req.params.id
    const tea = teaData.find(tea => tea.id === parseInt(teaId))
    if (!tea) {
        res.status(404).send('tea not found')
    }
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.send(tea)
})

//delete a tea
app.delete('/teas/:id', (req, res) => {
    const teaId = req.params.id
    const index = teaData.findIndex(tea => tea.id === parseInt(teaId))
    if (index === -1) {
        res.status(404).send('tea not found')
    }
    teaData.splice(index, 1)
    res.send(tea)
})

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})