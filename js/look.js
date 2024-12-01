function renderLook() {
  const lookItems = JSON.parse(localStorage.getItem('lookItems')) || [];
  const lookList = document.getElementById('look-list');
  lookList.innerHTML = '';

  lookItems.forEach((item, index) => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <button onclick="adicionarAoCarrinho('${item.name}', ${index})">Adicionar ao Carrinho</button>
      <button onclick="verDetalhes('${item.name}')">Ver Detalhes</button>
      <button onclick="excluirDoLook(${index})">Excluir</button>
    `;
    lookList.appendChild(productItem);
  });
}

function adicionarAoCarrinho(nomeProduto, index) {
  const produtoSelecionado = {
    name: nomeProduto,
    img: document.querySelector(`[alt="${nomeProduto}"]`).src,
    description: document.querySelector(`[alt="${nomeProduto}"]`).nextElementSibling.textContent,
    price: (Math.random() * 100).toFixed(2)
  };

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(produtoSelecionado);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  let lookItems = JSON.parse(localStorage.getItem('lookItems')) || [];
  lookItems.splice(index, 1);
  localStorage.setItem('lookItems', JSON.stringify(lookItems));

  alert(`${nomeProduto} foi adicionado ao carrinho!`);

  renderLook();
  renderCart();
}

function verDetalhes(nome) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="fecharModal()">&times;</span>
      <h2>${nome}</h2>
      <p>Aqui estão mais informações sobre o produto ${nome}. Você pode adicionar ao seu carrinho ou explorar mais opções.</p>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = "block";
}

function fecharModal() {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  modal.remove();
}

function excluirDoLook(index) {
  let lookItems = JSON.parse(localStorage.getItem('lookItems')) || [];
  lookItems.splice(index, 1);
  localStorage.setItem('lookItems', JSON.stringify(lookItems));
  renderLook();
}

renderLook();