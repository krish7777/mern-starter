const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();
app.use(express.json());

app.get("/", (req, res) => res.send("hmm fine")); //checking route*/

app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
