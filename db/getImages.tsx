const { MongoClient } = require("mongodb");
  
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://jkantaros:rushsand34@gallery.jlbrqhi.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);

//Looking for telescope images
const dbName = "telescope-images";

export async function getImages() {

  try{

      await client.connect();
      const db = client.db(dbName);

      const col = db.collection("images");
      const findResult = await col.find({}).toArray();
      console.log('Found documents =>', findResult);

      } catch (error) {
        if (error) {
          console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
      }

    finally {
      await client.close();
  }
}
