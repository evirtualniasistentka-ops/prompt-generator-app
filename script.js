// Generátor promptů pro začátečníky
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);

  let mode = 'text';
  const picks = {}; // vybrané hodnoty z tlačítek (format, tone, length, style, mood, ratio)

  // ---------- Texty ----------
  const FORMAT = {
    text: 'jako souvislý text',
    list: 'v přehledných bodech',
    steps: 'jako postup krok za krokem',
    table: 'jako přehlednou tabulku'
  };
  const TONE = {
    friendly: 'přátelským tónem',
    formal: 'zdvořile a úředně',
    funny: 's humorem',
    simple: 'jednoduše a bez cizích slov'
  };
  const LENGTH = { short: 'stručně', medium: 'středně dlouze', long: 'podrobně' };
  const RATIO = {
    square: 'čtverec (poměr stran 1:1)',
    portrait: 'na výšku (poměr stran 4:5)',
    landscape: 'na šířku (poměr stran 16:9)',
    story: 'na výšku pro mobil (poměr stran 9:16)'
  };

  // ---------- Příklady ----------
  const EXAMPLES = {
    text: [
      {
        label: 'Večeře z toho, co je doma',
        role: 'zkušená kuchařka',
        task: 'Navrhni mi 3 rychlé večeře z toho, co mám doma.',
        context: 'Mám doma vejce, brambory, cibuli, sýr a trochu smetany. Vařím pro dva a máme jen 30 minut. Manžel nejí houby.',
        goal: 'Chci uvařit něco dobrého bez nakupování.',
        format: 'steps', tone: 'friendly', length: 'medium'
      },
      {
        label: 'Vzkaz sousedům',
        role: 'pečlivá asistentka, která píše srozumitelně',
        task: 'Napiš krátký a zdvořilý vzkaz sousedům na nástěnku v domě.',
        context: 'Na chodbě u sklepů se hromadí staré věci a kola. Chci sousedy poprosit, ať si je do pátku uklidí, protože v sobotu se bude malovat. Nechci, aby to znělo naštvaně.',
        goal: 'Chci, aby sousedé chodbu uklidili a nikdo se neurazil.',
        format: 'text', tone: 'friendly', length: 'short'
      },
      {
        label: 'Výlet s vnoučaty',
        role: 'cestovní poradce',
        task: 'Naplánuj jednodenní výlet s vnoučaty.',
        context: 'Vyjíždíme z Prahy vlakem. Děti je 6 a 9 let, rády jsou venku a baví je zvířata. Rozpočet je do 1500 Kč celkem. Babička nezvládne dlouhé chození do kopce.',
        goal: 'Chci, aby si výlet užily děti i babička a nikdo se neunavil.',
        format: 'steps', tone: 'friendly', length: 'long'
      },
      {
        label: 'Přání k narozeninám',
        role: '',
        task: 'Napiš přání k 70. narozeninám mé kamarádky Jany.',
        context: 'Známe se 40 let, od gymnázia. Jana miluje zahradu a peče nejlepší buchty v ulici. Chci, aby přání bylo vtipné, ale i trochu dojemné. Napíšu ho do přáníčka rukou, takže ať je krátké.',
        goal: 'Chci Janu rozesmát a zároveň jí ukázat, jak si jí vážím.',
        format: 'text', tone: 'funny', length: 'short'
      }
    ],
    image: [
      {
        label: 'Levandulová zahrada',
        subject: 'Dřevěná lavička v zahradě plné levandule, na lavičce hrnek čaje a otevřená kniha',
        style: 'jemný akvarel', mood: 'jemné ranní světlo', colors: 'pastelové, hlavně fialová a světle zelená',
        ratio: 'square', negative: 'žádný text, žádní lidé'
      },
      {
        label: 'Pozvánka na oslavu',
        subject: 'Velký dort se svíčkami uprostřed stolu, kolem balónky a konfety, pozadí ozdobené na oslavu',
        style: 'kreslená ilustrace', mood: 'svěží, jasná a veselá', colors: 'růžová, žlutá a tyrkysová',
        ratio: 'portrait', negative: 'žádný text'
      },
      {
        label: 'Kočka na okně',
        subject: 'Zrzavá kočka spí na parapetu okna, venku prší, na parapetu květináč s bylinkami',
        style: 'realistická fotografie', mood: 'útulná a klidná atmosféra', colors: 'teplé tóny',
        ratio: 'landscape', negative: 'žádný text, žádní lidé'
      }
    ]
  };

  // ---------- Pomocníci ----------
  const clean = (s) => (s || '').trim();
  const endDot = (s) => (/[.!?…]$/.test(s) ? s : s + '.');
  const firstLower = (s) => s.charAt(0).toLowerCase() + s.slice(1);

  // ---------- Skládání promptu ----------
  function buildText() {
    const role = clean($('role').value).replace(/[.!]+$/, '');
    const task = clean($('task').value);
    const context = clean($('context').value);
    const goal = clean($('goal').value);
    const fromFile = $('fileChip').getAttribute('aria-pressed') === 'true';
    const parts = [];

    if (role) parts.push({ cls: 'role', tag: 'Role', text: 'Jsi ' + firstLower(role) + '.' });
    if (task) parts.push({ cls: 'task', tag: 'Úkol', text: endDot(task) });
    if (context) parts.push({ cls: 'context', tag: 'Kontext', text: 'Kontext: ' + context });
    if (fromFile) parts.push({ cls: 'context', tag: 'Podklady', text: 'Podklady najdeš v přiloženém souboru. Vycházej z nich.' });
    if (goal) parts.push({ cls: 'goal', tag: 'Cíl', text: 'Cíl: ' + endDot(goal) });

    const how = [];
    if (picks.format) how.push(FORMAT[picks.format]);
    if (picks.tone) how.push(TONE[picks.tone]);
    if (picks.length) how.push(LENGTH[picks.length]);
    if (how.length) parts.push({ cls: 'format', tag: 'Podoba odpovědi', text: 'Odpověď napiš ' + how.join(', ') + '.' });

    if ($('askBack').checked) {
      parts.push({ cls: 'format', tag: 'Doptání', text: 'Než začneš, zeptej se mě na všechno, co ti k dobré odpovědi chybí.' });
    }

    // síla promptu
    let score = 0;
    if (task) score += task.length > 15 ? 3 : 2;
    const ctxLen = context.length + (fromFile ? 80 : 0);
    if (ctxLen) score += ctxLen > 60 ? 3 : 2;
    if (goal) score += 1;
    if (role) score += 1;
    if (how.length) score += 1;
    if ($('askBack').checked) score += 1;

    let tip;
    if (!task) tip = 'Začni tím, co má AI udělat. Stačí jedna věta.';
    else if (!ctxLen) tip = 'Teď to nejdůležitější: přidej kontext. Pro koho to je, co už víš, co nechceš.';
    else if (ctxLen <= 60) tip = 'Kontext je krátký. Zkus přidat ještě jeden detail, třeba pro koho to je nebo čeho se vyhnout.';
    else if (!goal) tip = 'Přidej cíl: k čemu výsledek použiješ. AI pak ví, na co se zaměřit.';
    else if (!role) tip = 'Zkus AI dát roli. Třeba „zkušená kuchařka“ nebo „trpělivý učitel“.';
    else if (!how.length) tip = 'Řekni, jak má odpověď vypadat: v bodech, krátce, přátelsky…';
    else if (!$('askBack').checked) tip = 'Skoro dokonalé! Zapni ještě „Ať se mě AI nejdřív doptá“, tak dostaneš ještě přesnější odpověď.';
    else tip = 'Výborně! Tohle je silný prompt. Zkopíruj ho a vyzkoušej.';

    return { parts, score: Math.min(score / 10, 1), tip };
  }

  function buildImage() {
    const subject = clean($('subject').value);
    const colors = clean($('colors').value);
    const negative = clean($('negative').value);
    const parts = [];

    if (subject) parts.push({ cls: 'task', tag: 'Co je na obrázku', text: 'Vytvoř obrázek: ' + endDot(firstLower(subject)) });
    if (picks.style) parts.push({ cls: 'role', tag: 'Styl', text: 'Styl: ' + picks.style + '.' });
    if (picks.mood) parts.push({ cls: 'context', tag: 'Nálada', text: 'Nálada a světlo: ' + picks.mood + '.' });
    if (colors) parts.push({ cls: 'format', tag: 'Barvy', text: 'Barvy: ' + endDot(colors) });
    if (picks.ratio) parts.push({ cls: 'format', tag: 'Formát', text: 'Formát: ' + RATIO[picks.ratio] + '.' });
    if (negative) parts.push({ cls: 'neg', tag: 'Bez', text: 'Na obrázku nesmí být: ' + endDot(negative) });

    let score = 0;
    if (subject) score += subject.length > 40 ? 3 : 2;
    if (picks.style) score += 2;
    if (picks.mood) score += 1;
    if (colors) score += 1;
    if (picks.ratio) score += 1;
    if (negative) score += 1;

    let tip;
    if (!subject) tip = 'Začni popisem: co má být na obrázku a co se tam děje.';
    else if (subject.length <= 40) tip = 'Popis je krátký. Přidej detaily: kde to je, jaké předměty jsou kolem, co se děje.';
    else if (!picks.style) tip = 'Vyber styl. Bez něj AI hádá a výsledek bývá nevýrazný.';
    else if (!picks.mood) tip = 'Přidej náladu a světlo. Ty dělají z obrázku atmosféru.';
    else if (!picks.ratio) tip = 'Vyber formát podle toho, kam obrázek dáš: příspěvek, story, úvodní fotka.';
    else if (!negative) tip = 'Tip na závěr: napiš, co tam být nemá. Třeba „žádný text“, AI ráda kreslí nesmyslné nápisy.';
    else tip = 'Výborně! S takovým popisem dostaneš obrázek, jaký si představuješ.';

    return { parts, score: Math.min(score / 9, 1), tip };
  }

  // ---------- Vykreslení ----------
  let plainText = '';

  function render() {
    const { parts, score, tip } = mode === 'text' ? buildText() : buildImage();
    const out = $('output');
    out.innerHTML = '';

    if (!parts.length) {
      const p = document.createElement('p');
      p.className = 'placeholder';
      p.textContent = 'Tady se ti bude skládat prompt. Každá barevná část ukazuje, z čeho se dobrý prompt skládá.';
      out.appendChild(p);
    } else {
      parts.forEach((part) => {
        const div = document.createElement('div');
        div.className = 'seg seg-' + part.cls;
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = part.tag;
        const p = document.createElement('p');
        p.textContent = part.text;
        div.append(tag, p);
        out.appendChild(div);
      });
    }

    plainText = parts.map((p) => p.text).join('\n\n');

    // měřák
    const pct = Math.round(score * 100);
    const bar = $('meterBar');
    bar.style.width = pct + '%';
    let label = 'Zatím prázdný';
    let color = 'var(--pink)';
    if (pct > 0 && pct < 40) label = 'Slabší';
    else if (pct >= 40 && pct < 75) { label = 'Dobrý'; color = '#f0c400'; }
    else if (pct >= 75 && pct < 100) { label = 'Silný'; color = '#2bb8bd'; }
    else if (pct >= 100) { label = 'Výborný'; color = 'var(--navy)'; }
    bar.style.background = color;
    $('meterLabel').textContent = label;
    $('meterTip').querySelector('span').textContent = tip;

    // tlačítka
    const has = parts.length > 0;
    $('copyBtn').disabled = !has;
    setLink($('chatgptLink'), has ? 'https://chatgpt.com/?q=' + encodeURIComponent(plainText) : null);
    setLink($('claudeLink'), has && mode === 'text' ? 'https://claude.ai/new?q=' + encodeURIComponent(plainText) : null);
    $('claudeLink').classList.toggle('hidden', mode === 'image');
  }

  function setLink(a, href) {
    if (href) { a.href = href; a.setAttribute('aria-disabled', 'false'); a.tabIndex = 0; }
    else { a.href = '#'; a.setAttribute('aria-disabled', 'true'); a.tabIndex = -1; }
  }

  // ---------- Hlášky ----------
  let statusTimer;
  function say(msg) {
    const s = $('status');
    s.textContent = msg;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => (s.textContent = ''), 3500);
  }

  // ---------- Výběrová tlačítka ----------
  function setPick(group, value) {
    picks[group] = value || undefined;
    document.querySelectorAll('[data-group="' + group + '"] .chip').forEach((c) => {
      c.setAttribute('aria-pressed', c.dataset.value === value ? 'true' : 'false');
    });
  }

  document.querySelectorAll('[data-group]').forEach((groupEl) => {
    const group = groupEl.dataset.group;
    groupEl.querySelectorAll('.chip').forEach((chip) => {
      chip.setAttribute('aria-pressed', 'false');
      chip.addEventListener('click', () => {
        setPick(group, picks[group] === chip.dataset.value ? null : chip.dataset.value);
        render();
      });
    });
  });

  document.querySelectorAll('[data-fill]').forEach((groupEl) => {
    const target = $(groupEl.dataset.fill);
    groupEl.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        target.value = chip.dataset.value;
        target.focus();
        render();
      });
    });
  });

  // ---------- Podklady v souboru ----------
  $('fileChip').addEventListener('click', () => {
    const b = $('fileChip');
    b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    render();
  });

  // ---------- Příklady ----------
  function renderExamples() {
    const box = $('examples');
    box.innerHTML = '';
    EXAMPLES[mode].forEach((ex) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip example-chip';
      b.textContent = ex.label;
      b.addEventListener('click', () => loadExample(ex));
      box.appendChild(b);
    });
  }

  function loadExample(ex) {
    if (mode === 'text') {
      $('role').value = ex.role;
      $('task').value = ex.task;
      $('context').value = ex.context;
      $('goal').value = ex.goal || '';
      $('fileChip').setAttribute('aria-pressed', 'false');
      setPick('format', ex.format);
      setPick('tone', ex.tone);
      setPick('length', ex.length);
    } else {
      $('subject').value = ex.subject;
      $('colors').value = ex.colors;
      $('negative').value = ex.negative;
      setPick('style', ex.style);
      setPick('mood', ex.mood);
      setPick('ratio', ex.ratio);
    }
    render();
    say('Příklad je vyplněný. Zkus si v něm něco změnit a sleduj, jak se mění prompt.');
  }

  // ---------- Přepínání režimu ----------
  function setMode(m) {
    mode = m;
    document.querySelector('.mode-switch').dataset.mode = m;
    document.querySelectorAll('.mode-btn').forEach((b) => {
      const on = b.dataset.mode === m;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    $('textForm').classList.toggle('hidden', m !== 'text');
    $('imageForm').classList.toggle('hidden', m !== 'image');
    renderExamples();
    render();
  }
  document.querySelectorAll('.mode-btn').forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode)));

  // ---------- Kopírování ----------
  $('copyBtn').addEventListener('click', () => {
    const done = () => say('Zkopírováno! Teď ho vlož do ChatGPT, Clauda nebo Gemini.');
    const fallback = () => {
      const ta = document.createElement('textarea');
      ta.value = plainText;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      ta.remove();
      say(ok ? 'Zkopírováno! Teď ho vlož do ChatGPT, Clauda nebo Gemini.' : 'Kopírování se nepovedlo. Označ text myší a zkopíruj ho ručně.');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(plainText).then(done).catch(fallback);
    } else {
      fallback();
    }
  });

  // ---------- Začít znovu ----------
  $('resetBtn').addEventListener('click', () => {
    const form = mode === 'text' ? $('textForm') : $('imageForm');
    form.querySelectorAll('input[type="text"], textarea').forEach((el) => (el.value = ''));
    if (mode === 'text') {
      $('askBack').checked = false;
      $('fileChip').setAttribute('aria-pressed', 'false');
      ['format', 'tone', 'length'].forEach((g) => setPick(g, null));
    } else {
      ['style', 'mood', 'ratio'].forEach((g) => setPick(g, null));
    }
    render();
  });

  // ---------- Živé skládání ----------
  document.addEventListener('input', render);
  document.addEventListener('change', render);

  setMode('text');
})();
