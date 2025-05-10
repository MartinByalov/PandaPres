const energyData = {
    "ВЯТЪР": {
      advantage: "Чиста и възобновяема енергия",
      disadvantage: "Зависи от времето"
    },
    "ГЕОТЕРМАЛНА ЕНЕРГИЯ": {
      advantage: "Надежден и постоянен източник",
      disadvantage: "Ограничена достъпност"
    },
    "ВОДА": {
      advantage: "Голяма енергийна мощност",
      disadvantage: "Изисква големи язовири"
    },
    "БИОМАСА": {
      advantage: "Използва органични отпадъци",
      disadvantage: "Може да доведе до замърсяване"
    },
    "СЛЪНЦЕ": {
      advantage: "Изобилен и безплатен ресурс",
      disadvantage: "Неефективен при облачно време"
    },
    "ЯДРЕНА ЕНЕРГИЯ": {
      advantage: "Висока ефективност",
      disadvantage: "Радиоактивни отпадъци"
    },
    "НЕФТ": {
      advantage: "Висока енергийна стойност",
      disadvantage: "Сериозно замърсяване"
    },
    "ПРИРОДЕН ГАЗ": {
      advantage: "По-чист от въглищата",
      disadvantage: "Изкопаем ресурс с емисии"
    },
    "ВЪГЛИЩА": {
      advantage: "Достъпни и евтини",
      disadvantage: "Силно замърсяващи"
    }
  };
  
  let totalCards = document.querySelectorAll('.item').length;
  let placedCards = 0;
  
  document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('type', item.dataset.type);
      e.dataTransfer.setData('html', item.outerHTML);
      e.dataTransfer.setData('id', item.dataset.id);
    });
  });
  
  document.querySelectorAll('.dropzone').forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.style.backgroundColor = "#d2f8d2";
    });
  
    zone.addEventListener('dragleave', () => {
      zone.style.backgroundColor = "#eef9ff";
    });
  
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.style.backgroundColor = "#eef9ff";
  
      const type = e.dataTransfer.getData('type');
      const html = e.dataTransfer.getData('html');
      const id = e.dataTransfer.getData('id');
  
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const cardTitle = doc.querySelector('p')?.textContent;
  
      if (zone.dataset.accept === type) {
        const container = zone.querySelector('.card-container');
        container.insertAdjacentHTML('beforeend', html);
  
        // Премахваме оригиналната карта
        const draggedItem = document.querySelector(`.item[data-id="${id}"]`);
        if (draggedItem) draggedItem.remove();
  
        placedCards++;
        if (cardTitle && energyData[cardTitle]) {
          const info = energyData[cardTitle];
          showModal(cardTitle, info.advantage, info.disadvantage);
        }
  
        if (placedCards === totalCards) {
          setTimeout(() => {
            window.location.href = "template.html";
          }, 1000);
        }
      } else {
        zone.style.backgroundColor = "#f8d2d2";
        setTimeout(() => {
          zone.style.backgroundColor = "#eef9ff";
        }, 500);
      }
    });
  });
  
  // Разбъркване на картите при зареждане
  window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('source-container');
    const items = Array.from(container.children);
  
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      container.appendChild(items[j]);
    }
  });
  
  // Модален прозорец
  function showModal(title, advantage, disadvantage) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-advantage").textContent = advantage;
    document.getElementById("modal-disadvantage").textContent = disadvantage;
  
    document.getElementById("info-modal").classList.remove("hidden");
  }
  
  document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("info-modal").classList.add("hidden");
  });
  