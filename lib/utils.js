import axios from "axios";

const getReq = async ({ route, headers }) => {
  try {
    const res = await axios.get(route, {
      headers: headers,
    });
    return res.data;
  } catch (error) {
    console.log("Error from getReq in utils", error);
  }
};

const postReq = async ({ route, data, headers }) => {
  try {
    const res = await axios.post(route, data, {
      headers: headers,
    });
    return res.data;
  } catch (error) {
    console.log("Error from postReq in utils", error);
  }
};

const currencyFormatter = (amount) => {
  return new Intl.NumberFormat(["en-sg"], {
    style: "currency",
    currency: "SGD",
    currencyDisplay: "symbol",
  }).format(amount);
};

export { getReq, postReq, currencyFormatter };
