document
  .getElementById("toggle-inspect")
  .addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab || !tab.id) return;

    if (
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("chrome-extension://")
    ) {
      alert(
        "Please test on a real website (like wikipedia.org or localhost). Chrome security blocks extensions on chrome:// pages!",
      );
      return;
    }

    // Inject content script safely
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
    } catch (err) {
      console.log("Script injection:", err);
    }

    // Send message
    chrome.tabs.sendMessage(tab.id, { action: "TOGGLE_INSPECT" }, () => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      }
      window.close();
    });
  });

document
  .getElementById("extract-colors")
  .addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab || !tab.id) return;

    if (
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("chrome-extension://")
    ) {
      alert("Please test on a real website (like wikipedia.org or localhost)!");
      return;
    }

    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
    } catch (err) {
      console.log("Script injection:", err);
    }

    chrome.tabs.sendMessage(
      tab.id,
      { action: "EXTRACT_COLORS" },
      (response) => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message);
          return;
        }

        if (response && response.colors) {
          const container = document.getElementById("palette-container");
          const swatches = document.getElementById("swatches");
          swatches.innerHTML = "";
          container.style.display = "block";

          response.colors.forEach((hex) => {
            const swatch = document.createElement("div");
            swatch.className = "swatch";
            swatch.style.backgroundColor = hex;
            swatch.title = `Click to copy ${hex}`;

            swatch.addEventListener("click", () => {
              navigator.clipboard.writeText(hex);
              swatch.style.transform = "scale(0.85)";
              setTimeout(() => (swatch.style.transform = ""), 150);
            });

            swatches.appendChild(swatch);
          });
        }
      },
    );
  });
