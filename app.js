const config = window.SEJONG_ASSOCIATION_CONFIG || {};

const resourceData = {
  notices: [
    {
      type: "안내",
      title: "세종전세버스운송사업조합 홈페이지 이용 안내",
      description: "홈페이지 운영 전 최종 확인이 필요한 기본 안내문입니다.",
      date: "2026.07.20"
    },
    {
      type: "공문",
      title: "조합 공문 게시 영역이 준비되어 있습니다.",
      description: "실제 공문 제목과 첨부파일을 등록하면 목록에 표시됩니다.",
      date: "준비 중"
    },
    {
      type: "안내",
      title: "운수종사자 관리시스템 연동 안내",
      description: "관리자 설정에 시스템 주소를 입력하면 바로가기 버튼이 연결됩니다.",
      date: "준비 중"
    },
    {
      type: "안전",
      title: "교통안전 관련 공식 기관 바로가기 안내",
      description: "한국교통안전공단과 전세버스공제조합 링크를 확인할 수 있습니다.",
      date: "2026.07.20"
    }
  ],
  files: [
    {
      type: "서식",
      title: "사업계획 변경 관련 서식 등록 영역",
      description: "조합에서 사용하는 최신 서식을 등록할 수 있습니다.",
      date: "자료 준비 중"
    },
    {
      type: "법령",
      title: "전세버스 운송사업 관련 법령·지침 자료",
      description: "확정된 공식 자료만 선별해 제공하도록 구성했습니다.",
      date: "자료 준비 중"
    },
    {
      type: "운영",
      title: "차량·운수종사자 업무자료 등록 영역",
      description: "차량 관리와 종사자 업무에 필요한 자료를 분류할 수 있습니다.",
      date: "자료 준비 중"
    }
  ],
  education: [
    {
      type: "교육",
      title: "운수종사자 정기교육 일정 등록 영역",
      description: "교육기관과 일정이 확정되면 날짜와 신청 링크가 표시됩니다.",
      date: "일정 준비 중"
    },
    {
      type: "안전",
      title: "전세버스 교통안전 교육자료 안내",
      description: "교육 영상과 안전수칙 자료를 연결할 수 있습니다.",
      date: "자료 준비 중"
    },
    {
      type: "점검",
      title: "출발 전 차량 점검 체크리스트",
      description: "홈페이지 안전운행 영역에서 바로 사용할 수 있습니다.",
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
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    setMenu(false);
  }
});

window.addEventListener("scroll", () => {
  siteHeader?.classList.toggle("scrolled", window.scrollY > 12);
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

  resourceEmpty.hidden = items.length !== 0;
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

document.querySelectorAll("[data-resource-tab]").forEach((link) => {
  link.addEventListener("click", () => {
    selectResourceTab(link.dataset.resourceTab);
  });
});

const modalContent = {
  memberLogin: {
    eyebrow: "MEMBER SERVICE",
    title: "조합원 로그인",
    description: "조합원 전용 시스템 주소가 아직 등록되지 않았습니다. site-config.js에 주소를 입력하면 이 버튼이 로그인 화면으로 연결됩니다.",
    actionText: "공문·자료 보기",
    actionHref: "#resources"
  },
  driverSystem: {
    eyebrow: "DRIVER SYSTEM",
    title: "운수종사자 관리시스템",
    description: "운수종사자 관리시스템 주소가 아직 등록되지 않았습니다. 관리자 설정 후 바로 이용할 수 있습니다.",
    actionText: "교육 안내 보기",
    actionHref: "#safety"
  },
  siteSearch: {
    eyebrow: "SITE SEARCH",
    title: "통합검색",
    description: "공문·자료·교육일정에서 필요한 내용을 검색합니다.",
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
      siteSearchInput.focus();
    } else {
      modal.querySelector(".modal-close").focus();
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
  const keyword = siteSearchInput.value.trim();
  resourceSearch.value = keyword;
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

function fillOrganizationConfig() {
  const values = {
    phone: config.phone || "정보 입력 전",
    fax: config.fax || "정보 입력 전",
    email: config.email || "정보 입력 전",
    address: config.address || "정보 입력 전",
    contactStatus: [config.phone, config.email, config.address].some(Boolean)
      ? "운영 정보 등록됨"
      : "등록 준비 중"
  };

  Object.entries(values).forEach(([key, value]) => {
    document.querySelectorAll(`[data-config="${key}"]`).forEach((element) => {
      element.textContent = value;
    });
  });
}

const checklist = [...document.querySelectorAll("#safetyChecklist input[type='checkbox']")];
const progressBar = document.querySelector("#safetyProgressBar");
const progressText = document.querySelector("#safetyProgressText");
const storageKey = "sejong-association-safety-checklist";

function updateChecklist() {
  const checkedValues = checklist.filter((item) => item.checked).map((item) => item.value);
  const percentage = checklist.length ? (checkedValues.length / checklist.length) * 100 : 0;
  progressBar.style.width = `${percentage}%`;
  progressText.textContent = `${checkedValues.length} / ${checklist.length} 완료`;

  try {
    localStorage.setItem(storageKey, JSON.stringify(checkedValues));
  } catch (error) {
    console.warn("체크리스트 저장을 사용할 수 없습니다.", error);
  }
}

function restoreChecklist() {
  try {
    const savedValues = JSON.parse(localStorage.getItem(storageKey) || "[]");
    checklist.forEach((item) => {
      item.checked = savedValues.includes(item.value);
    });
  } catch (error) {
    console.warn("저장된 체크리스트를 불러오지 못했습니다.", error);
  }
  updateChecklist();
}

checklist.forEach((item) => item.addEventListener("change", updateChecklist));
document.querySelector("#resetChecklist")?.addEventListener("click", () => {
  checklist.forEach((item) => {
    item.checked = false;
  });
  updateChecklist();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 6, 4) * 55}ms`;
  observer.observe(element);
});

document.querySelector("#currentYear").textContent = new Date().getFullYear();

renderResources();
fillOrganizationConfig();
restoreChecklist();
