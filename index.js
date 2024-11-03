document.addEventListener("DOMContentLoaded", function () {
    const clickButton = document.getElementById("click-button");
    const clickCountDisplay = document.getElementById("click-count");
    const chartContainer = document.getElementById("click-chart");
    const toggleView = document.getElementById("toggle-view");
    const chartTitle = document.getElementById("chart-title");
  
    let totalClicks = 0;
    let dailyClicks = JSON.parse(localStorage.getItem("dailyClicks")) || Array(24).fill(0);
    let weeklyClicks = JSON.parse(localStorage.getItem("weeklyClicks")) || Array(7).fill(0);
    let currentView = "daily";
  
    // Increment click count
    clickButton.addEventListener("click", function () {
      totalClicks++;
      clickCountDisplay.textContent = `عدد النقرات: ${totalClicks}`;
  
      const currentHour = new Date().getHours();
      const currentDay = new Date().getDay();
  
      dailyClicks[currentHour]++;
      weeklyClicks[currentDay]++;
  
      // Save data to localStorage
      localStorage.setItem("dailyClicks", JSON.stringify(dailyClicks));
      localStorage.setItem("weeklyClicks", JSON.stringify(weeklyClicks));
  
      renderChart();
    });
  
    // Toggle between daily and weekly views
    toggleView.addEventListener("change", function () {
      currentView = toggleView.value;
      renderChart();
    });
  
    // Render the chart based on the selected view
    function renderChart() {
      chartContainer.innerHTML = ""; // Clear previous chart
  
      const data = currentView === "daily" ? dailyClicks : weeklyClicks;
      const maxCount = Math.max(...data) || 1;
  
      const labels = currentView === "daily"
        ? Array.from({ length: 24 }, (_, i) => `الساعة ${i}`)
        : ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  
      chartTitle.textContent = currentView === "daily"
        ? "النقرات حسب الساعات (اليوم):"
        : "النقرات حسب الأيام (هذا الأسبوع):";
  
      data.forEach((count, index) => {
        // Create bar
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${(count / maxCount) * 100}%`;
        bar.textContent = count > 0 ? count : "";
  
        // Create label
        const label = document.createElement("div");
        label.className = "bar-label";
        label.textContent = labels[index];
  
        // Container for bar and label
        const barContainer = document.createElement("div");
        barContainer.style.display = "flex";
        barContainer.style.flexDirection = "column";
        barContainer.style.alignItems = "center";
        barContainer.appendChild(bar);
        barContainer.appendChild(label);
  
        chartContainer.appendChild(barContainer);
      });
    }
  
    // Initial setup
    clickCountDisplay.textContent = `عدد النقرات: ${totalClicks}`;
    renderChart();
  });
  