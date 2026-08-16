let currentProduct = null;
let selectedColor = null;
let detailQty = 1;
let lockedScrollY = 0;

window.lockPageScroll = function(){
    lockedScrollY = window.scrollY || 0;
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
};

window.unlockPageScroll = function(){
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    window.scrollTo(0, lockedScrollY);
};
// Render Products
function animateProductsChange(renderCallback){


    const container =
        document.getElementById(
            "products-container"
        );


    if(!container){
        renderCallback();
        return;
    }


    container.classList.add(
        "products-changing"
    );


    setTimeout(function(){


        renderCallback();


        container.classList.remove(
            "products-changing"
        );


        container.classList.add(
            "products-entering"
        );


        setTimeout(function(){
            container.classList.remove(
                "products-entering"
            );
        },260);


    },160);


}

function getProductPriceText(product){
    return product.priceText ||
        `RM ${product.price.toFixed(2)}`;
}

function renderProducts(productList = products) {
    const container =
        document.getElementById(
            "products-container"
        );
    if (!container) return;
    container.innerHTML = "";
    productList.forEach(product => {
        const card =
            document.createElement("div");
        card.className =
            "product-card";
        card.innerHTML = `
            <div class="product-image-container">
                <img
                    src="${product.image}"
                    alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="text-xl font-bold">
                ${product.name}
                </h3>
                <p>
                    ${product.desc}
                </p>
                <div class="product-price">
                    ${getProductPriceText(product)}
                </div>
            </div>
        `;
        card.addEventListener(
            "click",
            function () {
                showDetail(
                    product.id
                );
            }
        );
        container.appendChild(
            card
        );
    });
}
// Show Product Detail
function showDetail(id) {
    const product =
        products.find(
            item =>
            item.id === id
        );
    if (!product) return;
    currentProduct =
        product;
    detailQty = 1;
    selectedColor =
        product.colors &&
        product.colors.length > 0
            ? product.colors[0].name
            : null;
    document.getElementById(
        "detail-name"
    ).textContent =
        product.name;
    document.getElementById(
        "detail-desc"
    ).textContent =
        product.desc;
    document.getElementById(
        "detail-price"
    ).textContent =
        getProductPriceText(product);
    document.getElementById(
        "detail-qty"
    ).textContent =
        detailQty;
    document.getElementById(
        "detail-image"
    ).innerHTML = `
        <img
            src="${product.image}"
            alt="${product.name}">
    `;
    renderColorOptions();
    document
        .getElementById(
            "product-detail-modal"
        )
        .classList.remove(
            "hidden"
        );
    window.lockPageScroll();
}
// Close Detail
window.closeDetail = function () {
    document
        .getElementById(
            "product-detail-modal"
        )
        .classList.add(
            "hidden"
        );
    window.unlockPageScroll();
};

const productDetailModal =
    document.getElementById(
        "product-detail-modal"
    );

if(productDetailModal){
    productDetailModal.addEventListener(
        "click",
        function(event){
            if(event.target === productDetailModal){
                closeDetail();
            }
        }
    );
}
// Render Colors
function renderColorOptions() {
    const container =
        document.getElementById(
            "color-options"
        );
    if (!container) return;
    if (
        !currentProduct ||
        !currentProduct.colors
    ) {
        container.innerHTML = "";
        return;
    }
    container.innerHTML =
        currentProduct.colors
        .map(color => `
            <button
                type="button"
                class="color-option-btn ${
                    selectedColor === color.name
                        ? 'selected'
                        : ''
                }"
                data-color="${color.name}"
                style="
                padding:8px 14px;
                border:1px solid #ddd;
                border-radius:5px;
                cursor:pointer;
                background:${
                    selectedColor === color.name
                    ? '#ffffff'
                    : '#ffffff'
                };
                color:${
                    selectedColor === color.name
                    ? '#000000'
                    : '#000000'
                };
                ">
                ${color.name}
            </button>
        `)
        .join("");
    container
        .querySelectorAll(
            ".color-option-btn"
        )
        .forEach(function(button){
            button.addEventListener(
                "click",
                function(event){
                    event.stopPropagation();
                    selectColor(
                        button.dataset.color
                    );
                }
            );
        });
}
// Select Color
window.selectColor = function(color){
    selectedColor = color;
    renderColorOptions();
};
// Product Detail Quantity
window.changeDetailQty = function(delta){
    detailQty += delta;
    if(detailQty < 1){
        detailQty = 1;
    }
    document.getElementById(
        "detail-qty"
    ).textContent =
        detailQty;
};
// Add To Cart
window.addCurrentToCart = function(){


    if(!currentProduct) return;


    addToCart(
        currentProduct.id,
        selectedColor,
        detailQty
    );


    showToast(
        "Successfully Added To Cart"
    );


    closeDetail();


};
// search
let currentCategory = "";

function setHomeWideBoxVisible(visible){
    const box =
        document.getElementById(
            "home-wide-box"
        );
    if(!box) return;
    box.classList.toggle(
        "hidden",
        !visible
    );
}


