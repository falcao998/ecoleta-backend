import express from "express";

const routes = express.Router();

routes.get("/", (req , res) => {
    return res.json({message:"Listagem do Ecolab - Olá mundo"});
});

export default routes;