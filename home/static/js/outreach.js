document.addEventListener('DOMContentLoaded', function () {
    // Animate hero description
    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) {
        setTimeout(() => {
            heroDesc.classList.add('visible');
        }, 500);
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item, .schedule-container, .new-footer, .card').forEach(el => {
        observer.observe(el);
    });

    // Back to Top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 300);
        });
    }

    // Week Calendar
    const prevWeek = document.getElementById('prevWeek');
    const nextWeek = document.getElementById('nextWeek');
    const currentWeek = document.querySelector('.current-week');

    if (prevWeek && nextWeek && currentWeek) {
        let currentWeekOffset = 0;

        function updateWeekDisplay() {
            const now = new Date();
            const startDate = new Date(now);
            startDate.setDate(now.getDate() + currentWeekOffset * 7 - now.getDay() + 1);

            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);

            currentWeek.textContent = `Week of ${formatDate(startDate)} - ${formatDate(endDate)}`;
            updateScheduleGrid(startDate);
        }

        function formatDate(date) {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }

        function updateScheduleGrid(startDate) {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const scheduleGrid = document.querySelector('.schedule-grid');
            scheduleGrid.innerHTML = '';

            for (let i = 0; i < 7; i++) {
                const dayDate = new Date(startDate);
                dayDate.setDate(startDate.getDate() + i);

                const dayElement = document.createElement('div');
                dayElement.className = 'schedule-day';

                const events = generateRandomEvents(dayDate);

                dayElement.innerHTML = `
                    <div class="day-header">
                        <h3>${days[dayDate.getDay()]}</h3>
                        <div class="date">${formatDate(dayDate)}</div>
                    </div>
                    <div class="events">
                        ${events.join('')}
                    </div>
                `;
                scheduleGrid.appendChild(dayElement);
            }
        }

        function generateRandomEvents(date) {
            const locations = [
                "Downtown Community Center",
                "City Hospital Main Lobby",
                "University Student Union",
                "Central Library",
                "Tech Park Atrium",
                "Mall Food Court",
                "Fire Station #5"
            ];

            const times = ["9 AM - 12 PM", "1 PM - 4 PM", "5 PM - 8 PM"];
            const eventCount = Math.floor(Math.random() * 2) + 1;
            const events = [];

            for (let i = 0; i < eventCount; i++) {
                const location = locations[Math.floor(Math.random() * locations.length)];
                const time = times[Math.floor(Math.random() * times.length)];
                const slotsTotal = Math.floor(Math.random() * 30) + 30;
                const slotsTaken = Math.floor(Math.random() * slotsTotal);
                const fillPercentage = (slotsTaken / slotsTotal) * 100;

                let slotStatus = 'available';
                if (fillPercentage > 80) slotStatus = 'full';
                else if (fillPercentage > 50) slotStatus = 'limited';

                events.push(`
                    <div class="event ${slotStatus}">
                        <div class="event-time">${time}</div>
                        <div class="event-location">
                            <i class="fas fa-map-marker-alt"></i> ${location}
                        </div>
                        <div class="event-slots">
                            <div class="slot-progress" style="width: ${fillPercentage}%"></div>
                            <span>${slotsTotal - slotsTaken}/${slotsTotal} Slots Available</span>
                        </div>
                    </div>
                `);
            }

            return events;
        }

        prevWeek.addEventListener('click', () => {
            currentWeekOffset--;
            updateWeekDisplay();
        });

        nextWeek.addEventListener('click', () => {
            currentWeekOffset++;
            updateWeekDisplay();
        });

        updateWeekDisplay();
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Marquee looping
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        marqueeContent.innerHTML += marqueeContent.innerHTML;
    }
});
