export class Store {
  #state;
  #listeners = new Set();

  constructor(initial = {}) {
    this.#state = initial;
  }

  getState() {
    return this.#state;
  }

  setState(patch) {
    this.#state = { ...this.#state, ...patch };
    this.#listeners.forEach((fn) => fn(this.#state));
  }

  subscribe(fn) {
    this.#listeners.add(fn);
    return () => this.#listeners.delete(fn);
  }
}

export const store = new Store({
  user: null,
  loading: false,
});
