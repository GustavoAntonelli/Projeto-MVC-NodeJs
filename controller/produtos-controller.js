const produto_db = require('../models/produtos-model')//importanto o produtos-model que está dentro da pasta models

//definindo a funcionalidade da rota listar_produtos
exports.listar_produtos = (req, res) => {
    produto_db.find({}, (err, produto) => {
        if (err) {
            return res.status(500).send("Erro ao consultar Produto")
        }
        res.render("views/pages/produtos", { resultado: produto });//produtos_itens(objeto) recebe cada item da consulta && produto é cada item da consulta
    });
};

exports.cadastrar_produtos_get = (req, res)=>{
    res.render("views/pages/formProdutos");
};

exports.cadastrar_produtos_post = (req, res)=>{
    let salva_produto = new produto_db();
    salva_produto.nome = req.body.nome;
    salva_produto.vlUnit = req.body.valor;
    salva_produto.codBar = req.body.codbar;
    salva_produto.save((err)=>{
        if(err){
            return res.status(500).send("Erro ao cadastrar produto")
        };
        return res.redirect("/produtos")
    });
};

exports.deletar_produto = (req, res) =>{
    var id = req.params.id;

    produto_db.deleteOne({_id:id}, (err)=>{
        if(err){
            return res.status(500).send("Erro ao deletar produto");
        };
        res.redirect("/produtos");
    });
};

exports.editar_produto_get = (req, res)=>{
    var id = req.params.id;
    produto_db.findById(id, (err, produto)=>{
        if(err){
            return res.status(500).send("Erro ao editar");
        };
        res.render("views/pages/formEditarProduto", {resultado: produto});
    });
};

exports.editar_produto_post = (req, res) =>{
    var id = req.body.id;
    produto_db.findById(id, (err, produto)=>{
        if(err){
            return res.status(500).send("Erro ao editar Produto");
        };
        produto.nome = req.body.nome;
        produto.vlUnit = req.body.valor;
        produto.codBar = req.body.codbar
        produto.save(err =>{
            if(err){
                return res.status(500).send("Erro ao salvar Ediçao");
            };
            return res.redirect("/produtos")
        });
    });
};
