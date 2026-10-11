(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;

  // boot preloader
  const bt = $('#bootText'), boot = '> initializing portfolio...';
  let bi = 0;
  (function typeBoot() { if (bi <= boot.length) { bt.textContent = boot.slice(0, bi++); setTimeout(typeBoot, 38); } })();
  const hidePre = () => $('#preloader').classList.add('done');
  addEventListener('load', () => setTimeout(hidePre, 1500));
  setTimeout(hidePre, 3500);

  $('#yr').textContent = new Date().getFullYear();

  // scroll effects
  const nav = $('#nav'), prog = $('#progress'), topBtn = $('#toTop');
  function onScroll() {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (y / h * 100) + '%';
    nav.classList.toggle('scrolled', y > 30);
    topBtn.classList.toggle('show', y > 700);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  topBtn.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

  const burger = $('#burger'), links = $('#links');
  burger.onclick = () => { burger.classList.toggle('open'); links.classList.toggle('open'); };
  $$('#links a').forEach(a => a.onclick = () => { burger.classList.remove('open'); links.classList.remove('open'); });

  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) $$('#links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));

  const rev = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); }
  }), { threshold: .1 });
  $$('.rv').forEach(el => rev.observe(el));

  // role typer
  const roles = ['Frontend Developer', 'React + JavaScript', 'Machine Learning projects', 'AI Engineer for Developers (Associate)'];
  const t = $('#typed'); let wi = 0, ci = 0, del = false;
  (function type() {
    const w = roles[wi];
    t.textContent = w.slice(0, ci);
    let d = del ? 35 : 80;
    if (!del && ci === w.length) { del = true; d = 1500; }
    else if (del && ci === 0) { del = false; wi = (wi + 1) % roles.length; d = 350; }
    ci += del ? -1 : 1;
    setTimeout(type, d);
  })();

  // terminal code typing
  const codeEl = $('#code code');
  const lines = [
    '<span class="k">const</span> <span class="f">iman</span> <span class="p">=</span> <span class="p">{</span>',
    '  role<span class="p">:</span> <span class="s">"Frontend Developer"</span><span class="p">,</span>',
    '  studying<span class="p">:</span> <span class="s">"BS CS @ FAST NUCES"</span><span class="p">,</span>',
    '  stack<span class="p">:</span> <span class="p">[</span><span class="s">"React"</span><span class="p">,</span> <span class="s">"JS"</span><span class="p">,</span> <span class="s">"C++"</span><span class="p">],</span>',
    '  certified<span class="p">:</span> <span class="s">"DataCamp AI Engineer"</span><span class="p">,</span>',
    '  focus<span class="p">:</span> <span class="s">"Machine Learning"</span><span class="p">,</span>',
    '  hireable<span class="p">:</span> <span class="n">true</span><span class="p">,</span>',
    '<span class="p">};</span>'
  ];
  let li = 0;
  (function addLine() {
    if (li >= lines.length) { codeEl.innerHTML += '<i class="caret">|</i>'; return; }
    codeEl.innerHTML += (li ? '\n' : '') + lines[li++];
    setTimeout(addLine, reduce ? 0 : 420);
  })();
  const startCode = () => {}; startCode();

  // counters
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, to = +el.dataset.to; let n = 0;
    const step = () => { n += Math.max(1, to / 40); if (n >= to) { el.textContent = to; return; } el.textContent = Math.floor(n); requestAnimationFrame(step); };
    step(); cio.unobserve(el);
  }), { threshold: .6 });
  $$('.count').forEach(c => cio.observe(c));

  // filters
  function filter(btnsSel, itemsSel) {
    const btns = $$(btnsSel + ' button'), items = $$(itemsSel);
    btns.forEach(b => b.onclick = () => {
      btns.forEach(x => x.classList.remove('on')); b.classList.add('on');
      const f = b.dataset.f; let n = 0;
      items.forEach(it => {
        const ok = f === 'all' || it.dataset.c.split(' ').includes(f);
        it.classList.toggle('hide', !ok);
        it.classList.remove('pop', 'rv'); it.style.opacity = 1; it.style.transform = '';
        if (ok) { void it.offsetWidth; it.style.animationDelay = (n++ * 40) + 'ms'; it.classList.add('pop'); }
      });
    });
  }
  filter('#filters', '#projGrid .proj');

  // contact form -> email client
  $('#form').addEventListener('submit', e => {
    e.preventDefault();
    const n = $('#name').value, em = $('#email').value, m = $('#message').value;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=iamiman.is04@gmail.com&su=${encodeURIComponent('Portfolio message from ' + n)}&body=${encodeURIComponent(m + '\n\n' + n + ' (' + em + ')')}`, '_blank', 'noopener');
  });

})();
