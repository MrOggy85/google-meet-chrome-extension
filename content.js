(function () {
  "use strict";

  // Only run on meeting URLs like /abc-defg-hij
  if (!/^\/[a-z]{3}-[a-z]{4}-[a-z]{3}/.test(window.location.pathname)) {
    return;
  }

  let done = false;

  function tryMute() {
    if (done) return;

    // Wait until both toggle buttons (mic + camera) exist in the DOM
    const allToggles = document.querySelectorAll("[data-is-muted]");
    if (allToggles.length < 2) return;

    // Click any that are currently unmuted
    document.querySelectorAll('[data-is-muted="false"]').forEach((btn) => btn.click());

    done = true;
    clearInterval(poll);
  }

  const poll = setInterval(tryMute, 200);

  // Stop polling after 10 seconds to avoid interfering with an active meeting
  setTimeout(() => clearInterval(poll), 10000);
})();
