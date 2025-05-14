import { CONFIG } from "../../config.js";

export class GolferMap {
  constructor(mount = "#app") {
    this.mountSel = mount;
  }
  async render() {
    const mount = document.querySelector(this.mountSel);
    mount.innerHTML = `<h2 class="text-2xl font-bold my-6">Golfer Discovery Map</h2>
      <div id="map" class="h-[400px] rounded shadow"></div>`;

    mapboxgl.accessToken = CONFIG.MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      center: [-7.692, 53.142],
      zoom: 6,
    });

    const golfers = await fetch(`${CONFIG.API_URL}/golfers`).then((r) =>
      r.json()
    );
    golfers.forEach((g) =>
      new mapboxgl.Marker()
        .setLngLat([g.lon, g.lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<p class="font-semibold">${g.name}</p><p>Hcp: ${g.handicap}</p>`
          )
        )
        .addTo(map)
    );
  }
}
