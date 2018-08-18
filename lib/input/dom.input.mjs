export class DOMInput {
  constructor (events = []) {
    this.events = events;
  }

  handleEvent (e) {
    const method = e.type;
    if (this[method])
      this[method](e);
  }

  register (el, events = this.events) {
    events.forEach(event => el.addEventListener(event, this));
  }

  unregister (el, events = this.events) {
    events.forEach(event => el.removeEventListener(event, this));
  }
}