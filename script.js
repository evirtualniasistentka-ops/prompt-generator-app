// DOM Elements
const aiModelSelect = document.getElementById('aiModel');
const topicInput = document.getElementById('topic');
const levelSelect = document.getElementById('level');
const formatSelect = document.getElementById('format');
const toneSelect = document.getElementById('tone');
const additionalNotesTextarea = document.getElementById('additionalNotes');
const generateBtn = document.getElementById('generateBtn');
const promptOutput = document.getElementById('promptOutput');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');

// Event Listeners
generatBtn.addEventListener('click', generatePrompt);
copyBtn.addEventListener('click', copyPrompt);
downloadBtn.addEventListener('click', downloadPrompt);
shareBtn.addEventListener('click', sharePrompt);

// Update button states when output changes
document.addEventListener('input', updateButtonStates);

// Prompt Templates
const promptTemplates = {
  chatgpt: {
    basic: "Napiš krátko a jasně o {topic}",
    intermediate: "Vysvětli detailně {topic}. Zaměř se na klíčové body.",
    advanced: "Proveď hloubkovou analýzu {topic}. Zahrň historii, současnost a budoucnost.",
    expert: "Proveď expertní analýzu {topic} s odkazem na nejnovější výzkumy a teorie."
  },
  claude: {
    basic: "Vysvětli {topic} jednoduše",
    intermediate: "Projdi {topic} s příklady a vysvětleními",
    advanced: "Analyse {topic} z více perspektiv s konkrétními příklady",
    expert: "Proveď nuancovanou analýzu {topic} s kritickým zhodnocením"
  },
  gemini: {
    basic: "Kdo, Co, Kde, Kdy, Proč o {topic}",
    intermediate: "Najdi zajímavé fakty a informace o {topic}",
    advanced: "Vytvoř komplexní přehled {topic} s vizuálním popisem",
    expert: "Vypracuj výzkumný dokument o {topic} s citatovými zdroji"
  },
  custom: {
    basic: "Řekni mi něco zajímavého o {topic}",
    intermediate: "Vysvětli {topic} podrobně",
    advanced: "Udělej hloubkový průzkum {topic}",
    expert: "Buď expertem na {topic} a poděl se o své znalosti"
  }
};

function generatePrompt() {
  const aiModel = aiModelSelect.value;
  const topic = topicInput.value || 'toto téma';
  const level = levelSelect.value;
  const format = formatSelect.value;
  const tone = toneSelect.value;
  const additionalNotes = additionalNotesTextarea.value;

  if (!topic.trim()) {
    alert('Prosím vyplň téma!');
    return;
  }

  let basePrompt = promptTemplates[aiModel][level].replace('{topic}', topic);

  // Add format instructions
  const formatInstructions = {
    text: 'Odpověz v textové formě.',
    list: 'Odpověz jako seznam odrážek.',
    code: 'Odpověz s příklady kódu.',
    table: 'Odpověz jako tabulku.'
  };

  // Add tone instructions
  const toneInstructions = {
    professional: 'Drž profesionální tón.',
    casual: 'Drž neformální a přátelský tón.',
    funny: 'Buď vtipný a zábavný.',
    scientific: 'Drž vědecký a akademický tón.'
  };

  let finalPrompt = `${basePrompt}\n\n${formatInstructions[format]} ${toneInstructions[tone]}`;

  if (additionalNotes) {
    finalPrompt += `\n\nDalší pokyny: ${additionalNotes}`;
  }

  // Display the prompt
  promptOutput.innerHTML = `<pre>${escapeHtml(finalPrompt)}</pre>`;
  updateButtonStates();
}

function updateButtonStates() {
  const hasOutput = promptOutput.querySelector('pre');
  copyBtn.disabled = !hasOutput;
  downloadBtn.disabled = !hasOutput;
  shareBtn.disabled = !hasOutput;
}

function getPromptText() {
  const preElement = promptOutput.querySelector('pre');
  return preElement ? preElement.textContent : '';
}

function copyPrompt() {
  const text = getPromptText();
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Prompt zkopírován do schránky!');
  }).catch(() => {
    alert('Chyba při kopírování');
  });
}

function downloadPrompt() {
  const text = getPromptText();
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', 'prompt_' + Date.now() + '.txt');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  showNotification('Prompt stažen!');
}

function sharePrompt() {
  const text = getPromptText();
  if (navigator.share) {
    navigator.share({
      title: 'Generovaný Prompt',
      text: text
    }).catch(err => console.log('Chyba při sdílení:', err));
  } else {
    showNotification('Sdílení není v tomto prohlížeči podporováno. Zkus kopírování!');
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// Initialize button states on page load
window.addEventListener('load', updateButtonStates);
