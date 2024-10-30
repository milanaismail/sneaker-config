const getAll = (req, res) => {
  res.send("GET orders");
};

const create = (req, res) => {
  res.send("POST orders");
};

const update = (req, res) => {
  res.send("PUT orders");
};

const remove = (req, res) => {
  res.send("DELETE orders");
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
