export class Router {
  #routes = {};
  #rootEl;

  constructor(rootSelector) {
    this.#rootEl = document.querySelector(rootSelector);

    // Intercept link clicks
    document.body.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-link]");
      if (a) {
        e.preventDefault();
        this.go(a.getAttribute("href"));
      }
    });

    window.addEventListener("popstate", () => this.#handle());
  }

  register(path, handler) {
    this.#routes[path] = handler;
  }

  init() {
    this.#handle();
  }

  go(path) {
    history.pushState({}, "", path);
    this.#handle();
  }

  async #handle() {
    const path = location.pathname || "/";
    const handler = this.#routes[path] || this.#routes["/404"];
    const html = await handler();
    this.#rootEl.innerHTML = html;
  }
}
