const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
// const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./config/db");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/rolebased/user/user.route");

connectToMongoDB();

const app = express();
// app.use(helmet)
app.use(morgan("dev"));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
