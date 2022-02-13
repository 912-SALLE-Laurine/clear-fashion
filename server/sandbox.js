/* eslint-disable no-console, no-process-exit */
// https://www.dedicatedbrand.com/en/women/news
// https://adresse.paris/630-toute-la-collection
// https://www.montlimart.com/toute-la-collection.html

const fs = require("fs")

// sandbox function
async function sandbox(eshop, brand) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
      
      const products = await brand.scrape(eshop);
      
      return products
    //process.exit(0);
  } catch (e) {
    console.error(e);
    //process.exit(1);
  }
}

//const [,, eshop] = process.argv;

//AdresseParis brand, scraping pages 1 and 2, store in 2 separate json files
function ScrapAdresseParisProducts() {
    var products_page1 = []
    let link = "https://adresse.paris/630-toute-la-collection"
    const adresseParis = require('./sources/adresseparisbrand.js');
    products = sandbox(link, adresseParis).then(products => {

        for (var product of products) {
            products_page1.push(product)
        }
       WriteJsonFile(products_page1, "./adresseparisp1.json")
        //console.log(products_page1)
    })
    var products_page2 = []
    let link2 = "https://adresse.paris/630-toute-la-collection?p=2"
    products2 = sandbox(link2, adresseParis).then(products2 => {

        for (var product of products2) {
            products_page2.push(product)
        }

        WriteJsonFile(products_page2, "./adresseparisp2.json")
        //console.log(products_page2)

    })
}


//MONTLIMART brand, scraping with a "for" loop to get into each pages
function ScrapMontlimartProducts() {
    var all_products = []

    for (let i = 1; i <= 8; i++) {

        let link = "https://www.montlimart.com/toute-la-collection.html" + "?p=" + i.toString()
        const montlimart = require('./sources/montlimartbrand');
        products = sandbox(link, montlimart).then(products => {

            for (var product of products) {
                all_products.push(product)
            }
            WriteJsonFile(all_products, "./montlimart.json")
            //console.log(all_products);
        })

    }
}

//DEDICATED brand, with the json API
function GetDedicatedProducts() {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var req = new XMLHttpRequest();
    req.open('GET', 'https://www.dedicatedbrand.com/en/loadfilter', false);
    req.send(null);
    var json_file = JSON.parse(req.responseText)
    var json_dedicated = []
    for (document of json_file.products) {
        if (document.uri != undefined) {
            var product = {};//create the product with the params we want
            product.name = document.name;
            product.price = parseInt(document.price.price);
            product.image = document.image[0];
            product.link = "https://www.dedicatedbrand.com/en/" + document.canonicalUri;
            json_dedicated.push(product)
        }
    }
    //console.log(json_dedicated)
    console.log("Dedicated brand products stored successfully")
    return json_dedicated
}


// Write in json file

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



function StartScraping() {
    var json_dedicated = GetDedicatedProducts();
    WriteJsonFile(json_dedicated, "./dedicated.json")

    ScrapMontlimartProducts()

    ScrapAdresseParisProducts()
}

StartScraping()