window.filterCategory = function(category){


    const cartPage =
        document.getElementById(
            "cart-page"
        );


    if(cartPage){
        cartPage.classList.add(
            "hidden"
        );
    }
    document.body.classList.remove(
        "cart-page-open"
    );
    setHomeWideBoxVisible(false);


    const categoryScroller =
        document.querySelector(
            ".category-wrapper .flex"
        );
    currentCategory = category;


    const buttons =
        document.querySelectorAll(
            ".category-btn"
        );


    buttons.forEach(btn => {


        btn.classList.remove(
            "active"
        );


    });


    const activeBtn =
        document.getElementById(
            "cat-" + category
        );


    if(activeBtn){


        activeBtn.classList.add(
            "active"
        );
        activeBtn.scrollIntoView({
            behavior:"smooth",
            inline:"center",
            block:"nearest"
        });


    }


    applyFilters();


};

window.goHome = function(){


    currentCategory = "";


    const cartPage =
        document.getElementById(
            "cart-page"
        );


    if(cartPage){
        cartPage.classList.add(
            "hidden"
        );
    }
    document.body.classList.remove(
        "cart-page-open"
    );
    setHomeWideBoxVisible(true);


    document
        .querySelectorAll(
            ".category-btn"
        )
        .forEach(function(btn){
            btn.classList.remove(
                "active"
            );
        });


    renderProducts([]);


    window.scrollTo({
        top:0,
        behavior:"smooth"
    });


};
function applyFilters(){


    const keyword =
        document
        .getElementById("search-input")
        .value
        .toLowerCase();


    if(!currentCategory){
        setHomeWideBoxVisible(true);
        animateProductsChange(function(){
            renderProducts([]);
        });
        return;
    }


    let filtered = products.filter(product =>
        currentCategory === "printing" ||
        product.category !== "printing"
    );


    if(currentCategory){


        filtered = filtered.filter(
            product =>
            product.category === currentCategory
        );


    }


    if(keyword){


        filtered = filtered.filter(product =>


            product.name
                .toLowerCase()
                .includes(keyword)


            ||


            product.desc
                .toLowerCase()
                .includes(keyword)


        );


    }


    if(currentCategory === "printing"){
        animateProductsChange(function(){
            renderPrintingCarousel(filtered);
        });
    }else{
        animateProductsChange(function(){
            renderProducts(filtered);
        });
    }


}

function renderPrintingCarousel(productList){


    const container =
        document.getElementById(
            "products-container"
        );


    if(!container) return;


    if(productList.length === 0){
        container.innerHTML = "";
        return;
    }


    const visualItems =
        Array.from(
            { length:3 },
            function(_, index){
                return productList[
                    index % productList.length
                ];
            }
        );


    container.innerHTML = `
        <div class="printing-carousel">
            <div class="printing-carousel-ring">
                ${visualItems.map(function(product, index){
                    return `
                        <button
                            type="button"
                            class="printing-carousel-card"
                            data-position="${index === 0 ? "left" : index === 1 ? "center" : "right"}"
                            onclick="handlePosterClick(this, '${product.image}', '${product.name}')">
                            <img
                                src="${product.image}"
                                alt="${product.name}">
                        </button>
                    `;
                }).join("")}
            </div>
            <div class="printing-carousel-info">
                <h3>${productList[0].name}</h3>
                <p>${productList[0].desc}</p>
                <strong>${getProductPriceText(productList[0])}</strong>
            </div>
        </div>
    `;


    startPrintingCarousel();


}

let printingCarouselTimer = null;

function startPrintingCarousel(){


    const cards =
        Array.from(
            document.querySelectorAll(
                ".printing-carousel-card"
            )
        );


    if(cards.length < 3) return;


    if(printingCarouselTimer){
        clearInterval(
            printingCarouselTimer
        );
    }


    function rotateCards(){


        cards.forEach(function(card){


            const position =
                card.dataset.position;


            if(position === "center"){
                card.dataset.position =
                    "left";
            }else if(position === "right"){
                card.dataset.position =
                    "center";
            }else{
                card.dataset.position =
                    "right";
            }


        });


    }


    printingCarouselTimer =
        setInterval(
            rotateCards,
            2400
        );


}

window.openPosterPreview = function(image, name){


    const modal =
        document.getElementById(
            "poster-preview-modal"
        );
    const previewImage =
        document.getElementById(
            "poster-preview-image"
        );


    if(!modal || !previewImage) return;


    previewImage.src = image;
    previewImage.alt = name || "Poster preview";
    modal.classList.remove(
        "hidden"
    );
    window.lockPageScroll();


};

window.handlePosterClick = function(card, image, name){


    if(
        card &&
        card.dataset.position !== "center"
    ){
        bringPosterToCenter(card);
        return;
    }


    window.openPosterPreview(
        image,
        name
    );


};

function bringPosterToCenter(selectedCard){


    const currentCenter =
        document.querySelector(
            '.printing-carousel-card[data-position="center"]'
        );


    if(!currentCenter || !selectedCard) return;


    const selectedPosition =
        selectedCard.dataset.position;


    currentCenter.dataset.position =
        selectedPosition;


    selectedCard.dataset.position =
        "center";


}

