import express from "express";
import cors from "cors";
import settlementRoutes from "./routes/settlement.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/settlement", settlementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
