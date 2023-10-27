const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://jkantaros:rushsand34@gallery.jlbrqhi.mongodb.net/?retryWrites=true&w=majority"
// Connect to your Atlas cluster
const client = new MongoClient(url);
async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");
    } catch (error) {
        if (error) {
          console.log(`Error worth logging: ${error}`); // special case for some reason
        }
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);