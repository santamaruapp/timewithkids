// 言語検出と切り替え機能
class LanguageSwitcher {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.init();
    }

    detectLanguage() {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get("lang");
        if (langParam === "en" || langParam === "ja") {
            return langParam;
        }

        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith("ja")) {
            return "ja";
        }
        return "en";
    }

    init() {
        this.createLanguageSwitcher();
        this.updatePageLanguage();
    }

    createLanguageSwitcher() {
        const switcher = document.createElement("div");
        switcher.className = "language-switcher";
        switcher.innerHTML = `
            <button onclick="languageSwitcher.switchLanguage('ja')" 
                    class="lang-btn ${this.currentLang === 'ja' ? 'active' : '''}">日本語</button>
            <button onclick="languageSwitcher.switchLanguage('en')" 
                    class="lang-btn ${this.currentLang === 'en' ? 'active' : '''}">English</button>
        `;

        const style = document.createElement("style");
        style.textContent = `
            .language-switcher {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                padding: 8px;
            }
            .lang-btn {
                background: none;
                border: 1px solid #ddd;
                padding: 6px 12px;
                margin: 0 2px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
            }
            .lang-btn.active {
                background: #007AFF;
                color: white;
                border-color: #007AFF;
            }
            .lang-btn:hover {
                background: #f0f0f0;
            }
            .lang-btn.active:hover {
                background: #0056CC;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(switcher);
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        const currentPath = window.location.pathname;
        const baseName = currentPath.replace(/\.html$/, "").replace(/-en$/, "");
        
        let newPath;
        if (lang === "en") {
            newPath = baseName === "/index" ? "/index-en.html" : `${baseName}-en.html`;
        } else {
            newPath = baseName.replace("-en", "") + ".html";
        }
        
        window.location.href = newPath;
    }

    updatePageLanguage() {
        document.documentElement.lang = this.currentLang;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.languageSwitcher = new LanguageSwitcher();
});
