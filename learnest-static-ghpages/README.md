
# Learnest 靜態單頁模板（GitHub Pages 版）

零安裝、零依賴、可直接上載到 GitHub Pages 的單頁網站。
- 純原生：HTML + CSS + JS
- RWD：360 / 768 / 1280
- a11y：語義化、標籤對應、可鍵盤操作
- 互動：平滑滾動、回到頂部、表單前端驗證（不送往後端）
- SEO：title / description / Open Graph
- 相對路徑：所有資源以 `./...` 形式引用，適用 **專案頁** (`username.github.io/repo/`)

## 最短上線（GitHub Pages）
1. 到 GitHub 建立新倉庫（任意名稱，例如 `learnest-static`）。
2. 上載本專案所有檔案（`index.html`、`styles.css`、`script.js`、`README.md`、`assets/`）。
3. 進入 **Settings → Pages**：
   - **Source**：選 **Deploy from a branch**
   - **Branch**：選 `main`，Folder 選 `/ (root)`，按 **Save**
4. 等 1–2 分鐘，GitHub Pages 會生成網址：  
   `https://<你的用戶名>.github.io/<你的倉庫名>/`
5. 以後只要 push 到 main 分支，Pages 會自動更新。

> **個人頁 vs 專案頁**
> - **個人頁（User Page）**：倉庫名必須是 `username.github.io`，網址是 `https://username.github.io/`（根路徑 `/`）。
> - **專案頁（Project Page）**：任意倉庫名，網址是 `https://username.github.io/<repo>/`（子路徑 `/repo/`）。
> - 本模板所有資源都用 **相對路徑**（例如 `./styles.css`、`./assets/...`），因此在**專案頁**也能正常顯示。

## 常見問題（FAQ）
**Q1. 上線後 CSS/圖載不到？**  
- 檢查引用是否為相對路徑（例如 `./styles.css`、`./assets/favicon.png`）。  
- 專案頁網址是 `.../你的倉庫名/`，**不可**用絕對根路徑 `/styles.css`。  
- 檢查檔名大小寫是否一致（GitHub Pages 大小寫敏感）。

**Q2. 首頁 404？**  
- 確認 Settings → Pages 已設為「Deploy from a branch」，且 Branch=main、Folder=/root。  
- 確保倉庫根目錄存在 `index.html`。

**Q3. 表單按下送出後會去到別的頁？**  
- 本模板在 `script.js` 使用 `e.preventDefault()` 阻止預設提交，並顯示感謝訊息。請確保 `script.js` 有正確載入（相對路徑）。

**Q4. 圖片要 1200×800 嗎？**  
- 是。本模板隨附 6 張 1200×800 PNG 佔位圖；你也可以自行換成真實作品圖片（建議同尺寸／比例）。

## 自訂建議
- 修改 `index.html` 頂部「站點設定註解」中的站名、標語、CTA 文案與社交連結。
- 文字、配色、圓角可在 `styles.css` 中透過 `--primary`、`--secondary`、`--radius` 變數調整。
