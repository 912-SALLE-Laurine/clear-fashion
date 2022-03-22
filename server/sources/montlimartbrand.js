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

    return $('.category-products .products-grid .item')
        .map((i, element) => {
            let name = $(element)
                .find('.product-info a')
                .text()
                .trim()
                .replace(/\s/g, ' ').split("   ");

            const price =
                parseInt($(element)
                    .find('.product-info .price').text());
            const link = $(element).find('.product-info a').attr('href');
            const last = name[name.length - 1] // last element of the list : color
            name = name[0] + last; // we keep the name and the color of the product
            let image = $(element).find('img').attr('src')
            if (image !== undefined) image = image.toString().replace(' ', '%20');
            return { name, link, price, image};
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