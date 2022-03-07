const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./connexion')
//console.log(db.find_by_id("6220dc033be5362187541bf9"))
//console.log(db.findProductsByID("6220dc033be5362187541bf9"))
const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

//app.get('/products/search', async (request, response) => {}


app.get('/products/:id', async (request, response) => {
    //console.log(request.params.id)
    let product = await db.find_by_id(request.params.id)
    
    response.send({ "product": product})
})

//app.get('/products/:id', (request, response) => {
    //request.params.id
    //response.json(request.params)
    //console.log(response.json(request.params))
    //response.send({ 'ack': false });
    //let product = await db.find_by_id("6220dc033be5362187541bf9")
    //response.status(200).json({ product[0] })
//});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
