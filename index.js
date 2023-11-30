import pgPromise from "pg-promise";
import express from "express";
import cors from "cors";
import FuelConsumption from "./fuel-consumption.js";
import FuelConsumptionAPI from "./fuel-consumption-api.js";

import dotenv from "dotenv";
/* ##### CONFIGURE DOTENV ##### */
dotenv.config();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://fuel:fuel@localhost:5432/fuel_consumption";

const config = {
  connectionString: DATABASE_URL,
};
//create pg promise instance
const pgp = pgPromise();
//create database variable and connect to the db
const db = pgp(config);

const fuelConsumption = FuelConsumption(db);
const fuelConsumptionAPI = FuelConsumptionAPI(fuelConsumption);

const app = express();
const PORT = process.env.PORT || 3000;

/* -------------------- GET ACCESS TO OUR STATIC FILES -------------------- */
app.use(express.static("public"));
app.use(express.json());
//allow api to be accessed by other servers
app.use(cors());
app.get("/api/vehicles", fuelConsumptionAPI.vehicles);
app.get("/api/vehicle", fuelConsumptionAPI.vehicle);
app.post("/api/vehicle", fuelConsumptionAPI.addVehicle);
app.post("/api/refuel", fuelConsumptionAPI.refuel);

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));
