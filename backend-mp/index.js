const express = require("express");
const bodyParser = require("body-parser");
const mercadopago = require("mercadopago");
const app = express();
app.use(bodyParser.json());

// Configura las credenciales de Mercado Pago
mercadopago.configure({
  access_token:
    "TEST-3065058539253417-030805-b69b645c29502085d126e3de7d038d3f-477333440",
});

// Maneja la solicitud POST a /create_preference
app.post("/create_preference", async (req, res) => {
  const preference = {
    items: req.body.items,
  };
  try {
    const response = await mercadopago.preferences.create(preference);
    res.send(response.body);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creando la preferencia de pago.");
  }
});

// Escucha en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
