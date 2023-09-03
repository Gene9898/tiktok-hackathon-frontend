const getReq = async ({ route, headers }) => {
  try {
    const res = await fetch(route, {
      headers: headers,
    });
    const resBody = await res.json();
    return resBody;
  } catch (error) {
    console.log("Error from getReq in utils", error);
  }
};

const postReq = async ({ route, data, headers }) => {
  try {
    const res = await fetch(route, {
      data: data,
      headers: headers,
      method: "POST",
    });
    const resBody = await res.json();
    return resBody;
    
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
