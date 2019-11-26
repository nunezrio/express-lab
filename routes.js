const express = require("express");
const cartItemRoutes = express.Router();

const cartItems = [
  { id: 1, product: "hamburger", price: 5, quantity: 2 },
  { id: 2, product: "cheeseburger", price: 7, quantity: 1 },
  { id: 3, product: "fries", price: 3, quantity: 3 }
];

let nextId = 4;

cartItemRoutes.get("/cart-items", (req, res) => {
  if (req.query.name) {
    let filteredCartItems = cartItems.filter(cartItem =>
      cartItem.product.includes(req.query.product)
    );
    res.json(filteredCartItems);
  } else {
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
