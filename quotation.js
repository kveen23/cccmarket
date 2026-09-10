/* Layout based on templates/quotation-master.pdf, with the approved header/customer changes. */
(function () {
    "use strict";
    let signatureImagePromise;
    function loadSignatureImage() {
        if (signatureImagePromise) return signatureImagePromise;
        if (window.__quotationSignatureImage) return Promise.resolve(window.__quotationSignatureImage);
        if (typeof Image === "undefined") return Promise.resolve(null);
        signatureImagePromise = new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                try {
                    resolve({ dataUrl: imageToDataUrl(image), width: image.naturalWidth, height: image.naturalHeight });
                } catch (error) {
                    signatureImagePromise = null;
                    reject(new Error("The quotation signatory image could not be prepared."));
                }
            };
            image.onerror = () => {
                signatureImagePromise = null;
                reject(new Error("The quotation signatory image could not be loaded."));
            };
            image.src = "vendor/cococrown-stamp-sign.png";
        });
        return signatureImagePromise;
    }
    function imageToDataUrl(image) {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext("2d").drawImage(image, 0, 0);
        return canvas.toDataURL("image/png");
    }
    window.createQuotationPDF = async function (items, details = {}, date = new Date()) {
        const signatureImage = await loadSignatureImage();
        const doc = new window.jspdf.jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        const left = 13, right = 197, bottom = 276;
        const cols = [13, 23, 112, 128, 160, 197];
        let y;
        const money = value => "RM " + value.toFixed(2);
        const priced = item => typeof item.price === "number" && Number.isFinite(item.price) && !item.priceText;
        const text = (value, x, at, size = 10, style = "normal", options = {}) => {
            doc.setFont("helvetica", style);
            doc.setFontSize(size);
            doc.setTextColor(0, 0, 0);
            doc.text(String(value), x, at, options);
        };
        function wrap(value, width, size = 10) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(size);
            return doc.splitTextToSize(String(value || ""), width);
        }
        function header() {
            text("CoCoCrown Jaya", left, 18, 20, "bold");
            text("No 95A, Lot 255, Block 3, Jalan Club", left, 25, 10);
            text("95000 Sri Aman, Sarawak", left, 30, 10);
            text("cococrownjaya@gmail.com", left, 35, 10);
            doc.setDrawColor(160); doc.setLineWidth(0.2); doc.line(left, 40, right, 40);
            text("QUOTATION", left, 51, 23);
            text("DATE:", 148, 48, 9);
            text(date.toLocaleDateString("en-GB"), right, 48, 9, "normal", { align: "right" });
            text("QUOTE #:", 148, 55, 9);
            text(details.quotationNumber || "", right, 55, 9, "normal", { align: "right" });
            y = 65;
        }
        function tableHeader() {
            text("ITEM", left, y, 11);
            y += 5;
            doc.setFillColor(247); doc.rect(left, y, right - left, 9, "F");
            ["NO.", "DESCRIPTION", "QTY", "U/ PRICE", "AMOUNT"].forEach((label, i) => {
                text(label, i === 2 ? 120 : cols[i] + 2, y + 6, 9, "normal", i === 2 ? {align: "center"} : {});
            });
            grid(y, 9); y += 9;
        }
        function grid(top, height) {
            doc.setDrawColor(210); doc.setLineWidth(0.15);
            doc.line(left, top, right, top); doc.line(left, top + height, right, top + height);
            cols.forEach(x => doc.line(x, top, x, top + height));
        }
        function newPage(withTable = false) {
            doc.addPage(); header();
            if (withTable) tableHeader();
        }
        header();
        // All three labels stay visible; missing customer values are deliberately blank.
        [["Quote To:", details.quoteTo, 1], ["Address:", details.address, 2], ["Contact:", details.contact, 1]].forEach(([label, value, minLines]) => {
            text(label, left, y, 10, "bold");
            const lines = wrap(value, 112);
            lines.forEach((line, index) => {
                if (y > bottom - 15) newPage();
                text(line, 36, y, 10);
                if (index < lines.length - 1) y += 5;
            });
            y += 5 * Math.max(1, minLines - lines.length + 1) + 2;
        });
        y += 4;
        if (y > bottom - 25) newPage();
        tableHeader();
        let total = 0, hasUnpriced = false;
        items.forEach((item, index) => {
            const description = [item.name, item.desc || item.description, item.color].filter(Boolean).join(" - ");
            const lines = wrap(description, 85, 9);
            const quantity = Number(item.quantity) || 0;
            const knownPrice = priced(item);
            if (knownPrice) total += item.price * quantity;
            else hasUnpriced = true;
            const unitLines = wrap(knownPrice ? money(item.price) : (item.priceText || "Contact Us"), 28, 9);
            const amountLines = wrap(knownPrice ? money(item.price * quantity) : "Contact Us", 33, 9);
            // Split oversized descriptions over pages, keeping ordinary rows together.
            let offset = 0;
            const count = Math.max(lines.length, unitLines.length, amountLines.length, 1);
            if (y + Math.max(9, count * 4.5 + 4) > bottom && count * 4.5 + 4 < 185) newPage(true);
            while (offset < count) {
                if (y + 9 > bottom) newPage(true);
                const capacity = Math.max(1, Math.floor((bottom - y - 4) / 4.5));
                const take = Math.min(capacity, count - offset);
                const height = Math.max(9, take * 4.5 + 4);
                grid(y, height);
                if (offset === 0) {
                    text(index + 1, left + 2, y + 6, 9);
                    text(quantity, 120, y + 6, 9, "normal", {align: "center"});
                }
                for (let j = 0; j < take; j++) {
                    const n = offset + j, at = y + 6 + j * 4.5;
                    if (lines[n]) text(lines[n], 25, at, 9);
                    if (unitLines[n]) text(unitLines[n], 158, at, 9, "normal", {align: "right"});
                    if (amountLines[n]) text(amountLines[n], 195, at, 9, "normal", {align: "right"});
                }
                y += height; offset += take;
            }
        });
        // Preserve the template's ruled writing area and totals/signature structure.
        while (y < 181) { grid(y, 8); y += 8; }
        if (y + 82 > bottom) newPage();
        y += 5;
        const summaryY = y;
        ["Make all checks payable to COCOCROWN JAYA.", "For questions, contact Angela at", "0146835922 or cococrownjaya@gmail.com"].forEach((line, i) => text(line, left, summaryY + 5 + i * 5, 8.5));
        text("THANK YOU FOR YOUR BUSINESS!", left, summaryY + 26, 9);
        ["SUBTOTAL", "TOTAL"].forEach((label, i) => {
            const at = summaryY + i * 9;
            if (i) { doc.setFillColor(242); doc.rect(112, at, 85, 9, "F"); }
            doc.setDrawColor(180); doc.rect(112, at, 85, 9); doc.line(160, at, 160, at + 9);
            text(label, 136, at + 6, 10, i ? "bold" : "normal", {align:"center"});
            text(money(total), 195, at + 6, 10, i ? "bold" : "normal", {align:"right"});
        });
        if (hasUnpriced) text("Priced items only; other prices on request.", 112, summaryY + 24, 8);
        // Leave a dedicated gap after the notes and thank-you line for the extracted stamp/sign.
        const signatureY = summaryY + 66;
        doc.setDrawColor(0); doc.line(left, signatureY, 94, signatureY); doc.line(123, signatureY, right, signatureY);
        if (signatureImage) {
            const maxWidth = 73, maxHeight = 30;
            const scale = Math.min(maxWidth / signatureImage.width, maxHeight / signatureImage.height);
            const imageWidth = signatureImage.width * scale;
            const imageHeight = signatureImage.height * scale;
            doc.addImage(signatureImage.dataUrl, "PNG", 53.5 - imageWidth / 2, signatureY - imageHeight - 2, imageWidth, imageHeight, undefined, "FAST");
        }
        text("CoCoCrown Jaya", 53.5, signatureY + 7, 10, "normal", {align: "center"});
        text("Authorised Signature & Stamp", 160, signatureY + 7, 9, "normal", {align: "center"});
        const pages = doc.getNumberOfPages();
        for (let page = 1; page <= pages; page++) {
            doc.setPage(page);
            text("CoCoCrown Jaya", left, 288, 8);
            text(`Page ${page} of ${pages}`, right, 288, 8, "normal", {align:"right"});
        }
        doc.setProperties({ title: "CoCoCrown Jaya Quotation", author: "CoCoCrown Jaya" });
        return doc;
    };
}());
