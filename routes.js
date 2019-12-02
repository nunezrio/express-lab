const express = require("express");
const cartItemRoutes = express.Router();

cartItemRoutes.get("/cart-items:id", (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM shopping_cart";
  pool.query(sql).then(result => {
    // .json sends response as JSON
    res.json(result.rows);
  });
});

cartItemRoutes.get("/cart-items", (req, res) => {
  if (req.query.name) {
    let filteredCartItems = cartItems.filter(cartItem =>
      cartItem.product.includes(req.query.product)
    );
    res.json(filteredCartItems);
  } else {
    res.status(200);
    res.json(cartItems);
  }
});

cartItemRoutes.get("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const cartItem = cartItems.find(i => i.id === id);
  if (cartItem) {
    res.json(cartItem);
  } else {
    res.status(404);
    res.send(`ID ${id} Not Found`);
  }
});

cartItemRoutes.post("/cart-items", (req, res) => {
  const cartItem = req.body;
  cartItem.id = nextId++;
  cartItems.push(cartItem);
  res.status(201);
  res.json(cartItem);
});

cartItemRoutes.put("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const cartItem = req.body;
  cartItem.id = id;
  const index = cartItems.findIndex(i => i.id === id);
  cartItems.splice(index, 1, cartItem);
  res.json(cartItem);
});

cartItemRoutes.delete("/cart-iteims/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cartItems.findIndex(i => i.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  res.sendStatus(204);
});

module.exports = cartItemRoutes;
