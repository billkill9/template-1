function initHero() {
    const mask = document.getElementById('mask');
    if (!mask) return;

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        mask.style.clipPath = `circle(25% at ${x}% ${y}%)`;
    });
}

function initAbout() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => observer.observe(el));
}

function initEducation() {
    const reveals = document.querySelectorAll('.education .reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
}

function initPublications() {
    const reveals = document.querySelectorAll('.publications .reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
}

function initResearch() {
    const reveals = document.querySelectorAll('.research .reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
}

function initContact() {
    const reveals = document.querySelectorAll('.contact .reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));

    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.reset();
        });
    }
}

const renderers = {
  hero(data) {
    const v = data.visibility || {};
    return `
      <section class="hero">
        ${v.title !== false ? `<div class="hero-text"><h1>${data.title}</h1>${v.tagline !== false && data.tagline ? `<p class="hero-tagline">${data.tagline}</p>` : ''}</div>` : ''}
        ${v.image !== false ? `<div class="mask-wrap" id="mask"><img src="${data.image}" alt="${data.alt}"></div>` : ''}
      </section>`;
  },

  about(data) {
    const v = data.visibility || {};
    return `
      <section class="about">
        <div class="about-grid">
          ${v.image !== false ? `<div class="about-image reveal"><img src="${data.image}" alt="${data.imageAlt}"></div>` : ''}
          <div class="about-content reveal">
            ${v.label !== false ? `<p class="about-label">${data.label}</p>` : ''}
            ${v.title !== false ? `<h2 class="about-title">${data.title.join('<br>')}</h2>` : ''}
            ${v.description !== false ? `<p class="about-desc">${data.description}</p>` : ''}
            ${v.stats !== false ? `<div class="about-stats">${data.stats.map(s => `<div class="stat"><span class="stat-number">${s.number}</span><span class="stat-label">${s.label}</span></div>`).join('')}</div>` : ''}
          </div>
        </div>
      </section>`;
  },

  education(data) {
    const v = data.visibility || {};
    return `
      <section class="education">
        <div class="edu-header reveal">
          ${v.label !== false ? `<p class="section-label">${data.label}</p>` : ''}
          ${v.title !== false ? `<h2 class="section-title">${data.title.join('<br>')}</h2>` : ''}
        </div>
        ${v.items !== false ? `<div class="edu-timeline">${data.items.map(item => `<div class="edu-item reveal"><div class="edu-year">${item.year}</div><div class="edu-info"><h3>${item.degree}</h3><p class="edu-school">${item.school}</p><p class="edu-desc">${item.description}</p></div></div>`).join('')}</div>` : ''}
      </section>`;
  },

  publications(data) {
    const v = data.visibility || {};
    return `
      <section class="publications">
        <div class="pub-header reveal">
          ${v.label !== false ? `<p class="section-label">${data.label}</p>` : ''}
          ${v.title !== false ? `<h2 class="section-title">${data.title.join('<br>')}</h2>` : ''}
        </div>
        ${v.items !== false ? `<div class="pub-list">${data.items.map(item => `<a href="${item.href}" class="pub-item reveal"><div class="pub-meta"><span class="pub-year">${item.year}</span><span class="pub-source">${item.source}</span></div><div class="pub-info"><h3>${item.title}</h3><p class="pub-desc">${item.description}</p></div><span class="pub-arrow">&rarr;</span></a>`).join('')}</div>` : ''}
      </section>`;
  },

  research(data) {
    const v = data.visibility || {};
    return `
      <section class="research">
        <div class="research-header reveal">
          ${v.label !== false ? `<p class="section-label">${data.label}</p>` : ''}
          ${v.title !== false ? `<h2 class="section-title">${data.title.join('<br>')}</h2>` : ''}
        </div>
        ${v.items !== false ? `<div class="research-grid">${data.items.map(item => {
          const card = `<div class="research-card reveal"><div class="research-tag">${item.tag}</div><h3>${item.title}</h3><p>${item.description}</p></div>`;
          return item.href ? `<a href="${item.href}" class="research-link">${card}</a>` : card;
        }).join('')}</div>` : ''}
      </section>`;
  },

  contact(data) {
    const v = data.visibility || {};
    const ci = data.contactInfo || {};
    const showInfo = v.contactInfo !== false && v.form === false;
    const fields = data.fields ? data.fields.map(f => {
      if (f.type === 'textarea') {
        return `<textarea placeholder="${f.placeholder}" rows="${f.rows}" ${f.required ? 'required' : ''}></textarea>`;
      }
      return `<input type="${f.type}" placeholder="${f.placeholder}" ${f.required ? 'required' : ''}>`;
    }) : [];
    return `
      <section class="contact">
        <div class="contact-grid">
          <div class="contact-content reveal">
            ${v.label !== false ? `<p class="section-label">${data.label}</p>` : ''}
            ${v.title !== false ? `<h2 class="section-title">${data.title.join('<br>')}</h2>` : ''}
            ${v.intro !== false ? `<p class="contact-intro">${data.intro}</p>` : ''}
            ${v.form !== false ? `<form class="contact-form" id="contactForm"><div class="form-row">${fields.slice(0, 2).join('')}</div>${fields.slice(2).join('')}<button type="submit">${data.button}</button></form>` : ''}
            ${showInfo ? `<div class="contact-info">${ci.address ? `<div class="contact-info-item"><span class="info-label">ADDRESS</span><span>${ci.address}</span></div>` : ''}${ci.phone ? `<div class="contact-info-item"><span class="info-label">PHONE</span><span>${ci.phone}</span></div>` : ''}${ci.email ? `<div class="contact-info-item"><span class="info-label">EMAIL</span><span>${ci.email}</span></div>` : ''}</div>` : ''}
          </div>
          ${v.image !== false ? `<div class="contact-image reveal"><img src="${data.image}" alt="${data.imageAlt}"></div>` : ''}
        </div>
      </section>`;
  },

  footer(data) {
    const v = data.visibility || {};
    return `
      <footer class="footer">
        <div class="footer-inner">
          <div class="footer-brand">
            ${v.logo !== false ? `<div class="logo">${data.logo}</div>` : ''}
            ${v.tagline !== false ? `<p class="footer-tagline">${data.tagline}</p>` : ''}
          </div>
          ${v.columns !== false ? `<div class="footer-links">${data.columns.map(col => `<div class="footer-col"><h4>${col.heading || '\u00A0'}</h4>${col.links.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}</div>`).join('')}</div>` : ''}
        </div>
        ${v.copyright !== false ? `<div class="footer-bottom"><p>${data.copyright}</p></div>` : ''}
      </footer>`;
  }
};

document.addEventListener('contextmenu', e => e.preventDefault());

(async () => {
  const res = await fetch('data.json');
  const json = await res.json();

  document.querySelector('nav .logo').textContent = json.nav.logo;
  const navList = document.querySelector('nav .nav-links');
  navList.innerHTML = json.nav.links.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('');

  const app = document.getElementById('app');

  for (const section of json.sections) {
    if (section.data.visible === false) continue;

    const div = document.createElement('div');
    div.id = 'section-' + section.type;
    div.innerHTML = renderers[section.type](section.data);
    app.appendChild(div);

    if (section.data.showInNav && section.data.label) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#section-${section.type}">${section.data.label}</a>`;
      navList.appendChild(li);
    }

    const initFn = `init${section.type.charAt(0).toUpperCase() + section.type.slice(1)}`;
    if (typeof window[initFn] === 'function') {
      window[initFn]();
    }
  }

  navList.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#section-"]');
    if (a) {
      e.preventDefault();
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > window.innerHeight);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
