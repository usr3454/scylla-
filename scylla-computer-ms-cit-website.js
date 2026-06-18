const businessPhone = "917020503313";

const courseData = {
  mscit: {
    kicker: "Most requested",
    title: "MS-CIT",
    selectValue: "MS-CIT",
    price: "Rs. 5,500",
    text: "Build core computer knowledge with structured lessons, practical sessions, and guidance for exam-focused preparation.",
    skills: ["Computer fundamentals", "Internet basics", "Office practice", "Exam guidance"],
    message: "Namaste Scylla Computer, I want to ask about MS-CIT admission. Fee shown: Rs. 5,500."
  },
  excel: {
    kicker: "Spreadsheet skills",
    title: "Advance Excel",
    selectValue: "Advance Excel",
    price: "Rs. 6,000",
    text: "Learn useful spreadsheet work for office reports, data handling, formulas, formatting and practical Excel tasks.",
    skills: ["Formulas", "Data sorting", "Reports", "Charts and formatting"],
    message: "Namaste Scylla Computer, I want to ask about Advance Excel admission. Fee shown: Rs. 6,000."
  },
  tally: {
    kicker: "Accounting course",
    title: "Tally Prime with GST",
    selectValue: "Tally Prime with GST",
    price: "Rs. 6,000",
    text: "Practice accounting entries, billing, business records and GST-focused workflows using Tally Prime.",
    skills: ["Company creation", "Accounting entries", "Billing", "GST practice"],
    message: "Namaste Scylla Computer, I want to ask about Tally Prime with GST admission. Fee shown: Rs. 6,000."
  },
  autocad: {
    kicker: "Design software",
    title: "AutoCAD",
    selectValue: "AutoCAD",
    price: "Rs. 6,000",
    text: "Build drafting confidence with AutoCAD basics, drawing tools, editing tools and practical design exercises.",
    skills: ["2D drafting", "Drawing tools", "Editing tools", "Practice designs"],
    message: "Namaste Scylla Computer, I want to ask about AutoCAD admission. Fee shown: Rs. 6,000."
  }
};

const reviews = [
  {
    quote: "Scylla Computer MS-CIT offers a well-structured course with expert instructors and hands-on practical training.",
    name: "Shreyash Mhatre · a year ago"
  },
  {
    quote: "The main thing is that the teacher is so friendly and explains very clearly.",
    name: "Review summary"
  },
  {
    quote: "I've completed three courses here and gained invaluable skills.",
    name: "Review summary"
  },
  {
    quote: "Atmosphere of the class is very friendly.",
    name: "Review summary"
  }
];

const body = document.body;
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const langToggle = document.querySelector("#langToggle");

menuToggle.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    body.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

langToggle.addEventListener("click", () => {
  body.dataset.lang = body.dataset.lang === "en" ? "mr" : "en";
});

const courseTabs = document.querySelectorAll(".course-tab");
const courseKicker = document.querySelector("#courseKicker");
const courseTitle = document.querySelector("#courseTitle");
const coursePrice = document.querySelector("#coursePrice");
const courseText = document.querySelector("#courseText");
const courseSkills = document.querySelector("#courseSkills");
const courseWhatsapp = document.querySelector("#courseWhatsapp");
const courseSelect = document.querySelector("#courseSelect");
const batchSelect = document.querySelector("#batchSelect");
const batchButtons = document.querySelectorAll(".batch-box button");
let selectedBatch = "Morning";
let selectedCourseKey = "mscit";

function whatsappLink(message) {
  return `https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`;
}

function setCourse(key) {
  selectedCourseKey = key;
  const data = courseData[key];
  courseKicker.textContent = data.kicker;
  courseTitle.textContent = data.title;
  coursePrice.textContent = data.price;
  courseText.textContent = data.text;
  courseSkills.innerHTML = data.skills.map((skill) => `<span>${skill}</span>`).join("");
  courseWhatsapp.href = whatsappLink(`${data.message} Preferred batch: ${selectedBatch}.`);
  courseSelect.value = data.selectValue;
  courseTabs.forEach((tab) => {
    const active = tab.dataset.course === key;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
}

courseTabs.forEach((tab) => {
  tab.addEventListener("click", () => setCourse(tab.dataset.course));
});

batchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedBatch = button.dataset.batch;
    batchSelect.value = selectedBatch;
    batchButtons.forEach((item) => item.classList.toggle("is-selected", item === button));
    setCourse(selectedCourseKey);
  });
});

const reviewQuote = document.querySelector("#reviewQuote");
const reviewName = document.querySelector("#reviewName");
let reviewIndex = 0;

function showReview(index) {
  reviewIndex = (index + reviews.length) % reviews.length;
  reviewQuote.textContent = reviews[reviewIndex].quote;
  reviewName.textContent = reviews[reviewIndex].name;
}

document.querySelector("#prevReview").addEventListener("click", () => showReview(reviewIndex - 1));
document.querySelector("#nextReview").addEventListener("click", () => showReview(reviewIndex + 1));

document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.closest(".faq-item");
    const isOpen = item.classList.toggle("is-open");
    question.setAttribute("aria-expanded", String(isOpen));
  });
});

document.querySelector("#saveContact").addEventListener("click", () => {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Scylla Computer MS-CIT Center",
    "ORG:Scylla Computer MS-CIT Center",
    "TEL;TYPE=CELL:+917020503313",
    "ADR;TYPE=WORK:;;Shivaji Chowk Opp. To Pen Urban Bank;Pen;Maharashtra;402107;India",
    "NOTE:Training center, women-owned, 5.0 rated on Google listing",
    "END:VCARD"
  ].join("\n");
  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Scylla-Computer-MS-CIT-Center.vcf";
  link.click();
  URL.revokeObjectURL(url);
});

