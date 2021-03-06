import { html, render } from 'lit-html';
import { workshops, workshopsBySpeaker, workshopsByHashtag } from 'services';

export default class TilesCourses extends HTMLElement {
  get type() {
    return this.getAttribute('type');
  }

  get speaker() {
    return this.getAttribute('speaker');
  }

  get value() {
    return this.getAttribute('value');
  }

  async connectedCallback() {
    let courses = [];
    switch (this.type) {
      case 'hashtag':
        this.action = 'hashtag';
        courses = this.orderByTwoCols(await workshopsByHashtag(this.value));
        break;
      case 'speaker':
        this.action = 'edit';
        courses = this.orderByTwoCols(await workshopsBySpeaker(this.speaker));
        break;
      case 'all':
      default:
        this.action = 'read';
        courses = this.orderByTwoCols(await workshops());
    }
    render(this.template(courses), this);
  }

  coursesTemplate(courses) {
    return html`
      <div class="tile is-ancestor">
        ${courses.map(course => {
          const { id, title, author, date, time, technology } = course;
          return html`
            <app-tile-course
              id=${id}
              title=${title}
              author-name=${author.firstname + ' ' + author.lastname}
              author-avatar=${author.avatar}
              author-nickname=${author.nickname}
              date=${date}
              time=${time}
              technology=${technology}
              action=${this.action}
            ></app-tile-course>
          `;
        })}
      </div>
    `;
  }

  orderByTwoCols(courses) {
    let counter = 0;
    let tileMain = [];
    let tileChildren = [];

    courses.forEach((course, index) => {
      let lastValue = courses.length === index + 1;
      counter++;
      tileChildren.push(course);
      if (counter === 2 || lastValue) {
        tileMain.push(tileChildren);
        tileChildren = [];
        counter = 0;
      }
    });
    return tileMain;
  }

  template(courses) {
    return html`
      ${courses.map(course => {
        return html`
          ${this.coursesTemplate(course)}
        `;
      })}
    `;
  }
}

customElements.define('app-tiles-courses', TilesCourses);
