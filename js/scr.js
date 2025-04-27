// ── Globals ─────────────────────────────────────────────────────────────────
const jobsPerPage = 10;
let currentPage = 1;
let currentJobQuery = "";
let currentJobLocation = "";
let currentJobType = "all";

// ── Event Listeners ─────────────────────────────────────────────────────────
function setupJobListeners() {
  document
    .getElementById("search-jobs-btn")
    .addEventListener("click", () => fetchJobs(false));

  document
    .getElementById("load-more-jobs")
    .addEventListener("click", () => fetchJobs(true));

  document.getElementById("job-type-filter").addEventListener("change", (e) => {
    currentJobType = e.target.value;
    fetchJobs(false);
  });

  document.getElementById("job-location").addEventListener("change", (e) => {
    currentJobLocation = e.target.value;
    fetchJobs(false);
  });

  document.getElementById("search-jobs").addEventListener("input", (e) => {
    currentJobQuery = e.target.value;
    fetchJobs(false);
  });
}

// ── Fetch + Display ─────────────────────────────────────────────────────────
async function fetchJobs(loadMore = false) {
  if (!loadMore) currentPage = 1;
  else currentPage++;

  const query = currentJobQuery || "nodejs developer";
  const location = currentJobLocation || "India";

  const url = new URL("https://jsearch.p.rapidapi.com/search");
  url.search = new URLSearchParams({
    query: encodeURIComponent(query),
    location: encodeURIComponent(location),
    page: currentPage,
    num_pages: 1,
  });

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "YOUR_RAPIDAPI_KEY",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  });
  const { data: jobs = [] } = await res.json();

  // Optional: filter by employment type if you want
  const filtered =
    currentJobType === "all"
      ? jobs
      : jobs.filter(
          (j) =>
            j.job_employment_type?.toLowerCase() ===
            currentJobType.toLowerCase()
        );

  displayJobs(filtered, loadMore);
}

function displayJobs(jobs, append = false) {
  const container = document.getElementById("jobs-container");
  const loadMore = document.getElementById("load-more-jobs");
  const resultsCt = document.getElementById("job-results-count");

  if (!append) {
    container.innerHTML = "";
    resultsCt.textContent = "";
  }

  if (jobs.length === 0 && !append) {
    container.innerHTML = `
      <div class="text-center py-8 text-gray-400">
        <i class="fas fa-search text-2xl mb-2"></i>
        <p>No jobs found. Try different criteria.</p>
      </div>`;
    loadMore.classList.add("hidden");
    return;
  }

  jobs.forEach((job) => {
    const card = document.createElement("div");
    card.className = "bg-gray-800 p-6 rounded-lg mb-4 shadow-md";
    card.innerHTML = `
      <h3 class="text-xl font-semibold text-white">${job.job_title}</h3>
      <p class="text-gray-400">${job.employer_name}</p>
      <div class="flex items-center my-2">
        <i class="fas fa-map-marker-alt text-gray-500 mr-2"></i>
        <span class="text-gray-400">${job.job_city || job.job_country}</span>
      </div>
      <p class="text-gray-300 text-sm mb-4">
        ${job.job_description.slice(0, 200)}…
      </p>
      <div class="flex justify-between items-center">
        <a href="${job.job_apply_link}" target="_blank"
           class="text-purple-400 hover:underline">
          Apply Now →
        </a>
        <span class="text-sm text-green-400">
          ${job.job_employment_type || "N/A"}
        </span>
      </div>`;
    container.appendChild(card);            
  });

  // If we got at least `jobsPerPage`, allow loading more
  if (jobs.length >= jobsPerPage) {
    loadMore.classList.remove("hidden");
    loadMore.textContent = "Load More Jobs";
  } else {
    loadMore.classList.add("hidden");
  }

  // Update count only on first load
  if (!append) {
    resultsCt.textContent = `${jobs.length} jobs found`;
  }
}

