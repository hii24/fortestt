'use client';

import { useEffect } from 'react';
import { initRevealAnimations } from './reveal';

// Компонент для ініціалізації анімацій при скролі
export default function RevealAnimation() {
  useEffect(() => {
    // Ініціалізуємо анімації та отримуємо функцію для очищення
    const cleanup = initRevealAnimations();

    // Очищаємо слухачі подій при розмонтуванні компонента
    return cleanup;
  }, []);

  // Компонент не рендерить жодних елементів UI
  return null;
}
