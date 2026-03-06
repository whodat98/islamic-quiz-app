export function generateIcon(size: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#10b981');
  gradient.addColorStop(1, '#059669');
  ctx.fillStyle = gradient;
  
  // Rounded rectangle
  const radius = size * 0.18;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(size - radius, 0);
  ctx.quadraticCurveTo(size, 0, size, radius);
  ctx.lineTo(size, size - radius);
  ctx.quadraticCurveTo(size, size, size - radius, size);
  ctx.lineTo(radius, size);
  ctx.quadraticCurveTo(0, size, 0, size - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fill();
  
  // Crescent moon
  const moonX = size * 0.35;
  const moonY = size * 0.35;
  const moonR = size * 0.12;
  ctx.fillStyle = 'white';
  ctx.shadowColor = 'rgba(0,0,0,0.2)';
  ctx.shadowBlur = size * 0.02;
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonR, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(moonX + moonR * 0.4, moonY, moonR * 0.8, 0, 2 * Math.PI);
  ctx.fill();
  
  // Star
  ctx.fillStyle = 'white';
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';
  const starX = size * 0.65;
  const starY = moonY;
  const outerR = size * 0.08;
  const innerR = size * 0.04;
  let rot = Math.PI / 2 * 3;
  const step = Math.PI / 5;
  ctx.beginPath();
  ctx.moveTo(starX, starY - outerR);
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(starX + Math.cos(rot) * outerR, starY + Math.sin(rot) * outerR);
    rot += step;
    ctx.lineTo(starX + Math.cos(rot) * innerR, starY + Math.sin(rot) * innerR);
    rot += step;
  }
  ctx.closePath();
  ctx.fill();
  
  // Text
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.14}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('QUIZ', size / 2, size * 0.78);
  
  return canvas.toDataURL('image/png');
}