const mongoose = require('mongoose');

const Produtos = mongoose.model('produtos', {
    nome: String,
    vlUnit: String,
    codBar: String
});

module.exports = Produtos