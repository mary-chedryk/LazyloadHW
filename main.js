function loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;

    img.src = src;
    img.onload = () => {
        img.classList.add('loaded');
    };
}


const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            loadImage(img);
            obs.unobserve(img);
        }
    });
}, {
    rootMargin: "0px 0px 200px 0px",
    threshold: 0.1
});


const images = document.querySelectorAll('img[data-src]');


images.forEach(img => {
    observer.observe(img);
});


document.getElementById('loadImagesBtn').addEventListener('click', () => {
    images.forEach(img => {
        if (!img.classList.contains('loaded')) {
            loadImage(img);
            observer.unobserve(img);
        }
    });
});
