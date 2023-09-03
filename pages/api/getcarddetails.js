import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  console.log("REQ @ GETCARDDETAILS");
  try {
    const client = await clientPromise;
    const db = client.db("tiktok_hackathon");
    const collection = db.collection("card_details");
    const result = await collection.find({}).toArray();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error at getCardDetails api route", error);
  }
}
