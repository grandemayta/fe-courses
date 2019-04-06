import { html, render } from 'lit-html';
import Router from 'core/router';
import 'features/contacts/contacts.scss';

export default class Contacts {
  constructor(el) {
    this.el = el;
    this.router = new Router();
  }

  template() {
    return html`
      <app-card
        title="Your are in the conctacs page!"
        link="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
      >
      </app-card>
      <button @click=${() => this.router.go('/')}>Home</button>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
