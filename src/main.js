export class AccordionList {
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



export class MainContent {
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
    "Рівень 11": {},
    "Рівень 12": {},
  },
  "Рівень 2": {
    "Рівень 21": {
      "Рівень 211": {
        "Рівень 2111": {},
      },
    },
  },
}
const mainContent = new MainContent(mainContainer);
const list = new AccordionList(data, mainContent);
menu.innerHTML = '';
menu.appendChild(list.createAccordionList())
