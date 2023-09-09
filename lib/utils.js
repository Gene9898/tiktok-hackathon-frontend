import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
const getReq = async ({ route, headers }) => {
  try {
    console.log("route ", route);
    const res = await fetch(route, { headers: headers, method: "GET" });
    const resBody = await res.json();
    console.log("res ", resBody);
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
    const resBody = await res.text();
    const json = resBody === "" ? {} : JSON.parse(string);
    console.log(json);
    return json;
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
  console.log(types[bin]);
  if (types[bin] !== undefined) {
    return types[bin];
  } else {
    return { scheme: "scheme", bank: "bank" };
  }
};

const getBankColor = (bank) => {
  const bankType = {
    POSB: "bg-blue-500",
    DBS: "bg-red-500",
    MAYBANK: "bg-yellow-500",
    AMEX: "bg-green-500",
    CITI: "bg-blue-300",
    OCBC: "bg-red-300",
    SCB: "bg-green-300",
    UOB: "bg-pink-400",
  };
  console.log(bankType[bank]);
  return bankType[bank] === undefined ? "bg-slate-400" : bankType[bank];
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

const cardFormValidation = (card_detail, saved_cards) => {
  console.log(Object.keys(card_detail).length);
  console.log(card_detail);
  const varArr = [
    "name",
    "expiryYear",
    "expiryMonth",
    "cvc",
    "bank",
    "scheme",
    "cardNumber",
    "dateOfBirth",
    "userId",
  ];
  const numberArr = saved_cards.map((card) => {
    return card.cardNumber;
  });
  let alertArr = [];
  if (Object.keys(card_detail).length !== 9) {
    alertArr = varArr.filter((detail) => card_detail[detail] === undefined);
    alert(`Inputs not filled: ${alertArr.join(",")}.`);
    return false;
  } else {
    for (const detail in card_detail) {
      if (card_detail[detail].length === 0) {
        alert(`${detail} has not been filled.`);
        return false;
      } else if (detail === "cardNumber") {
        if (
          card_detail[detail].replace(" ", "").length < 16 ||
          !/^\d+$/.test(card_detail[detail])
        ) {
          alert(`Invalid Card Number`);
          return false;
        } else if (numberArr.indexOf(card_detail[detail]) !== -1) {
          alert("Card already exists in wallet");
          return false;
        }
      } else if (detail === "cvc" && card_detail[detail].length < 3) {
        alert(`Invalid CVC`);
        return false;
      } else if (
        detail === "name" &&
        !/^[A-Za-z\s]*$/.test(card_detail[detail])
      ) {
        alert("Only alphabets allowed in Name");
      }
    }
  }
  return true;
};

const paymentFormValidation = (payment_detail) => {
  console.log(payment_detail);
  const varArr = ["name", "phoneNumber", "amount"];
  let alertArr = [];
  if (Object.keys(payment_detail).length !== 3) {
    alertArr = varArr.filter((detail) => payment_detail[detail] === undefined);
    alertArr = alertArr.map((alert) => {
      return alert.charAt(0).toUpperCase() + alert.slice(1);
    });
    alert(`Inputs not filled: ${alertArr.join(",")}.`);
    return false;
  } else {
    for (const detail in payment_detail) {
      if (payment_detail[detail].length === 0) {
        alert(`${detail} has not been filled.`);
        return false;
      } else if (detail === "phoneNumber") {
        if (
          payment_detail[detail].replace(" ", "").length < 8 ||
          !/^\d+$/.test(payment_detail[detail])
        ) {
          alert(`Invalid Phone Number`);
          return false;
        }
      } else if (detail === "name") {
        console.log();
        if (!/^[A-Za-z\s]*$/.test(payment_detail[detail])) {
          alert(`Only alphabets allowed in Name`);
          return false;
        }
      }
    }
  }
  return true;
};

const formatCardNumber = (cardNumber) => {
  if (cardNumber && cardNumber.length > 0) {
    cardNumber = cardNumber.replace(/ /g, "");
    const temp = cardNumber.match(/.{1,4}/g);
    return temp.join(" ");
  }
};

const formatMinimisedCardNumber = (cardNumber) => {
  if (cardNumber && cardNumber.length > 0) {
    cardNumber = cardNumber.replace(/ /g, "");
    const temp = cardNumber.match(/.{1,4}/g);
    return temp[3];
  }
};

export {
  getReq,
  postReq,
  currencyFormatter,
  getCardType,
  getBankColor,
  getSchemeIcon,
  cardFormValidation,
  formatCardNumber,
  formatMinimisedCardNumber,
  paymentFormValidation,
};