document.querySelector("#enquiryForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#studentName").value.trim();
  const phone = document.querySelector("#studentPhone").value.trim();
  const course = courseSelect.value;
  const batch = batchSelect.value;
  const message = document.querySelector("#message").value.trim() || "I want course details and admission process.";
  const status = document.querySelector("#formStatus");

  if (name.length < 2 || phone.replace(/\D/g, "").length < 10) {
    status.textContent = "Please enter a valid name and phone number.";
    return;
  }

  const text = `Namaste Scylla Computer, my name is ${name}. Phone: ${phone}. I want details for ${course}. Preferred batch: ${batch}. ${message}`;
  status.textContent = "Opening WhatsApp enquiry...";
  window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
});

const canvas = document.querySelector("#heroScene");
const ctx = canvas.getContext("2d");
let width = 0;
let height = 0;
let pointerX = 0.5;
let pointerY = 0.5;
let tick = 0;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function roundedRect(x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawMonitor(x, y, scale, accent, label) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#10191d";
  roundedRect(0, 0, 150, 92, 8);
  ctx.fill();
  ctx.fillStyle = "#eff7f3";
  roundedRect(10, 10, 130, 66, 5);
  ctx.fill();
  ctx.fillStyle = accent;
  roundedRect(20, 21, 78, 9, 4);
  ctx.fill();
  ctx.fillStyle = "rgba(23,34,39,0.26)";
  roundedRect(20, 39, 102, 7, 4);
  ctx.fill();
  roundedRect(20, 54, 74, 7, 4);
  ctx.fill();
  ctx.fillStyle = "#10191d";
  ctx.fillRect(64, 92, 22, 22);
  roundedRect(42, 112, 66, 8, 4);
  ctx.fill();
  ctx.fillStyle = accent;
  ctx.font = "700 10px Segoe UI, Arial";
  ctx.fillText(label, 20, 70);
  ctx.restore();
}

function drawPerson(x, y, scale, shirt) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#5b3c2e";
  ctx.beginPath();
  ctx.arc(28, 18, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = shirt;
  roundedRect(9, 34, 38, 50, 16);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  roundedRect(18, 43, 20, 8, 4);
  ctx.fill();
  ctx.restore();
}

function drawHero() {
  tick += 0.012;
  const driftX = (pointerX - 0.5) * 18;
  const driftY = (pointerY - 0.5) * 12;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#152227";
  ctx.fillRect(0, 0, width, height);

  const floorY = height * 0.67;
  ctx.fillStyle = "#284148";
  ctx.fillRect(0, floorY, width, height - floorY);

  ctx.fillStyle = "#20333a";
  for (let x = -80 + driftX; x < width + 120; x += 150) {
    roundedRect(x, 95 + driftY * 0.2, 102, 124, 8);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fillRect(x + 16, 114 + driftY * 0.2, 70, 12);
    ctx.fillStyle = "#20333a";
  }

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 2;
  for (let y = floorY; y < height; y += 34) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y + 40);
    ctx.stroke();
  }
  for (let x = -width; x < width * 2; x += 82) {
    ctx.beginPath();
    ctx.moveTo(x, floorY);
    ctx.lineTo(x + width * 0.28, height);
    ctx.stroke();
  }

  const tableY = floorY - 32 + driftY * 0.2;
  ctx.fillStyle = "#7a4a2a";
  roundedRect(width * 0.43 + driftX, tableY, width * 0.48, 32, 8);
  ctx.fill();
  ctx.fillStyle = "#4f2f1b";
  ctx.fillRect(width * 0.48 + driftX, tableY + 30, 18, 100);
  ctx.fillRect(width * 0.82 + driftX, tableY + 30, 18, 100);

  drawMonitor(width * 0.49 + driftX * 1.2, floorY - 165 + driftY, 1.05, "#0e6b6e", "MS-CIT");
  drawMonitor(width * 0.66 + driftX * 1.1, floorY - 154 + driftY, 0.92, "#f1a52b", "PRACTICE");
  drawMonitor(width * 0.80 + driftX, floorY - 146 + driftY, 0.82, "#9e3047", "SKILLS");
  drawPerson(width * 0.57 + driftX, floorY - 91 + driftY, 1.1, "#2d6cdf");
  drawPerson(width * 0.75 + driftX, floorY - 84 + driftY, 0.96, "#2f8d5b");

  ctx.fillStyle = "rgba(241,165,43,0.84)";
  const pulse = 6 + Math.sin(tick * 5) * 2;
  ctx.beginPath();
  ctx.arc(width * 0.70 + driftX * 0.5, 142 + driftY * 0.5, pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.13)";
  roundedRect(width * 0.62 + driftX * 0.5, 120 + driftY * 0.5, 156, 42, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.82)";
  ctx.font = "800 14px Segoe UI, Arial";
  ctx.fillText("Friendly computer lab", width * 0.62 + 16 + driftX * 0.5, 146 + driftY * 0.5);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    requestAnimationFrame(drawHero);
  }
}

window.addEventListener("resize", () => {
  resizeCanvas();
  drawHero();
});

window.addEventListener("pointermove", (event) => {
  pointerX = event.clientX / Math.max(window.innerWidth, 1);
  pointerY = event.clientY / Math.max(window.innerHeight, 1);
});

resizeCanvas();
drawHero();
setCourse("mscit");