// ── Init on DOM Ready ────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  setupJobListeners();
  // Pre‑populate search vars before first load:
  currentJobQuery = "women female";
  currentJobLocation = "India";
  fetchJobs(false);
});

// Sample data - in a real app, this would come from an API
const schemesData = [
  {
    id: 1,
    name: "Beti Bachao Beti Padhao",
    description:
      "Comprehensive scheme for girl child education and empowerment",
    category: "education",
    eligibility: "Girls up to 18 years from all communities",
    benefits: "Financial support for education, awareness programs",
    link: "https://pib.gov.in/PressReleasePage.aspx?PRID=2094929",
    states: ["all"],
    icon: "book-open",
  },
  {
    id: 2,
    name: "Stand Up India",
    description: "Loan scheme for women entrepreneurs in non-farm sectors",
    category: "business",
    eligibility: "Women entrepreneurs from SC/ST and women categories",
    benefits: "Bank loans from ₹10 lakh to ₹1 crore",
    link: "https://www.standupmitra.in/home/suischemes",
    states: ["all"],
    icon: "business-time",
  },
  {
    id: 3,
    name: "Pradhan Mantri Matru Vandana Yojana",
    description: "Maternity benefit program for pregnant and lactating women",
    category: "health",
    eligibility: "Pregnant women and lactating mothers (first child)",
    benefits: "₹5,000 in three installments",
    link: "https://pmmvy.wcd.gov.in/",
    states: ["all"],
    icon: "baby-carriage",
  },
  {
    id: 4,
    name: "Mahila E-Haat",
    description: "Online marketing platform for women entrepreneurs",
    category: "business",
    eligibility: "Women entrepreneurs, SHGs, NGOs",
    benefits: "Direct access to markets without middlemen",
    link: "https://egovernance.vikaspedia.in/viewcontent/e-governance/women-and-e-governance/mahila-e-haat?lgn=en",
    states: ["all"],
    icon: "shopping-basket",
  },
  {
    id: 5,
    name: "Sukanya Samriddhi Yojana",
    description: "Small savings scheme for girl child future expenses",
    category: "education",
    eligibility: "Parents/guardians of girl child below 10 years",
    benefits: "High interest rate, tax benefits",
    link: "https://www.nsiindia.gov.in/(S(hymabefl0srm5c450akxml55))/InternalPage.aspx?Id_Pk=89",
    states: ["all"],
    icon: "piggy-bank",
  },
  {
    id: 6,
    name: "Uttar Pradesh Kanya Sumangala Yojana",
    description: "Financial assistance for girl child at different stages",
    category: "education",
    eligibility: "Girls born in UP after April 2018",
    benefits: "₹15,000 in installments from birth to graduation",
    link: "https://mksy.up.gov.in/women_welfare/index.php",
    states: ["up"],
    icon: "graduation-cap",
  },
];



const jobsData = [
  {
    id: 1,
    title: "Anganwadi Worker",
    organization: "Women & Child Development Dept.",
    type: "government",
    location: "Rural areas across India",
    deadline: "15 Nov 2023",
    link: "#",
  },
  {
    id: 2,
    title: "Digital Marketing Executive",
    organization: "Rural Women Tech",
    type: "remote",
    location: "Work from Home",
    deadline: "30 Oct 2023",
    link: "#",
  },
];

// DOM Elements
const schemesContainer = document.getElementById("schemes-container");
const scholarshipsContainer = document.getElementById("scholarships-container");
const jobsContainer = document.getElementById("jobs-container");
const categoryFilter = document.getElementById("category-filter");
const stateFilter = document.getElementById("state-filter");
const searchSchemes = document.getElementById("search-schemes");
const jobTypeFilter = document.getElementById("job-type-filter");
const searchJobs = document.getElementById("search-jobs");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelectorAll(".nav-link");
const mobileNavLinks = document.querySelectorAll(".nav-link-mobile");

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  renderSchemes();
  renderScholarships();
  renderJobs();
  setupEventListeners();
});