window.closePosterPreview = function(){


    const modal =
        document.getElementById(
            "poster-preview-modal"
        );


    if(!modal) return;


    modal.classList.add(
        "hidden"
    );
    window.unlockPageScroll();


};
function filterProducts(){


    applyFilters();


}


window.onload = function(){


    animateProductsChange(function(){
        renderProducts([]);
    });
    initBanner();
    initStickyTop();
    initVirtualSearchText();
    initLogoBlink();


    const searchInput =
        document.getElementById(
            "search-input"
        );


    if(searchInput){


        searchInput.addEventListener(
            "keyup",
            filterProducts
        );


    }


};

function initLogoBlink(){


    const logo =
        document.querySelector(
            ".logo"
        );


    if(!logo) return;


    function blink(){


        logo.classList.add(
            "logo-blink"
        );


        setTimeout(function(){


            logo.classList.remove(
                "logo-blink"
            );


        },180);


    }


    setTimeout(
        blink,
        700
    );


    setInterval(
        blink,
        2600
    );


}

function initVirtualSearchText(){


    const searchInput =
        document.getElementById(
            "search-input"
        );


    const virtualText =
        document.getElementById(
            "virtual-search-text"
        );


    if(
        !searchInput ||
        !virtualText ||
        typeof products === "undefined"
    ){
        return;
    }


    const names =
        products
            .map(product => product.name)
            .filter(Boolean);


    if(names.length === 0) return;


    function showRandomName(){


        if(searchInput.value.trim()){
            virtualText.classList.add(
                "hidden-text"
            );
            return;
        }


        const randomName =
            names[
                Math.floor(
                    Math.random() * names.length
                )
            ];


        virtualText.textContent =
            randomName;


        virtualText.classList.remove(
            "hidden-text"
        );


        virtualText.classList.remove(
            "scroll-up"
        );


        void virtualText.offsetWidth;


        virtualText.classList.add(
            "scroll-up"
        );


    }


    function updateVirtualText(){


        if(searchInput.value.trim()){
            virtualText.classList.add(
                "hidden-text"
            );
        }else{
            virtualText.classList.remove(
                "hidden-text"
            );
        }


    }


    showRandomName();


    setInterval(
        showRandomName,
        1800
    );


    searchInput.addEventListener(
        "input",
        updateVirtualText
    );


    searchInput.addEventListener(
        "focus",
        updateVirtualText
    );


    searchInput.addEventListener(
        "blur",
        showRandomName
    );


}

function initBanner(){


    const track =
        document.getElementById(
            "banner-track"
        );


    if(!track) return;


    const leftBtn =
        document.querySelector(
            ".banner-arrow-left"
        );


    const rightBtn =
        document.querySelector(
            ".banner-arrow-right"
        );


    function moveBanner(direction){


        const amount =
            track.clientWidth *
            direction;


        track.scrollBy({
            left: amount,
            behavior: "smooth"
        });


    }


    if(leftBtn){
        leftBtn.addEventListener(
            "click",
            function(){
                moveBanner(-1);
            }
        );
    }


    if(rightBtn){
        rightBtn.addEventListener(
            "click",
            function(){
                moveBanner(1);
            }
        );
    }


}

function initStickyTop(){


    const header =
        document.querySelector("header");
    const category =
        document.querySelector(".category-wrapper");
    const searchWrapper =
        document.querySelector(".search-wrapper");


    if(!header) return;


    function updateTopBar(){


        document.documentElement.style.setProperty(
            "--header-height",
            header.offsetHeight + "px"
        );
        document.documentElement.style.setProperty(
            "--fixed-top-height",
            (
                header.offsetHeight +
                (category ? category.offsetHeight : 0) +
                (searchWrapper ? searchWrapper.offsetHeight : 0)
            ) + "px"
        );
        document.documentElement.style.setProperty(
            "--category-height",
            (category ? category.offsetHeight : 0) + "px"
        );


        if(window.scrollY > 24){
            document.body.classList.add(
                "page-scrolled"
            );
        }else if(window.scrollY <= 0){
            document.body.classList.remove(
                "page-scrolled"
            );
        }


    }


    updateTopBar();


    window.addEventListener(
        "scroll",
        updateTopBar
    );


    window.addEventListener(
        "resize",
        updateTopBar
    );


}
function showToast(message){


    const toast =
        document.createElement("div");


    toast.textContent = message;


    toast.style.position = "fixed";
    toast.style.top = "50%";
    toast.style.left = "50%";
    toast.style.transform =
        "translate(-50%, -50%)";


    toast.style.background =
        "rgba(0,0,0,0.9)";


    toast.style.color = "#fff";


    toast.style.padding =
        "14px 28px";


    toast.style.borderRadius =
        "12px";


    toast.style.fontSize =
        "16px";


    toast.style.fontWeight =
        "600";


    toast.style.zIndex =
        "99999";


    toast.style.whiteSpace =
        "nowrap";


    document.body.appendChild(
        toast
    );


    setTimeout(function(){


        toast.remove();


    },2000);


}
