import {Request, Response} from "express";

import knex from "../database/connection";

class PointsController {
    async show(req : Request, res : Response){
        const {id} = req.params;

        const point = await  knex("points").where("id",id).first();

        if(point){

            const items = await knex("items")
                .join("point_items","items.id","=","point_items.item_id")
                .where("point_items.point_id",id);
                //.select("items.titulo, items.image")

            return res.json({point, items});
        } else {
            return res.status(400).json({ message:"Point not found"});
        }
    }

    async create(req : Request, res : Response) {

        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            numero,
            cidade,
            uf,
            items
        } = req.body;

        //const trx = await knex.transaction();

        const point = {
            image: "image-fake",
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            numero,
            cidade,
            uf
        };

        const insertedIds = await knex("points").insert(point);

        const point_id  = insertedIds[0];

        const pointItems = items.map((item_id :number) =>{
            return {
                item_id,
                point_id,
            };
        });

        const insertedItemsId = await knex("point_items").insert(pointItems);

        return res.json({
            point_id,
            ...point,
            items: {
                ...pointItems
            }
        });
    }
}

export default PointsController;