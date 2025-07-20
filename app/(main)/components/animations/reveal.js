'use client';

export function initRevealAnimations() {
  function reveal() {
    const reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 10;
      let elementVisibleRemove = 80;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      }
      if (elementTop > windowHeight - elementVisibleRemove) {
        reveals[i].classList.remove('active');
      }
    }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', reveal);

    setTimeout(reveal, 100);
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', reveal);
    }
  };
}
