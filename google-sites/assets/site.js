(function () {
  function cfg() {
    return window.REPAIRFRONT || {};
  }

  function siteUrl(path) {
    const base = (cfg().siteBase || "").replace(/\/$/, "");
    const clean = path.startsWith("/") ? path : "/" + path;
    return base ? base + clean : path.replace(/^\//, "");
  }

  function apiUrl(path) {
    const base = (cfg().apiBase || "").replace(/\/$/, "");
    return base + path;
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

  function showMessage(form, html) {
    form.innerHTML = html;
  }

  function wireLeadForm(formId, endpoint) {
    var form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      var errorEl = form.querySelector(".form-error");
      if (errorEl) errorEl.textContent = "";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";
      }

      var data = {};
      new FormData(form).forEach(function (value, key) {
        data[key] = value;
      });

      fetch(apiUrl(endpoint), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (response) {
          return response.json().then(function (payload) {
            return { ok: response.ok, payload: payload };
          });
        })
        .then(function (result) {
          if (!result.ok) {
            throw new Error(result.payload.error || "Unable to submit your request.");
          }
          showMessage(
            form,
            '<div class="form-success"><h2>Request received</h2><p>Thanks for reaching out. Our team will follow up shortly.</p></div>'
          );
        })
        .catch(function (err) {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.getAttribute("data-label") || "Submit";
          }
          if (errorEl) {
            errorEl.textContent = err.message || "Unable to submit your request. Please try again.";
          }
        });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireNav();
    wireFooterYear();
    wireLeadForm("demo-form", "/api/leads/demo");
    wireLeadForm("intake-form", "/api/leads/intake");
  });
})();