// Render schemes
function renderSchemes(filteredData) {
  const data = filteredData || schemesData;
  schemesContainer.innerHTML = "";

  data.forEach((scheme) => {
    const schemeCard = document.createElement("div");
    schemeCard.className =
      "scheme-card bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition border border-gray-700";
    schemeCard.setAttribute("data-category", scheme.category);
    schemeCard.setAttribute(
      "data-state",
      scheme.states.includes("all") ? "all" : scheme.states[0]
    );

    schemeCard.innerHTML = `
            <div class="flex items-center mb-4">
                <div class="bg-purple-900 p-3 rounded-full mr-4">
                    <i class="fas fa-${scheme.icon} text-purple-400"></i>
                </div>
                <h3 class="text-xl font-semibold text-white">${scheme.name}</h3>
            </div>
            <p class="text-gray-300 mb-4">${scheme.description}</p>
            <div class="mb-4">
                <h4 class="font-semibold text-sm text-purple-300 mb-1">Eligibility:</h4>
                <p class="text-gray-400 text-sm">${scheme.eligibility}</p>
            </div>
            <div class="mb-4">
                <h4 class="font-semibold text-sm text-purple-300 mb-1">Benefits:</h4>
                <p class="text-gray-400 text-sm">${scheme.benefits}</p>
            </div>
            <div class="flex justify-between items-center">
                <span class="bg-purple-900 text-purple-300 px-3 py-1 rounded-full text-xs">${scheme.category}</span>
                <a href="${scheme.link}" class="text-purple-400 hover:underline font-medium hover:text-purple-300">Apply Now →</a>
            </div>
        `;

    schemesContainer.appendChild(schemeCard);
  });
}

// Render scholarships
function renderScholarships() {
  scholarshipsContainer.innerHTML = "";

  scholarshipsData.forEach((scholarship) => {
    const scholarshipCard = document.createElement("div");
    scholarshipCard.className =
      "bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition border border-gray-700";

    scholarshipCard.innerHTML = `
            <div class="flex items-center mb-4">
                <div class="bg-pink-900 p-3 rounded-full mr-4">
                    <i class="fas fa-graduation-cap text-pink-400"></i>
                </div>
                <h3 class="text-xl font-semibold text-white">${scholarship.name}</h3>
            </div>
            <p class="text-gray-300 mb-4">${scholarship.description}</p>
            <div class="mb-4">
                <h4 class="font-semibold text-sm text-purple-300 mb-1">Eligibility:</h4>
                <p class="text-gray-400 text-sm">${scholarship.eligibility}</p>
            </div>
            <div class="flex justify-between items-center">
                <span class="bg-pink-900 text-pink-300 px-3 py-1 rounded-full text-xs">${scholarship.level}</span>
                
            </div>
        `;

    scholarshipsContainer.appendChild(scholarshipCard);
  });
}

// Render jobs
// function renderJobs(filteredData) {
//   const data = filteredData || jobsData;
//   jobsContainer.innerHTML = "";

//   data.forEach((job) => {
//     const jobCard = document.createElement("div");
//     jobCard.className =
//       "bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition border border-gray-700";
//     jobCard.setAttribute("data-type", job.type);

//     jobCard.innerHTML = `
//             <h3 class="text-xl font-semibold mb-2 text-white">${job.title}</h3>
//             <p class="text-gray-400 mb-4">${job.organization}</p>
//             <div class="flex items-center mb-4">
//                 <i class="fas fa-map-marker-alt text-gray-500 mr-2"></i>
//                 <span class="text-gray-400 text-sm">${job.location}</span>
//             </div>
//             <div class="flex justify-between items-center">
//                 <span class="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-xs">${job.type}</span>
//                 <div>
//                     <span class="text-sm text-gray-400 mr-4">Apply by: ${job.deadline}</span>
//                     <a href="${job.link}" class="text-purple-400 hover:underline font-medium hover:text-purple-300">Details →</a>
//                 </div>
//             </div>
//         `;

//     jobsContainer.appendChild(jobCard);
//   });
// }

