// main.js

// 依日期由新到舊排序
const sortedArticles = [...ARTICLES].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

const newsListEl = document.getElementById("news-list");
const searchInput = document.getElementById("search-input");
const dateInput = document.getElementById("date-input");
const navAll = document.getElementById("nav-all");
const navCats = document.querySelectorAll(".nav-cat");

let currentCategory = null;
let currentKeyword = "";
let currentDate = null;

function renderArticles() {
  newsListEl.innerHTML = "";

  const filtered = sortedArticles.filter(article => {
    // 分類
    if (currentCategory && article.category !== currentCategory) return false;

    // 日期（只比 yyyy-mm-dd）
    if (currentDate) {
      const d = new Date(article.date);
      const dStr = d.toISOString().slice(0, 10);
      if (dStr !== currentDate) return false;
    }

    // 關鍵字
    if (currentKeyword) {
      const kw = currentKeyword.toLowerCase();
      const text =
        (article.title + article.summary + article.tags.join(" ")).toLowerCase();
      if (!text.includes(kw)) return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    newsListEl.innerHTML = `<p class="empty">沒有符合條件的新聞。</p>`;
    return;
  }

  filtered.forEach(article => {
    const d = new Date(article.date);
    const dateStr = d.toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    const card = document.createElement("article");
    card.className = "news-card";
    card.innerHTML = `
      <a href="article.html?id=${encodeURIComponent(article.id)}">
        <img src="${article.coverImage}" alt="${article.title}" class="news-cover" />
        <div class="news-body">
          <div class="news-meta">
            <span class="badge">${article.category}</span>
            <span class="date">${dateStr}</span>
          </div>
          <h2 class="news-title">${article.title}</h2>
          <p class="news-summary">${article.summary}</p>
          <div class="news-tags">
            ${article.tags
              .map(tag => `<span class="tag">#${tag}</span>`)
              .join("")}
          </div>
        </div>
      </a>
    `;
    newsListEl.appendChild(card);
  });
}

// 事件綁定
searchInput.addEventListener("input", e => {
  currentKeyword = e.target.value.trim();
  renderArticles();
});

dateInput.addEventListener("change", e => {
  currentDate = e.target.value || null;
  renderArticles();
});

navAll.addEventListener("click", e => {
  e.preventDefault();
  currentCategory = null;
  navCats.forEach(el => el.classList.remove("active"));
  renderArticles();
});

navCats.forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    currentCategory = el.dataset.category;
    navCats.forEach(n => n.classList.remove("active"));
    el.classList.add("active");
    renderArticles();
  });
});

// 初始渲染
renderArticles();
