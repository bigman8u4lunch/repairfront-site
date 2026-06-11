(function () {
  function cfg() {
    return window.REPAIRFRONT || {};
  }

  function siteUrl(path) {
    const base = (cfg().siteBase || "").replace(/\/$/, "");
    const clean = path.startsWith("/") ? path : "/" + path;
    return base ? base + clean : path.replace(/^\//, "");
  }

  function toEmbedUrl(url) {
    if (!url) return "";
    var trimmed = url.trim();
    if (trimmed.indexOf("embedded=true") !== -1) return trimmed;
    if (trimmed.indexOf("/viewform") !== -1) {
      return trimmed + (trimmed.indexOf("?") !== -1 ? "&" : "?") + "embedded=true";
    }
    return trimmed;
  }

  function toViewUrl(url) {
    if (!url) return "";
    return url.trim().replace("?embedded=true", "").replace("&embedded=true", "");
  }

  function wireNav() {
    document.querySelectorAll("[data-href]").forEach(function (el) {
      el.setAttribute("href", siteUrl(el.getAttribute("data-href")));
    });

    var login = document.getElementById("nav-login");
    if (login && cfg().appLoginUrl) {
      login.href = cfg().appLoginUrl;
    }
  }

  function wireFooterYear() {
    var yearEl = document.getElementById("footer-year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function wireGoogleForm(iframeId, linkId, configKey) {
    var iframe = document.getElementById(iframeId);
    var link = document.getElementById(linkId);
    var shell = iframe ? iframe.closest(".form-card-embed") : null;
    var rawUrl = (cfg()[configKey] || "").trim();

    if (!rawUrl) {
      if (shell) {
        shell.innerHTML =
          '<div class="form-placeholder"><h2>Form link not set yet</h2><p>Add the Google Form URL to <code>assets/config.js</code> (<code>' +
          configKey +
          "</code>).</p></div>";
      }
      return;
    }

    var embedUrl = toEmbedUrl(rawUrl);
    var viewUrl = toViewUrl(rawUrl);

    if (iframe) iframe.src = embedUrl;
    if (link) {
      link.href = viewUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireNav();
    wireFooterYear();
    wireGoogleForm("demo-form-embed", "demo-form-link", "demoFormUrl");
    wireGoogleForm("get-started-form-embed", "get-started-form-link", "getStartedFormUrl");
  });
})();
