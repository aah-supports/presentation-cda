(function () {
  if (window.Reveal) return;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  class RevealOfflineStub {
    constructor() {
      this.slidesRoot = document.querySelector('.reveal .slides');
      this.slides = this.slidesRoot
        ? Array.from(this.slidesRoot.children).filter((el) => el.tagName === 'SECTION')
        : [];
      this.index = 0;
      this.listeners = Object.create(null);
      this.options = {};
      this.bound = false;
      this.controls = null;
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleHashChange = this.handleHashChange.bind(this);
    }

    initialize(options) {
      this.options = options || {};
      this.index = this.indexFromHash();
      this.render();
      this.bind();
      if (this.options.controls) this.ensureControls();
      this.emit('ready');
      return Promise.resolve();
    }

    bind() {
      if (this.bound) return;
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('hashchange', this.handleHashChange);
      this.bound = true;
    }

    on(eventName, callback) {
      if (!this.listeners[eventName]) this.listeners[eventName] = [];
      this.listeners[eventName].push(callback);
    }

    emit(eventName) {
      const cbs = this.listeners[eventName] || [];
      const payload = { indexh: this.index, indexv: 0, currentSlide: this.slides[this.index] || null };
      cbs.forEach((cb) => {
        try {
          cb(payload);
        } catch (_err) {
          // no-op
        }
      });
    }

    getTotalSlides() {
      return this.slides.length;
    }

    getSlidePastCount() {
      return this.index;
    }

    prev() {
      this.slide(this.index - 1);
    }

    next() {
      this.slide(this.index + 1);
    }

    left() {
      this.prev();
    }

    right() {
      this.next();
    }

    slide(targetIndex) {
      if (!this.slides.length) return;
      const nextIndex = clamp(targetIndex, 0, this.slides.length - 1);
      if (nextIndex === this.index) return;
      this.index = nextIndex;
      this.render();
      this.emit('slidechanged');
    }

    handleHashChange() {
      const nextIndex = this.indexFromHash();
      if (nextIndex !== this.index) {
        this.index = nextIndex;
        this.render();
        this.emit('slidechanged');
      }
    }

    handleKeyDown(event) {
      const tag = (event.target && event.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const key = event.key;
      if (key === 'ArrowRight' || key === 'PageDown' || key === ' ') {
        event.preventDefault();
        this.next();
      } else if (key === 'ArrowLeft' || key === 'PageUp') {
        event.preventDefault();
        this.prev();
      } else if (key === 'Home') {
        event.preventDefault();
        this.slide(0);
      } else if (key === 'End') {
        event.preventDefault();
        this.slide(this.slides.length - 1);
      }
    }

    indexFromHash() {
      const hash = window.location.hash || '';
      const match = hash.match(/#\/?(\d+)/);
      if (!match) return 0;
      const idx = Number.parseInt(match[1], 10);
      if (Number.isNaN(idx)) return 0;
      return clamp(idx, 0, Math.max(0, this.slides.length - 1));
    }

    render() {
      this.slides.forEach((slide, idx) => {
        slide.style.display = idx === this.index ? 'flex' : 'none';
      });
      if (this.options.hash !== false) {
        const targetHash = '#/' + this.index;
        if (window.location.hash !== targetHash) {
          history.replaceState(null, '', targetHash);
        }
      }
      this.updateControls();
    }

    ensureControls() {
      if (this.controls) return;
      const wrap = document.createElement('div');
      wrap.style.position = 'fixed';
      wrap.style.right = '14px';
      wrap.style.bottom = '14px';
      wrap.style.zIndex = '130';
      wrap.style.display = 'flex';
      wrap.style.gap = '8px';

      const baseStyle = [
        'border:1px solid rgba(0,243,255,0.45)',
        'background:rgba(8,8,8,0.78)',
        'color:#00f3ff',
        'width:36px',
        'height:36px',
        'border-radius:8px',
        'font-size:18px',
        'cursor:pointer'
      ].join(';');

      const prev = document.createElement('button');
      prev.type = 'button';
      prev.setAttribute('aria-label', 'Précédent');
      prev.textContent = '←';
      prev.style.cssText = baseStyle;
      prev.addEventListener('click', () => this.prev());

      const next = document.createElement('button');
      next.type = 'button';
      next.setAttribute('aria-label', 'Suivant');
      next.textContent = '→';
      next.style.cssText = baseStyle;
      next.addEventListener('click', () => this.next());

      wrap.appendChild(prev);
      wrap.appendChild(next);
      document.body.appendChild(wrap);
      this.controls = { wrap: wrap, prev: prev, next: next };
      this.updateControls();
    }

    updateControls() {
      if (!this.controls) return;
      const max = Math.max(0, this.slides.length - 1);
      this.controls.prev.disabled = this.index <= 0;
      this.controls.next.disabled = this.index >= max;
      this.controls.prev.style.opacity = this.controls.prev.disabled ? '0.45' : '1';
      this.controls.next.style.opacity = this.controls.next.disabled ? '0.45' : '1';
    }
  }

  window.Reveal = RevealOfflineStub;
})();
