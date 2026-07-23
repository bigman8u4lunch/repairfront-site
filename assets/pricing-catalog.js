/**
 * Display catalog aligned with live Stripe products/prices (lookup_key canon).
 * Amounts in USD. Annual = 10× monthly (two months free).
 */
window.REPAIRFRONT_PRICING = {
  annualNote: "Annual plans are billed as 10 months — two months free vs paying monthly.",
  shopPlans: [
    {
      id: "starter",
      name: "Starter",
      tagline: "Solo operators and 1–2 tech shops",
      maxUsers: "Up to 3 users",
      monthly: 175,
      annual: 1750,
      features: [
        "Work orders, customers & units",
        "Invoicing & manual payments",
        "Service history & canned jobs",
        "Basic operational reports",
        "Email support",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      tagline: "Growing shops with 3–6 bays",
      maxUsers: "Up to 6 users",
      monthly: 399,
      annual: 3990,
      recommended: true,
      features: [
        "Everything in Starter",
        "Stripe online & terminal payments",
        "QuickBooks sync",
        "Parts, inventory & purchase orders",
        "Time clock & production reports",
        "Profitability & finance reports",
        "AI work-order assist",
      ],
    },
    {
      id: "business",
      name: "Business",
      tagline: "Fleet accounts & customer self-service",
      maxUsers: "Up to 12 users",
      monthly: 699,
      annual: 6990,
      features: [
        "Everything in Professional",
        "Customer portal (login, pay, approve lines)",
        "Portal service requests & PM visibility",
        "Fleet & PM reporting",
        "Mobile travel mileage billing",
      ],
    },
  ],
  fleetPlans: [
    {
      id: "fleet_essentials",
      name: "Fleet Essentials",
      tagline: "In-house maintenance for small and mid-size fleets",
      maxUsers: "Up to 5 users",
      monthly: 399,
      annual: 3990,
      vehicleNote: "Unlimited fleet units",
      features: [
        "Unlimited fleet units on all tiers",
        "Work orders & service history",
        "PM schedules & compliance tracking",
        "Multi-facility / shop locations",
        "Parts & internal inventory",
        "Fleet & service reports",
        "Email support",
      ],
    },
    {
      id: "fleet_operations",
      name: "Fleet Operations",
      tagline: "Connected fleet with telematics and dispatch",
      maxUsers: "Up to 10 users",
      monthly: 649,
      annual: 6490,
      vehicleNote: "Unlimited fleet units",
      recommended: true,
      features: [
        "Everything in Fleet Essentials",
        "Telematics integrations (Samsara, CAT VisionLink)",
        "Fault code monitoring & critical alerts",
        "Schedule board & technician dispatch",
        "Production & utilization reporting",
      ],
    },
    {
      id: "fleet_command",
      name: "Fleet Command",
      tagline: "Full platform for large or multi-site fleets",
      maxUsers: "Up to 20 users",
      monthly: 899,
      annual: 8990,
      vehicleNote: "Unlimited fleet units",
      features: [
        "Everything in Fleet Operations",
        "AI fault triage & work-order assist",
        "Advanced fleet analytics & PM insights",
        "Priority support",
      ],
    },
  ],
  shopFeatureMatrix: {
    planIds: ["starter", "professional", "business"],
    groups: [
      {
        name: "Seats & support",
        rows: [
          {
            feature: "Included users",
            starter: "3",
            professional: "6",
            business: "12",
          },
          {
            feature: "Email support",
            starter: true,
            professional: true,
            business: true,
          },
        ],
      },
      {
        name: "Shop operations",
        rows: [
          {
            feature: "Work orders, customers & units",
            starter: true,
            professional: true,
            business: true,
          },
          {
            feature: "Invoicing & manual payments",
            starter: true,
            professional: true,
            business: true,
          },
          {
            feature: "Service history & canned jobs",
            starter: true,
            professional: true,
            business: true,
          },
          {
            feature: "Basic operational reports",
            starter: true,
            professional: true,
            business: true,
          },
          {
            feature: "Stripe online & terminal payments",
            starter: false,
            professional: true,
            business: true,
          },
          {
            feature: "QuickBooks sync",
            starter: false,
            professional: true,
            business: true,
          },
          {
            feature: "Parts, inventory & purchase orders",
            starter: false,
            professional: true,
            business: true,
          },
          {
            feature: "Time clock & production reports",
            starter: false,
            professional: true,
            business: true,
          },
          {
            feature: "Profitability & finance reports",
            starter: false,
            professional: true,
            business: true,
          },
          {
            feature: "AI work-order assist",
            starter: false,
            professional: true,
            business: true,
          },
        ],
      },
      {
        name: "Customer & fleet accounts",
        rows: [
          {
            feature: "Customer portal (login, pay, approve lines)",
            starter: false,
            professional: false,
            business: true,
          },
          {
            feature: "Portal service requests & PM visibility",
            starter: false,
            professional: false,
            business: true,
          },
          {
            feature: "Fleet & PM reporting",
            starter: false,
            professional: false,
            business: true,
          },
          {
            feature: "Mobile travel mileage billing",
            starter: false,
            professional: false,
            business: true,
          },
        ],
      },
    ],
  },
  fleetFeatureMatrix: {
    planIds: ["fleet_essentials", "fleet_operations", "fleet_command"],
    groups: [
      {
        name: "Seats & fleet coverage",
        rows: [
          {
            feature: "Included users",
            fleet_essentials: "5",
            fleet_operations: "10",
            fleet_command: "20",
          },
          {
            feature: "Unlimited fleet units",
            fleet_essentials: true,
            fleet_operations: true,
            fleet_command: true,
          },
          {
            feature: "Email support",
            fleet_essentials: true,
            fleet_operations: true,
            fleet_command: true,
          },
          {
            feature: "Priority support",
            fleet_essentials: false,
            fleet_operations: false,
            fleet_command: true,
          },
        ],
      },
      {
        name: "Maintenance & inventory",
        rows: [
          {
            feature: "Work orders & service history",
            fleet_essentials: true,
            fleet_operations: true,
            fleet_command: true,
          },
          {
            feature: "PM schedules & compliance tracking",
            fleet_essentials: true,
            fleet_operations: true,
            fleet_command: true,
          },
          {
            feature: "Multi-facility / shop locations",
            fleet_essentials: true,
            fleet_operations: true,
            fleet_command: true,
          },
          {
            feature: "Parts & internal inventory",
            fleet_essentials: true,
            fleet_operations: true,
            fleet_command: true,
          },
          {
            feature: "Fleet & service reports",
            fleet_essentials: true,
            fleet_operations: true,
            fleet_command: true,
          },
        ],
      },
      {
        name: "Connected operations",
        rows: [
          {
            feature: "Telematics integrations (Samsara, CAT VisionLink)",
            fleet_essentials: false,
            fleet_operations: true,
            fleet_command: true,
          },
          {
            feature: "Fault code monitoring & critical alerts",
            fleet_essentials: false,
            fleet_operations: true,
            fleet_command: true,
          },
          {
            feature: "Schedule board & technician dispatch",
            fleet_essentials: false,
            fleet_operations: true,
            fleet_command: true,
          },
          {
            feature: "Production & utilization reporting",
            fleet_essentials: false,
            fleet_operations: true,
            fleet_command: true,
          },
        ],
      },
      {
        name: "Advanced command",
        rows: [
          {
            feature: "AI fault triage & work-order assist",
            fleet_essentials: false,
            fleet_operations: false,
            fleet_command: true,
          },
          {
            feature: "Advanced fleet analytics & PM insights",
            fleet_essentials: false,
            fleet_operations: false,
            fleet_command: true,
          },
        ],
      },
    ],
  },
  shopAddons: [
    {
      id: "mitchell1",
      name: "Mitchell1 ProDemand",
      monthly: 69,
      description: "Launch ProDemand estimates from work order lines and import parts and labor.",
      note: "Requires active Mitchell1 subscription with Mitchell1.",
    },
    {
      id: "extra_user",
      name: "Additional user",
      monthly: 49,
      description: "Full staff login beyond plan included seats.",
    },
    {
      id: "extra_location",
      name: "Additional location",
      monthly: 109,
      description: "Separate shop location with its own organization under one billing account.",
    },
  ],
  operatorAddons: [
    {
      id: "operator_compliance",
      name: "Operator Compliance",
      monthly: 10,
      description: "Mobile DOT and 90-day BIT checklists with signatures and PDF export.",
    },
    {
      id: "operator_compliance_unit",
      name: "Compliance — per truck",
      monthly: 2,
      description: "Each active truck on a Compliance owner-operator account.",
      note: "Requires Operator Compliance base plan.",
    },
  ],
};
