const app = document.getElementById("app");

let state = {
  bank: [72, 101],
  odds: [1, 5, 3, 11, 13],
  evens: [2, 8, 98]
};

function isOdd(number) {
  return number % 2 !== 0;
}

function isEven(number) {
  return number % 2 === 0;
}

const render = () => {
  const bankHTML = state.bank.map((num) => {
    return `<span class="number-tag">${num}</span>`;
  }).join('') || '<span style="color: #999;">Empty</span>';

  const oddsHTML = state.odds.map((num) => {
    return `<span class="number-tag">${num}</span>`;
  }).join('') || '<span style="color: #999;">Empty</span>';

  const evensHTML = state.evens.map((num) => {
    return `<span class="number-tag">${num}</span>`;
  }).join('') || '<span style="color: #999;">Empty</span>';

  app.innerHTML = `
    <h1>Odds and Events</h1>
    <p>Add a number to the bank</p>
    
    <div class="controls">
      <input type="number" id="numberInput" placeholder="Enter a number" />
      <button id="addBtn">Add number</button>
      <button id="sortOneBtn">Sort 1</button>
      <button id="sortAllBtn">Sort All</button>
    </div>
    
    <h2>Bank</h2>
    <div class="numbers" id="bankContainer">
      ${bankHTML}
    </div>
    
    <div class="categories">
      <div class="category-box">
        <h3>Odds</h3>
        <div class="numbers" id="oddsContainer">
          ${oddsHTML}
        </div>
      </div>
      <div class="category-box">
        <h3>Evens</h3>
        <div class="numbers" id="evensContainer">
          ${evensHTML}
        </div>
      </div>
    </div>
  `;

  attachEventListeners();
};

function attachEventListeners() {
  const addBtn = document.getElementById("addBtn");
  const input = document.getElementById("numberInput");
  const sortOneBtn = document.getElementById("sortOneBtn");
  const sortAllBtn = document.getElementById("sortAllBtn");

  addBtn.addEventListener("click", () => {
    const value = input.value.trim();
    if (value === "") return;
    
    const number = Number(value);
    if (isNaN(number)) return;
    
    state.bank.push(number);
    input.value = "";
    render();
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addBtn.click();
    }
  });

  sortOneBtn.addEventListener("click", () => {
    if (state.bank.length === 0) return;
    
    const number = state.bank.shift();
    
    if (isEven(number)) {
      state.evens.push(number);
    } else {
      state.odds.push(number);
    }
    
    render();
  });

  sortAllBtn.addEventListener("click", () => {
    while (state.bank.length > 0) {
      const number = state.bank.shift();
      
      if (isEven(number)) {
        state.evens.push(number);
      } else {
        state.odds.push(number);
      }
    }
    
    render();
  });
}

render();