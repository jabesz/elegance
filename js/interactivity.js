document.getElementById('logout-button').addEventListener('click', () => {
  alert('Logout realizado com sucesso!');
  window.location.href = "login.html";
});

async function fetchAndDisplayProducts() {
  try {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();

    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
        <img src="${product.image_url}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p><strong>R$ ${product.price.toFixed(2)}</strong></p>
      `;
      productList.appendChild(productItem);
    });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
}

if (document.getElementById('product-list')) {
  fetchAndDisplayProducts();
}

function adicionarAoLook(produto) {

  const imgElement = document.querySelector(`#${produto}-img`);
  const descElement = document.querySelector(`#${produto}-desc`);

  if (!imgElement || !descElement) {
    alert("Erro: Produto não encontrado. Verifique os IDs.");
    return;
  }

  let produtoSelecionado = {
    name: produto,
    img: imgElement.src,
    description: descElement.textContent
  };

  let lookItems = JSON.parse(localStorage.getItem('lookItems')) || [];

  lookItems.push(produtoSelecionado);

  localStorage.setItem('lookItems', JSON.stringify(lookItems));

  alert(`${produto} foi adicionado ao seu look com sucesso!`);
}

function verDetalhes(nome) {
  fecharModal();

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

  modal.style.display = "flex";
}

function fecharModal() {
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.style.display = "none";
    modal.remove();
  }
}

function adicionarAoCarrinho(nomeProduto) {
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
  lookItems = lookItems.filter(item => item.name !== nomeProduto);
  localStorage.setItem('lookItems', JSON.stringify(lookItems));

  alert(`${nomeProduto} foi adicionado ao carrinho!`);
  renderLook();
  renderCart();
}


window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function logout() {
  alert('Logout realizado com sucesso!');
  window.location.href = "login.html";
}
