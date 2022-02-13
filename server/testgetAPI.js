// JavaScript source code

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var req = new XMLHttpRequest();
req.open('GET', 'https://www.dedicatedbrand.com/en/loadfilter', false);
req.send(null);
var json_file = JSON.parse(req.responseText)
var json_dedicated = []
for (document of json_file.products) {
    if (document.uri != undefined) {
        var product = {};
        product.name = document.name;//create the product with the items we want
        product.price = parseInt(document.price.price);
        product.image = document.image[0];
        product.link = "https://www.dedicatedbrand.com/en/" + document.canonicalUri;
        // console.log(product)
        json_dedicated.push(product)
    }
}
console.log(json_dedicated)

const fs = require("fs")
json_dedicated = JSON.stringify(json_dedicated);
const path = "./dedicated.json"
fs.writeFile(path, json_dedicated, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('File written successfully');
    }
});

