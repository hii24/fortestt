import React from 'react';

const InfoIcon: React.FC<{ size?: number; className?: string; onClick?: () => void }> = ({ size = 18, className = '', onClick }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : undefined }}
  >
    <g id="vuesax/linear/info-circle">
      <g id="info-circle">
        <path id="Vector" d="M12 22.5C17.5 22.5 22 18 22 12.5C22 7 17.5 2.5 12 2.5C6.5 2.5 2 7 2 12.5C2 18 6.5 22.5 12 22.5Z" stroke="#CDC8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path id="Vector_2" d="M12 8.5V13.5" stroke="#CDC8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path id="Vector_3" d="M11.9945 16.5H12.0035" stroke="#CDC8C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </g>
  </svg>
);

export default InfoIcon; 