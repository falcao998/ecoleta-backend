import express from "express";

const app = express();

app.get("/", (req , res) => {
    console.log("Listagem do Ecolab - Olá mundo");
    res.json(["Felipe Souza","Pedro Souza","Artur Souza","Thiago Souza"]);
});

app.listen(3333,()=>{
    console.log("Servidor rodando na porta 3333");
});