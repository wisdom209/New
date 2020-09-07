import express, { request, response } from "express";
import jwtCheck from "../jwtCheck";
import Product from "../models/productModel";
import { report } from "process";

const productRouter = express.Router();

productRouter.get("/", (request, response) => {
    Product.find({}).then((product) => response.send(product)).catch((err) => response.send({ err }));
});

productRouter.post("/createproduct", jwtCheck, (request, response) => {
    if (request.user.isAdmin === false) {
        return response.status(500).send({ msg: "make sure you are signed in as an admin" });
    }
    const product = new Product({
        title        : request.body.title,
        price        : request.body.price,
        category     : request.body.category,
        brand        : request.body.brand,
        image        : request.body.image,
        description  : request.body.description,
        quantity     : request.body.quantity,
        rating       : request.body.rating,
        numOfReviews : request.body.numOfReviews
    });

    if (product) {
        product.save().then((data) => response.send(data)).catch((err) => response.status(500).send({ msg: err }));
    }
});

productRouter.delete("/deleteproduct", jwtCheck, (request, response) => {
    if (request.user.isAdmin === false) {
        return response.status(500).send({ msg: "make sure you are signed in as an admin" });
    }
    response.send(request.query);
    const productId = request.query.id;
    Product.findById(productId)
        .then((product) => {
            if (product) {
                product.remove();
            }
        })
        .catch((err) => response.status(500).send({ msg: err }));
});

productRouter.put("/updateproduct", jwtCheck, (request, response) => {
    if (request.user.isAdmin === false) {
        return response.status(500).send({ msg: "make sure you are signed in as an admin" });
    }

    const productId = request.body.identity;

    Product.findById(productId)
        .then((product) => {
            (product.name = request.body.name),
                (product.price = request.body.price),
                (product.category = request.body.category),
                (product.brand = request.body.brand),
                (product.image = request.body.image),
                (product.description = request.body.description),
                (product.quantity = request.body.quantity),
                (product.rating = request.body.rating || 0),
                (product.numOfReviews = request.body.numOfReviews || 0);

            if (product) {
                product
                    .save()
                    .then((data) => response.send(data))
                    .catch((err) => response.send({ msg: "error updating products", err }));
            }
        })
        .catch((err) => response.send("could not find product", err));
});

export default productRouter;
