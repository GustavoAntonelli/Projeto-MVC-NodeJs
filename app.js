const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = 5000;

mongoose.connect("mongodb+srv://gustavo_antonelli:<password>@cluster0.dyuuc.mongodb.net/...?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');
app.set('views', __dirname, 'views');
app.use(express.urlencoded({extended: true}));
app.use(express.json())

//importando o router
const produtos_router = require('./routers/produtos-router')
app.use('/produtos', produtos_router)

app.get('/', (req, res)=>{
    res.send("HOME");
});

app.listen(PORT, ()=>{
    console.log(`server running gate ${PORT}`);
});