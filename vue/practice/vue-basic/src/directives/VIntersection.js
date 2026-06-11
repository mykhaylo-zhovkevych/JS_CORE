export default {
    mounted(el, binding) {
        const observer =
            new IntersectionObserver(([entry]) => {
                // Verifies that the directive receives a function
            if (entry.isIntersecting && typeof binding.value === 'function') {
                binding.value(entry, observer);
            }
        });

        observer.observe(el);
        el.__intersectionObserver__ = observer;
    },
    unmounted(el) {
        el.__intersectionObserver__?.disconnect();
    }
}
