import paymentSystem from './paymentSystem';

export function validateCreditCard(value) {
  const cardNumber = value.replace(/\s+/g, '').split('');

  return cardNumber.reverse().reduce((acc, currentValue, index) => {
    let num = +currentValue;
    let sum = acc; // строка для ESLint

    if (index % 2 !== 0) {
      num *= 2;
      if (num > 9) num -= 9;
    }

    sum += num;
    return sum;
  }, 0) % 10 === 0;
}

export function checkPaymentSystem(value) {
  for (const [paymentSystemName, identifications] of Object.entries(paymentSystem)) {
    for (const id of identifications) {
      if (value.startsWith(id)) return paymentSystemName;
    }
  }

  return false;
}
