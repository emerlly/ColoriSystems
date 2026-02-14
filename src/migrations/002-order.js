require("dotenv").config();
const mongoose = require("mongoose");

async function run() {
    console.log('url:', process.env.DATABASE_URL);
    try {

        
        await mongoose.connect(process.env.DATABASE_URL);
        console.log(' Conectado no MongoDB');

        const db = mongoose.connection.db;
        const collections = await db.listCollections({ name: "orders" }).toArray();

        if (collections.length) {
            console.log("Collection 'orders' já existe.");
            return process.exit();
        }
        // cria collection
        await db.createCollection("orders");
        console.log("Collection 'orders' criada.");

        // índices importantes
        await db.collection("orders").createIndex({ company: 1 });
        await db.collection("orders").createIndex({ customer: 1 });
        await db.collection("orders").createIndex({ status: 1 });
        await db.collection("orders").createIndex({ createdAt: -1 });

        console.log("Índices criados com sucesso.");

        process.exit();
    } catch (error) {
        console.error("Erro na migration:", error);
        process.exit(1);
    }
}

run();
