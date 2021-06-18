const LazyLoadImages = () => {
  if (typeof window !== 'undefined') {
    if (!!window.IntersectionObserver) {
      let observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.src = entry.target.dataset.src;
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px 10px 0px' }
      );
      document.querySelectorAll('img[data-src]').forEach((img) => {
        observer.observe(img);
      });
    } else {
      document.querySelectorAll('img[data-src]').forEach((img) => {
        img.src = img.dataset.src;
      });
    }
  }
};

export default LazyLoadImages;