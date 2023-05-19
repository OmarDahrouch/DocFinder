const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const { mogoUrl } = require("./database");
const mongoose = require("mongoose");

// Middleware pour l'api patients------------------------------------------

require("./models/patients");

const authRoutes = require("./routes/authRoute");
app.use(bodyParser.json());
app.use(authRoutes);

// Middleware pour l'api des appointments---------------------------------

require("./models/appointments");

const appointmentRoute = require("./routes/appointmentRoute");
app.use(bodyParser.json());
app.use(appointmentRoute);

// Middleware pour l'api des docteurs---------------------------------

require("./models/doctors");

const doctorRoute = require("./routes/doctorRoute");
app.use(bodyParser.json());
app.use(doctorRoute);

// Middleware pour l'api des reviews---------------------------------

require("./models/reviews");

const reviewsRoute = require("./routes/reviewsRoute");
app.use(bodyParser.json());
app.use(reviewsRoute);

// DataBase Config ----------------------------------------------------

mongoose.connect(mogoUrl);

mongoose.connection.on("connected", () => {
  console.log("Connection to DataBase Successful !!!");
});

mongoose.connection.on("error", (err) => {
  console.log("You got an error", err);
});

// Server Config ------------------------------------------------------

app.get("/", (req, res) => {
  console.log("Body-parser success !!!");
  res.send("Hello everybody");
});

app.listen(PORT, () => {
  console.log("Server running " + PORT);
});

//----------------------------------------------------------------------
