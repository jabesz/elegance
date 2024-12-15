document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os botões de abrir modal
  const openModalButtons = document.querySelectorAll(".open-modal");

  openModalButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Extrai os dados do botão usando getAttribute
      const name = button.getAttribute("data-name") || "Produto sem nome";
      const img = button.getAttribute("data-img") || "https://via.placeholder.com/150";
      const description = button.getAttribute("data-description") || "Sem descrição disponível.";
      const price = button.getAttribute("data-price") || "Preço não disponível.";
      const availability = button.getAttribute("data-availability") || "Sem informação de estoque.";
      const rating = button.getAttribute("data-rating") || "Sem avaliações.";

      // Cria o modal dinamicamente
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

      // Adiciona o modal ao body
      document.body.appendChild(modal);

      // Mostra o modal
      modal.style.display = "flex";

      // Fecha o modal ao clicar no botão de fechar
      const closeModal = modal.querySelector(".close-modal");
      closeModal.addEventListener("click", () => {
        modal.remove();
      });

      // Fecha o modal ao clicar fora do conteúdo
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.remove();
        }
      });

      // Adiciona o evento de clique ao botão "Adicionar ao Carrinho"
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
