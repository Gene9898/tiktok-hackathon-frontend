import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  // console.log("REQ @ POSTCARDDETAILS");
  console.log(req.body);
  try {
    const client = await clientPromise;
    const db = client.db("tiktok_hackathon");
    const collection = db.collection("card_details");
    const result = await collection.insertOne(req.body);
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error at postCardDetails api route", error);
  }
}
