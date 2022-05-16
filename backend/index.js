const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

//
app.use(cors());
app.use(express.json());
require("dotenv").config();

//
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ogqtm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    console.log("from xarwin team");
    await client.connect();
    const database = client.db("Xarwin");
    const tableCollection = database.collection("tables");
    // const database = client.db("tourTheWorld");
    // const tourCollaction = database.collection("tours");
    // const bookedTour = database.collection("booked");

    // // GET API
    app.get("/data", async (req, res) => {
      const cursor = tableCollection.find({});
      const datas = await cursor.toArray();
      res.send(datas);
      //   console.log(datas);
    });

    app.post("/data/add", async (req, res) => {
      const newEntry = req.body;
      let entry = await tableCollection.insertOne(newEntry);
    //   let result = entry.save();
      res.send("Data added");
    });

    // //DELETE API
    app.delete("/data/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await tableCollection.deleteOne(query);
      console.log(result);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

//
app.get("/", (req, res) => {
  console.log("connected from get");
  res.send("Hello World! from NYX");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
