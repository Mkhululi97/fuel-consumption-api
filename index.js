/* ##### BRING IN PG-PROMISE ##### */
import pgPromise from "pg-promise";
/* ##### BRING IN EXPRESS ##### */
import express from "express";
/* ##### BRING IN CORS ##### */
import cors from "cors";
/* ##### BRING IN SERVICES ##### */
import FuelConsumption from "./fuel-consumption.js";
/* ##### BRING IN API ##### */
import FuelConsumptionAPI from "./fuel-consumption-api.js";
/* ##### BRING IN DOTENV ##### */
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

app.use(express.json());
//allow api to be accessed by other servers
app.use(cors());
app.get("/api/vehicles", fuelConsumptionAPI.vehicles);
app.get("/api/vehicle", fuelConsumptionAPI.vehicle);
app.post("/api/vehicle", fuelConsumptionAPI.addVehicle);
app.post("/api/refuel", fuelConsumptionAPI.refuel);

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));
