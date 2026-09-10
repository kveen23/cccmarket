// cart.js
let cart = [];
// ======================
// Add To Cart
// ======================
function addToCart(productId, color = null, qty = 1) {
    const product = products.find(
        p => p.id === productId
    );
    if (!product) return;
    const existing = cart.find(item =>
        item.id === productId &&
        item.color === color
    );
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({
            ...product,
            color: color,
            quantity: qty,
            selected: true
        });
    }
    updateCartCount();
    renderCart();
}
// ======================
// Cart Counter
// ======================
function updateCartCount() {
    const total = cart.reduce(
        (sum, item) =>
        sum + item.quantity,
        0
    );
    const badge =
        document.getElementById(
            "cart-count"
        );
    if (badge) {
        badge.textContent = total;
    }
}
// ======================
// Open Cart
// ======================
function toggleCart() {


    const page =
        document.getElementById(
            "cart-page"
        );


    if (!page) return;


    page.classList.remove(
        "hidden"
    );
    document.body.classList.add(
        "cart-page-open"
    );


    if(window.currentCategory !== undefined){
        window.currentCategory = "";
    }


    document
        .querySelectorAll(
            ".category-btn"
        )
        .forEach(function(btn){
            btn.classList.remove(
                "active"
            );
        });


    const productsContainer =
        document.getElementById(
            "products-container"
        );


    if(productsContainer){
        productsContainer.innerHTML = "";
    }


    window.scrollTo({
        top:0,
        behavior:"smooth"
    });


    renderCart();


}
// ======================
// Close Cart
// ======================
function closeCart() {


    const page =
        document.getElementById(
            "cart-page"
        );


    if (page) {


        page.classList.add(
            "hidden"
        );
        document.body.classList.remove(
            "cart-page-open"
        );


    }


}
// ======================
// Quantity +
// ======================
window.changeQty = function(index, delta) {
    if (!cart[index]) return;
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartCount();
    renderCart();
};
// ======================
// Delete Item
// ======================
window.removeItem = function(index) {
    if (!cart[index]) return;
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
};

window.toggleCartItemSelected = function(index) {
    if (!cart[index]) return;
    cart[index].selected =
        !cart[index].selected;
    renderCart();
};

