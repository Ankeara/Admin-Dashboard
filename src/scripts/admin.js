document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".dropdown__toggle");
  const content = document.querySelector(".dropdown__content");

  toggle.addEventListener("click", () => {
    content.classList.toggle("active");
  });
});

function togglePanel(event) {
            if (event) {
                event.stopPropagation(); // Prevent click from triggering document click
            }
            const panel = document.querySelector('.about__info');
            panel.classList.toggle('hidden');
            panel.classList.toggle('open');
            updateButtonText();
        }

        function updateButtonText() {
            const panel = document.querySelector('.about__info');
            const button = document.querySelector('.toggle__button');
            button.textContent = panel.classList.contains('hidden') ? 'Open Panel' : 'Close Panel';
        }

        // Hide panel when clicking outside
        document.addEventListener('click', (event) => {
            const panel = document.querySelector('.about__info');
            const button = document.querySelector('.toggle__button');
            if (window.innerWidth <= 1024 && !panel.contains(event.target) && !button.contains(event.target)) {
                panel.classList.add('hidden');
                panel.classList.remove('open');
                updateButtonText();
            }
        });

        // Auto-hide/show based on window resize
        window.addEventListener('resize', () => {
            const panel = document.querySelector('.about__info');
            if (window.innerWidth <= 1024) {
                panel.classList.add('hidden');
                panel.classList.remove('open');
            } else {
                panel.classList.remove('hidden');
                panel.classList.remove('open');
            }
            updateButtonText();
        });

        // Initial check on page load
        window.addEventListener('load', () => {
            const panel = document.querySelector('.about__info');
            if (window.innerWidth <= 1024) {
                panel.classList.add('hidden');
                panel.classList.remove('open');
            } else {
                panel.classList.remove('hidden');
                panel.classList.remove('open');
            }
            updateButtonText();
        });

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let currentDate = new Date(); // Fixed: Use new Date() for current date

function renderWeek(centerDate) {
  const startOfWeek = new Date(centerDate);
  startOfWeek.setDate(centerDate.getDate() - centerDate.getDay());

  const datesContainer = document.getElementById('datesContainer');
  const monthYearDisplay = document.getElementById('monthYear');

  datesContainer.innerHTML = '';

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    const div = document.createElement('div');
    div.classList.add('date');
    if (
      date.getFullYear() === centerDate.getFullYear() &&
      date.getMonth() === centerDate.getMonth() &&
      date.getDate() === centerDate.getDate()
    ) {
      div.classList.add('active');
    }

    div.innerHTML = `
      <span class="week">${weekDays[date.getDay()]}</span>
      <span class="day">${date.getDate()}</span>
    `;

    div.dataset.date = date.toISOString();
    div.onclick = () => {
      currentDate = new Date(div.dataset.date);
      renderWeek(currentDate);
    };

    datesContainer.appendChild(div);
  }

  // Update month/year title based on center date
  const options = { month: 'short', year: 'numeric' };
  monthYearDisplay.textContent = centerDate.toLocaleDateString('en-US', options);
}

function changeWeek(offset) {
  currentDate.setDate(currentDate.getDate() + offset * 7);
  renderWeek(currentDate);
}

renderWeek(currentDate);
