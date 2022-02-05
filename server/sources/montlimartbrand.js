const fetch = require('node-fetch');
const cheerio = require('cheerio');

// Problem : only a few products are loading
/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
    const $ = cheerio.load(data);

    return $('.category-products .products-grid .item .product-info')
        .map((i, element) => {
            let name = $(element)
                .find('a')
                .text()
                .trim()
                .replace(/\s/g, ' ').split("   ");

            const price =
                parseInt($(element)
                    .find('.price').text());
            const link = $(element).find('a').attr('href');
            const last = name[name.length - 1] // last element of the list : color
            name = name[0] + last; // we keep the name and the color of the product
            return { name, link, price };
        })
        .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const body = await response.text();

            return parse(body);
        }

        console.error(response);

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
};