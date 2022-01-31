// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let favorite_list = [];
let currentPagination = {};
let currentSize = 12;//


// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const sectionProducts = document.querySelector('#products');
const selectFilterPrice = document.querySelector('#filter-price-select')
const selectFilterDate = document.querySelector('#filter-date-select')
const selectFilterFavorite = document.querySelector('#filter-favorite-select')
const selectSort = document.querySelector('#sort-select');

const spanNbProducts = document.querySelector('#nbProducts');
const spanNbNewProducts = document.querySelector('#nbNewProducts');
const spanp50 = document.querySelector('#p50');
const spanp90 = document.querySelector('#p90');
const spanp95 = document.querySelector('#p95');
const spanLastReleased = document.querySelector('#lastReleased');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    ); // Wait for getting response from the call
    const body = await response.json(); // wait to create json data

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    /*
    var favourite_status = false;
    if (product.uuid in favourite_list) {
        favourite_status = true;
    }*/
   
    const template = products
        .map(product => {
            if (favorite_list.includes(product.uuid)) {
                return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
        <span>&nbsp;</span>
        <span style="color:#FF8773; font-size:20px">${"&#10084;"}</span>
      </div>`;
            }
            else {
                return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}" target = "_blank">${product.name}</a>
        <span>${product.price}</span>
        <button style="border: none; background : none; color:#8FB8C1; font-size : 20px;" onclick= AddFavorite('${product.uuid}')>${"&#10084;"}</button>
      </div>`;
            }}).join('');

    div.innerHTML = template;
    fragment.appendChild(div);
    sectionProducts.innerHTML = '<h2>Products</h2>';
    sectionProducts.appendChild(fragment);

};


function AddFavorite(uuid) {
    //console.log(uuid)
    favorite_list.push(uuid);
    //console.log(favorite_list)
    render(currentProducts, currentPagination)
}

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

// Show the list of brand names to filter
const renderBrands = products => {
    let options = [... new Set(products.flatMap(x => x.brand))];

    selectBrand[0] = new Option("all");
    var i = 1;
    for (var option of options) {
        selectBrand[i] = new Option(option);

        i += 1;
    }

};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
    const { count } = pagination;

    spanNbProducts.innerHTML = count;
    spanNbNewProducts.innerHTML = CountNewProducts();
    spanp50.innerHTML = Percentile(0.50);
    spanp90.innerHTML = Percentile(0.90);
    spanp95.innerHTML = Percentile(0.95);
    spanLastReleased.innerHTML = LastReleased();
};

function LastReleased() {
    var sortedProducts = SortProducts(currentProducts, "date-asc")
    return sortedProducts[0].released
}

function CountNewProducts() {
    var count = 0
    for (var product of currentProducts) {
        let today = new Date('2022-01-30')
        let released = new Date(product.released);
        if (today - released < 14 * 1000 * 60 * 60 * 24) {
            count += 1
        }
    }
    return count
}

function Percentile(p) {
    let clone = [...currentProducts]
    var sortedProducts = clone.sort((x, y) => x.price - y.price)
    var index = p * sortedProducts.length
    index = Math.round(index)
    var percentile = sortedProducts[index].price
    return percentile
}

const render = (products, pagination) => {
    renderBrands(products);
    renderProducts(products);
    renderPagination(pagination);
    renderIndicators(pagination);
   
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */

selectShow.addEventListener('change', event => {
    //currentSize = parseInt(event.target.value)//
    fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
        .then(setCurrentProducts) 
            .then(() => render(currentProducts, currentPagination));
});



/*
Feature 1 - Browse pages

As a user
I want to browse available pages
So that I can load more products
*/
selectPage.addEventListener('change', event => {
    fetchProducts(parseInt(event.target.value), currentPagination.pageSize)
        .then(setCurrentProducts) 
        .then(() => render(currentProducts, currentPagination));
});

/*
Feature 2 - Filter by brands

As a user
I want to filter by brands name
So that I can browse product for a specific brand
*/

selectBrand.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(filterBrand(currentProducts, event.target.value), currentPagination));
})

function filterBrand(currentProducts, brandName) {
    var filteredProducts = []
    if (brandName == "all") {
        filteredProducts = [...currentProducts]
    }
    for (var product of currentProducts) {
        if (product.brand == brandName) {
            filteredProducts.push(product)
        }
    }
    
    return filteredProducts
}

