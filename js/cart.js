document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updateCartCount = () => {
        const countElement = document.getElementById("cart-count");
        if (countElement) {
            const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
            countElement.textContent = totalItems;
        }
    };

    const renderCart = () => {
        const container = document.getElementById("cart-items-container");
        const totalElement = document.getElementById("cart-total");
        if (!container) return;

        if (cart.length === 0) {
            container.innerHTML = "<p>El carrito está vacío.</p>";
            if (totalElement) totalElement.textContent = "$0";
            return;
        }

        container.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            // Limpiar formato de precio para cálculos
            const priceNumeric = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
            total += priceNumeric * item.cantidad;

            const itemHTML = `
                <article class="cart-item">
                    <img src="${item.img || 'images/TAYLOR1.webp'}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h3>${item.title}</h3>
                        <p>Vinilo de alta fidelidad, edición coleccionista.</p>
                    </div>
                    <div class="cart-item-controls">
                        <span class="cart-item-price">${item.price}</span>
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                            <input type="text" class="qty-input" value="${item.cantidad}" readonly>
                            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                        </div>
                    </div>
                </article>
            `;
            container.innerHTML += itemHTML;
        });

        if (totalElement) {
            totalElement.textContent = `$ ${total.toLocaleString("es-CL")}`;
        }
    };

    window.changeQty = (index, delta) => {
        cart[index].cantidad += delta;
        if (cart[index].cantidad <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        renderCart();
    };

    // Escuchar botones de agregar en productos/detalle
    const addButtons = document.querySelectorAll(".btn-add-cart, .btn-add-cart-detail");
    addButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".product-card, .product-detail-wrapper");
            const title = card.querySelector(".product-title, .detail-title")?.textContent.trim() || "Producto";
            const price = card.querySelector(".product-price, .detail-price")?.textContent.trim() || "$0";
            const img = card.querySelector("img")?.getAttribute("src") || "";
            const selectQty = card.querySelector("#cantidad");
            const quantity = selectQty ? parseInt(selectQty.value) : 1;

            const existingIndex = cart.findIndex(item => item.title === title);
            if (existingIndex > -1) {
                cart[existingIndex].cantidad += quantity;
            } else {
                cart.push({ title, price, img, cantidad: quantity });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert(`¡Se agregó "${title}" al carrito!`);
        });
    });

    updateCartCount();
    renderCart();
});