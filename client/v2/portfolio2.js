// API Perso et code correction
// https://github.com/Aymar35/clear-fashion/blob/master/client/portfolio_correction.js
// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');
const selectPrice = document.querySelector('#filter-price');
const selectRelease = document.querySelector('#filter-release');
const selectSort = document.querySelector('#sort-select');


/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({ result }) => {
    currentProducts = result;
    //currentPagination = meta;
    //currentBrand = brand ;
};
const setProducts = (products) => {currentProducts = products}

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (size = 12) => {
    try {
        const response = await fetch(
            `https://server-six-teal.vercel.app/products/search?brand=dedicatedbrand&limit=${size}`
        );
        const body = await response.json();
        currentProducts = body;
        currentPagination = 1;
        if (body.success !== true) {
            console.error(body);
            return { currentProducts, currentPagination };
        }
        //return body.data
        
        return body;

    } catch (error) {
        console.error(error);
        return { currentProducts, currentPagination };
    }
};


/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    const template = products
        .map(product => {
            return `
    	<div class="product" id=${product._id}>
      		<span>${product.brand}</span>
      		<a href="${product.link}">${product.name}</a>
      		<span>${product.price}</span>
    	</div>
    `;
        })
        .join('');

    div.innerHTML = template;
    fragment.appendChild(div);
    sectionProducts.innerHTML = '<h2>Products</h2>';
    sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
    const { currentPage, pageCount } = pagination;
    const options = Array.from(
        { 'length': pageCount },
        (value, index) => `<option value="${index + 1}">${index + 1}</option>`
    ).join('');

    selectPage.innerHTML = options;
    selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
    const { count } = pagination;

    spanNbProducts.innerHTML = count;
};


const ListBrand = products => {
    const brands = [];
    for (var i = 0; i < products.length; i++) {
        if (brands.includes(products[i]["brand"]) == false) {
            brands.push(products[i]["brand"]);
        }
    }
    return brands;
}


const renderBrands = brands => {
    const options = Array.from(
        { 'length': brands.length },
        (value, index) => `<option value="${brands[index]}">${brands[index]}</option>`
    ).join('');

    selectBrand.innerHTML = options;
};

const render = (products) => { //products, pagination
    renderProducts(currentProducts);
    //renderPagination(pagination);
    //renderIndicators(pagination);
    const brands = ListBrand(currentProducts);
    renderBrands(brands);
};


const filterBrand = (products, brand) => {
    const filteredList = [];
    for (var i = 0; i < products.length; i++) {
        if (products[i]["brand"] == brand) {
            filteredList.push(products[i]);
        }
    }
    renderProducts(filteredList);
}

const filterPrice = (products) => {
    const filteredList = [];
    for (var i = 0; i < products.length; i++) {
        if (products[i]["price"] <= 50) {
            filteredList.push(products[i]);
        }
    }
    renderProducts(filteredList);
};


Date.prototype.minusDays = function (days) { this.setDate(this.getDate() - parseInt(days)); return this; };

const filterRelease = (products) => {
    const filteredList = [];

    for (var i = 0; i < products.length; i++) {
        if (products[i]["released"].minusDays <= 14) {
            filteredList.push(products[i]);
        }
    }
    renderProducts(filteredList);
};

const sortPrice_Cheaper = (products) => {
    const sorted_products = products;
    for (var i = 0; i < sorted_products.length; i++) {
        for (var j = i + 1; j = 0; j--) {
            if (sorted_products[j]["price"] < sorted_products[j - 1]["price"]) {
                temp = sorted_products[j];
                sorted_products[j] = sorted_products[j - 1]
                sorted_products[j - 1] = temp
            }
        }
    }
    renderProducts(sorted_products)
}


/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
/////////////////////////////////////////////////////////////////
selectShow.addEventListener('change', event => {
    fetchProducts(1, parseInt(event.target.value))
        .then(() => render(currentProducts)); //, pagination
});

selectBrand.addEventListener('change', event => {
    filterBrand(currentProducts, event.target.value)
});

selectPrice.addEventListener('click', event => {
    filterPrice(currentProducts)
});


selectSort.addEventListener('change', event => {
    sortPrice_Cheaper(currentProducts);
});

document.addEventListener('DOMContentLoaded', () =>
    fetchProducts()
        .then(() => render(currentProducts))
);
