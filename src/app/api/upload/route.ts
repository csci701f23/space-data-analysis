import { NextResponse } from 'next/server'

type Upload = {
  file: File 
}


const { MongoClient } = require("mongodb");
  
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://jkantaros:rushsand34@gallery.jlbrqhi.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);

//Looking for telescope images
const dbName = "telescope-images";

export async function POST(request: Request) {
  const data: Upload = await request.json()

  await client.connect();
  const db = client.db(dbName);

  // Reference the "people" collection in the specified database, can also be a new column
  const col = db.collection("images");                                                                                                                                    
  
  // Insert the document into the specified collection        
  const p = await col.insertOne(data);
  return NextResponse.json({"message":"File Successfully Uploaded to Database"})
}


// GET REQUEST
export async function GET(request: Request) {
  
  await client.connect();
  const db = client.db(dbName);

  const col = db.collection("images");
  const findResult = await col.find().toArray()

  console.log(findResult.map((image:any, index:any) => {
    return image['file']
  }))

  return NextResponse.json({'Found documents =>': findResult})
  
}
