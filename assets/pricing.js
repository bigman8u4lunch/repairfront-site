(function () {
  function cfg() {
    return window.REPAIRFRONT || {};
  }

  function catalog() {
    return window.REPAIRFRONT_PRICING || {};
  }

  function formatMoney(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function getStartedUrl() {
    var base = (cfg().siteBase || "").replace(/\/$/, "");
    return base ? base + "/get-started.html" : "get-started.html";
  }

  function renderPlanCard(plan, interval) {
    var isAnnual = interval === "annual";
    var amount = isAnnual ? plan.annual : plan.monthly;
    var period = isAnnual ? "/yr" : "/mo";
    var recommended = plan.recommended
      ? '<span class="pricing-badge">Most popular</span>'
      : "";
    var vehicleNote = plan.vehicleNote
      ? '<p class="pricing-vehicle-note">' + plan.vehicleNote + "</p>"
      : "";
    var features = plan.features
      .map(function (feature) {
        return "<li>" + feature + "</li>";
      })
      .join("");

    return (
      '<article class="pricing-card' +
      (plan.recommended ? " pricing-card-recommended" : "") +
      '">' +
      recommended +
      '<h3 class="pricing-plan-name">' +
      plan.name +
      "</h3>" +
      '<p class="pricing-tagline">' +
      plan.tagline +
      "</p>" +
      '<p class="pricing-seats">' +
      plan.maxUsers +
      "</p>" +
      vehicleNote +
      '<p class="pricing-amount">' +
      '<span class="pricing-amount-value">' +
      formatMoney(amount) +
      "</span>" +
      '<span class="pricing-amount-period">' +
      period +
      "</span>" +
      "</p>" +
      (isAnnual
        ? '<p class="pricing-equiv">' +
          formatMoney(Math.round(plan.annual / 12)) +
          "/mo equivalent</p>"
        : "") +
      '<ul class="pricing-features">' +
      features +
      "</ul>" +
      '<a class="btn-primary pricing-cta" data-href="/get-started.html" href="get-started.html">Get started</a>' +
      "</article>"
    );
  }

  function renderAddonCard(addon) {
    var note = addon.note ? '<p class="pricing-addon-note">' + addon.note + "</p>" : "";
    return (
      '<article class="pricing-card pricing-card-addon">' +
      '<h3 class="pricing-plan-name">' +
      addon.name +
      "</h3>" +
      '<p class="pricing-tagline">' +
      addon.description +
      "</p>" +
      '<p class="pricing-amount">' +
      '<span class="pricing-amount-value">' +
      formatMoney(addon.monthly) +
      "</span>" +
      '<span class="pricing-amount-period">/mo</span>' +
      "</p>" +
      note +
      '<a class="btn-secondary pricing-cta" data-href="/get-started.html" href="get-started.html">Contact us</a>' +
      "</article>"
    );
  }

  function renderPlans(containerId, plans, interval) {
    var container = document.getElementById(containerId);
    if (!container || !plans) return;
    container.innerHTML = plans.map(function (plan) {
      return renderPlanCard(plan, interval);
    }).join("");
  }

  function wirePricing() {
    var root = document.querySelector("[data-pricing-root]");
    if (!root) return;

    var data = catalog();
    var interval = "monthly";
    var audience = root.getAttribute("data-pricing-audience") || "shop";

    var intervalButtons = root.querySelectorAll("[data-pricing-interval]");
    var audienceButtons = root.querySelectorAll("[data-pricing-audience-tab]");
    var intervalTabs = root.querySelector(".pricing-tabs-interval");
    var shopPanel = document.getElementById("pricing-shop-panel");
    var fleetPanel = document.getElementById("pricing-fleet-panel");
    var addonsPanel = document.getElementById("pricing-addons-panel");
    var annualNote = document.getElementById("pricing-annual-note");

    function syncPanels() {
      if (shopPanel) shopPanel.hidden = audience !== "shop";
      if (fleetPanel) fleetPanel.hidden = audience !== "fleet";
      if (addonsPanel) addonsPanel.hidden = audience !== "addons";

      audienceButtons.forEach(function (btn) {
        var active = btn.getAttribute("data-pricing-audience-tab") === audience;
        btn.classList.toggle("pricing-tab-active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });

      intervalButtons.forEach(function (btn) {
        var active = btn.getAttribute("data-pricing-interval") === interval;
        btn.classList.toggle("pricing-tab-active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });

      if (annualNote) {
        annualNote.hidden = interval !== "annual";
      }

      if (intervalTabs) {
        intervalTabs.hidden = audience === "addons";
      }

      renderPlans("pricing-shop-grid", data.shopPlans, interval);
      renderPlans("pricing-fleet-grid", data.fleetPlans, interval);

      var shopAddons = document.getElementById("pricing-shop-addons-grid");
      var operatorAddons = document.getElementById("pricing-operator-addons-grid");
      if (shopAddons && data.shopAddons) {
        shopAddons.innerHTML = data.shopAddons.map(renderAddonCard).join("");
      }
      if (operatorAddons && data.operatorAddons) {
        operatorAddons.innerHTML = data.operatorAddons.map(renderAddonCard).join("");
      }

      document.querySelectorAll(".pricing-cta[data-href]").forEach(function (link) {
        link.setAttribute("href", getStartedUrl());
      });
    }

    intervalButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        interval = btn.getAttribute("data-pricing-interval") || "monthly";
        syncPanels();
      });
    });

    audienceButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        audience = btn.getAttribute("data-pricing-audience-tab") || "shop";
        syncPanels();
        if (history.replaceState) {
          history.replaceState(null, "", "#" + audience);
        }
      });
    });

    var hash = (window.location.hash || "").replace("#", "");
    if (hash === "fleet" || hash === "shop" || hash === "addons") {
      audience = hash;
    }

    syncPanels();
  }

  document.addEventListener("DOMContentLoaded", wirePricing);
})();
