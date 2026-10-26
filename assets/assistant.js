/* Your Fitness assistant: UI shell only. No transport, generated replies or storage. */
(() => {
  'use strict';
  if (document.querySelector('#fitness-assistant')) return;

  const icons = {spark:'assets/assistant-spark.svg',close:'assets/assistant-close.svg',strength:'assets/assistant-strength.svg',arrow:'assets/assistant-arrow.svg',check:'assets/assistant-check.svg',send:'assets/assistant-send.svg',chat:'assets/assistant-chat.svg'};
  const icon = (name, className = '') => `<img class="fa-icon ${className}" src="${icons[name]}" alt="" aria-hidden="true" draggable="false">`;
  const choice = (title, description, view) => `<button type="button" class="fa-choice" data-fa-view="${view}"><span class="fa-choice-icon">${icon('strength')}</span><span class="fa-choice-copy"><strong>${title}</strong><small>${description}</small></span>${icon('arrow', 'fa-arrow')}</button>`;
  const root = document.createElement('div');
  root.id = 'fitness-assistant';
  root.innerHTML = `
    <button type="button" class="fa-launcher" aria-label="Open Your Fitness Assistant" aria-expanded="false" aria-controls="fa-panel">
      ${icon('chat')}<span>Let’s find your start</span>
    </button>
    <div class="fa-backdrop" hidden></div>
    <section id="fa-panel" class="fa-panel" role="dialog" aria-modal="false" aria-labelledby="fa-title" hidden>
      <header class="fa-header">
        <span class="fa-mark">${icon('spark')}</span>
        <div class="fa-identity"><h2 id="fa-title">Your Fitness Assistant</h2><p><span aria-hidden="true">·</span> A little help to get moving</p></div>
        <button type="button" class="fa-close" aria-label="Close assistant">${icon('close')}</button>
      </header>
      <nav class="fa-tabs" aria-label="Assistant sections">
        <button type="button" data-fa-view="welcome" aria-current="page">Get started</button>
        <button type="button" data-fa-view="answers">Quick answers</button>
        <button type="button" data-fa-view="contact">Talk to Anna <span aria-hidden="true">→</span></button>
      </nav>
      <div class="fa-content" tabindex="-1">
        <div class="fa-view" data-fa-panel="welcome">
          <p class="fa-eyebrow">YOUR FIRST STEP</p>
          <h3 class="fa-heading">A STRONGER YOU.<br><span>STARTS HERE.</span></h3>
          <p class="fa-copy">Hi, I’m Anna’s virtual assistant. Let’s find the right place for you to start.</p>
          <div class="fa-choices">
            ${choice('Find my training', 'A few questions. A clearer direction.', 'training')}
            ${choice('I have a question', 'Training, getting started &amp; more.', 'answers')}
            ${choice('Talk to Anna', 'Make your next step a personal one.', 'contact')}
          </div>
          <p class="fa-reassurance">${icon('check')} No pressure. Move at your own pace.</p>
          <div class="fa-coach"><img class="fa-portrait" src="assets/anna-portrait.webp" alt="Anna, your coach" width="38" height="38" loading="lazy"><p><strong>A real coach. In your corner.</strong><span>Personal training with Anna</span></p><button type="button" data-fa-view="contact">Say hi <span aria-hidden="true">→</span></button></div>
        </div>
        <div class="fa-view" data-fa-panel="training" hidden>
          <button type="button" class="fa-back" data-fa-view="welcome"><span aria-hidden="true">←</span> Back</button>
          <p class="fa-eyebrow">YOUR STARTING POINT</p>
          <h3 class="fa-heading">FIND YOUR<br><span>OWN STRONG.</span></h3>
          <p class="fa-copy">The guided training assistant is coming soon. For now, explore the training formats on the website.</p>
          <a class="fa-primary" href="#training" data-fa-site-link>Explore training <span aria-hidden="true">↗</span></a>
          <button type="button" class="fa-secondary" data-fa-view="contact">Talk to Anna <span aria-hidden="true">→</span></button>
          <p class="fa-note">Training suggestions will be available when the assistant launches.</p>
        </div>
        <div class="fa-view" data-fa-panel="answers" hidden>
          <p class="fa-eyebrow">GOOD TO KNOW</p>
          <h3 class="fa-heading">A FEW FIRST<br><span>QUESTIONS.</span></h3>
          <details class="fa-question" open><summary>Do I need training experience?</summary><p>Your starting point is part of the conversation. Share your experience and any concerns with Anna.</p></details>
          <details class="fa-question"><summary>Which training format should I choose?</summary><p>Explore strength, fitness and mobility on the website. Anna can help you discuss a suitable starting point.</p></details>
          <details class="fa-question"><summary>How much does training cost?</summary><p>Confirm the current price and session details directly with Anna.</p></details>
          <details class="fa-question"><summary>Can I chat or book here?</summary><p>The chat is coming soon. This preview does not send messages or make bookings.</p></details>
          <button type="button" class="fa-primary" data-fa-view="contact">Talk to Anna <span aria-hidden="true">→</span></button>
        </div>
        <div class="fa-view" data-fa-panel="contact" hidden>
          <p class="fa-eyebrow">TALK TO ANNA</p>
          <h3 class="fa-heading">LET’S MAKE IT<br><span>PERSONAL.</span></h3>
          <p class="fa-copy">A little about you is a good place to begin.</p>
          <form class="fa-enquiry" method="dialog" action="#" aria-describedby="fa-enquiry-note">
            <label class="fa-field" for="fa-name">Your name<input id="fa-name" name="name" placeholder="What should we call you?" autocomplete="given-name" maxlength="100"></label>
            <label class="fa-field" for="fa-email">Email address<input id="fa-email" name="email" type="email" placeholder="you@example.com" autocomplete="email" maxlength="254"></label>
            <label class="fa-consent"><input type="checkbox" name="consent"><span>I’d like Anna to contact me about training.</span></label>
            <button type="submit" class="fa-primary" disabled>Send enquiry <span aria-hidden="true">→</span></button>
            <p id="fa-enquiry-note" class="fa-note">Enquiries through this chat are coming soon. Your details are not sent or saved.</p>
          </form>
          <a class="fa-secondary" href="#start" data-fa-site-link>Go to the website enquiry form <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <footer class="fa-footer">
        <form class="fa-composer" method="dialog" action="#" aria-describedby="fa-message-note">
          <label class="fa-sr-only" for="fa-message">Message draft</label>
          <input id="fa-message" name="message" placeholder="Ask me a question…" autocomplete="off" maxlength="1000">
          <button type="submit" class="fa-send" aria-label="Send message — coming soon" disabled>${icon('send')}</button>
        </form>
        <p class="fa-attribution"><span>Your Fitness · Virtual assistant</span><span>Preview</span></p>
        <p id="fa-message-note" class="fa-note">Chat coming soon. Messages are not sent.</p>
      </footer>
    </section>
    <p class="fa-sr-only" role="status" aria-live="polite"></p>`;
  document.body.append(root);

  const panel = root.querySelector('.fa-panel');
  const launcher = root.querySelector('.fa-launcher');
  const closeButton = root.querySelector('.fa-close');
  const backdrop = root.querySelector('.fa-backdrop');
  const content = root.querySelector('.fa-content');
  const status = root.querySelector('[role="status"]');
  const mobile = matchMedia('(max-width: 575.98px), (max-width: 991.98px) and (max-height: 500px)');
  const inertState = new Map();
  let isOpen = false;
  let previousFocus = null;
  let previousOverflow = null;

  function setBackgroundInert(locked) {
    if (locked && previousOverflow === null) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      for (const element of document.body.children) {
        if (element === root || ['SCRIPT', 'STYLE', 'LINK'].includes(element.tagName)) continue;
        inertState.set(element, element.inert);
        element.inert = true;
      }
    } else if (!locked && previousOverflow !== null) {
      document.body.style.overflow = previousOverflow;
      previousOverflow = null;
      for (const [element, wasInert] of inertState) element.inert = wasInert;
      inertState.clear();
    }
  }

  function syncViewport() {
    const viewport = window.visualViewport;
    if (!viewport || viewport.scale !== 1) return;
    const top = Math.max(0, Math.min(viewport.offsetTop, innerHeight - 1));
    root.style.setProperty('--fa-visual-top', `${top}px`);
    root.style.setProperty('--fa-visual-height', `${Math.min(viewport.height, innerHeight - top)}px`);
  }

  function syncMode() {
    const modal = isOpen && mobile.matches;
    panel.setAttribute('aria-modal', String(modal));
    backdrop.hidden = !modal;
    launcher.hidden = modal;
    setBackgroundInert(modal);
    syncViewport();
  }

  function setOpen(open) {
    if (isOpen === open) return;
    if (open) previousFocus = document.activeElement;
    isOpen = open;
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label', `${open ? 'Close' : 'Open'} Your Fitness Assistant`);
    syncMode();
    if (open) closeButton.focus({preventScroll: true});
    else (previousFocus?.isConnected && !previousFocus.inert ? previousFocus : launcher).focus({preventScroll: true});
  }

  function showView(name) {
    if (!root.querySelector(`[data-fa-panel="${name}"]`)) return;
    for (const view of root.querySelectorAll('[data-fa-panel]')) view.hidden = view.dataset.faPanel !== name;
    const current = name === 'training' ? 'welcome' : name;
    for (const tab of root.querySelectorAll('.fa-tabs [data-fa-view]')) {
      if (tab.dataset.faView === current) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    }
    content.scrollTop = 0;
    content.focus({preventScroll: true});
    status.textContent = {welcome: 'Assistant introduction', training: 'Training guide — coming soon', answers: 'Common training questions', contact: 'Enquiry preview — sending is coming soon'}[name];
  }

  launcher.addEventListener('click', () => setOpen(!isOpen));
  closeButton.addEventListener('click', () => setOpen(false));
  backdrop.addEventListener('click', () => setOpen(false));
  root.addEventListener('click', event => {
    const control = event.target.closest('[data-fa-view]');
    if (control) showView(control.dataset.faView);
    if (event.target.closest('[data-fa-site-link]')) setOpen(false);
  });
  root.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = 'Chat coming soon. No information was sent or saved.';
  });
  document.addEventListener('keydown', event => {
    if (!isOpen || document.querySelector('dialog[open]')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Tab' && mobile.matches) {
      const controls = [...panel.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), summary')].filter(element => element.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === content)) {
        event.preventDefault();last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();first.focus();
      }
    }
  });
  mobile.addEventListener('change', syncMode);
  window.addEventListener('resize', syncViewport);
  window.visualViewport?.addEventListener('resize', syncViewport);
  window.visualViewport?.addEventListener('scroll', syncViewport);
  syncViewport();
})();
