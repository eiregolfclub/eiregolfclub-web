import { store } from "../core/Store.js";
import { auth } from "../core/Auth.js";

export class Navigation {
  constructor(mount = "#nav") {
    this.el = document.querySelector(mount);
    this.render(store.getState());
    store.subscribe((s) => this.render(s));
  }

  render(state) {
    const { user } = state;
    this.el.innerHTML = `
      <nav class="bg-white shadow">
        <div class="container mx-auto flex h-14 items-center justify-between px-4">
          <a href="/" data-link class="font-semibold text-green-700 flex items-center">
            <i class="fa-solid fa-golf-ball-tee mr-2"></i> Éire Golf Club
          </a>
          <div class="space-x-6 hidden md:flex">
            <a href="/" data-link class="hover:text-green-600">Home</a>
            <a href="/events" data-link class="hover:text-green-600">Events</a>
            <a href="/match" data-link class="hover:text-green-600">Match</a>
            <a href="/forum" data-link class="hover:text-green-600">Forum</a>
            <a href="/merch" data-link class="hover:text-green-600">Merch</a>
          </div>
          <div>
            ${
              user
                ? `<span class="mr-4 text-sm">Hi, ${user.name}</span>
                   <button id="logoutBtn" class="text-sm text-red-600">Logout</button>`
                : `<button id="loginBtn" class="btn-primary px-4 py-1 rounded">Login</button>`
            }
          </div>
        </div>
      </nav>
    `;

    // attach listeners
    this.el.querySelector("#loginBtn")?.addEventListener("click", () =>
      import("./LoginModal.js").then((m) => new m.LoginModal())
    );
    this.el.querySelector("#logoutBtn")?.addEventListener("click", () =>
      auth.logout()
    );
  }
}
