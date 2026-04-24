const express = require("express");

const router = express.Router();


const {
  cadastrarCosmetico,
  listarCosmetico,
  buscarCosmetico,
  atualizarCosmetico,
  excluirCosmetico,
} = require("../controllers/cosmeticos.controller");

router.post("/cadastrar", cadastrarCosmetico);
router.get("/listar", listarCosmetico);
router.get("/buscar/:id", buscarCosmetico);
router.put("/atualizar/:id", atualizarCosmetico);
router.delete("/excluir/:id", excluirCosmetico);

module.exports = router;
