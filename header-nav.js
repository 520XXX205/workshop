class HeaderNav extends HTMLElement {
  constructor() {
    super();
    this.loadBoxIcons();
    this.animationTime = '0.3s';
    this.animationEasing = 'ease-in-out';
    this.navHeight = '60px'; // 导航栏高度
    this.innerHTML = `
      <style>
        /* 导航栏样式保持不变 */
        #content nav {
          position: fixed;
          top: 0;
          left: 220px;
          width: calc(100% - 220px);
          height: ${this.navHeight};
          background: var(--light);
          padding: 0 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 2000;
          transition: left ${this.animationTime} ${this.animationEasing},
                      width ${this.animationTime} ${this.animationEasing};
          box-sizing: border-box;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        #sidebar.hide + #content nav {
          left: 60px !important;
          width: calc(100% - 60px) !important;
        }

        /* 主内容区样式（核心：移除左右边距） */
        main {
          margin-left: 220px; /* 仅保留与侧边栏联动的左边距 */
          width: calc(100% - 220px); /* 宽度自适应 */
          min-height: 100vh;
          /* 关键：上下保留边距（可选），左右边距设为0 */
          padding: 0 0; /* 上20px、下20px，左0、右0 */
          margin-top: ${this.navHeight}; /* 避开顶部导航栏 */
          box-sizing: border-box; /* 确保宽度计算正确 */
          transition: margin-left ${this.animationTime} ${this.animationEasing},
                      width ${this.animationTime} ${this.animationEasing};
        }

        /* 侧边栏收起时，主内容区同步调整 */
        #sidebar.hide ~ main {
          margin-left: 60px !important; /* 左边距随侧边栏收缩 */
          width: calc(100% - 60px) !important;
        }

        /* 其他导航栏元素样式保持不变 */
        .bx-menu {
          font-size: 20px;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          background: transparent;
          transition: background 0.2s;
          z-index: 2100;
        }
        .bx-menu:hover {
          background: var(--grey);
        }
        .nav-link {
          font-size: 15px;
          padding: 6px 10px;
          border-radius: 4px;
          transition: background 0.2s;
        }
        form {
          flex: 1;
          min-width: 120px;
          margin: 0 8px;
        }
        .form-input {
          width: 100%;
          display: flex;
        }
        .form-input input {
          flex: 1;
          padding: 0 12px;
          height: 36px;
          border: none;
          background: var(--grey);
          border-radius: 18px 0 0 18px;
          outline: none;
          font-size: 14px;
        }
        .form-input button {
          width: 36px;
          height: 36px;
          border: none;
          background: var(--blue);
          color: white;
          border-radius: 0 18px 18px 0;
          cursor: pointer;
        }
        .agent-wrapper {
          display: flex;
          align-items: center;
          white-space: nowrap;
          margin: 0 8px;
        }
        .agent-container {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--dark);
          padding: 4px 6px;
        }
        .agent-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
        .swith-lm {
          margin: 0 8px;
        }
        .notification, .profile {
          padding: 6px;
          border-radius: 6px;
          transition: background 0.2s;
        }
        .notification .num {
          top: -4px;
          right: -4px;
          width: 18px;
          height: 18px;
          font-size: 11px;
        }
        .profile img {
          width: 32px;
          height: 32px;
        }
      </style>

      <section id="content">
        <nav>
          <i class='bx bx-menu bx-sm' ></i>
          <a href="#" class="nav-link">目录</a>
          <form action="#">
            <div class="form-input">
              <input type="search" placeholder="搜索...">
              <button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
            </div>
          </form>
          <div class="agent-wrapper">
            <a href="
https://jiutian.10086.cn/largemodel/cmstore/#/cmstore/chatPage?appId=6869413fb381ac407d5abe2d&appName=AI%E5%88%9B%E7%90%89%E4%BA%91%E5%9D%8A&tab=[object+Object]&fullScreen=1&teamId=68693cfd4c78b04e5ad827a4&hisState=JTdCJTIydGFiJTIyJTNBJTIybXlBcHAlMjIlMkMlMjJ0YWJOYW1lJTIyJTNBJTIyJUU2JTg4JTkxJUU3JTlBJTg0JUU1JUJBJTk0JUU3JTk0JUE4JTIyJTJDJTIydGVhbUlkJTIyJTNBJTIyNjg2OTNjZmQ0Yzc4YjA0ZTVhZDgyN2E0JTIyJTdE" class="agent-container">
              <img src="./images//agent.jpg" class="agent-avatar" alt="智能体">
              <span class="agent-status">问AI匠人</span>
            </a>
          </div>
          <input type="checkbox" class="checkbox" id="switch-mode" hidden />
          <label class="swith-lm" for="switch-mode">
              <i class="bx bxs-moon"></i>
              <i class="bx bx-sun"></i>
              <div class="ball"></div>
          </label>
          <a href="#" class="notification" id="notificationIcon">
              <i class='bx bxs-bell bx-tada-hover' ></i>
              <span class="num">8</span>
          </a>
          <a href="mykiln.html" class="profile" id="profileIcon">
              <img src="./images//set.jpg" alt="Profile">
          </a>
          <div class="profile-menu" id="profileMenu">
              <ul>
                  <li><a href="mykiln.html">我的橱窗</a></li>
                  <li><a href="#">注册</a></li>
                  <li><a href="#">登录</a></li>
              </ul>
          </div>
        </nav>
      </section>
    `;
  }

  loadBoxIcons() {
    if (!document.querySelector('link[href*="boxicons.min.css"]')) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
      document.head.appendChild(cssLink);
    }
  }

  connectedCallback() {
    this.menuBtn = this.querySelector('.bx-menu');
    this.sidebar = document.querySelector('#sidebar');
    this.nav = this.querySelector('nav');
    this.mainContent = document.querySelector('main');

    this.checkInitialState();
    this.bindMenuToggle();
    this.observeSidebarChanges();
  }

  checkInitialState() {
    if (!this.sidebar) return;
    const isHidden = this.sidebar.classList.contains('hide');
    if (this.nav) {
      this.nav.style.left = isHidden ? '60px' : '220px';
      this.nav.style.width = isHidden ? 'calc(100% - 60px)' : 'calc(100% - 220px)';
    }
    this.syncMainContent(isHidden);
  }

  bindMenuToggle() {
    if (!this.menuBtn || !this.sidebar) return;
    this.menuBtn.addEventListener('click', () => {
      this.sidebar.classList.toggle('hide');
      this.updateNavStyle();
    });
  }

  observeSidebarChanges() {
    if (!this.sidebar) return;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          this.updateNavStyle();
        }
      });
    });
    observer.observe(this.sidebar, { attributes: true });
  }

  updateNavStyle() {
    if (!this.sidebar) return;
    const isHidden = this.sidebar.classList.contains('hide');
    if (this.nav) {
      this.nav.style.left = isHidden ? '60px' : '220px';
      this.nav.style.width = isHidden ? 'calc(100% - 60px)' : 'calc(100% - 220px)';
    }
    this.syncMainContent(isHidden);
  }

  syncMainContent(isSidebarHidden) {
    if (!this.mainContent) {
      console.warn('未找到主内容区容器（<main>标签）');
      return;
    }
    const sidebarWidth = isSidebarHidden ? 60 : 220;
    this.mainContent.style.marginLeft = `${sidebarWidth}px`;
    this.mainContent.style.width = `calc(100% - ${sidebarWidth}px)`;
  }

  disconnectedCallback() {
    if (this.menuBtn) {
      this.menuBtn.removeEventListener('click', () => {});
    }
  }
}

customElements.define('header-nav', HeaderNav);