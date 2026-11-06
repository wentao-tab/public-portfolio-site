/* ============================================================
   应用入口：加载地图数据、绑定交互
   ============================================================ */

(async function main() {
  const geojson = window.CHINA_FULL_GEOJSON || await fetch("data/china.json").then(r => r.json());

  await TravelMap.init({
    container: "#map",
    geojson,
    onSelect: city => CityPanel.render(city),
  });

  // 出行方式切换
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      TravelMap.setMode(btn.dataset.mode);
    });
  });

  // 关闭面板
  document.getElementById("panel-close").addEventListener("click", CityPanel.close);
  document.addEventListener("keydown", e => { if (e.key === "Escape") CityPanel.close(); });
})();
