import axios from "axios";

export default async function Peler() {
  try {
    const result = await axios.get(`${process.env.API_BACKEND}review`);
    const detail = JSON.parse(JSON.stringify(result.data.data)) || null

    return detail;
    
  } catch (error) {
    console.log("error", error)
  }
}
