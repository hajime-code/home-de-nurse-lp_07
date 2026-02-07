document.addEventListener('DOMContentLoaded', () => {
  // 年号
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  // モバイルナビ
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('siteNav');

  if (toggle && nav) {
    const closeNav = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // ナビリンククリックで閉じる
    nav.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a && nav.classList.contains('is-open')) closeNav();
    });

    // Escで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
  }

  // QAアコーディオン
  (function () {
    const root = document.querySelector('[data-accordion]');
    if (!root) return;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    root.querySelectorAll('.faq__item').forEach((item) => {
      const btn = item.querySelector('.faq__q');
      const id = btn && btn.getAttribute('aria-controls');
      const panel = id ? document.getElementById(id) : null;
      if (!btn || !panel) return;

      btn.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
      panel.style.height = '0px';

      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') === 'true';
        open ? close(btn, panel) : openPanel(btn, panel);
      });
    });

    function openPanel(btn, panel) {
      btn.setAttribute('aria-expanded', 'true');
      panel.setAttribute('aria-hidden', 'false');

      if (reduce) {
        panel.style.height = 'auto';
        return;
      }

      panel.style.height = '0px';
      requestAnimationFrame(() => {
        panel.style.height = panel.scrollHeight + 'px';
      });

      panel.addEventListener('transitionend', function onEnd(e) {
        if (e.propertyName !== 'height') return;
        panel.style.height = 'auto';
        panel.removeEventListener('transitionend', onEnd);
      });
    }

    function close(btn, panel) {
      btn.setAttribute('aria-expanded', 'false');

      if (reduce) {
        panel.style.height = '0px';
        panel.setAttribute('aria-hidden', 'true');
        return;
      }

      panel.style.height = panel.scrollHeight + 'px';
      requestAnimationFrame(() => {
        panel.style.height = '0px';
      });

      panel.addEventListener('transitionend', function onEnd(e) {
        if (e.propertyName !== 'height') return;
        panel.setAttribute('aria-hidden', 'true');
        panel.removeEventListener('transitionend', onEnd);
      });
    }
  })();


  // ハンバーガーメニュー制御
  document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menuBtn');
    const spDrawer = document.getElementById('spDrawer');

    // 1. オーバーレイ（背景の膜）を動的に生成
    let overlay = document.querySelector('.drawer-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'drawer-overlay';
      document.body.appendChild(overlay);
    }

    // メニュー開閉のメイン関数
    // function toggleMenu() {
    //   const isActive = spDrawer.classList.contains('active');

    //   if (!isActive) {
    //     // 開くとき
    //     spDrawer.classList.add('active');
    //     menuBtn.classList.add('active');
    //     overlay.style.display = 'block'; // 先に表示
    //     setTimeout(() => overlay.classList.add('active'), 10); // アニメーション
    //     document.body.style.overflow = 'hidden'; // 背景スクロール禁止
    //   } else {
    //     // 閉じるとき
    //     spDrawer.classList.remove('active');
    //     menuBtn.classList.remove('active');
    //     overlay.classList.remove('active');
    //     setTimeout(() => {
    //       if (!spDrawer.classList.contains('active')) overlay.style.display = 'none';
    //     }, 300); // 消えるのを待ってから非表示
    //     document.body.style.overflow = ''; // スクロール再開
    //   }
    // }

    // // イベント登録
    // menuBtn.addEventListener('click', toggleMenu);
    // overlay.addEventListener('click', toggleMenu); // ドロワー外クリックで閉じる

    // // ドロワー内のリンク・閉じるボタン
    // const closeElements = spDrawer.querySelectorAll('a, .sp-drawer-close-text-btn');
    // closeElements.forEach(el => {
    //   el.addEventListener('click', toggleMenu);
    // });

  });

});