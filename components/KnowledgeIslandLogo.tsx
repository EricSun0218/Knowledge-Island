import React from 'react';

interface KnowledgeIslandLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const KnowledgeIslandLogo: React.FC<KnowledgeIslandLogoProps> = ({ 
  className = '', 
  size = 'medium'
}) => {
  // 根据原图精确匹配的尺寸
  const svgSizes = {
    small: { width: 40, height: 30 },
    medium: { width: 60, height: 45 },
    large: { width: 80, height: 60 }
  };

  const { width, height } = svgSizes[size];

  // 原图的精确颜色：浅蓝色渐变
  const lightBlue = '#BFDBFE'; // sky-200 - 最浅的蓝色
  const mediumBlue = '#93C5FD'; // sky-300
  const darkBlue = '#60A5FA';   // sky-400 - 最深的蓝色

  // 只返回图形部分，去掉文字
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 75" 
      className={`shrink-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 岛屿形状 - 三条水平略微弯曲的线条，从浅到深 */}
      {/* 最上面的线 (最浅蓝色) */}
      <path
        d="M 15 35 Q 50 20, 85 35"
        stroke={lightBlue}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 中间的线 (中蓝色) */}
      <path
        d="M 10 45 Q 50 30, 90 45"
        stroke={mediumBlue}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 最下面的线 (深蓝色) */}
      <path
        d="M 5 55 Q 50 40, 95 55"
        stroke={darkBlue}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 旗帜在岛屿顶部 (浅蓝色，向右飘扬) */}
      <g transform="translate(50, 20)">
        {/* 旗杆 (垂直) */}
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="12"
          stroke={lightBlue}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* 旗帜 (三角形，向右飘扬) */}
        <path
          d="M 0 0 L 0 6 L 8 3 Z"
          fill={lightBlue}
        />
      </g>
    </svg>
  );
};

export default KnowledgeIslandLogo;

