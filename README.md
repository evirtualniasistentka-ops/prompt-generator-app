# 🤖 Generátor Promptů

> Vytvářej kvalitní prompty pro AI modely s jednoduchým a intuitivním rozhraním

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/evirtualniasistentka-ops/prompt-generator-app)
[![License](https://img.shields.io/badge/License-MIT-green)](#licence)

## 📋 Popis

**Generátor Promptů** je webová aplikace pro začátečníky, kteří se učí psát zadání (prompty) pro umělou inteligenci. Uživatel vyplní, co ví, a prompt se mu skládá živě před očima. Každá část promptu má barevný štítek, takže je vidět, z čeho se dobrý prompt skládá.

### 🎯 Hlavní vlastnosti

- ✍️ **Dva režimy**: prompt pro **text** a prompt pro **obrázek**
- 🧩 **Postup krok za krokem** (text): role, úkol, kontext, cíl, podoba odpovědi (forma, tón, délka)
- 🖼️ **Obrázky**: popis, styl, nálada a světlo, barvy, formát a co na obrázku být nemá
- 📎 **„Mám to v souboru“**: podklady není nutné přepisovat, stačí soubor přiložit v ChatGPT nebo Claudovi
- 📊 **Síla promptu**: ukazatel s tipem, co ještě doplnit
- 💡 **Příklady ze života**: večeře z toho, co je doma, vzkaz sousedům, výlet s vnoučaty, přání k narozeninám…
- 🔗 **Kopírovat / Otevřít v ChatGPT / Otevřít v Claude**
- 📱 **Responzivní design**: funguje na počítači, tabletu i mobilu
- 🪟 **Vzhled**: průhledná skleněná okna ve stylu macOS, jemný akvarel a bílá réva v pozadí

## 🛠️ Technologie

- **HTML5**, **CSS3** a čistý **JavaScript** – bez knihoven a bez instalace
- Písmo **Montserrat** (Google Fonts)
- **SVG** pro ikony a vzor větviček v pozadí

## 📁 Struktura projektu

```
prompt-generator-app/
├── index.html              # Stránka aplikace
├── styles.css              # Vzhled
├── script.js               # Skládání promptu, příklady, síla promptu
├── assets/
│   └── vetvicky.svg        # Vzor větviček v pozadí
└── README.md               # Tento soubor
```

## 🚀 Jak začít

Stačí otevřít soubor `index.html` v prohlížeči. Nebo spustit lokální server:

```bash
python3 -m http.server 8000
```

a otevřít `http://localhost:8000`.

## 💡 Jak použít

1. Vyber, jestli chceš prompt pro **text**, nebo pro **obrázek**
2. Pokud nevíš, jak začít, klikni na některý **příklad**
3. Vyplň, co víš – stačí **úkol**, ale čím víc kontextu, tím lepší výsledek
4. Sleduj **sílu promptu** a tipy, co doplnit
5. Prompt **zkopíruj** nebo ho rovnou **otevři v ChatGPT či Claudovi**

## 🎨 Barvy

```css
--pink: #eb3d7a      /* Růžová */
--navy: #112d74      /* Tmavě modrá */
--yellow: #ffee62    /* Žlutá */
--turq: #8beef1      /* Tyrkysová */
```

## 🤝 Přispívání

Příspěvky vítáme! Jak na to:

1. Udělej **fork** repozitáře
2. **Vytvoř** novou větev (`git checkout -b feature/AmazingFeature`)
3. **Commitni** změny (`git commit -m 'Add some AmazingFeature'`)
4. **Pushni** větev (`git push origin feature/AmazingFeature`)
5. **Otevři** Pull Request

### Nápady na vylepšení:

- [ ] Ukládání oblíbených promptů
- [ ] Návrhy promptů
- [ ] API integrace pro skutečné generování
- [ ] Podpora více jazyků
- [ ] Tmavý/světlý režim
- [ ] Export do dalších formátů (PDF, Markdown)

## 📝 Licence

Tento projekt je licencován pod **MIT licencí** – podrobnosti najdeš v souboru [LICENSE](LICENSE).

## 👤 Autor

**evirtualniasistentka-ops**
- GitHub: [@evirtualniasistentka-ops](https://github.com/evirtualniasistentka-ops)
- Projekt: [prompt-generator-app](https://github.com/evirtualniasistentka-ops/prompt-generator-app)

## 🙏 Poděkování

Díky za:
- Inspiraci z moderních AI nástrojů
- Komunitu, která tyto nástroje používá
- Všem přispěvatelům

---

<div align="center">

### ⭐ Pokud se ti projekt líbí, dej mu hvězdičku!

[⬆ Zpět nahoru](#-generátor-promptů)

</div>
