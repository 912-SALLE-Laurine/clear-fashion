const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./connexion')

const PORT = 8092;


// https://server-six-teal.vercel.app/ server
// https://v2-sepia.vercel.app client 


const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/products/search', async (request, response) => {
    // set default values for query parameters
    const { brand = 'all', price = 'all', limit = 12, skip = 0 , sort = 1} = request.query;
    if (brand === 'all' && price === 'all') {
        const products = await db.find_limit([{ '$sort': { "price": parseInt(sort)} }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
        response.send(products);
    } else if (brand === 'all') {
        const products = await db.find_limit([{ '$match': { 'price': { '$lte': parseInt(price) } } }, { '$sort': { "price": parseInt(sort) } }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
        response.send(products);
    } else if (price === 'all') {
        const products = await db.find_limit([{
            '$match': { 'brand': brand }
        }, { '$sort': { "price": parseInt(sort) } }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
        response.send(products);
    } else {
        const products = await db.find_limit([{'$match': { 'brand': brand }},
            { '$match': { 'price': { '$lte': parseInt(price) } } },
            { '$sort': { "price": parseInt(sort)} }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
        response.send(products);
    }
});

app.get('/products/:id', async (request, response) => {
    //console.log(request.params.id)
    let product = await db.find_by_id(request.params.id)
    
    response.send({ "product": product})
})


app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
