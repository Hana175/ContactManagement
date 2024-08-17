const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");

connectDb();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(errorHandler);
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
