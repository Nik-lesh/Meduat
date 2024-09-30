import axios from "axios";

const BASE_URL = "http://localhost:3030";

export const getRestraunt = async () => {
  try {
    const respose = await axios.get("http://localhost:3030/restraunts");
    console.log(respose.data);
    return respose.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};
