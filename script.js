const url = "http://localhost:3000/cosmeticos";

const cosmeticos = [];
let cosmeticoAtual = null;

carregarCosmeticos();

async function carregarCosmeticos() {
  try {
    const response = await fetch(url + "/listar");

    if (!response.ok) {
      throw new Error("Erro ao buscar cosméticos");
    }

    const data = await response.json();

    cosmeticos.length = 0;
    cosmeticos.push(...data);

    renderizarCosmeticos();
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar cosméticos");
  }
}

function renderizarCosmeticos() {
  const main = document.getElementById("listaCosmeticos");
  main.innerHTML = "";

  cosmeticos.forEach((cosmetico) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${cosmetico.img || cosmetico.urlImagem}" alt="${cosmetico.nome}">
      <h3>${cosmetico.nome}</h3>
      <p><strong>Marca:</strong> ${cosmetico.marca || "-"}</p>
      <p><strong>Categoria:</strong> ${cosmetico.categoria || "-"}</p>
      <p><strong>Preço:</strong> R$ ${Number(cosmetico.preco).toFixed(2)}</p>
    `;

    const btn = document.createElement("button");
    btn.innerText = "Ver detalhes";
    btn.classList.add("btn-card");

    btn.onclick = (e) => {
      e.stopPropagation(); 
      abrirDetalhes(cosmetico);
    };

    card.appendChild(btn);
    card.onclick = () => abrirDetalhes(cosmetico);
    main.appendChild(card);
  });
}

function abrirDetalhes(cosmetico) {
  cosmeticoAtual = cosmetico.id;

  document.getElementById("tituloCosmetico").innerText = cosmetico.nome;
  document.getElementById("imgCosmetico").src =
    cosmetico.img || cosmetico.urlImagem;
  document.getElementById("nomeEdit").value = cosmetico.nome;
  document.getElementById("imgEdit").value =
    cosmetico.img || cosmetico.urlImagem;
  document.getElementById("categoriaEdit").value = cosmetico.categoria;
  document.getElementById("marcaEdit").value = cosmetico.marca;
  document.getElementById("precoEdit").value = cosmetico.preco;

  detalhes.classList.remove("oculto");
}

document
  .getElementById("formCosmetico")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const novoCosmetico = {
      nome: document.getElementById("nome").value,
      categoria: document.getElementById("categoria").value,
      marca: document.getElementById("marca").value,
      preco: parseFloat(document.getElementById("preco").value),
      img: document.getElementById("urlImagem").value,
    };

    try {
      const response = await fetch(url + "/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoCosmetico),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar");
      }

      cadastro.classList.add("oculto");
      e.target.reset();
      carregarCosmeticos();
    } catch (e) {
      console.error(e);
      alert("Erro ao cadastrar cosmetico");
    }
  });

async function salvarEdicao() {
  const cosmeticoEditado = {
    nome: document.getElementById("nomeEdit").value,
    categoria: document.getElementById("categoriaEdit").value,
    marca: document.getElementById("marcaEdit").value,
    preco: parseFloat(document.getElementById("precoEdit").value),
    img: document.getElementById("imgEdit").value,
  };

  try {
    const response = await fetch(url + "/atualizar/" + cosmeticoAtual, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cosmeticoEditado),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar");
    }

    detalhes.classList.add("oculto");
    carregarCosmeticos();
  } catch (e) {
    console.error(e);
    alert("Erro ao atualizar cosmetico");
  }
}

async function excluirCosmetico() {
  const confirmacao = confirm("Deseja excluir este cosmetico?");
  if (!confirmacao) return;

  try {
    const response = await fetch(url + "/excluir/" + cosmeticoAtual, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir");
    }

    detalhes.classList.add("oculto");
    carregarCosmeticos();
  } catch (e) {
    console.error(e);
    alert("Erro ao excluir cosmetico");
  }
}