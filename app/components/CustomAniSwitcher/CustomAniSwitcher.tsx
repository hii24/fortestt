import { useState } from 'react';

export const CustomAniSwitcher = ({
  isChecked = false,
  setIsChecked,
}: {
  isChecked: boolean;
  setIsChecked?: (val: boolean) => void;
}) => {
  const [animStage, setAnimStage] = useState<'idle' | 'expanding' | 'shrinking'>('idle');

  const toggleSwitch = () => {
    if (animStage !== 'idle') return;

    if (!isChecked) {
      setIsChecked?.(true);
      setAnimStage('expanding');
      setTimeout(() => setAnimStage('shrinking'), 150);
      setTimeout(() => setAnimStage('idle'), 300);
    } else {
      setAnimStage('expanding');
      setTimeout(() => {
        setIsChecked?.(false);
        setAnimStage('shrinking');
      }, 150);
      setTimeout(() => setAnimStage('idle'), 300);
    }
  };

  const circleClass = 'absolute top-[2px] h-[20px] bg-[#3460FD] transition-all duration-200 rounded-full';
  let style = {};

  if (isChecked) {
    if (animStage === 'idle') {
      // Коло з правим відступом 2px
      style = { left: 'calc(100% - 22px)', width: '20px' };
    } else if (animStage === 'expanding') {
      // Розтягується зліва
      style = { left: '2px', width: '40px' };
    } else if (animStage === 'shrinking') {
      // Повертається на праву сторону
      style = { left: 'calc(100% - 22px)', width: '20px' };
    }
  } else {
    if (animStage === 'idle') {
      // Коло з лівим відступом 2px
      style = { left: '2px', width: '20px' };
    } else if (animStage === 'expanding') {
      // Розтягується вправо
      style = { left: 'calc(100% - 22px)', width: '40px' };
    } else if (animStage === 'shrinking') {
      // Повертається на ліву сторону
      style = { left: '2px', width: '20px' };
    }
  }

  return (
    <label className="relative inline-flex items-center cursor-pointer select-none">
      <input type="checkbox" className="sr-only" checked={isChecked} onChange={toggleSwitch} />
      <div
        className={`w-[45px] h-[26px] rounded-full border hover:bg-gray-50 border-[#3460FD] relative transition-colors duration-300`}>
        <div
          className={`${circleClass} ${isChecked ? 'shadow-none' : 'shadow'} flex items-center justify-center`}
          style={style}>
          {isChecked ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.38879 9.65969V6.45666C2.38879 5.95123 2.79852 5.5415 3.30395 5.5415H8.79485C9.30028 5.5415 9.71001 5.95123 9.71001 6.45665V9.65969C9.71001 10.1651 9.30028 10.5748 8.79485 10.5748H3.30395C2.79852 10.5748 2.38879 10.1651 2.38879 9.65969Z"
                stroke="white"
                strokeWidth="0.85"
                strokeLinecap="round"
              />
              <path
                d="M3.27271 5.45441V4.15066C3.27271 2.64441 4.49377 1.42336 6.00002 1.42339V1.42339C7.50624 1.42341 8.72725 2.64444 8.72725 4.15066V5.45441"
                stroke="white"
                strokeWidth="0.85"
                strokeLinecap="round"
              />
              <path d="M6 7.5L6 8.5" stroke="white" strokeWidth="0.85" strokeLinecap="round" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M2.38867 10.1599V6.9569C2.38867 6.45148 2.7984 6.04175 3.30382 6.04175H8.79473C9.30016 6.04175 9.70988 6.45147 9.70988 6.9569V10.1599C9.70988 10.6654 9.30016 11.0751 8.79473 11.0751H3.30382C2.7984 11.0751 2.38867 10.6654 2.38867 10.1599Z"
                stroke="white"
                strokeWidth="0.85"
                strokeLinecap="round"
              />
              <path
                d="M3.27271 5.95464V4.73694C3.27271 3.18316 4.5323 1.92357 6.08608 1.92357H6.85467C7.77924 1.92357 8.56964 2.58897 8.72725 3.50001V3.50001"
                stroke="white"
                strokeWidth="0.85"
                strokeLinecap="round"
              />
              <path d="M6 8L6 9" stroke="white" strokeWidth="0.85" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>
    </label>
  );
};
