// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);


/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

const cheapestTShirtURL = "https://adresse.paris/t-shirts-et-polos/3983-t-shirt-ranelagh-1300000259194.html";
console.log(cheapestTShirtURL);


/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

let numberOfProducts = marketplace.length;
console.log("Number of products:")
console.log(numberOfProducts);

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

let listBrandName = [... new Set(marketplace.flatMap(x => x.brand))];
console.log("List of brands names:")
console.log(listBrandName);
console.log("Number of brands:")
console.log(listBrandName.length);

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable

function SortByPrice(marketplace) {
    let clone = [...marketplace]
    let sortedPriceMarketplace = clone.sort((x, y) => x.price - y.price)
    return sortedPriceMarketplace;
}
let sortedPriceMarketplace = SortByPrice(marketplace);
console.log("List of products sorted by price:")
console.log(sortedPriceMarketplace);

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

function SortByDate(marketplace) {
    let clone = [...marketplace]
    let sortedDateMarketplace = clone.sort((x, y) =>{
        let da = new Date(x.date),
            db = new Date(y.date);
        return db - da;
    })
    return sortedDateMarketplace;
}
let sortedDateMarketplace = SortByDate(marketplace);
console.log("List of products sorted by date:")
console.log(sortedDateMarketplace);

// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

let filteredPriceMarketplace = marketplace.filter(function isRange(article) {
    return (article.price >= 50 && article.price <= 100)
});
console.log("Lists of products between 50 and 100€:")
console.log(filteredPriceMarketplace);

// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
// 2. Log the average





/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands

const brands = {}

for (const name of listBrandName) {
    brands[name] = [];
    for (const product of marketplace) {
        if (product.brand == name) {
            brands[name].push(product)
        }
    }
}
console.log("Each brand with the list of products:")
console.log(brands)

const numberProductsByBrands = []
for (const brand in brands) {
    numberProductsByBrands[brand] = brands[brand].length
}
console.log("Number of products by brands:")
console.log(numberProductsByBrands) 

// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

const SortedPriceBrands = { ...brands }
for (const brand in SortedPriceBrands) {
    SortedPriceBrands[brand].sort((x, y) => y.price - x.price)
}
console.log("Each brand : products sorted by price:")
console.log(SortedPriceBrands)

// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

const SortedDateBrands = { ...brands }
for (const brand in SortedDateBrands) {
    SortedDateBrands[brand].sort((x, y) => y.price - x.price)
}
console.log("Each brand : products sorted by date:")
console.log(SortedDateBrands)


/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products

function percentile(sortedArray, p) {

    var index = p * sortedArray.length
    index = Math.round(index)
    var p90 = sortedArray[index].price
    return p90
}
const p90Values = []
for (const brand in SortedPriceBrands) {
    p90Values[brand] = percentile(SortedPriceBrands[brand], 0.90)
}
console.log("p90 values for each brand:")
console.log(p90Values)


/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.

function NewProductsOnly(productList) {
    var ret = true
    for (const product of productList) {
        let today = new Date('2022-01-17')
        let released = new Date(product.released);

        if (today - released > 14 * 1000 * 60 * 60 * 24) {
            ret = false
        }
    }
    return ret
}

console.log("New products only?")
console.log(NewProductsOnly(COTELE_PARIS))

// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€

function ReasonablePriceShop(productList) {

    for (const product of COTELE_PARIS) {
        if (product.price >= 100) {
            return false
        }
    }
    return true
}
console.log("Is the shop reasonable?")
console.log(ReasonablePriceShop(COTELE_PARIS))

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product



// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties





/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
