const config = window.SEJONG_ASSOCIATION_CONFIG || {};

const resourceData = {
  notices: [
    {
      type: "공문",
      title: "세종조합 관리비 인상의 건",
      description: "기존 150,000원에서 180,000원으로 인상되며 2026년 2월 1일 책임개시 계약 건부터 적용됩니다.",
      date: "2026.02.02"
    },
    {
      type: "안내",
      title: "세종특별자치시 전세버스운송사업조합 홈페이지 안내",
      description: "조합 공문, 업무자료, 종사자 교육과 공식 기관 바로가기를 이용하실 수 있습니다.",
      date: "2026.07.21"
    },
    {
      type: "안전",
      title: "교통안전 관련 공식 기관 이용 안내",
      description: "한국교통안전공단과 전세버스 교통안전정보 공시 서비스를 확인해 주세요.",
      date: "상시"
    },
    {
      type: "공제",
      title: "전국전세버스공제조합 업무 바로가기",
      description: "공제 관련 업무는 공식 공제조합 홈페이지에서 확인할 수 있습니다.",
      date: "상시"
    }
  ],
  files: [
    {
      type: "서식",
      title: "사업계획 변경 관련 서식",
      description: "조합에서 사용하는 최신 업무서식은 확정 후 이 영역에 등록됩니다.",
      date: "자료 준비 중"
    },
    {
      type: "법령",
      title: "전세버스 운송사업 관련 법령·지침",
      description: "운송사업 관련 법령과 행정지침 자료를 분류해 제공합니다.",
      date: "자료 준비 중"
    },
    {
      type: "운영",
      title: "차량 및 운수종사자 업무자료",
      description: "차량관리와 운수종사자 업무에 필요한 자료를 제공합니다.",
      date: "자료 준비 중"
    },
    {
      type: "정관",
      title: "조합 정관 및 운영규정",
      description: "공개가 확정된 조합 운영규정과 관련 자료를 제공합니다.",
      date: "자료 준비 중"
    }
  ],
  education: [
    {
      type: "교육",
      title: "운수종사자 정기교육 일정",
      description: "교육기관과 일정이 확정되면 교육일자와 준비사항을 안내합니다.",
      date: "일정 준비 중"
    },
    {
      type: "안전",
      title: "전세버스 교통안전 교육자료",
      description: "사고예방과 안전운행에 필요한 공식 교육자료를 안내합니다.",
      date: "상시"
    },
    {
      type: "점검",
      title: "출발 전 차량 안전점검 안내",
      description: "운행 전 차량 상태와 필수 안전장비를 확인해 주세요.",
      date: "상시"
    }
  ]
};

const menuButton = document.querySelector("#menuButton");
const mobileNav = document.querySelector("#mobileNav");
const siteHeader = document.querySelector(".site-header");
const resourceList = document.querySelector("#resourceList");
const resourceEmpty = document.querySelector("#resourceEmpty");
const resourceSearch = document.querySelector("#resourceSearch");
const resourceTabs = [...document.querySelectorAll(".resource-tabs button")];
const modal = document.querySelector("#appModal");
const modalTitle = document.querySelector("#modalTitle");
const modalEyebrow = document.querySelector("#modalEyebrow");
const modalDescription = document.querySelector("#modalDescription");
const modalAction = document.querySelector("#modalAction");
const modalSearchArea = document.querySelector("#modalSearchArea");
const siteSearchInput = document.querySelector("#siteSearchInput");

let currentResourceTab = "notices";
let lastFocusedElement = null;

function setMenu(open) {
  menuButton?.setAttribute("aria-expanded", String(open));
  mobileNav?.classList.toggle("active", open);
  document.body.classList.toggle("menu-open", open);
}

menuButton?.addEventListener("click", () => {
  const shouldOpen = menuButton.getAttribute("aria-expanded") !== "true";
  setMenu(shouldOpen);
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1120) {
    setMenu(false);
  }
});

