import { auth } from "../core/Auth.js";

export class RegisterModal {
  constructor() {
    this.root = document.getElementById("modal-root");
    this.render();
  }
  render() {
    this.root.innerHTML = `
      <div class="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-sm">
          <h2 class="text-xl font-semibold mb-4">Create Account</h2>
          <form id="regForm" class="space-y-4">
            <input name="name" placeholder="Name" class="w-full border p-2 rounded" required />
            <input name="email" type="email" placeholder="Email" class="w-full border p-2 rounded" required />
            <input name="password" type="password" placeholder="Password" class="w-full border p-2 rounded" required />
            <button class="w-full bg-green-600 text-white py-2 rounded">Register</button>
          </form>
        </div>
      </div>
    `;
    this.root.querySelector("#regForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      auth
        .register(data)
        .then(() => (this.root.innerHTML = ""))
        .catch((err) => alert(err.message));
    });
  }
}
