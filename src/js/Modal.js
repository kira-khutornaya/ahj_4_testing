export default class Modal {
  constructor() {
    this.messageBox = document.querySelector('.modal');
  }

  showMessage(messageText, messageStatus) {
    this.openMessage(messageText, messageStatus);
    setTimeout(this.closeMessage.bind(this, messageStatus), 5000);
  }

  openMessage(message, status) {
    this.messageBox.innerText = message;
    this.messageBox.classList.add(`modal_${status}`);
    this.messageBox.style.opacity = '1';
  }

  closeMessage(status) {
    this.messageBox.style.opacity = '0';
    this.messageBox.classList.remove(`modal_${status}`);
  }
}
