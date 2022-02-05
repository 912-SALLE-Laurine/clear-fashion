/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
//const dedicatedbrand = require('./sources/adresseparisbrand.js');
// const dedicatedbrand = require('./sources/montlimartbrand');
// https://www.dedicatedbrand.com/en/women/news
// https://adresse.paris/630-toute-la-collection
// https://www.montlimart.com/toute-la-collection.html

async function sandbox(eshop = 'https://www.dedicatedbrand.com/en/women/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
