// tuto : https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i
const { MongoClient } = require('mongodb');

const MONGODB_URI = "mongodb+srv://clearfashion_user:clearfashion_user@cluster0.g1yua.mongodb.net/clearfashion?retryWrites=true&w=majority";
const MONGODB_DB_NAME = 'clearfashion';

async function connect() {
    try {
        const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        let connected_database = client.db(MONGODB_DB_NAME)
        console.log('Connected to database ')
        return connected_database
    }
    catch (err) {
        console.error(`Error connecting to the database. \n${err}`);
    }
}
//connect()
const { ObjectId } = require('mongodb');
// Find product by id
module.exports.find_by_id = async id => {
    // Connection to the data base
    const db = await connect();
    //const collection = db.collection('products');

    // Get requested products 
    const collection = db.collection('products');
    const products = await collection.find({ "_id": ObjectId(id) }).toArray();

    // console.log(products);
    return (products)
}

// Insert the products
//const dedicated_products = require('./dedicated.json');
//const montlimart_products = require('./montlimart.json');
//const adresse_paris_p1 = require('./adresseparisp1.json');
//const  adresse_paris_p2 = require('./adresseparisp2.json');
const all_products = require('./all_products.json');
async function insert_products(products) {
    const db = await connect();
    const collection = db.collection('products');
    for (brand_products of products) {
        const result = collection.insertMany(brand_products);
    }
}
//insert_products([all_products])

//Find all products related to a given brands
brand = "adresseparis"
async function find_by_brand(brand) {
    const db = await connect();
    const collection = db.collection('products');
    var query = {
        brand: brand };
    collection.find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
//find_by_brand(brand)

//Find all products less than a price
price = 10
async function find_by_price(price) {
    const db = await connect();
    const collection = db.collection('products');
    var query = { price: { $lt: price } }
    collection.find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
//find_by_price(price)

//Find all products sorted by price (desc)
async function sort_by_price() {
    const db = await connect();
    const collection = db.collection('products');
    var query = [{ $sort: { "price": -1 } }]
    collection.aggregate(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
//sort_by_price()

//Find all products sorted by date

