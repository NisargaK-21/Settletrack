// import express from "express";
// import cors from "cors";
// import settlementRoutes from "./routes/settlement.routes.js";
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/settlement", settlementRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Backend running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import settlementRoutes from "./routes/settlement.routes.js";

const app = express();

// 1. DYNAMIC CORS: This allows your specific frontend domain and localhost for testing
const allowedOrigins = [
  "https://intuitive-nature-production.up.railway.app", // Your Frontend Domain
  "http://localhost:3000"                           // For local testing
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 2. HEALTH CHECK: Use this to test if your backend is live independently
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Settlement API is live" });
});

// 3. ROUTES
app.use("/api/settlement", settlementRoutes);

// 4. PORT BINDING: Railway requires binding to 0.0.0.0 and using process.env.PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
