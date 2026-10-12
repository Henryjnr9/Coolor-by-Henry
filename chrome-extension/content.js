(function () {
  // Prevent duplicate script execution
  if (window.__coolorsInspectorInitialized) return;
  window.__coolorsInspectorInitialized = true;

  let isInspectActive = false;
  let tooltip = null;

  function getLuminance(r, g, b) {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function parseRgb(colorStr) {
    const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    return match
      ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]
      : [0, 0, 0];
  }

  function rgbToHex(r, g, b) {
    return (
      "#" +
      [r, g, b]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()
    );
  }

  function getEffectiveBackgroundColor(el) {
    let curr = el;
    while (curr && curr !== document && curr !== document.documentElement) {
      const bg = window.getComputedStyle(curr).backgroundColor;
      if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
        return bg;
      }
      curr = curr.parentElement;
    }
    return "rgb(255, 255, 255)";
  }

  function createTooltip() {
    if (tooltip) return;
    tooltip = document.createElement("div");
    tooltip.id = "coolors-inspector-tooltip";
    tooltip.style.cssText = `
      position: fixed;
      z-index: 2147483647;
      pointer-events: none;
      background: #111111;
      color: #FFFFFF;
      padding: 10px 14px;
      border-radius: 12px;
      font-family: "SF Pro Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
      display: none;
      gap: 12px;
      align-items: center;
      border: 1px solid rgba(255, 255, 255, 0.12);
    `;
    document.body.appendChild(tooltip);
  }

  document.addEventListener("mousemove", (e) => {
    if (!isInspectActive) return;
    if (!tooltip) createTooltip();

    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el || el.id === "coolors-inspector-tooltip") return;

    const style = window.getComputedStyle(el);
    const textColorRgb = parseRgb(style.color);
    const bgRgb = parseRgb(getEffectiveBackgroundColor(el));

    const lum1 = getLuminance(...textColorRgb);
    const lum2 = getLuminance(...bgRgb);
    const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
    const ratioStr = ratio.toFixed(2);
    const isPass = ratio >= 4.5;

    const textHex = rgbToHex(...textColorRgb);
    const bgHex = rgbToHex(...bgRgb);

    tooltip.style.display = "flex";
    tooltip.style.left = `${Math.min(window.innerWidth - 240, e.clientX + 16)}px`;
    tooltip.style.top = `${Math.min(window.innerHeight - 80, e.clientY + 16)}px`;

    tooltip.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:4px;">
        <div style="display:flex; align-items:center; gap:6px;">
          <span style="width:11px; height:11px; border-radius:3px; background:${textHex}; border:1px solid rgba(255,255,255,0.4);"></span>
          <span>Text: <b style="font-family:monospace">${textHex}</b></span>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <span style="width:11px; height:11px; border-radius:3px; background:${bgHex}; border:1px solid rgba(255,255,255,0.4);"></span>
          <span>BG: <b style="font-family:monospace">${bgHex}</b></span>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; align-items:center; border-left:1px solid rgba(255,255,255,0.2); padding-left:10px;">
        <span style="font-size:16px; font-weight:800; color:${isPass ? "#4ADE80" : "#F87171"}">${ratioStr}:1</span>
        <span style="font-size:10px; font-weight:700; color:${isPass ? "#4ADE80" : "#F87171"}">${isPass ? "PASS AA" : "FAIL AA"}</span>
      </div>
    `;
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isInspectActive) {
      isInspectActive = false;
      if (tooltip) tooltip.style.display = "none";
    }
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "TOGGLE_INSPECT") {
      isInspectActive = !isInspectActive;
      if (!isInspectActive && tooltip) {
        tooltip.style.display = "none";
      }
      sendResponse({ status: "ok", active: isInspectActive });
    }

    if (request.action === "EXTRACT_COLORS") {
      const allEls = document.querySelectorAll("*");
      const colorSet = new Set();

      allEls.forEach((el) => {
        const s = window.getComputedStyle(el);
        if (s.color && s.color.startsWith("rgb")) {
          colorSet.add(rgbToHex(...parseRgb(s.color)));
        }
        if (
          s.backgroundColor &&
          s.backgroundColor.startsWith("rgb") &&
          s.backgroundColor !== "rgba(0, 0, 0, 0)"
        ) {
          colorSet.add(rgbToHex(...parseRgb(s.backgroundColor)));
        }
      });

      sendResponse({ colors: Array.from(colorSet).slice(0, 24) });
    }

    return true;
  });
})();
