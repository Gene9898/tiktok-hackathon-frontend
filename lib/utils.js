export const currencyFormatter = (amount) => {
    return new Intl.NumberFormat(['en-sg'], {style: 'currency', currency: 'SGD', currencyDisplay: 'symbol'}).format(amount);
  };