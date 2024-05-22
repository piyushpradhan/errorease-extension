(async () => {
  const app = document.createElement("div");
  app.id = "extension-root";
  const root = document.querySelector("body");

  var isVisible = false;

  // Apply styles
  app.style.width = "100vw";
  app.style.height = "100vh";
  app.style.position = "fixed";
  app.style.top = "0";
  app.style.left = "0";
  app.style.visibility = "hidden";
  app.style.background = "rgba(0, 0, 0, 0.6)";
  app.style.backdropFilter = "blur(4px)";
  app.style.display = "grid";
  app.style.placeItems = "center";
  app.style.zIndex = "999999";

  window.addEventListener("keypress", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "E") {
      if (!isVisible) {
        app.style.visibility = "visible";
        isVisible = true;
      } else {
        isVisible = false;
        app.style.visibility = "hidden";
      }
    }
  });

  root.appendChild(app);

  const src = chrome?.runtime?.getURL("/react/index.js");
  await import(src);
})();
