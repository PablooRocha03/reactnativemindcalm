const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Diario = require("./Diario");

const app = express();

mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://luizmiranda29e:dWaKFYmMUIfWpf9W@calm-mind.3d8pt5v.mongodb.net/?retryWrites=true&w=majority&appName=Calm-Mind",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
app.use(express.json());

app.get("/registros", async (req, res) => {
  const denuncias = await Diario.find();
  res.json(denuncias);
});

app.post("/registros", async (req, res) => {
  const { titulo, descricao, local } = req.body;
  const denuncia = new Diario({ titulo, descricao, local });
  await denuncia.save();
  res.json(denuncia);
});

app.get("/registros/:id", async (req, res) => {
  const denuncia = await Diario.findById(req.params.id);
  res.send(denuncia);
});
app.delete("/registros/:id", async (req, res) => {
  await Diario.findByIdAndDelete(req.params.id);
  res.send("Registro deletado com sucesso");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
