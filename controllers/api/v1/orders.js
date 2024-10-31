// GET /api/v1/orders - Haalt alle bestellingen op
const getAll = (req, res) => {
  const sortby = req.query.sortby;
  // Voeg hier logica toe om alle bestellingen op te halen en te sorteren op 'votes' of 'date'
  res.json({ message: "GET all orders", sortby });
};

// GET /api/v1/orders/:id - Haalt details op voor één specifieke bestelling
const get = (req, res) => {
  const orderId = req.params.id;
  // Voeg hier logica toe om de bestelling met orderId op te halen
  res.json({ message: `GET order with ID ${orderId}` });
};

// POST /api/v1/orders - Voegt een nieuwe bestelling toe
const create = (req, res) => {
  const { shoeSize, laceColor, customerContact } = req.body;
  // Voeg hier logica toe om de bestelling op te slaan
  res.status(201).json({ message: "Order created", shoeSize, laceColor, customerContact });
};

// PUT/PATCH /api/v1/orders/:id - Update de status van een bestelling (alleen voor admins)
const update = (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  // Voeg hier logica toe om de status van de bestelling te updaten
  res.json({ message: `Order ${orderId} updated`, status });
};

// DELETE /api/v1/orders/:id - Verwijdert een bestelling (alleen voor admins)
const remove = (req, res) => {
  const orderId = req.params.id;
  // Voeg hier logica toe om de bestelling te verwijderen
  res.json({ message: `Order ${orderId} deleted` });
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
