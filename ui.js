/* DevAI Resources — shared UI enhancements */
(function () {

  /* ── 1. Copy buttons on every code block ──────────────────── */
  function initCopyButtons() {
    var blocks = document.querySelectorAll('.devai-code-block');
    blocks.forEach(function (block) {
      var btn = document.createElement('button');
      btn.className = 'devai-copy-btn';
      btn.setAttribute('aria-label', 'Copy code');
      btn.innerHTML =
        '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<rect x="5" y="5" width="8" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4"/>' +
          '<path d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' +
        '</svg>' +
        '<span>Copy</span>';

      btn.addEventListener('click', function () {
        var code = block.querySelector('code');
        var text = code ? code.innerText : block.innerText;
        navigator.clipboard.writeText(text).then(function () {
          btn.classList.add('is-copied');
          btn.querySelector('span').textContent = 'Copied!';
          btn.innerHTML =
            '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M2.5 8.5L6 12L13.5 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
            '<span>Copied!</span>';
          setTimeout(function () {
            btn.classList.remove('is-copied');
            btn.innerHTML =
              '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<rect x="5" y="5" width="8" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4"/>' +
                '<path d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' +
              '</svg>' +
              '<span>Copy</span>';
          }, 2000);
        }).catch(function () {
          /* fallback for older browsers */
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          btn.querySelector('span').textContent = 'Copied!';
          setTimeout(function () { btn.querySelector('span').textContent = 'Copy'; }, 2000);
        });
      });

      block.appendChild(btn);
    });
  }

  /* ── 2. Back-to-top button ────────────────────────────────── */
  function initBackToTop() {
    var btn = document.createElement('button');
    btn.className = 'devai-back-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML =
      '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M8 12V4M4.5 7.5L8 4L11.5 7.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
    document.body.appendChild(btn);

    var THRESHOLD = 420;
    var ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(function () {
          btn.classList.toggle('is-visible', window.scrollY > THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── init ─────────────────────────────────────────────────── */
  function init() {
    initCopyButtons();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