window.addEventListener("scroll", () => {
  siteHeader?.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderResources() {
  if (!resourceList) {
    return;
  }

  const keyword = resourceSearch?.value.trim().toLowerCase() || "";
  const items = (resourceData[currentResourceTab] || []).filter((item) => {
    const searchable = `${item.type} ${item.title} ${item.description} ${item.date}`.toLowerCase();
    return searchable.includes(keyword);
  });

  resourceList.innerHTML = items.map((item) => `
    <article class="resource-item">
      <span>${escapeHtml(item.type)}</span>
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.description)}</small>
      </div>
      <time>${escapeHtml(item.date)}</time>
    </article>
  `).join("");

  if (resourceEmpty) {
    resourceEmpty.hidden = items.length !== 0;
  }
}

function selectResourceTab(tabName) {
  if (!resourceData[tabName]) {
    return;
  }

  currentResourceTab = tabName;
  resourceTabs.forEach((tab) => {
    const active = tab.dataset.tab === tabName;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  renderResources();
}

resourceTabs.forEach((tab) => {
  tab.addEventListener("click", () => selectResourceTab(tab.dataset.tab));
});

resourceSearch?.addEventListener("input", renderResources);

document.querySelectorAll("[data-resource-tab]").forEach((element) => {
  element.addEventListener("click", () => {
    selectResourceTab(element.dataset.resourceTab);

    if (element.hasAttribute("data-scroll-resources")) {
      document.querySelector("#resources")?.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const modalContent = {
  memberLogin: {
    eyebrow: "MEMBER SERVICE",
    title: "조합원 업무시스템",
    description: "조합원 전용 업무시스템 주소가 아직 등록되지 않았습니다. 이용 문의는 조합 사무국(044-865-3258)으로 연락해 주세요.",
    actionText: "공문·자료 보기",
    actionHref: "#resources"
  },
  driverSystem: {
    eyebrow: "DRIVER MANAGEMENT",
    title: "운수종사자 관리",
    description: "운수종사자 관리시스템 주소가 아직 등록되지 않았습니다. 관련 업무는 조합 사무국으로 문의해 주세요.",
    actionText: "교육 안내 보기",
    actionHref: "#education"
  },
  siteSearch: {
    eyebrow: "INTEGRATED SEARCH",
    title: "통합검색",
    description: "공문·자료·교육안내에서 필요한 내용을 검색합니다.",
    actionText: "전체 자료 보기",
    actionHref: "#resources",
    search: true
  }
};

function openModal(type, trigger) {
  const content = modalContent[type];
  if (!content || !modal) {
    return;
  }

  if (type === "memberLogin" && config.memberLoginUrl) {
    window.location.href = config.memberLoginUrl;
    return;
  }

  if (type === "driverSystem" && config.driverSystemUrl) {
    window.location.href = config.driverSystemUrl;
    return;
  }

  lastFocusedElement = trigger || document.activeElement;
  modalEyebrow.textContent = content.eyebrow;
  modalTitle.textContent = content.title;
  modalDescription.textContent = content.description;
  modalAction.textContent = content.actionText;
  modalAction.href = content.actionHref;
  modalSearchArea.hidden = !content.search;
  modal.hidden = false;
  document.body.classList.add("modal-open");

  requestAnimationFrame(() => {
    if (content.search) {
      siteSearchInput?.focus();
    } else {
      modal.querySelector(".modal-close")?.focus();
    }
  });
}

function closeModal() {
  if (!modal || modal.hidden) {
    return;
  }

  modal.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus();
}

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.openModal, button));
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeModal);
});

modalAction?.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    setMenu(false);
  }
});

function runSiteSearch() {
  const keyword = siteSearchInput?.value.trim() || "";
  if (resourceSearch) {
    resourceSearch.value = keyword;
  }
  selectResourceTab("notices");
  closeModal();
  document.querySelector("#resources")?.scrollIntoView({ behavior: "smooth" });
}

document.querySelector("#siteSearchButton")?.addEventListener("click", runSiteSearch);
siteSearchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    runSiteSearch();
  }
});

renderResources();
