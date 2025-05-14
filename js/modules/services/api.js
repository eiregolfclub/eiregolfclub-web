import { CONFIG } from "../../config.js";

class Api {
  async get(path, token) {
    return this.#request(path, "GET", undefined, token);
  }
  async post(path, body, token) {
    return this.#request(path, "POST", body, token);
  }

  async #request(path, method, body, token) {
    const res = await fetch(CONFIG.API_URL + path, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
}

export const api = new Api();