// Setup event listeners
function setupEventListeners() {
  // Scheme filters
  categoryFilter.addEventListener("change", filterSchemes);
  stateFilter.addEventListener("change", filterSchemes);
  searchSchemes.addEventListener("input", filterSchemes);

  // Job filters
  jobTypeFilter.addEventListener("change", filterJobs);
  searchJobs.addEventListener("input", filterJobs);

  // Mobile menu toggle
  mobileMenuButton.addEventListener("click", toggleMobileMenu);

  // Navigation link active state
  navLinks.forEach((link) => {
    link.addEventListener("click", setActiveTab);
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setActiveTab({ target: link });
      mobileMenu.classList.add("hidden");
    });
  });
}

// Filter schemes
function filterSchemes() {
  const category = categoryFilter.value;
  const state = stateFilter.value;
  const searchTerm = searchSchemes.value.toLowerCase();

  const filtered = schemesData.filter((scheme) => {
    const categoryMatch = category === "all" || scheme.category === category;
    const stateMatch =
      state === "all" ||
      scheme.states.includes(state) ||
      scheme.states.includes("all");
    const searchMatch =
      scheme.name.toLowerCase().includes(searchTerm) ||
      scheme.description.toLowerCase().includes(searchTerm);

    return categoryMatch && stateMatch && searchMatch;
  });

  renderSchemes(filtered);
}

// Filter jobs
function filterJobs() {
  const type = jobTypeFilter.value;
  const searchTerm = searchJobs.value.toLowerCase();

  const filtered = jobsData.filter((job) => {
    const typeMatch = type === "all" || job.type === type;
    const searchMatch =
      job.title.toLowerCase().includes(searchTerm) ||
      job.organization.toLowerCase().includes(searchTerm);

    return typeMatch && searchMatch;
  });

  renderJobs(filtered);
}

// Toggle mobile menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle("hidden");
}

// Set active tab
function setActiveTab(e) {
  // Remove active class from all tabs
  navLinks.forEach((link) => link.classList.remove("active-tab"));
  mobileNavLinks.forEach((link) => link.classList.remove("active-tab"));

  // Add active class to clicked tab
  e.target.classList.add("active-tab");

  // Find corresponding mobile/nav link and make it active
  const href = e.target.getAttribute("href");
  if (e.target.classList.contains("nav-link")) {
    document
      .querySelector(`.nav-link-mobile[href="${href}"]`)
      .classList.add("active-tab");
  } else {
    document
      .querySelector(`.nav-link[href="${href}"]`)
      .classList.add("active-tab");
  }
}
function displayRapidAPIJobs(jobs) {
  const jobsContainer = document.getElementById("jobs-container");
  jobsContainer.innerHTML = ""; // clear old results

  if (!jobs || jobs.length === 0) {
    jobsContainer.innerHTML = `
            <div class="text-center text-gray-400 py-8">
                <p>No jobs found. Try changing the search criteria.</p>
            </div>
        `;
    return;
  }

  jobs.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.className = "bg-gray-800 p-6 rounded-lg shadow-md mb-4";

    jobCard.innerHTML = `
            <h3 class="text-xl font-semibold mb-2 text-white">${
              job.job_title
            }</h3>
            <p class="text-gray-400 mb-1">${job.employer_name}</p>
            <div class="flex items-center mb-4">
                <i class="fas fa-map-marker-alt text-gray-500 mr-2"></i>
                <span class="text-gray-400 text-sm">${
                  job.job_city || job.job_country
                }</span>
            </div>
            <p class="text-gray-300 text-sm mb-4">${job.job_description.slice(
              0,
              200
            )}...</p>
            <div class="flex justify-between items-center">
                <a href="${
                  job.job_apply_link
                }" target="_blank" class="text-purple-400 hover:underline font-medium">Apply Now →</a>
                <span class="text-sm text-green-400">${
                  job.job_employment_type || "N/A"
                }</span>
            </div>
        `;

    jobsContainer.appendChild(jobCard);
  });
}
