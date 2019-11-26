const express = require("express");
const cors = require("cors");
const cartItemRoutes = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", cartItemRoutes);

const port = 3000;

app.listen(port, () => console.log(`Listening on port: ${port}.`));
