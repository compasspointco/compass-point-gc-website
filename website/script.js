'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // ── Year ──
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Nav toggle ──
  var navToggle = document.querySelector('.nav-toggle');
  var navList   = document.getElementById('nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var isOpen = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when any nav link is clicked (mobile scroll)
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside the nav
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Active nav link via IntersectionObserver ──
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = '#' + entry.target.id;
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === target) {
              link.setAttribute('aria-current', 'page');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, { rootMargin: '-45% 0px -55% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }

  // ── Contact form ──
  var form      = document.getElementById('contact-form');
  var statusEl  = document.getElementById('form-status');

  function setStatus(msg, ok) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.style.color = ok ? 'rgba(255,255,255,.85)' : '#f87171';
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = (form.elements['name'].value    || '').trim();
      var email   = (form.elements['email'].value   || '').trim();
      var message = (form.elements['message'].value || '').trim();

      if (!name || !email || !message) {
        setStatus('Please complete all required fields.', false);
        return;
      }

      // Netlify form handling (AJAX to avoid page redirect)
      if (form.dataset.netlify === 'true') {
        setStatus('Sending…', true);
        var data = new FormData(form);
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString(),
        })
          .then(function (res) {
            if (res.ok) {
              setStatus('Message sent. We will respond within one business day.', true);
              form.reset();
            } else {
              throw new Error('HTTP ' + res.status);
            }
          })
          .catch(function () {
            setStatus(
              'Submission failed. Please email mpetty@compasspointgc.com directly.',
              false
            );
          });
        return;
      }

      // Mailto fallback for non-Netlify environments
      var inquiry = form.elements['inquiry'].value || '';
      var org     = (form.elements['organization'].value || '').trim();
      var phone   = (form.elements['phone'].value        || '').trim();
      var body    = [
        'Name: '         + name,
        'Organization: ' + org,
        'Email: '        + email,
        'Phone: '        + phone,
        '',
        message,
      ].join('\n');

      window.location.href =
        'mailto:mpetty@compasspointgc.com' +
        '?subject=' + encodeURIComponent('Website inquiry: ' + inquiry) +
        '&body='    + encodeURIComponent(body);

      setStatus('Your email client should open. Or use mpetty@compasspointgc.com directly.', true);
    });
  }

  // ── Capabilities briefing pre-fill ──
  var capBriefBtn = document.getElementById('cap-brief');
  if (capBriefBtn && form) {
    capBriefBtn.addEventListener('click', function () {
      var inquiry = form.elements['inquiry'];
      var msg     = document.getElementById('f-message');
      if (inquiry) inquiry.value = 'capabilities';
      if (msg) {
        msg.value = 'I would like to request a Capabilities Briefing from Compass Point LLC.';
        msg.focus();
      }
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }

});
