// Função para renderizar os looks
function renderLook() {
  const lookItems = JSON.parse(localStorage.getItem('lookItems')) || [];
  const lookList = document.getElementById('look-list');
  lookList.innerHTML = ''; // Limpa a lista antes de renderizar

  lookItems.forEach((item, index) => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <button class="action-button" onclick="adicionarAoCarrinho(${index})">Adicionar ao Carrinho</button>
      <button class="action-button" onclick="verDetalhes(${index})">Ver Detalhes</button>
      <button onclick="excluirDoLook(${index})">Excluir</button>
    `;
    lookList.appendChild(productItem);
  });
}

// Função para adicionar ao carrinho
function adicionarAoCarrinho(index) {
  const lookItems = JSON.parse(localStorage.getItem('lookItems')) || [];
  const produtoSelecionado = lookItems[index];

  // Adicionando dados fictícios, como preço e disponibilidade
  produtoSelecionado.price = (Math.random() * 100).toFixed(2); // Preço aleatório
  produtoSelecionado.availability = 'Em estoque'; // Disponibilidade fictícia
  produtoSelecionado.rating = '★★★★★'; // Avaliação fictícia

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(produtoSelecionado);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  lookItems.splice(index, 1);  // Remove o item do look
  localStorage.setItem('lookItems', JSON.stringify(lookItems));

  alert(`${produtoSelecionado.name} foi adicionado ao carrinho!`);

  renderLook();  // Re-renderiza os looks
  renderCart();  // Re-renderiza o carrinho
}

// Função para excluir do look
function excluirDoLook(index) {
  let lookItems = JSON.parse(localStorage.getItem('lookItems')) || [];
  lookItems.splice(index, 1);  // Remove o item do look
  localStorage.setItem('lookItems', JSON.stringify(lookItems));
  renderLook();  // Re-renderiza os looks
}

// Função que será usada quando o botão "Ver Detalhes" for clicado
function verDetalhes(index) {
  const lookItems = JSON.parse(localStorage.getItem('lookItems')) || [];
  const produto = lookItems[index];

  alert(`Detalhes do produto:\n
    Nome: ${produto.name}\n
    Descrição: ${produto.description}\n
    Preço: ${produto.price || 'Preço não disponível'}\n
    Disponibilidade: ${produto.availability || 'Em estoque'}\n
    Avaliação: ${produto.rating || '★★★★★'}
  `);
}

// Renderizando os looks e carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  renderLook();
  renderCart();
});
