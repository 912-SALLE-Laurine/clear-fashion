// JavaScript source code
const fs = require("fs")
const dedicated_products = require('./dedicated.json');
const montlimart_products = require('./montlimart.json');
const adresse_paris_p1 = require('./adresseparisp1.json');
const adresse_paris_p2 = require('./adresseparisp2.json');

for (el of dedicated_products){
    el["brand"] = "dedicatedbrand"
}
for (el of montlimart_products) {
    el["brand"] = "montlimart"
}
for (el of adresse_paris_p1) {
    el["brand"] = "adresseparis"
}
for (el of adresse_paris_p2) {
    el["brand"] = "adresseparis"
}
var all_products = dedicated_products.concat(montlimart_products, adresse_paris_p1, adresse_paris_p2)

function WriteJsonFile(products, path) {
    products = JSON.stringify(products);
    fs.writeFile(path, products, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('File written successfully');
        }
    });
}
WriteJsonFile(all_products, "./all_products.json")

console.log(adresse_paris_p2)
var total = dedicated_products.length + montlimart_products.length + adresse_paris_p1.length + adresse_paris_p2.length
console.log(total)
console.log(all_products.length)