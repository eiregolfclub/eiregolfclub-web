import { Router } from "./modules/core/Router.js";
import { Navigation } from "./modules/components/Navigation.js";
import { SocialFeed } from "./modules/components/SocialFeed.js";
import { GolferMap } from "./modules/components/GolferMap.js";

// Navigation stays visible everywhere
new Navigation("#nav");

// Router
const router = new Router("#app");

router.register("/", async () => {
  const feed = new SocialFeed();
  await feed.render();
  return ""; // SocialFeed renders directly
});

router.register("/match", async () => {
  const map = new GolferMap();
  await map.render();
  return "";
});

router.register("/events", async () => "<h2 class='text-2xl'>Events – TBD</h2>");
router.register("/forum", async () => "<h2 class='text-2xl'>Forum – TBD</h2>");
router.register("/merch", async () => "<h2 class='text-2xl'>Merch – TBD</h2>");
router.register("/404", async () => "<h2>Page not found</h2>");

router.init();

// Service worker for PWA
if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
