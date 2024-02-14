import express, { Express, Request, Response } from "express";
const { v4: uuidv4 } = require("uuid");
import Joi, { ValidationResult } from "joi";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || (process.env.NODE_ENV === "test" ? 3001 : 3000);

const validateApiKey = (req: Request, res: Response, next: Function) => {
    const apiKey = req.header("x-api-key");
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).send("Invalid API Key");
    }
    next();
};

app.use(cors());
app.use(express.json());
app.use(validateApiKey);

interface Device {
    id: string;
    name?: string;
    address?: string;
    longitude?: number;
    latitude?: number;
    device_type?: "node" | "luminaire";
    manufacturer?: string;
    model?: string;
    install_date?: string;
    notes?: string;
    eui?: string;
    serial_number?: string;
}

const validateDeviceInput = (device: Device): ValidationResult => {
    let schema = Joi.object({
        name: Joi.string().min(3).max(50),
        address: Joi.string().min(10).max(200),
        longitude: Joi.number().min(-180).max(180),
        latitude: Joi.number().min(-90).max(90),
        device_type: Joi.string().valid("node", "luminaire"),
        manufacturer: Joi.string(),
        model: Joi.string(),
        install_date: Joi.string(),
        notes: Joi.string(),
        eui: Joi.string().length(17),
        serial_number: Joi.string().alphanum(),
    });

    return schema.validate(device);
};

let devices: Device[] = [];

// CRUD operations

// Create a new device
app.post("/devices", (req: Request, res: Response) => {
    const input = req.body;
    const devicesToCreate = Array.isArray(input) ? input : [input]; // Ensure input is treated as an array
    const createdDevices: Device[] = [];
    const errors: any[] = [];

    devicesToCreate.forEach((deviceInput, index) => {
        const { error } = validateDeviceInput(deviceInput);
        if (error) {
            errors.push({ index, error: error.details[0].message });
            return;
        }
        const device: Device = { id: uuidv4(), ...deviceInput };
        devices.push(device);
        createdDevices.push(device);
    });

    if (errors.length > 0) {
        return res.status(400).send({ errors, createdDevices });
    }

    res.status(201).send(createdDevices.length === 1 ? createdDevices[0] : createdDevices);
});

// Read all devices
app.get("/devices", (req: Request, res: Response) => {
    res.status(200).send(devices);
});

// Read a single device by id
app.get("/devices/:id", (req: Request, res: Response) => {
    const device = devices.find((d) => d.id === req.params.id);
    if (!device) return res.status(404).send("Device not found");
    res.send(device);
});

// Update a device
app.put("/devices/:id", (req: Request, res: Response) => {
    const { error } = validateDeviceInput(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const device = devices.find((d) => d.id === req.params.id);
    if (!device) return res.status(404).send("Device not found");
    Object.assign(device, req.body);
    res.send(device);
});

// Delete a device
app.delete("/devices/:id", (req: Request, res: Response) => {
    devices = devices.filter((d) => d.id !== req.params.id);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
