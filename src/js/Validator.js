import Modal from './Modal';
import { checkPaymentSystem, validateCreditCard } from './validate';

export default class Validator {
  constructor() {
    this.inputStr = document.querySelector('.field-group__input');
    this.creditCards = [...document.querySelectorAll('.cards__item')];
    this.modal = new Modal();
  }

  init() {
    this.inputStr.addEventListener('input', this.onInput.bind(this));

    this.validateForm = document.querySelector('.form-group');
    this.validateForm.addEventListener('submit', this.onSubmit.bind(this));
  }

  onInput(event) {
    event.preventDefault();

    if (this.inputStr.value) {
      this.creditCards.forEach((el) => el.classList.add('cards-item__filter'));
      this.showPaymentSystem();
    } else {
      this.creditCards.forEach((el) => el.classList.remove('cards-item__filter'));
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const isNumber = /^[0-9\s]+$/.test(this.inputStr.value);

    if (!isNumber) {
      this.modal.showMessage('Card number can only include numbers and spaces', 'error');
      return;
    }

    if (this.inputStr.value.length < 16 || this.inputStr.value.length > 19) {
      this.modal.showMessage('Card number cannot contain less than 16 and more than 19 characters ', 'error');
      return;
    }

    const isValid = validateCreditCard(this.inputStr.value);
    if (isValid) this.modal.showMessage('Credit card number is valid', 'success');
    else this.modal.showMessage('Credit card number is invalid', 'error');
  }

  showPaymentSystem() {
    const paymentSystemName = checkPaymentSystem(this.inputStr.value);
    if (!paymentSystemName) return;

    const myCard = this.creditCards.find((el) => el.classList.contains(`cards-item__${paymentSystemName}`));
    myCard.classList.remove('cards-item__filter');
  }
}
