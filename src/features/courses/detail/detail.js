import { html, render } from 'lit-html';
import { workshopById } from 'services';

export default class Detail {
  constructor(el, params) {
    this.el = el;
    this.params = params;
    this.params.title('Workshop detail');
  }

  template(data) {
    const { title, description, technology, author, date, time } = data;
    const name = `${author.firstname} ${author.lastname}`;
    const { id: workshopId, userSession } = this.params;

    return html`
      <div class="container">
        <app-alert status message></app-alert>
        <div class="columns">
          <div class="column is-8">
            <h3 class="title is-3">${title}</h3>
            <p>${description}</p>
            <app-owner-course
              name=${name}
              avatar=${author.avatar}
              role=${author.role}
              technology=${technology}
              date=${date}
              time=${time}
            >
            </app-owner-course>
          </div>
          <div class="column is-4">
            <h4 class="title is-4">Attendees</h4>
            <app-attendees
              workshop-id=${workshopId}
              attendee-id=${userSession && userSession.id}
            ></app-attendees>
          </div>
        </div>
      </div>
    `;
  }

  async load() {
    const data = await workshopById(this.params.id);
    render(this.template(data), this.el);
  }
}
