const PORT = 3000; // Change to any available port number

const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

// Import routes
const authRoute = require("./routes/auth");

// Route middleware
app.use("/api/user", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DB_CONNECT;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
