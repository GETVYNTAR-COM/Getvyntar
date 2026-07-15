/* ==========================================================================
   U38 KETTLEBELL STRENGTH — MAIN SCRIPT
   Requires js/config.js to be loaded first (defines the U38 object).
   ========================================================================== */

(function () {
  "use strict";

  /* ---- Helpers ----------------------------------------------------------- */

  // Resolve a dot-path like "social.instagram" against the U38 config object.
  function cfg(path) {
    return path.split(".").reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, U38);
  }

  function formatAddress(sep) {
    var a = U38.address;
    return [a.line1, a.line2, a.city, a.postcode].filter(Boolean).join(sep);
  }

  /* ---- Populate config placeholders -------------------------------------- */
  // <span data-cfg="email"></span>       → text from config
  // <a data-cfg-href="emailHref"></a>    → href from config
  // <p data-cfg-address></p>             → formatted address

  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var value = cfg(el.getAttribute("data-cfg"));
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll("[data-cfg-href]").forEach(function (el) {
    var value = cfg(el.getAttribute("data-cfg-href"));
    if (value !== undefined) el.setAttribute("href", value);
  });

  document.querySelectorAll("[data-cfg-address]").forEach(function (el) {
    el.innerHTML = "";
    formatAddress("\n").split("\n").forEach(function (line, i) {
      if (i > 0) el.appendChild(document.createElement("br"));
      el.appendChild(document.createTextNode(line));
    });
  });

  /* ---- Opening hours tables ---------------------------------------------- */
  document.querySelectorAll("[data-hours]").forEach(function (table) {
    U38.hours.forEach(function (row) {
      var tr = document.createElement("tr");
      var tdDays = document.createElement("td");
      var tdTimes = document.createElement("td");
      tdDays.textContent = row.days;
      tdTimes.textContent = row.times;
      tr.appendChild(tdDays);
      tr.appendChild(tdTimes);
      table.appendChild(tr);
    });
  });

  /* ---- Header ------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    // Close the mobile menu when a link is chosen.
    document.querySelectorAll(".nav-list a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Hero video fallback -------------------------------------------------
     If /assets/video/hero.mp4 hasn't been added yet (or fails to load),
     hide the <video> so the industrial gradient backdrop shows instead. */
  var heroMedia = document.querySelector(".hero-media");
  var heroVideo = heroMedia ? heroMedia.querySelector("video") : null;

  if (heroVideo) {
    var markFailed = function () {
      heroMedia.classList.add("video-failed");
    };
    heroVideo.addEventListener("error", markFailed);
    var lastSource = heroVideo.querySelector("source:last-of-type");
    if (lastSource) lastSource.addEventListener("error", markFailed);
  }

  /* ---- Coach cards ---------------------------------------------------------
     Renders into any element with [data-coach-grid]. Optionally limit the
     number shown with data-coach-limit="3" (used on the homepage). */

  var KETTLEBELL_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
    '<path d="M8.6 9.9C7.3 5.8 9.2 3.2 12 3.2s4.7 2.6 3.4 6.7"/>' +
    '<circle cx="12" cy="14.6" r="6.2"/></svg>';

  document.querySelectorAll("[data-coach-grid]").forEach(function (grid) {
    var limit = parseInt(grid.getAttribute("data-coach-limit"), 10) || U38.coaches.length;

    U38.coaches.slice(0, limit).forEach(function (coach, i) {
      var card = document.createElement("article");
      card.className = "coach-card reveal";
      if (i % 4 !== 0) card.classList.add("reveal-delay-" + Math.min(i % 4, 3));

      var photo = document.createElement("div");
      photo.className = "coach-photo";
      photo.innerHTML = KETTLEBELL_ICON;

      var body = document.createElement("div");
      body.className = "coach-body";

      var name = document.createElement("h3");
      name.textContent = coach.name;

      var role = document.createElement("p");
      role.className = "coach-role";
      role.textContent = coach.role;

      var bio = document.createElement("p");
      bio.className = "coach-bio";
      bio.textContent = coach.bio;

      var creds = document.createElement("div");
      creds.className = "coach-creds";
      (coach.credentials || []).forEach(function (cred) {
        var chip = document.createElement("span");
        chip.textContent = cred;
        creds.appendChild(chip);
      });

      body.append(name, role, bio, creds);
      card.append(photo, body);
      grid.appendChild(card);
    });
  });

  /* ---- Timetable ------------------------------------------------------------ */
  var timetable = document.querySelector("[data-timetable]");

  if (timetable) {
    var tabsWrap = timetable.querySelector(".day-tabs");
    var listWrap = timetable.querySelector(".class-list");
    var days = Object.keys(U38.schedule);
    var todayName = new Date().toLocaleDateString("en-GB", { weekday: "long" });
    var activeDay = days.indexOf(todayName) !== -1 ? todayName : days[0];

    function coachName(index) {
      var coach = U38.coaches[index];
      return coach ? coach.name : "U38 Coach";
    }

    function renderDay(day) {
      listWrap.innerHTML = "";
      var classes = U38.schedule[day] || [];

      if (classes.length === 0) {
        var empty = document.createElement("div");
        empty.className = "class-empty";
        var title = document.createElement("strong");
        title.textContent = "Rest day";
        empty.appendChild(title);
        empty.appendChild(
          document.createTextNode("Recover, move, get outside. We'll see you tomorrow.")
        );
        listWrap.appendChild(empty);
        return;
      }

      classes.forEach(function (cls) {
        var row = document.createElement("article");
        row.className = "class-row";

        var time = document.createElement("div");
        time.className = "class-time";
        time.textContent = cls.time;

        var info = document.createElement("div");
        info.className = "class-info";
        var name = document.createElement("h3");
        name.textContent = cls.name;
        var meta = document.createElement("p");
        meta.className = "class-meta";
        meta.textContent = cls.duration + " · " + coachName(cls.coach);
        info.append(name, meta);

        var level = document.createElement("span");
        level.className = "class-level";
        level.textContent = cls.level;

        row.append(time, info, level);
        listWrap.appendChild(row);
      });
    }

    days.forEach(function (day) {
      var tab = document.createElement("button");
      tab.type = "button";
      tab.className = "day-tab";
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", String(day === activeDay));
      tab.textContent = day.slice(0, 3);
      tab.setAttribute("aria-label", day);

      tab.addEventListener("click", function () {
        tabsWrap.querySelectorAll(".day-tab").forEach(function (t) {
          t.setAttribute("aria-selected", "false");
        });
        tab.setAttribute("aria-selected", "true");
        renderDay(day);
      });

      tabsWrap.appendChild(tab);
    });

    renderDay(activeDay);
  }

  /* ---- Count-up stats --------------------------------------------------------
     <span data-count="65">0</span> animates from 0 when scrolled into view. */

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduceMotion || !("requestAnimationFrame" in window)) {
      el.textContent = target;
      return;
    }
    var duration = 1400;
    var start = null;

    function tick(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---- Scroll reveal ----------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  var countEls = document.querySelectorAll("[data-count]");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          if (entry.target.hasAttribute("data-count")) animateCount(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
    countEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
    countEls.forEach(function (el) {
      el.textContent = el.getAttribute("data-count");
    });
  }

  /* ---- Forms ----------------------------------------------------------------------
     Version 1 has no backend, so forms open the visitor's email client with
     a pre-filled message to the studio (Supabase/n8n handle this in V2).
     Forms need class "js-mailto-form" and a data-subject attribute. */

  document.querySelectorAll(".js-mailto-form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var subject = form.getAttribute("data-subject") || "Website enquiry";
      var lines = [];

      form.querySelectorAll("input, select, textarea").forEach(function (field) {
        if (!field.name || !field.value) return;
        var label = form.querySelector('label[for="' + field.id + '"]');
        var labelText = label ? label.textContent : field.name;
        lines.push(labelText + ": " + field.value);
      });

      var email = U38.emailHref.replace(/^mailto:/, "");
      window.location.href =
        "mailto:" + email +
        "?subject=" + encodeURIComponent(subject + " — " + U38.gymName) +
        "&body=" + encodeURIComponent(lines.join("\n"));

      var success = form.querySelector(".form-success");
      if (success) success.classList.add("is-visible");
    });
  });

  /* ---- Footer year -------------------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
