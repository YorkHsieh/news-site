// article.js

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

const id = getQueryParam("id");
const container = document.getElementById("article-container");

const article = ARTICLES.find(a => a.id === id);

if (!article) {
  container.innerHTML = `<p class="empty">找不到這則新聞，可能已被移除或 ID 錯誤。</p>`;
} else {
  const d = new Date(article.date);
  const dateStr = d.toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  container.innerHTML = `
    <div class="article-meta">
      <span class="badge">${article.category}</span>
      <span class="date">${dateStr}</span>
    </div>
    <h1 class="article-title">${article.title}</h1>
    <img src="${article.coverImage}" alt="${article.title}" class="article-cover" />
    <div class="article-content">
      ${article.content}
    </div>
    <div class="article-tags">
      ${article.tags.map(tag => `<span class="tag">#${tag}</span>`).join("")}
    </div>
    <a href="index.html" class="back-link">← 回到首頁</a>
  `;
}
