const prisma = require("../data/prisma");

const cadastrarCosmetico = async (req, res) => {
  try {
    const { nome, preco, categoria, marca, img } = req.body;

    const item = await prisma.cosmeticos.create({
      data: {
        nome,
        preco: parseFloat(preco),
        categoria,
        marca,
        img,
      }
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const listarCosmetico = async (req, res) => {
  try {
    const lista = await prisma.cosmeticos.findMany();
    res.status(200).json(lista);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const buscarCosmetico = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await prisma.cosmeticos.findUnique({
      where: { id: Number(id) }
    });

    if (!item) {
      return res.status(404).json({ erro: "Cosmetico não encontrado" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const atualizarCosmetico = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    const item = await prisma.cosmeticos.update({
      where: { id: Number(id) },
      data: dados
    });

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const excluirCosmetico = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await prisma.cosmeticos.delete({
      where: { id: Number(id) }
    });

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

module.exports = {
  cadastrarCosmetico,
  listarCosmetico,
  buscarCosmetico,
  atualizarCosmetico,
  excluirCosmetico
};