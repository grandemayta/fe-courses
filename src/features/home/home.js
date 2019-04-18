import { html, render } from 'lit-html';
import './home.scss';

export default class Home {
  constructor(el) {
    this.el = el;
  }

  template() {
    return html`
      <app-header></app-header>
      <section class="main-wrapper">
        <div class="container">
          <app-tiles-courses type="all"></app-tiles-courses>
        </div>
      </section>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
