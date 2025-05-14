import { auth } from "../core/Auth.js";
import { store } from "../core/Store.js";

export class LoginModal {
  constructor() {
    this.root = document.getElementById("modal-root");
    this.render();
  }

  render() {
    this.root.innerHTML = `
      <div class="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-sm">
          <h2 class="text-xl font-semibold mb-4">Log In</h2>
          <form id="loginForm" class="space-y-4">
            <input name="email" type="email" placeholder="Email" class="w-full border p-2 rounded" required />
            <input name="password" type="password" placeholder="Password" class="w-full border p-2 rounded" required />
            <button class="w-full bg-green-600 text-white py-2 rounded">Login</button>
          </form>
          <p class="mt-4 text-center text-sm">
            No account?
            <a id="goRegister" href="#" class="text-green-600">Create one</a>
          </p>
        </div>
      </div>
    `;
    this.root.querySelector("#loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      auth
        .login(data.email, data.password)
        .then(() => (this.root.innerHTML = ""))
        .catch((err) => alert(err.message));
    });
    this.root.querySelector("#goRegister").addEventListener("click", (e) => {
      e.preventDefault();
      this.root.innerHTML = "";
      import("./RegisterModal.js").then((m) => new m.RegisterModal());
    });
  }
}
