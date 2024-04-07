import Link from 'next/link'
import { Navbar } from "@/components/navbar";
import { MongoClient } from 'mongodb';


let prices = []
let loading = true;


  // Connection URL
  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);

  // Database Name
  const dbName = 'amazon_price';
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('price');
    // Retrieve documents from the collection
    prices = await collection.aggregate([
      {
        $group: {
          _id: '$asin',
          title: { $first: '$title' } // Take the first title for each ASIN
        }
      },
      {
        $project: {
          _id: 0, // Exclude the _id field from the result
          asin: '$_id',
          title: 1
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
    loading = false
  }


export default function Home() {
  
  return (
    <>
      <Navbar />
      <h1 className="font-bold m-auto my-2 text-3xl text-center">Welcome to Amazon Price Tracker</h1>
      <div className="main">
        <div className="italic m-2">Select one of the products below, for viewing the price trend</div>
        {loading ? (
          <div className="text-center mt-4">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <ul className="list-decimal m-10">
            {prices.map(item => (
              <li className="my-2" key={item.asin}>
                <Link href={`/${item.asin}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>

  );
}
