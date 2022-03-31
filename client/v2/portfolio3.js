// API PErso et code perso
// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

//Instantiate the local storage for favorites
//localStorage.removeItem('favorite_list')
let favorite_list = []
if (JSON.parse(localStorage.getItem('favorite_list')) == null) {
    
    localStorage.setItem('favorite_list', JSON.stringify(favorite_list));
}
else {
    favorite_list = JSON.parse(localStorage.getItem('favorite_list'));
}

// current parameters
let currentProducts = [];
let currentPagination = {};
currentPagination['currentSize'] = 12;
currentPagination['currentPage'] = 1;
currentPagination['paginationChoice'] = "actual"
let currentBrand = 'all';
let currentMaxPrice = 1000;
let currentSort = 1;

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPagePrevious = document.querySelector('#previous-page');
const selectPageNext = document.querySelector('#next-page');
const selectBrand = document.querySelector('#brand-select');
const sectionProducts = document.querySelector('#products');
const selectFilterPrice = document.querySelector('#filter-price-select')
const selectFilterFavorite = document.querySelector('#filter-favorite-select')
const selectSort = document.querySelector('#sort-select');
const spanNbProducts = document.querySelector('#nbProducts');
const spanp50 = document.querySelector('#p50');
const spanp90 = document.querySelector('#p90');
const spanp95 = document.querySelector('#p95');

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (size = currentPagination.currentSize, page = currentPagination.currentPage,  brand = currentBrand,  price=currentMaxPrice, sort=currentSort) => {
    if (isNaN(price)) {
        currentMaxPrice = 1000;
        price = currentMaxPrice
    }
    if (page == "actual") {currentPagination.currentPage = 1}
    if (page == "next") { currentPagination.currentPage = currentPagination.currentPage + 1 }
    if (page == "previous") { currentPagination.currentPage = currentPagination.currentPage - 1 }
    if (currentPagination.currentPage < 1) { currentPagination.currentPage = 1}
    let pageNumber = currentPagination.currentPage
    let skip = (pageNumber - 1) * size;
    let limit = size * pageNumber;
    console.log("skip : ", skip, " | limit : ", limit, " | pageNumber : ", pageNumber)
    try {
        let response = await fetch(
            `https://server-six-teal.vercel.app/products/search?price=${price}&brand=${brand}&limit=${limit}&sort=${sort}&skip=${skip}`
        );
        
        let body = await response.json();
        //console.log(body)
        if (body.length == 0) {
            currentPagination.currentPage = currentPagination.currentPage - 1
            let pageNumber = currentPagination.currentPage
            let skip = (pageNumber - 1) * size;
            let limit = size * pageNumber;
            console.log("skip : ", skip, " | limit : ", limit, " | pageNumber : ", pageNumber)
            response = await fetch(
                `https://server-six-teal.vercel.app/products/search?price=${price}&brand=${brand}&limit=${limit}&sort=${sort}&skip=${skip}`
            );
            body = await response.json()
        }
        console.log(body)
        currentProducts = body;
        //currentPagination['currentPage'] = 1;
        currentPagination['currentSize'] = size;
        currentBrand = brand
        currentMaxPrice = price
        currentSort = sort;
        if (body.success !== true) {
            //console.error(body);
            return { currentProducts, currentPagination };
        }
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
    let template = `<div class="cards">`
    template += products
        .map(product => {
            if (favorite_list.includes(product._id)) {
                return `
      <div class="card" id=${product._id}>
<div class="image-container">
                    <div class="first">
                        <div class="d-flex justify-content-between align-items-center">  <button class="wishlist" style="border: none;color:#FF8773" onclick= DeleteFavorite('${product._id}')>${"&#10084;"}</button> </div>
                    </div> <img src="${product.image}" class="img-fluid rounded thumbnail-image">
                </div><div class="product-detail-container p-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <a href="${product.link}">${product.name}</br></a>
                            <a class="new-price">${product.price}€</a>
                            <h5 class="brand-name">${product.brand}</h5>
                        </div>
                    </div>
      </div>`;
            }
            else {
                return `
      <div class="card"   id=${product._id}>
<div class="image-container" >
                    <div class="first">
                        <div class="d-flex justify-content-between align-items-center">  <button class="wishlist" style="border: none; color:#8FB8C1" onclick= AddFavorite('${product._id}')>${"&#10084;"}</button> </div>
                    </div> <img src="${product.image}" class="img-fluid rounded thumbnail-image">
                </div><div class="product-detail-container p-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <a href="${product.link}">${product.name}</br></a>
                            <a class="new-price">${product.price}€</a>
                            <h5 class="brand-name">${product.brand}</h5>
                        </div>
                    </div>        
      </div>`;
            }
        }).join('');
    template += `</div>`
    div.innerHTML = template;
    fragment.appendChild(div);
    sectionProducts.innerHTML = '<h2></br><i class="fa-solid fa-shirt"></i> Products:</h2>';
    sectionProducts.appendChild(fragment);
};


function AddFavorite(_id) {
    console.log("add fav", _id)
    favorite_list.push(_id);
    console.log(favorite_list);
    render(currentProducts, currentPagination)
}

function DeleteFavorite(_id) {
    for (var i = 0; i < favorite_list.length; i++) {
        if (favorite_list[i] === _id) {
            favorite_list.splice(i, 1);
        }
    }
    render(currentProducts, currentPagination)
}


// Show the list of brand names to filter
function renderBrands() {

    const options = `<option value="all">all brands</option>
        <option value="dedicatedbrand">dedicatedbrand</option>
        <option value="montlimart">montlimart</option>
        <option value="adresseparis">adresseparis</option>`;
    let i = 0
    if (currentBrand == "all") { i = 0 }
    else if (currentBrand == "dedicatedbrand") { i = 1 }
    else if (currentBrand == "montlimart") { i = 2 }
    else if (currentBrand == "adresseparis") { i = 3 }
    selectBrand.innerHTML = options;
    selectBrand.selectedIndex = i;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
function renderIndicators() {
    spanNbProducts.innerHTML = currentProducts.length;
    spanp50.innerHTML = Percentile(0.50);
    spanp90.innerHTML = Percentile(0.90);
    spanp95.innerHTML = Percentile(0.95);
};


function Percentile(p) {
    let clone = [...currentProducts]
    var sortedProducts = clone.sort((x, y) => x.price - y.price)
    var index = p * sortedProducts.length
    index = Math.round(index)
    var percentile = sortedProducts[index].price
    return percentile.toString() + "&euro;"
}

const render = (products) => {

    renderBrands();
    renderProducts(products);
    renderIndicators();
    console.log(favorite_list)
    localStorage.setItem('favorite_list', JSON.stringify(favorite_list));

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Select the number of products to display

selectShow.addEventListener('change', event => {
    fetchProducts(parseInt(event.target.value))
        .then(() => render(currentProducts)); 
});

//Feature 1 - Browse pages

selectPagePrevious.addEventListener('click', event => {
    fetchProducts(currentPagination.currentSize, "previous")
        .then(() => render(currentProducts));
});
selectPageNext.addEventListener('click', event => {
    fetchProducts(currentPagination.currentSize, "next")
        .then(() => render(currentProducts)); 
});

//Feature 2 - Filter by brands

selectBrand.addEventListener('change', event => {
    fetchProducts(currentPagination.currentSize, "actual", event.target.value)
        .then(() => render(currentProducts));
})

//Feature 4 - Filter by reasonable price

selectFilterPrice.addEventListener('change', event => {
    fetchProducts(currentPagination.currentSize, currentPagination.currentPage, currentBrand, parseInt(event.target.value))
        .then(() => render(currentProducts));
})

//Feature 5 - Sort by price

selectSort.addEventListener('change', event => {
    fetchProducts(currentPagination.currentSize, currentPagination.currentPage, currentBrand, currentMaxPrice, parseInt(event.target.value))
        .then(() => render(currentProducts));
})

//Feature 14 - Filter by favorite

selectFilterFavorite.addEventListener('change', event => {
    fetchProducts()
        .then(() => render(filterFavorite(currentProducts)));
})

function filterFavorite(currentProducts) {
    console.log(selectFilterFavorite.checked)
    if (selectFilterFavorite.checked == false) {
        currentBrand = 'all';

        return currentProducts
    }
    else {
        var filteredProducts = []
        currentBrand = 'all';

        for (var product of currentProducts) {
            if (favorite_list.includes(product._id)) {
                filteredProducts.push(product)
            }
        }

        return filteredProducts
    }

}

document.addEventListener('DOMContentLoaded', () =>
    fetchProducts()
        .then(() => render(currentProducts))
);
