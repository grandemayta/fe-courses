import { html, render } from 'lit-html';

export default class Update {
  constructor(el, params) {
    this.el = el;
    this.params = params;
  }

  template() {
    return html`
      <app-header></app-header>
      <app-sub-header title="Modify your workshop"></app-sub-header>
      <section class="main-wrapper">
        <div class="container">
          <app-alert status message></app-alert>
          <app-create-course type="update" id=${this.params.id}></app-create-course>
        </div>
      </section>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
