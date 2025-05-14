import { CONFIG } from "../../config.js";
import { store } from "./Store.js";
import { api } from "../services/api.js";

export class Auth {
  constructor() {
    this.token = localStorage.getItem(CONFIG.STORAGE_TOKEN_KEY);
    if (this.token) this.fetchMe(); // restore session
  }

  async fetchMe() {
    try {
      const me = await api.get("/auth/me", this.token);
      store.setState({ user: me });
    } catch {
      this.logout();
    }
  }

  async login(email, password) {
    const { user, token } = await api.post("/auth/login", {
      email,
      password,
    });
    this.#setSession(user, token);
  }

  async register(data) {
    const { user, token } = await api.post("/auth/register", data);
    this.#setSession(user, token);
  }

  logout() {
    this.#setSession(null, null);
  }

  #setSession(user, token) {
    if (token) {
      localStorage.setItem(CONFIG.STORAGE_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(CONFIG.STORAGE_TOKEN_KEY);
    }
    this.token = token;
    store.setState({ user });
  }
}

export const auth = new Auth();
