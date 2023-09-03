const React = require('react');
const { currencyFormatter } = require("lib/utils");

function Transaction({ color, title, amount }) {
  return (
    React.createElement("div", { className: "flex items-center justify-between px-4 py-4 bg-slate-800 rounded-3xl" },
      React.createElement("div", { className: "flex items-center gap-2" },
        React.createElement("div", {
          className: "w-[25px] h-[25px] rounded-full",
          style: { backgroundColor: color }
        }),
        React.createElement("h4", { className: "capitalize" }, title)
      ),
      React.createElement("p", null, currencyFormatter(amount))
    )
  );
}

module.exports = Transaction;