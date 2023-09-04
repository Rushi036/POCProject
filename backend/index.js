// Calling all the dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Calling the Db
const connectDB = require("./database/connecction.js");

// Calling all the routes from here
const routes = require("./routes/mainRoutes.js");
const userRoutes = require("./routes/usersMaster.js");
const rbacRoutes = require("./routes/rbacMaster.js");
const beRoutes = require("./routes/businessEntity.js");
const serviceCatelogueRoutes = require("./routes/serviceCatelogue.js");
const awsServiceOrderRoutes = require("./routes/awsServiceOrder.js");
const azureServiceOrderRoutes = require("./routes/azureServiceOrder.js");

const app = express();
app.use(cookieParser());
app.use(express.json());

// Calling and connecting to the database
connectDB();

// adding cors policy
app.use(cors({
  origin: '*',
  // credentials: true,
}));

// Calling the routes
app.use("/api", routes);
app.use("/api", userRoutes);
app.use("/api", rbacRoutes);
app.use("/api", beRoutes);
app.use("/api", serviceCatelogueRoutes);
app.use("/api", awsServiceOrderRoutes);
app.use("/api", azureServiceOrderRoutes);


// Listening to the Node server
app.listen(process.env.PORT, () => {
  console.log(`Server running on the port: ${process.env.PORT}`);
});
