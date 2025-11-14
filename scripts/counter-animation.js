// ==========================================
// Animated Statistics Counter
// Counts numbers up when scrolled into view
// ==========================================

// Wait for page to load
document.addEventListener('DOMContentLoaded', function () {

    // Find all elements with the 'stat-number' class
    const statNumbers = document.querySelectorAll('.stat-number');

    // Track which stats have already been animated
    const animatedStats = new Set();

    // Create an Intersection Observer to detect when stats are visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the stat is visible on screen and hasn't been animated yet
            if (entry.isIntersecting && !animatedStats.has(entry.target)) {
                // Start the counting animation
                animateCounter(entry.target);
                // Mark this stat as animated
                animatedStats.add(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    // Observe each stat number
    statNumbers.forEach(stat => observer.observe(stat));

});

/**
 * Animates a number from 0 to its target value
 * @param {HTMLElement} element - The element containing the number
 */
function animateCounter(element) {
    // Get the target number from data attribute
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // Animation duration in milliseconds (2 seconds)
    const startTime = performance.now();

    // Set initial value to 0
    element.textContent = '0';

    /**
     * Animation loop function
     * This runs multiple times per second to create smooth animation
     */
    function updateCounter(currentTime) {
        // Calculate how much time has passed
        const elapsed = currentTime - startTime;

        // Calculate progress (0 to 1)
        const progress = Math.min(elapsed / duration, 1);

        // Apply easing function for smooth animation
        // This makes it start fast and slow down at the end
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);

        // Calculate current number based on progress
        const current = Math.floor(easeOutProgress * target);

        // Update the displayed number
        element.textContent = current;

        // Continue animation if not finished
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure we end on the exact target number
            element.textContent = target;
        }
    }

    // Start the animation
    requestAnimationFrame(updateCounter);
}