/*
Feature 3 - Filter by recent products

As a user
I want to filter by recent products
So that I can browse the new released products (less than 2 weeks)
*/

selectFilterDate.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(filterDate(currentProducts, event.target.value), currentPagination));
})

function filterDate(currentProducts, selector) {
    var filteredProducts = []
    if (selector == "no_filter") {
        filteredProducts = [...currentProducts]
    }
    else {
        for (var product of currentProducts) {
            let today = new Date('2022-01-30')
            let released = new Date(product.released);
            if (today - released < 14 * 1000 * 60 * 60 * 24) {
                filteredProducts.push(product)
            }
        }
    }

    return filteredProducts
}

/*
 Feature 4 - Filter by reasonable price

As a user
I want to filter by reasonable price
So that I can buy affordable product i.e less than 50€
*/

selectFilterPrice.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(filterPrice(currentProducts, event.target.value), currentPagination));
})

function filterPrice(currentProducts, selector) {
    var filteredProducts = []
    if (selector == "no_filter") {
        filteredProducts = [...currentProducts]
    }
    else {
        for (var product of currentProducts) {
            console.log(product.price);
            if (product.price <= 50) {
                filteredProducts.push(product)
            }
        }
    }

    return filteredProducts
}


/*
Feature 5 - Sort by price

As a user
I want to sort by price
So that I can easily identify cheapest and expensive products

Feature 6 - Sort by date

As a user
I want to sort by price
So that I can easily identify recent and old products
*/

selectSort.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(SortProducts(currentProducts, event.target.value), currentPagination));
})



function SortProducts(currentProducts, selector) {
    let clone = [...currentProducts]
    var sortedProducts = []
    if (selector == "no_sort") {
        sortedProducts = [...currentProducts]
    }
    else if (selector == "price-asc")
    {

        sortedProducts = clone.sort((x, y) => x.price - y.price)
    }
    else if (selector == "price-desc")
    {
        sortedProducts = clone.sort((x, y) => y.price - x.price)
    }
    else if (selector == "date-asc")
    {

        sortedProducts = clone.sort((x, y) => {
            let da = new Date(x.released);
            let db = new Date(y.released);
            return db - da;
        })

    }
    else if (selector == "date-desc")
    {

        sortedProducts = clone.sort((x, y) => {
            let da = new Date(x.released);
            let db = new Date(y.released);
            return da - db;
        })

    }
    return sortedProducts
}

/*
Feature 8 - Number of products indicator

As a user
I want to indicate the total number of products
So that I can understand how many products is available
=> Already done by the teacher

Feature 9 - Number of recent products indicator

As a user
I want to indicate the total number of recent products
So that I can understand how many new products are available
=> Creation new function CountNewProducts() and modify renderIndicator()

Feature 10 - p50, p90 and p95 price value indicator

As a user
I want to indicate the p50, p90 and p95 price value
So that I can understand the price values of the products
=> Creation of new function Percentile() and modify renderIndicator()

Feature 11 - Last released date indicator

As a user
I want to indicate the last released date
So that I can understand if we have new products
=> Creation of new function LastReleased() and modify renderIndicator()

Feature 12 - Open product link

As a user
I want to open product link in a new page
So that I can buy the product easily

Feature 13 - Save as favorite

As a user
I want to save a product as favorite
So that I can retreive this product later
=> Modify RenderProducts(), add AddFavourite() function

Feature 14 - Filter by favorite

As a user
I want to filter by favorite products
So that I can load only my favorite products
*/

selectFilterFavorite.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(filterFavorite(currentProducts, event.target.value), currentPagination));
})

function filterFavorite(currentProducts, selector) {
    var filteredProducts = []
    if (selector == "no_filter") {
        filteredProducts = [...currentProducts]
    }
    else {
        for (var product of currentProducts) {
           
            if (favorite_list.includes(product.uuid)) {
                filteredProducts.push(product)
            }
        }
    }

    return filteredProducts
}


document.addEventListener('DOMContentLoaded', () =>
    fetchProducts()
        .then(setCurrentProducts)
        .then(() => render(currentProducts, currentPagination))
);
