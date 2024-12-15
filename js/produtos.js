document.addEventListener("DOMContentLoaded", () => {
  const openModalButtons = document.querySelectorAll(".open-modal");

  openModalButtons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name") || "Produto sem nome";
      const img = button.getAttribute("data-img") || "https://via.placeholder.com/150";
      const description = button.getAttribute("data-description") || "Sem descrição disponível.";
      const price = button.getAttribute("data-price") || "Preço não disponível.";
      const availability = button.getAttribute("data-availability") || "Sem informação de estoque.";
      const rating = button.getAttribute("data-rating") || "Sem avaliações.";

      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `
          <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${name}</h2>
            <img src="${img}" alt="${name}">
            <p>${description}</p>
            <p class="price">${price}</p>
            <p class="availability">${availability}</p>
            <div class="rating">
              <span>${rating}</span>
            </div>
            <button class="add-to-cart">Adicionar ao Carrinho</button>
          </div>
        `;

      document.body.appendChild(modal);

      modal.style.display = "flex";

      const closeModal = modal.querySelector(".close-modal");
      closeModal.addEventListener("click", () => {
        modal.remove();
      });

      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.remove();
        }
      });

      const addToCartButton = modal.querySelector(".add-to-cart");
      addToCartButton.addEventListener("click", () => {
        adicionarAoCarrinho({ name, img, description, price });
        modal.remove();
        alert(`${name} foi adicionado ao carrinho!`);
      });
    });
  });

  function adicionarAoCarrinho(produto) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    cartItems.push(produto);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
});
