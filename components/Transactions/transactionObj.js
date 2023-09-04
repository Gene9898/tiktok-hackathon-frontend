const React = require('react');
const { currencyFormatter } = require("lib/utils");

const handleClick = () => {
  // Redirect to the report page URL
  window.location.href = '/report';
};

const buttonElement = React.createElement(
  'button',
  {
    className: 'report',
    onClick: handleClick, // Attach the click event handler
  },
  'Report'
);

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
      React.createElement("div", { className: "flex items-center gap-9" },
        React.createElement("p", null, currencyFormatter(amount)),
        buttonElement
      )
    )
  );
}

module.exports = Transaction;