window.toggleSelectAllCart = function() {
    if(cart.length === 0) return;
    const allSelected =
        cart.every(item =>
            item.selected !== false
        );
    cart.forEach(item => {
        item.selected =
            !allSelected;
    });
    renderCart();
};
// ======================
// Render Cart
// ======================
function renderCart() {
    const container =
        document.getElementById(
            "cart-items"
        );
    const totalPrice =
        document.getElementById(
            "total-price"
        );
    if (!container) return;
    const selectAllBtn =
        document.getElementById(
            "select-all-cart"
        );
    if (cart.length === 0) {
        container.innerHTML = `
            <div style="
                text-align:center;
                padding:40px;
                color:#999;
            ">
                Cart Empty
            </div>
        `;
        if (totalPrice) {
            totalPrice.textContent =
                "RM 0.00";
        }
        if(selectAllBtn){
            selectAllBtn.classList.remove(
                "selected"
            );
        }
        return;
    }
    if(selectAllBtn){
        selectAllBtn.classList.toggle(
            "selected",
            cart.every(item =>
                item.selected !== false
            )
        );
    }
    let total = 0;
    container.innerHTML =
        cart.map((item, index) => {
            const subtotal =
                item.price *
                item.quantity;
            if(item.selected !== false){
                total += subtotal;
            }
            return `
            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                padding:10px;
                border-bottom:1px solid #eee;
                gap:10px;
            ">
                <button
                    onclick="toggleCartItemSelected(${index})"
                    aria-label="Select item"
                    style="
                    width:22px;
                    height:22px;
                    border-radius:50%;
                    border:2px solid ${item.selected !== false ? "#facc15" : "#9ca3af"};
                    background:${item.selected !== false ? "#facc15" : "transparent"};
                    color:#000;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    flex:0 0 auto;
                    ">
                    ${item.selected !== false ? '<i class="fa-solid fa-check" style="font-size:12px;"></i>' : ""}
                </button>
                <img
                    src="${item.image}"
                    alt="${item.name}"
                    style="
                    width:58px;
                    height:58px;
                    border-radius:8px;
                    object-fit:cover;
                    background:#000;
                    flex:0 0 auto;
                    ">
                <div style="flex:1;">
                    <div style="
                        font-weight:bold;
                        margin-bottom:4px;
                    ">
                        ${item.name}
                    </div>
                    <div style="
                        font-size:12px;
                        color:#666;
                    ">
                        Color:
                        ${item.color || "Default"}
                    </div>
                    <div class="mini-qty-control">
                        <span>Qty</span>
                        <button onclick="changeQty(${index},-1)">-</button>
                        <strong>${item.quantity}</strong>
                        <button onclick="changeQty(${index},1)">+</button>
                    </div>
                    <div style="
                        color:#4f46e5;
                        font-weight:bold;
                        margin-top:5px;
                    ">
                        RM ${subtotal.toFixed(2)}
                    </div>
                </div>
                <div style="
                    display:flex;
                    align-items:center;
                    gap:8px;
                ">
                </div>
            </div>
            `;
        }).join("");
    if (totalPrice) {
        totalPrice.textContent =
            `RM ${total.toFixed(2)}`;
    }
}
// ======================
// Export
// ======================
window.toggleCart = toggleCart;
window.closeCart = closeCart;
window.addToCart = addToCart;
// ======================
// Copy Cart
// ======================
window.copyCart = function(){


    if(cart.length === 0){


        alert("Cart Empty");


        return;


    }


    const quoteToField = document.getElementById("quote-to");
    const addressField = document.getElementById("quote-address");
    const contactField = document.getElementById("quote-contact");
    const quoteTo = quoteToField ? quoteToField.value.trim() : "";
    const address = addressField ? addressField.value.trim() : "";
    const contact = contactField ? contactField.value.trim() : "";
    let text = "CCC Stationery Order\n\n";

    if (quoteTo || address || contact) {
        if (quoteTo) text += `Quote to: ${quoteTo}\n`;
        if (address) text += `Address: ${address}\n`;
        if (contact) text += `Contact: ${contact}\n`;
        text += "\n";
    }


    cart.forEach(item => {


        text +=
            `${item.name} (${item.color || "Default"}) x${item.quantity}\n`;


    });


    const total = cart.reduce(
        (sum,item)=>
        sum + item.price * item.quantity,
        0
    );


    text += `\nTotal: RM ${total.toFixed(2)}`;


    navigator.clipboard.writeText(text);


    alert("Copied Successfully");


};


// ======================
// Download PDF
// ======================
let quotationExportInProgress = false;
window.downloadPDF = async function () {
    if (quotationExportInProgress) return;
    const selectedItems = cart.filter(item => item.selected !== false);
    if (!selectedItems.length) {
        alert("Please select at least one cart item.");
        return;
    }
    if (!window.jspdf || !window.createQuotationPDF) {
        alert("PDF export could not load. Please refresh the page and try again.");
        return;
    }
    quotationExportInProgress = true;
    const button = document.querySelector('[onclick="downloadPDF()"]');
    if (button) button.disabled = true;
    try {
        // Web Locks prevent two tabs on this origin from reserving the same number.
        if (!navigator.locks) {
            throw new Error("This browser cannot safely allocate quotation numbers. Please use a current browser on HTTPS or localhost.");
        }
        await navigator.locks.request("cccmarket-quotation-number", async () => {
            const key = "cccmarket.quotation.lastNumber.v1";
            const stored = window.localStorage.getItem(key);
            const last = stored === null ? 0 : Number(stored);
            if (stored !== null && (!/^\d+$/.test(stored) || !Number.isSafeInteger(last) || last < 0)) {
                throw new Error("The saved quotation counter is invalid. Please contact the administrator.");
            }
            const next = last + 1;
            if (!Number.isSafeInteger(next)) throw new Error("The quotation counter has reached its limit.");
            const quotationNumber = "CCC-QT" + String(next).padStart(5, "0");
            const value = id => (document.getElementById(id)?.value || "").trim();
            const doc = await window.createQuotationPDF(selectedItems, {
                quoteTo: value("quote-to"),
                address: value("quote-address"),
                contact: value("quote-contact"),
                quotationNumber
            });
            // Reserve before download; cancelled downloads can leave gaps, never reuse a number.
            window.localStorage.setItem(key, String(next));
            await doc.save(quotationNumber + ".pdf", { returnPromise: true });
        });
    } catch (error) {
        console.error("Quotation export failed", error);
        alert("Unable to export quotation: " + error.message);
    } finally {
        quotationExportInProgress = false;
        if (button) button.disabled = false;
    }
};
