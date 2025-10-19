// Dynamic layout variation generator for unique landing pages
import { Pitch } from './storage';

export interface LayoutVariation {
  id: string;
  heroStyle: 'centered' | 'split' | 'minimal' | 'bold' | 'gradient-bg';
  sectionOrder: string[];
  colorPalette: ColorPalette;
  typography: Typography;
  animationStyle: AnimationStyle;
  featureLayout: 'grid-3' | 'grid-4' | 'cards' | 'horizontal' | 'stacked';
  ctaStyle: 'box' | 'full-width' | 'split' | 'minimal';
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

export interface Typography {
  heading: string;
  body: string;
  display: string;
}

export interface AnimationStyle {
  type: 'fade' | 'slide' | 'zoom' | 'glow' | 'parallax';
  speed: 'slow' | 'medium' | 'fast';
  easing: string;
}

// Industry-specific color palettes
const industryColorPalettes: Record<string, ColorPalette[]> = {
  tech: [
    {
      primary: '#4F46E5',
      secondary: '#7C3AED',
      accent: '#06B6D4',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#a1a1aa',
    },
    {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#14B8A6',
      background: '#050505',
      surface: '#151515',
      text: '#f5f5f5',
      textSecondary: '#9ca3af',
    },
    {
      primary: '#6366F1',
      secondary: '#A855F7',
      accent: '#22D3EE',
      background: '#0b0b0b',
      surface: '#1e1e1e',
      text: '#fafafa',
      textSecondary: '#94a3b8',
    },
  ],
  health: [
    {
      primary: '#14B8A6',
      secondary: '#10B981',
      accent: '#06B6D4',
      background: '#f8f9fa',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
    },
    {
      primary: '#0D9488',
      secondary: '#059669',
      accent: '#0EA5E9',
      background: '#f1f5f9',
      surface: '#ffffff',
      text: '#0f172a',
      textSecondary: '#64748b',
    },
    {
      primary: '#06B6D4',
      secondary: '#14B8A6',
      accent: '#22C55E',
      background: '#fafafa',
      surface: '#f8f9fa',
      text: '#111827',
      textSecondary: '#4b5563',
    },
  ],
  realestate: [
    {
      primary: '#78716C',
      secondary: '#A78BFA',
      accent: '#F59E0B',
      background: '#1c1917',
      surface: '#292524',
      text: '#fafaf9',
      textSecondary: '#a8a29e',
    },
    {
      primary: '#57534E',
      secondary: '#14B8A6',
      accent: '#FBBF24',
      background: '#0c0a09',
      surface: '#1c1917',
      text: '#f5f5f4',
      textSecondary: '#d6d3d1',
    },
  ],
  education: [
    {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#F59E0B',
      background: '#faf5ff',
      surface: '#ffffff',
      text: '#1e1b4b',
      textSecondary: '#6b7280',
    },
    {
      primary: '#A855F7',
      secondary: '#D946EF',
      accent: '#F97316',
      background: '#fdf4ff',
      surface: '#fefefe',
      text: '#4c1d95',
      textSecondary: '#7c3aed',
    },
    {
      primary: '#7C3AED',
      secondary: '#C026D3',
      accent: '#FB923C',
      background: '#f5f3ff',
      surface: '#ffffff',
      text: '#2e1065',
      textSecondary: '#6d28d9',
    },
  ],
  marketing: [
    {
      primary: '#F97316',
      secondary: '#EC4899',
      accent: '#FBBF24',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#d1d5db',
    },
    {
      primary: '#FB923C',
      secondary: '#F472B6',
      accent: '#FDE047',
      background: '#050505',
      surface: '#171717',
      text: '#fafafa',
      textSecondary: '#cbd5e1',
    },
    {
      primary: '#EA580C',
      secondary: '#DB2777',
      accent: '#EAB308',
      background: '#0f0f0f',
      surface: '#1f1f1f',
      text: '#f8fafc',
      textSecondary: '#e2e8f0',
    },
  ],
  fintech: [
    {
      primary: '#059669',
      secondary: '#0284C7',
      accent: '#FBBF24',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#9ca3af',
    },
    {
      primary: '#10B981',
      secondary: '#0EA5E9',
      accent: '#F59E0B',
      background: '#020617',
      surface: '#0f172a',
      text: '#f8fafc',
      textSecondary: '#94a3b8',
    },
  ],
  default: [
    {
      primary: '#4F46E5',
      secondary: '#8B5CF6',
      accent: '#14B8A6',
      background: '#0b0b0b',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#a1a1aa',
    },
  ],
};

// Typography pairings
const typographyPairings: Typography[] = [
  { heading: 'Poppins', body: 'Inter', display: 'Poppins' },
  { heading: 'Montserrat', body: 'Open Sans', display: 'Montserrat' },
  { heading: 'Space Grotesk', body: 'Inter', display: 'Space Grotesk' },
  { heading: 'Plus Jakarta Sans', body: 'Inter', display: 'Plus Jakarta Sans' },
  { heading: 'Outfit', body: 'Manrope', display: 'Outfit' },
  { heading: 'Sora', body: 'DM Sans', display: 'Sora' },
];

// Animation styles
const animationStyles: AnimationStyle[] = [
  { type: 'fade', speed: 'medium', easing: 'ease-in-out' },
  { type: 'slide', speed: 'fast', easing: 'ease-out' },
  { type: 'zoom', speed: 'slow', easing: 'ease-in-out' },
  { type: 'glow', speed: 'medium', easing: 'linear' },
  { type: 'parallax', speed: 'slow', easing: 'ease-out' },
];

// Section orders
const sectionOrders: string[][] = [
  ['hero', 'features', 'problem', 'solution', 'pricing', 'cta', 'footer'],
  ['hero', 'problem', 'solution', 'features', 'pricing', 'cta', 'footer'],
  ['hero', 'solution', 'features', 'pricing', 'problem', 'cta', 'footer'],
  ['hero', 'features', 'pricing', 'problem', 'solution', 'cta', 'footer'],
  ['hero', 'stats', 'features', 'problem', 'solution', 'cta', 'footer'],
];

// Hero styles
const heroStyles: LayoutVariation['heroStyle'][] = [
  'centered',
  'split',
  'minimal',
  'bold',
  'gradient-bg',
];

// Feature layouts
const featureLayouts: LayoutVariation['featureLayout'][] = [
  'grid-3',
  'grid-4',
  'cards',
  'horizontal',
  'stacked',
];

// CTA styles
const ctaStyles: LayoutVariation['ctaStyle'][] = [
  'box',
  'full-width',
  'split',
  'minimal',
];

// Get industry category from pitch industry
function getIndustryCategory(industry: string): string {
  const industryLower = industry.toLowerCase();
  
  if (industryLower.includes('tech') || industryLower.includes('ai') || industryLower.includes('software') || industryLower.includes('saas')) {
    return 'tech';
  }
  if (industryLower.includes('health') || industryLower.includes('fitness') || industryLower.includes('wellness') || industryLower.includes('medical')) {
    return 'health';
  }
  if (industryLower.includes('real estate') || industryLower.includes('property')) {
    return 'realestate';
  }
  if (industryLower.includes('education') || industryLower.includes('edtech') || industryLower.includes('learning')) {
    return 'education';
  }
  if (industryLower.includes('marketing') || industryLower.includes('ecommerce') || industryLower.includes('e-commerce') || industryLower.includes('retail')) {
    return 'marketing';
  }
  if (industryLower.includes('fintech') || industryLower.includes('finance') || industryLower.includes('banking')) {
    return 'fintech';
  }
  
  return 'default';
}

// Generate a random layout variation
export function generateLayoutVariation(pitch: Pitch): LayoutVariation {
  const industryCategory = getIndustryCategory(pitch.industry);
  const availablePalettes = industryColorPalettes[industryCategory] || industryColorPalettes.default;
  
  // Use timestamp and random for true uniqueness
  const seed = Date.now() + Math.random();
  const random = (max: number) => Math.floor((seed * Math.random()) % max);
  
  return {
    id: `layout-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    heroStyle: heroStyles[random(heroStyles.length)],
    sectionOrder: sectionOrders[random(sectionOrders.length)],
    colorPalette: availablePalettes[random(availablePalettes.length)],
    typography: typographyPairings[random(typographyPairings.length)],
    animationStyle: animationStyles[random(animationStyles.length)],
    featureLayout: featureLayouts[random(featureLayouts.length)],
    ctaStyle: ctaStyles[random(ctaStyles.length)],
  };
}

// Generate multiple variations for comparison
export function generateMultipleVariations(pitch: Pitch, count: number = 3): LayoutVariation[] {
  const variations: LayoutVariation[] = [];
  
  for (let i = 0; i < count; i++) {
    // Add small delay to ensure different timestamps
    variations.push(generateLayoutVariation(pitch));
  }
  
  return variations;
}
