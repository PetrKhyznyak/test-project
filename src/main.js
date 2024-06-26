class AccordionList {
  constructor(data, mainContent) {
    this.data = data;
    this.mainContent= mainContent;
  }


  createAccordionList(data = this.data) {
    const ul = document.createElement('ul')
    for (const key in data) {
      const li = document.createElement('li')
      const textSpan = document.createElement('span');
      textSpan.textContent = key;
      textSpan.style.fontStyle = 'bold'
      textSpan.style.marginRight = '5px'
      li.appendChild(textSpan);
      const viewBtn = document.createElement('button');
      const printBtn = document.createElement('button');
      viewBtn.classList.add('menu-btn');
      printBtn.classList.add('menu-btn');
      viewBtn.textContent = 'Перегляд,';
      printBtn.textContent = 'Друк';
      viewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.mainContent.createMainContent(key, false)
      })
      printBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.mainContent.createMainContent(key, true)

      })
      li.appendChild(document.createTextNode('('))
      li.appendChild(viewBtn);
      li.appendChild(printBtn);
      li.appendChild(document.createTextNode(')'));
      if(Object.keys(data[key]).length > 0) {
        const nestedUl = this.createAccordionList(data[key]);
        nestedUl.style.display = 'none';
        li.appendChild(nestedUl);
        li.addEventListener('click', (e) => {
          e.stopPropagation();
          if (e.target === textSpan) {
            if (nestedUl.style.display === 'none') nestedUl.style.display = 'block';
            else nestedUl.style.display = 'none';
          }
        })
      }
      ul.appendChild(li);
    }
    return ul;
  }
}



class MainContent {
  constructor(container) {
    this.container = container;
  }

  createMainContent(data, isPrint = false) {
    const header = document.createElement('h2');
    header.textContent = data;
    if (isPrint) header.style.fontStyle = 'italic';
    this.container.innerHTML = '';
    this.container.appendChild(header);
    return header;
  }
}

const menu = [...document.getElementsByClassName('sidebar-menu')][0]
const mainContainer = [...document.getElementsByClassName("main-content")][0];
const data = {
  "Рівень 1": {
    "Рівень 11": {
      "Рівень 111": {},
      "Рівень 112": {},
    },
    "Рівень 12": {
      "Рівень 121": {},
      "Рівень 122": {},
    },
  },
  "Рівень 2": {
    "Рівень 21": {
      "Рівень 211": {},
      "Рівень 212": {},
    },
    "Рівень 22": {
      "Рівень 221": {},
      "Рівень 222": {},
    },
  },
  "Рівень 3": {
    "Рівень 31": {
      "Рівень 311": {},
      "Рівень 312": {},
    },
    "Рівень 32": {
      "Рівень 321": {},
      "Рівень 322": {},
    },
  },
  "Рівень 4": {
    "Рівень 41": {
      "Рівень 411": {},
      "Рівень 412": {},
    },
    "Рівень 42": {
      "Рівень 421": {},
      "Рівень 422": {},
    },
  },
  "Рівень 5": {
    "Рівень 51": {
      "Рівень 511": {},
      "Рівень 512": {},
    },
  },
  "Рівень 6": {
    "Рівень 61": {
      "Рівень 611": {},
      "Рівень 612": {},
    },
  },
  "Рівень 7": {
    "Рівень 71": {
      "Рівень 711": {},
      "Рівень 712": {},
    },
  },
  "Рівень 8": {
    "Рівень 81": {
      "Рівень 811": {},
      "Рівень 812": {},
    },
  },
  "Рівень 9": {
    "Рівень 91": {
      "Рівень 911": {},
      "Рівень 912": {},
    },
  },
  "Рівень 10": {
    "Рівень 101": {
      "Рівень 1011": {},
      "Рівень 1012": {},
    },
  },
  "Рівень 11": {
    "Рівень 111": {
      "Рівень 1111": {},
      "Рівень 1112": {},
    },
  },
  "Рівень 12": {
    "Рівень 121": {
      "Рівень 1211": {},
      "Рівень 1212": {},
    },
  },
  "Рівень 13": {
    "Рівень 131": {
      "Рівень 1311": {},
      "Рівень 1312": {},
    },
  },
  "Рівень 14": {
    "Рівень 141": {
      "Рівень 1411": {},
      "Рівень 1412": {},
    },
  },
  "Рівень 15": {
    "Рівень 151": {
      "Рівень 1511": {},
      "Рівень 1512": {},
    },
  },
  "Рівень 16": {
    "Рівень 161": {
      "Рівень 1611": {},
      "Рівень 1612": {},
    },
  },
  "Рівень 17": {
    "Рівень 171": {
      "Рівень 1711": {},
      "Рівень 1712": {},
    },
  },
  "Рівень 18": {
    "Рівень 181": {
      "Рівень 1811": {},
      "Рівень 1812": {},
    },
  },
  "Рівень 19": {
    "Рівень 191": {
      "Рівень 1911": {},
      "Рівень 1912": {},
    },
  },
  "Рівень 20": {
    "Рівень 201": {
      "Рівень 2011": {},
      "Рівень 2012": {},
    },
  },
};
const mainContent = new MainContent(mainContainer);
const list = new AccordionList(data, mainContent);
menu.innerHTML = '';
menu.appendChild(list.createAccordionList())
