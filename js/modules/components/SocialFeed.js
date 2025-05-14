import { CONFIG } from "../../config.js";

export class SocialFeed {
  constructor(mount = "#app") {
    this.mount = mount;
  }

  async render() {
    const wrap = document.querySelector(this.mount);
    wrap.innerHTML = `<h2 class="text-2xl font-bold mb-4">Irish Golf Buzz</h2>
      <div id="feed" class="grid gap-4"></div>`;
    const posts = await fetch(`${CONFIG.API_URL}/social/feed`).then((r) =>
      r.json()
    );
    document.getElementById("feed").innerHTML = posts
      .map(
        (p) => `<article class="bg-white p-4 rounded shadow">
        <p class="font-semibold">${p.author}</p>
        <p class="text-sm mb-2 text-gray-500">${p.platform}</p>
        <p>${p.content}</p></article>`
      )
      .join("");
  }
}
