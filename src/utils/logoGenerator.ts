// AI-powered logo generation utility
// Generates unique SVG logos based on startup name and industry

interface LogoConfig {
  name: string;
  industry: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

type LogoStyle = 'geometric' | 'lettermark' | 'abstract' | 'tech' | 'minimal';

// Get logo style based on industry
function getLogoStyle(industry: string): LogoStyle {
  const styleMap: Record<string, LogoStyle> = {
    technology: 'tech',
    healthcare: 'abstract',
    education: 'lettermark',
    finance: 'geometric',
    'e-commerce': 'minimal',
    'food & beverage': 'abstract',
    sustainability: 'geometric',
    entertainment: 'abstract',
    travel: 'minimal',
    'real estate': 'geometric',
  };
  return styleMap[industry.toLowerCase()] || 'lettermark';
}

// Generate geometric logo
function generateGeometricLogo(config: LogoConfig): string {
  const { name, colors } = config;
  const initial = name.charAt(0).toUpperCase();
  
  return `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="160" height="160" rx="20" fill="url(#grad1)"/>
      <polygon points="100,50 150,100 100,150 50,100" fill="${colors.accent}" opacity="0.3"/>
      <text x="100" y="125" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="white" text-anchor="middle">${initial}</text>
    </svg>
  `;
}

// Generate lettermark logo
function generateLettermarkLogo(config: LogoConfig): string {
  const { name, colors } = config;
  const initials = name.split(' ').map(w => w.charAt(0)).slice(0, 2).join('').toUpperCase();
  
  return `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#grad2)"/>
      <circle cx="100" cy="100" r="75" fill="none" stroke="${colors.accent}" stroke-width="3" opacity="0.5"/>
      <text x="100" y="125" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="white" text-anchor="middle">${initials}</text>
    </svg>
  `;
}

// Generate abstract logo
function generateAbstractLogo(config: LogoConfig): string {
  const { colors } = config;
  const seed = Math.random();
  
  return `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#grad3)"/>
      <path d="M 50 100 Q 100 ${50 + seed * 30} 150 100 T 150 150" fill="none" stroke="${colors.accent}" stroke-width="15" opacity="0.6"/>
      <circle cx="70" cy="80" r="20" fill="white" opacity="0.3"/>
      <circle cx="130" cy="120" r="25" fill="white" opacity="0.2"/>
    </svg>
  `;
}

// Generate tech logo
function generateTechLogo(config: LogoConfig): string {
  const { name, colors } = config;
  const initial = name.charAt(0).toUpperCase();
  
  return `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect x="30" y="30" width="140" height="140" rx="30" fill="url(#grad4)"/>
      <rect x="45" y="45" width="30" height="30" rx="5" fill="${colors.accent}"/>
      <rect x="125" y="45" width="30" height="30" rx="5" fill="${colors.accent}"/>
      <rect x="45" y="125" width="30" height="30" rx="5" fill="${colors.accent}"/>
      <rect x="125" y="125" width="30" height="30" rx="5" fill="${colors.accent}"/>
      <text x="100" y="120" font-family="Arial, sans-serif" font-size="50" font-weight="bold" fill="white" text-anchor="middle">${initial}</text>
    </svg>
  `;
}

// Generate minimal logo
function generateMinimalLogo(config: LogoConfig): string {
  const { name, colors } = config;
  const initial = name.charAt(0).toUpperCase();
  
  return `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="none" stroke="url(#grad5)" stroke-width="12"/>
      <text x="100" y="125" font-family="Arial, sans-serif" font-size="70" font-weight="300" fill="${colors.primary}" text-anchor="middle">${initial}</text>
    </svg>
  `;
}

// Main logo generator
export function generateLogo(config: LogoConfig): string {
  const style = getLogoStyle(config.industry);
  
  switch (style) {
    case 'geometric':
      return generateGeometricLogo(config);
    case 'lettermark':
      return generateLettermarkLogo(config);
    case 'abstract':
      return generateAbstractLogo(config);
    case 'tech':
      return generateTechLogo(config);
    case 'minimal':
      return generateMinimalLogo(config);
    default:
      return generateLettermarkLogo(config);
  }
}

// Generate multiple logo variations
export function generateLogoVariations(config: LogoConfig): string[] {
  return [
    generateGeometricLogo(config),
    generateLettermarkLogo(config),
    generateAbstractLogo(config),
    generateTechLogo(config),
    generateMinimalLogo(config),
  ];
}

// Convert SVG string to data URL
export function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
