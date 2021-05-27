import { checkPaymentSystem, validateCreditCard } from '../validate';

describe('validateCreditCard:', () => {
  test.each([
    ['4716059918019947', true],
    ['6375214064046395', true],
    ['6011696218344915010', true],
    ['4716059918019949', false],
    ['41111111', false],
    ['9999999999999999999999', false],
  ])(('should return for card number \'%s\' %s'), (input, bool) => {
    expect(validateCreditCard(input)).toBe(bool);
  });
});

describe('checkPaymentSystem:', () => {
  test.each([
    ['4716059918019947', 'visa'],
    ['2221009550064653', 'mir'],
    ['5138387357451679', 'mastercard'],
    ['5246836438599433', 'mastercard'],
    ['5333488149396412', 'mastercard'],
    ['5420478286552123', 'mastercard'],
    ['5563855651361330', 'mastercard'],
    ['3144160553582692', 'jcb'],
    ['3533410381287430107', 'jcb'],
    ['6011351367397800', 'discover'],
    ['30252841173561', 'dinersclub'],
    ['36132886377204', 'dinersclub'],
    ['38233247827620', 'dinersclub'],
    ['343586009058631', 'amex'],
    ['375944681410158', 'amex'],
    ['005944681410158', false],
  ])(('should return for card number \'%s\' name of payment system \'%s\''), (input, expected) => {
    expect(checkPaymentSystem(input)).toBe(expected);
  });
});
