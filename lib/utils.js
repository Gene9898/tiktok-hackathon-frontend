import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
const getReq = async ({ route, headers }) => {
  try {
    const res = await fetch(route, { headers: headers, method: "GET" });
    const resBody = await res.json();
    return resBody;
  } catch (error) {
    console.log("Error from getReq in utils", error);
  }
};

const postReq = async ({ route, body, headers }) => {
  console.log(route, body, headers);
  try {
    const res = await fetch(route, {
      body: JSON.stringify(body),
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

const getCardType = (cardNumber) => {
  const types = {
    376212: { scheme: "amex", bank: "AMEX" },
    411911: { scheme: "visa", bank: "DBS" },
    426569: { scheme: "visa", bank: "CITI" },
    450873: { scheme: "visa", bank: "SCB" },
    452419: { scheme: "visa", bank: "OCBC" },
    454750: { scheme: "visa", bank: "CITI" },
    455622: { scheme: "visa", bank: "DBS" },
    496643: { scheme: "visa", bank: "MAYBANK" },
    524040: { scheme: "mastercard", bank: "OCBC" },
    524355: { scheme: "mastercard", bank: "SCB" },
    526471: { scheme: "mastercard", bank: "POSB" },
    540012: { scheme: "mastercard", bank: "OCBC" },
    542125: { scheme: "mastercard", bank: "UOB" },
    549834: { scheme: "mastercard", bank: "SCB" },
    552038: { scheme: "mastercard", bank: "POSB" },
    552163: { scheme: "mastercard", bank: "UOB" },
    554827: { scheme: "mastercard", bank: "POSB" },
    558860: { scheme: "mastercard", bank: "OCBC" },
  };
  const bin = cardNumber.replace(" ", "").slice(0, 6);
  console.log(bin);
  if (types[bin] !== undefined) {
    return types[bin];
  } else {
    return { scheme: "scheme", bank: "bank" };
  }
};

const getSchemeIcon = (scheme) => {
  const types = {
    visa: <FaCcVisa size={64} />,
    mastercard: <FaCcMastercard size={84} />,
    amex: <FaCcAmex size={64} />,
  };
  if (types[scheme] !== undefined) {
    return types[scheme];
  } else {
    return <AiFillBank size={64} />;
  }
};

const cardFormValidation = (card_detail) => {
  console.log(card_detail);
  const varArr = [
    "name",
    "expirationDate",
    "cvc",
    "bank",
    "scheme",
    "cardNumber",
  ];
  let alertArr = [];
  if (Object.keys(card_detail).length !== 7) {
    alertArr = varArr.filter((detail) => card_detail[detail] === undefined);
    alert(`Inputs not filled: ${alertArr.join(",")}.`);
    return false;
  } else {
    for (const detail in card_detail) {
      if (card_detail[detail].length === 0) {
        alert(`${detail} has not been filled.`);
        return false;
      } else if (detail === "cardNumber") {
        if (card_detail[detail].replace(" ", "").length < 16) {
          alert(
            `${detail} should have 16 numbers with spacing in between every 4 numbers.`
          );
          return false;
        }
      } else if (detail === "cvc" && card_detail[detail].length < 3) {
        alert(`${detail} should have 3 numbers.`);
        return false;
      }
    }
  }
  return true;
};

const formatCardNumber = (cardNumber) => {
  cardNumber = cardNumber.replace(/ /g, "");
  if (cardNumber && cardNumber.length > 0) {
    const temp = cardNumber.match(/.{1,4}/g);
    return temp.join(" ");
  }
};

export {
  getReq,
  postReq,
  currencyFormatter,
  getCardType,
  getSchemeIcon,
  cardFormValidation,
  formatCardNumber,
};
