(function () {
    "use strict";

    const AUTH_KEY = "cccmarketSettingsPreviewUser";
    const DRAFT_KEY = "cccmarketCatalogueDraft";
    // Store only verification hashes in this static build; the plain login is never published.
    const PREVIEW_USERNAME_HASH = "671ddf3b60c7bb6a4e66855a0ac9786030fc7019e49c49151ec017c3249474bd";
    const PREVIEW_PASSWORD_HASH = "6353a9bc170fead073c9afab5b0f01a4a1b090e7b6a2c171642bc73497524f15";

    function getElement(id) {
        return document.getElementById(id);
    }

    function openSettingsLogin() {
        const modal = getElement("settings-login-modal");
        const error = getElement("settings-login-error");
        if (!modal) return;
        modal.hidden = false;
        if (error) {
            error.hidden = true;
            error.textContent = "";
        }
        window.setTimeout(function () {
            const username = getElement("settings-username");
            if (username) username.focus();
        }, 0);
    }

    function closeSettingsLogin() {
        const modal = getElement("settings-login-modal");
        if (modal) modal.hidden = true;
    }

    function openSettingsPage(username) {
        const page = getElement("settings-page");
        const currentUsername = getElement("settings-current-username");
        if (!page) return;
        if (currentUsername) currentUsername.textContent = username || "Current admin";
        page.hidden = false;
        document.body.classList.add("settings-open");
        showSettingsPanel("catalogue");
    }

    function closeSettingsPage() {
        document.querySelectorAll(".settings-function-modal").forEach(function (modal) {
            modal.hidden = true;
        });
        document.body.classList.remove("settings-function-open");
        const page = getElement("settings-page");
        if (page) page.hidden = true;
        document.body.classList.remove("settings-open");
    }

    function openSettingsFunction(panelName) {
        const modal = getElement("settings-function-modal-" + panelName);
        if (!modal) return;
        showSettingsPanel(panelName);
        document.querySelectorAll(".settings-function-modal").forEach(function (item) {
            item.hidden = item !== modal;
        });
        modal.hidden = false;
        document.body.classList.add("settings-function-open");
        const closeButton = modal.querySelector(".settings-function-close");
        if (closeButton) closeButton.focus();
    }

    function closeSettingsFunction(panelName) {
        const modal = getElement("settings-function-modal-" + panelName);
        if (modal) modal.hidden = true;
        const openModal = document.querySelector(".settings-function-modal:not([hidden])");
        if (!openModal) document.body.classList.remove("settings-function-open");
    }

    function setupSettingsFunctionModals() {
        document.querySelectorAll("[data-settings-panel-content]").forEach(function (panel) {
            const panelName = panel.dataset.settingsPanelContent;
            if (getElement("settings-function-modal-" + panelName)) return;
            const modal = document.createElement("div");
            modal.id = "settings-function-modal-" + panelName;
            modal.className = "settings-overlay settings-function-modal";
            modal.dataset.settingsFunction = panelName;
            modal.setAttribute("role", "dialog");
            modal.setAttribute("aria-modal", "true");
            modal.setAttribute("aria-labelledby", "settings-panel-title-" + panelName);
            modal.hidden = true;

            const heading = panel.querySelector("h3");
            if (heading) heading.id = "settings-panel-title-" + panelName;

            const card = document.createElement("div");
            card.className = "settings-function-card";
            const closeButton = document.createElement("button");
            closeButton.className = "settings-close-button settings-function-close";
            closeButton.type = "button";
            closeButton.setAttribute("aria-label", "Close " + (panelName === "catalogue" ? "catalogue management" : "system user management"));
            closeButton.innerHTML = "&times;";
            closeButton.addEventListener("click", function () {
                closeSettingsFunction(panelName);
            });
            card.appendChild(closeButton);
            panel.hidden = false;
            card.appendChild(panel);
            modal.appendChild(card);
            document.body.appendChild(modal);
        });
    }

    function showSettingsPanel(panelName) {
        document.querySelectorAll("[data-settings-panel-content]").forEach(function (panel) {
            panel.hidden = panel.dataset.settingsPanelContent !== panelName;
        });
        document.querySelectorAll("[data-settings-panel]").forEach(function (button) {
            button.classList.toggle("active", button.dataset.settingsPanel === panelName);
        });
    }

    function addCatalogueColour() {
        const input = getElement("catalogue-new-colour");
        const list = getElement("catalogue-colour-list");
        if (!input || !list) return;
        const name = input.value.trim();
        if (!name) {
            input.focus();
            return;
        }
        const value = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "custom";
        const existing = Array.from(list.querySelectorAll("input")).some(function (checkbox) {
            return checkbox.value === value;
        });
        if (!existing) {
            const label = document.createElement("label");
            label.className = "settings-chip";
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "colour";
            checkbox.value = value;
            checkbox.checked = true;
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(" " + name));
            list.appendChild(label);
        }
        input.value = "";
    }

    function ensureColourSelection(name, checked) {
        const list = getElement("catalogue-colour-list");
        if (!list || !name) return;
        const value = String(name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "custom";
        let checkbox = Array.from(list.querySelectorAll('input[name="colour"]')).find(function (item) {
            return item.value === value;
        });
        if (!checkbox) {
            const label = document.createElement("label");
            label.className = "settings-chip";
            checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "colour";
            checkbox.value = value;
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(" " + name));
            list.appendChild(label);
        }
        checkbox.checked = checked;
    }

    function resetCatalogueForm() {
        const form = getElement("catalogue-item-form");
        const preview = getElement("catalogue-image-preview");
        const status = getElement("catalogue-form-status");
        if (form) form.reset();
        const existingItem = getElement("catalogue-existing-item");
        if (existingItem) existingItem.value = "";
        if (preview) preview.textContent = "No image selected";
        if (status) {
            status.hidden = true;
            status.textContent = "";
        }
    }

    function showUserManagementNotice() {
        const notice = getElement("user-management-notice");
        if (notice) notice.textContent = "Adding a system user is available after a backend or authentication provider is connected; this preview does not store passwords.";
    }

    function selectedValues(selector) {
        return Array.from(document.querySelectorAll(selector + ":checked")).map(function (input) {
            return input.value;
        });
    }

    function saveCatalogueDraft(event) {
        event.preventDefault();
        const name = getElement("catalogue-item-name").value.trim();
        const uom = getElement("catalogue-item-uom").value.trim();
        const price = getElement("catalogue-item-price").value.trim();
        const categories = selectedValues('input[name="category"]');
        const status = getElement("catalogue-form-status");
        if (!name || !uom || !price || categories.length === 0) {
            if (status) {
                status.hidden = false;
                status.style.color = "#b91c1c";
                status.textContent = "Item name, UOM, price, and at least one category are required.";
            }
            return;
        }
        const imageInput = getElement("catalogue-item-image");
        const draft = {
            itemName: name,
            description: getElement("catalogue-item-description").value.trim(),
            uom: uom,
            price: price,
            categories: categories,
            colours: selectedValues('input[name="colour"]'),
            imageName: imageInput && imageInput.files[0] ? imageInput.files[0].name : ""
        };
        try {
            window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        } catch (storageError) {
            // The form is still useful when storage is unavailable.
        }
        if (status) {
            status.hidden = false;
            status.style.color = "#166534";
            status.textContent = "Catalogue draft saved in this browser. Connect a backend to publish it to all devices.";
        }
    }

    function previewImage(event) {
        const preview = getElement("catalogue-image-preview");
        const file = event.target.files && event.target.files[0];
        if (!preview || !file) {
            if (preview) preview.textContent = "No image selected";
            return;
        }
        const url = URL.createObjectURL(file);
        preview.textContent = "";
        const image = document.createElement("img");
        image.src = url;
        image.alt = "Preview of " + file.name;
        image.addEventListener("load", function () { URL.revokeObjectURL(url); }, { once: true });
        preview.appendChild(image);
    }

    function showExistingProductImage(imagePath, productName) {
        const preview = getElement("catalogue-image-preview");
        if (!preview) return;
        if (!imagePath) {
            preview.textContent = "No image selected";
            return;
        }
        preview.textContent = "";
        const image = document.createElement("img");
        image.src = imagePath;
        image.alt = (productName || "Catalogue item") + " image";
        preview.appendChild(image);
    }

    function loadExistingProduct(event) {
        const selectedId = event.target.value;
        if (!selectedId || typeof products === "undefined") return;
        const product = products.find(function (item) {
            return String(item.id) === String(selectedId);
        });
        if (!product) return;
        getElement("catalogue-item-name").value = product.name || "";
        getElement("catalogue-item-description").value = product.desc || product.description || "";
        getElement("catalogue-item-uom").value = product.uom || "unit";
        getElement("catalogue-item-price").value = product.priceText || (typeof product.price === "number" ? "RM " + product.price.toFixed(2) : product.price || "");
        document.querySelectorAll('input[name="category"]').forEach(function (checkbox) {
            const categories = Array.isArray(product.categories) ? product.categories : [product.category];
            checkbox.checked = categories.indexOf(checkbox.value) !== -1;
        });
        document.querySelectorAll('input[name="colour"]').forEach(function (checkbox) {
            checkbox.checked = false;
        });
        if (Array.isArray(product.colors)) {
            product.colors.forEach(function (colour) {
                const colourName = typeof colour === "string" ? colour : colour && colour.name;
                ensureColourSelection(colourName, true);
            });
        }
        showExistingProductImage(product.image, product.name);
        const status = getElement("catalogue-form-status");
        if (status) {
            status.hidden = false;
            status.style.color = "#166534";
            status.textContent = "Loaded “" + (product.name || "item") + "” for editing. Save to keep a local draft.";
        }
    }

    function populateExistingItems() {
        const select = getElement("catalogue-existing-item");
        if (!select || typeof products === "undefined" || !Array.isArray(products)) return;
        products.slice().sort(function (a, b) {
            return String(a.name || "").localeCompare(String(b.name || ""));
        }).forEach(function (product) {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = (product.name || "Unnamed item") + " (#" + product.id + ")";
            select.appendChild(option);
        });
        select.addEventListener("change", loadExistingProduct);
    }

    async function hashCredential(value) {
        if (!window.crypto || !window.crypto.subtle || typeof TextEncoder === "undefined") {
            throw new Error("Secure credential verification is unavailable in this browser.");
        }
        const bytes = new TextEncoder().encode(value);
        const digest = await window.crypto.subtle.digest("SHA-256", bytes);
        return Array.from(new Uint8Array(digest), function (byte) {
            return byte.toString(16).padStart(2, "0");
        }).join("");
    }

    async function handleLogin(event) {
        event.preventDefault();
        const username = getElement("settings-username").value.trim();
        const password = getElement("settings-password").value;
        const error = getElement("settings-login-error");
        if (!username || !password) {
            if (error) {
                error.hidden = false;
                error.textContent = "Username and password are required.";
            }
            return;
        }
        let credentialsMatch = false;
        try {
            const hashes = await Promise.all([hashCredential(username), hashCredential(password)]);
            credentialsMatch = hashes[0] === PREVIEW_USERNAME_HASH && hashes[1] === PREVIEW_PASSWORD_HASH;
        } catch (verificationError) {
            if (error) {
                error.hidden = false;
                error.textContent = verificationError.message;
            }
            return;
        }
        if (!credentialsMatch) {
            if (error) {
                error.hidden = false;
                error.textContent = "Incorrect username or password.";
            }
            return;
        }
        try {
            window.sessionStorage.setItem(AUTH_KEY, username);
        } catch (storageError) {
            // Continue as a temporary in-memory preview if storage is unavailable.
        }
        closeSettingsLogin();
        openSettingsPage(username);
    }

    window.openSettingsLogin = openSettingsLogin;
    window.closeSettingsLogin = closeSettingsLogin;
    window.closeSettingsPage = closeSettingsPage;
    window.openSettingsFunction = openSettingsFunction;
    window.closeSettingsFunction = closeSettingsFunction;
    window.showSettingsPanel = showSettingsPanel;
    window.addCatalogueColour = addCatalogueColour;
    window.resetCatalogueForm = resetCatalogueForm;
    window.showUserManagementNotice = showUserManagementNotice;

    document.addEventListener("DOMContentLoaded", function () {
        const loginForm = getElement("settings-login-form");
        const catalogueForm = getElement("catalogue-item-form");
        const imageInput = getElement("catalogue-item-image");
        if (loginForm) loginForm.addEventListener("submit", handleLogin);
        if (catalogueForm) catalogueForm.addEventListener("submit", saveCatalogueDraft);
        if (imageInput) imageInput.addEventListener("change", previewImage);
        populateExistingItems();
        setupSettingsFunctionModals();
        document.addEventListener("keydown", function (event) {
            if (event.key !== "Escape") return;
            const openModal = document.querySelector(".settings-function-modal:not([hidden])");
            if (openModal) {
                closeSettingsFunction(openModal.dataset.settingsFunction);
                return;
            }
            const login = getElement("settings-login-modal");
            if (login && !login.hidden) closeSettingsLogin();
        });
    });
}());
