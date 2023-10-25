import { NextResponse } from 'next/server'

type Upload = {
  formData: FormData
}

export async function POST(request: Request) {
  const data: Upload = await request.json()
  const {formData} = data

  // Mongo DB
  const { MongoClient } = require("mongodb");
  const url = "mongodb+srv://jkantaros:rushsand34@gallery.jlbrqhi.mongodb.net/?retryWrites=true&w=majority"
  const client = new MongoClient(url);

  // Reference the database to use, can be new
  const dbName = "telescope-images";

  await client.connect();
  const db = client.db(dbName);

  // Reference the "people" collection in the specified database, can also be a new column
  const col = db.collection("images");                                                                                                                                    
  

  // Insert the document into the specified collection        
  const p = await col.insertOne(formData);
  return NextResponse.json({formData})
}
