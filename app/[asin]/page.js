import { Navbar } from "@/components/navbar"
import { DisplayChart } from '@/components/displayChart';
import { MongoClient } from "mongodb";


export default async function ChartPage({ params }) {

  // Connection URL
  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);

  // Database Name
  const dbName = 'amazon_price';
  let data = []



  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('price');
    // Retrieve documents from the collection
    let asin = params.asin
    data = await collection.aggregate([
      {
        $match: { asin: asin.toUpperCase() } // Match documents with the specified ASIN
      },
      {
        $group: {
          _id: "$asin",
          data: { $push: { time: { $dayOfMonth: "$date_time" }, price: { $toInt: "$price" } } } // Group data points into an array
        }
      },
      {
        $project: {
          _id: 0,
          label: "Product",
          data: "$data"
        }
      }
    ]).toArray();
  }
  catch (e) {
    console.log("Error connecting to mongodb", e)
  }
  finally {
    await client.close()
    console.log("Connection closed successfully")
  }

  return <>
    <Navbar />
    <div className="m-3 font-bold">Price trend of: {params.asin}</div>
    <br />
    <DisplayChart data={data} />
  </>
}