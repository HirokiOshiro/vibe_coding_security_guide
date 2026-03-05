function toggleChecklistItem(item) {
  item.classList.toggle('checked');
  item.setAttribute('aria-pressed', String(item.classList.contains('checked')));
}

function copyPrompt(el) {
  navigator.clipboard.writeText(
    el.textContent.replace('\u{1F4CB} \u30AF\u30EA\u30C3\u30AF\u3067\u30B3\u30D4\u30FC', '').replace('\u2713 \u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F', '').trim()
  );
  el.classList.add('copied');
  setTimeout(() => el.classList.remove('copied'), 1500);
}

window.copyPrompt = copyPrompt;

function initializeChecklist() {
  document.querySelectorAll('.checklist li').forEach(li => {
    li.setAttribute('role', 'button');
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-pressed', String(li.classList.contains('checked')));
    li.addEventListener('click', () => toggleChecklistItem(li));
    li.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleChecklistItem(li);
      }
    });
  });
}

function initializeStickyNav() {
  const sections = document.querySelectorAll('.section[id]');
  const links = document.querySelectorAll('.toc-link');

  if (!sections.length || !links.length || !window.IntersectionObserver) {
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => link.classList.remove('active'));
          const active = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-80px 0px -60% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

function initializeKeywordPromptCopy() {
  document.querySelectorAll('.kw-item').forEach(item => {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');

    const copyKeywordPrompt = () => {
      const term = item.childNodes[0].textContent.trim();
      const prompt = `\u4EE5\u4E0B\u306E\u7528\u8A9E\u306B\u3064\u3044\u3066\u3001\u30D0\u30A4\u30D6\u30B3\u30FC\u30C7\u30A3\u30F3\u30B0\uFF08AI\u306B\u30B3\u30FC\u30C9\u3092\u66F8\u304B\u305B\u308B\u958B\u767A\u624B\u6CD5\uFF09\u306E\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u306E\u6587\u8108\u3067\u3001\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u521D\u5B66\u8005\u5411\u3051\u306B\u6559\u3048\u3066\u304F\u3060\u3055\u3044\u3002\n\n\u7528\u8A9E\uFF1A${term}\n\n1. \u4E00\u8A00\u3067\u306E\u5B9A\u7FA9\n2. \u306A\u305C\u30D0\u30A4\u30D6\u30B3\u30FC\u30C7\u30A3\u30F3\u30B0\u3067\u91CD\u8981\u304B\uFF08\u77E5\u3089\u306A\u3044\u3068\u3069\u3093\u306A\u554F\u984C\u304C\u8D77\u304D\u308B\u304B\uFF09\n3. Web\u30A2\u30D7\u30EA\u3092\u4F8B\u306B\u3057\u305F\u5177\u4F53\u4F8B\n4. \u95A2\u9023\u6982\u5FF5`;
      navigator.clipboard.writeText(prompt);
      // 元のノードを保存し、innerHTML を使わずに DOM を操作する
      const savedNodes = Array.from(item.childNodes).map(n => n.cloneNode(true));
      item.style.borderColor = 'var(--accent)';
      while (item.firstChild) item.removeChild(item.firstChild);
      const span = document.createElement('span');
      span.style.cssText = 'color:var(--accent);font-size:12px;';
      span.textContent = '\u2713 \u30D7\u30ED\u30F3\u30D7\u30C8\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F';
      item.appendChild(span);
      setTimeout(() => {
        while (item.firstChild) item.removeChild(item.firstChild);
        savedNodes.forEach(n => item.appendChild(n));
        item.style.borderColor = '';
      }, 1500);
    };

    item.addEventListener('click', copyKeywordPrompt);
    item.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        copyKeywordPrompt();
      }
    });
  });
}

function initializeDeepDiveCodeAccessibility() {
  document.querySelectorAll('.deepdive code').forEach(codeEl => {
    codeEl.setAttribute('role', 'button');
    codeEl.setAttribute('tabindex', '0');
    // onclick 属性を使わず addEventListener で登録（CSP 対応）
    codeEl.addEventListener('click', () => copyPrompt(codeEl));
    codeEl.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        copyPrompt(codeEl);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeChecklist();
  initializeStickyNav();
  initializeKeywordPromptCopy();
  initializeDeepDiveCodeAccessibility();
});
