// Unique pitch content generator based on user input
import { generateLogo } from './logoGenerator';

interface PitchInput {
  idea: string;
  industry: string;
  tone: 'formal' | 'fun';
}

interface GeneratedPitch {
  id: string;
  name: string;
  tagline: string;
  elevator: string;
  problem: string;
  solution: string;
  target: string;
  industry: string;
  tone: string;
  createdAt: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

// Industry-specific color palettes
const industryColors: Record<string, any> = {
  technology: {
    primary: '#4F46E5',
    secondary: '#818CF8',
    accent: '#A78BFA',
    background: '#F8FAFC',
    text: '#1E293B',
  },
  healthcare: {
    primary: '#0EA5E9',
    secondary: '#38BDF8',
    accent: '#22D3EE',
    background: '#F0F9FF',
    text: '#0C4A6E',
  },
  education: {
    primary: '#F59E0B',
    secondary: '#FBBF24',
    accent: '#FCD34D',
    background: '#FFFBEB',
    text: '#78350F',
  },
  finance: {
    primary: '#059669',
    secondary: '#10B981',
    accent: '#34D399',
    background: '#ECFDF5',
    text: '#064E3B',
  },
  'e-commerce': {
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    accent: '#C4B5FD',
    background: '#FAF5FF',
    text: '#5B21B6',
  },
  'food & beverage': {
    primary: '#EF4444',
    secondary: '#F87171',
    accent: '#FCA5A5',
    background: '#FEF2F2',
    text: '#991B1B',
  },
  sustainability: {
    primary: '#2E7D32',
    secondary: '#66BB6A',
    accent: '#81C784',
    background: '#F1F8E9',
    text: '#1B5E20',
  },
  entertainment: {
    primary: '#EC4899',
    secondary: '#F472B6',
    accent: '#F9A8D4',
    background: '#FDF2F8',
    text: '#831843',
  },
  travel: {
    primary: '#14B8A6',
    secondary: '#2DD4BF',
    accent: '#5EEAD4',
    background: '#F0FDFA',
    text: '#134E4A',
  },
  'real estate': {
    primary: '#7C3AED',
    secondary: '#8B5CF6',
    accent: '#A78BFA',
    background: '#FAF5FF',
    text: '#5B21B6',
  },
};

// Name generators based on industry keywords
const namePrefixes = ['Smart', 'Quick', 'Easy', 'Pro', 'Cloud', 'Next', 'Fast', 'Flex', 'Sync', 'Live'];
const nameSuffixes = ['Hub', 'Flow', 'Link', 'Spot', 'Zone', 'Path', 'Wave', 'Core', 'Nest', 'Base'];

// Generate unique startup name
function generateStartupName(idea: string, industry: string, tone: string): string {
  const words = idea.toLowerCase().split(' ');
  const keywords = words.filter(w => w.length > 4);
  
  if (keywords.length > 0) {
    const keyword = keywords[0];
    const capitalized = keyword.charAt(0).toUpperCase() + keyword.slice(1);
    
    if (tone === 'fun') {
      const suffix = nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)];
      return capitalized + suffix;
    } else {
      const prefix = namePrefixes[Math.floor(Math.random() * namePrefixes.length)];
      return prefix + capitalized;
    }
  }
  
  // Fallback
  const prefix = namePrefixes[Math.floor(Math.random() * namePrefixes.length)];
  const suffix = nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)];
  return prefix + suffix;
}

// Generate tagline
function generateTagline(idea: string, tone: string): string {
  const actionWords = tone === 'formal' 
    ? ['Transform', 'Optimize', 'Streamline', 'Enhance', 'Revolutionize', 'Empower']
    : ['Supercharge', 'Unlock', 'Discover', 'Amplify', 'Boost', 'Rock'];
  
  const endWords = tone === 'formal'
    ? ['success', 'excellence', 'efficiency', 'innovation', 'growth', 'productivity']
    : ['journey', 'experience', 'game', 'vibe', 'story', 'adventure'];
  
  const action = actionWords[Math.floor(Math.random() * actionWords.length)];
  const end = endWords[Math.floor(Math.random() * endWords.length)];
  
  // Extract core concept from idea
  const words = idea.toLowerCase().split(' ');
  const concepts = ['your', 'the', 'modern', 'smart', 'digital'];
  const concept = concepts[Math.floor(Math.random() * concepts.length)];
  
  return `${action} ${concept} ${end}`;
}

// Generate elevator pitch
function generateElevator(name: string, idea: string, industry: string, tone: string): string {
  const formalIntro = `${name} is an innovative platform that`;
  const funIntro = `${name} is here to make`;
  
  const intro = tone === 'formal' ? formalIntro : funIntro;
  
  // Extract key concepts from idea
  const ideaSummary = idea.length > 100 ? idea.substring(0, 100) + '...' : idea;
  
  const formalValue = `We leverage cutting-edge technology to deliver measurable results and drive sustainable growth in the ${industry} sector.`;
  const funValue = `We're all about making things easier, faster, and way more awesome for everyone in ${industry}!`;
  
  const value = tone === 'formal' ? formalValue : funValue;
  
  return `${intro} ${ideaSummary} ${value}`;
}

// Generate problem statement
function generateProblem(idea: string, industry: string, tone: string): string {
  const formalProblems = [
    `Organizations in the ${industry} industry face significant challenges in`,
    `Current solutions in ${industry} fail to adequately address`,
    `Businesses struggle with inefficient processes when it comes to`,
    `The ${industry} sector lacks comprehensive tools for`,
  ];
  
  const funProblems = [
    `Let's face it - ${industry} is stuck in the past when it comes to`,
    `Ever noticed how frustrating it is to deal with`,
    `The biggest headache in ${industry}? It's all about`,
    `Nobody enjoys the hassle of`,
  ];
  
  const problems = tone === 'formal' ? formalProblems : funProblems;
  const problemIntro = problems[Math.floor(Math.random() * problems.length)];
  
  const issues = [
    'managing complex workflows and data',
    'maintaining efficiency while scaling operations',
    'coordinating between multiple stakeholders',
    'tracking and optimizing key performance metrics',
  ];
  
  const issue = issues[Math.floor(Math.random() * issues.length)];
  
  const formalConsequence = 'leading to increased costs, reduced productivity, and missed opportunities for growth.';
  const funConsequence = 'which costs everyone time, money, and a whole lot of headaches.';
  
  const consequence = tone === 'formal' ? formalConsequence : funConsequence;
  
  return `${problemIntro} ${issue}, ${consequence}`;
}

// Generate solution
function generateSolution(name: string, idea: string, tone: string): string {
  const formalIntro = `${name} addresses these challenges through`;
  const funIntro = `${name} solves this with`;
  
  const intro = tone === 'formal' ? formalIntro : funIntro;
  
  const solutions = [
    'an intuitive, AI-powered platform that automates complex processes',
    'advanced analytics and real-time insights',
    'seamless integration with existing tools and workflows',
    'smart automation and predictive analytics',
  ];
  
  const solution = solutions[Math.floor(Math.random() * solutions.length)];
  
  const formalBenefit = 'Our platform delivers measurable ROI through increased efficiency, reduced operational costs, and enhanced decision-making capabilities.';
  const funBenefit = 'The result? You save time, cut costs, and actually enjoy the process. Win-win-win!';
  
  const benefit = tone === 'formal' ? formalBenefit : funBenefit;
  
  return `${intro} ${solution}. ${benefit}`;
}

// Generate target audience
function generateTarget(industry: string, tone: string): string {
  const audienceMap: Record<string, string> = {
    technology: 'software companies, tech startups, and digital agencies',
    healthcare: 'healthcare providers, medical practices, and wellness organizations',
    education: 'educational institutions, online course creators, and training organizations',
    finance: 'financial services firms, fintech startups, and investment companies',
    'e-commerce': 'online retailers, marketplace sellers, and e-commerce brands',
    'food & beverage': 'restaurants, food delivery services, and beverage brands',
    sustainability: 'environmentally-conscious businesses and sustainability-focused organizations',
    entertainment: 'content creators, media companies, and entertainment platforms',
    travel: 'travel agencies, hospitality businesses, and tourism companies',
    'real estate': 'property management firms, real estate agencies, and developers',
  };
  
  const audience = audienceMap[industry] || 'forward-thinking businesses and entrepreneurs';
  
  const formalDesc = `Our primary target market includes ${audience} seeking to enhance their operational efficiency and competitive advantage. We focus on organizations that value innovation, data-driven insights, and sustainable growth strategies.`;
  
  const funDesc = `We're built for ${audience} who are ready to shake things up! If you're tired of the status quo and want tools that actually work for you (not against you), you're in the right place.`;
  
  return tone === 'formal' ? formalDesc : funDesc;
}

export function generatePitch(input: PitchInput): GeneratedPitch {
  const { idea, industry, tone } = input;
  
  const name = generateStartupName(idea, industry, tone);
  const tagline = generateTagline(idea, tone);
  const elevator = generateElevator(name, idea, industry, tone);
  const problem = generateProblem(idea, industry, tone);
  const solution = generateSolution(name, idea, tone);
  const target = generateTarget(industry, tone);
  
  const colors = industryColors[industry] || industryColors.technology;
  
  // Generate logo
  const logo = generateLogo({
    name,
    industry,
    colors: {
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
    },
  });
  
  return {
    id: `pitch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name,
    tagline,
    elevator,
    problem,
    solution,
    target,
    industry,
    tone,
    createdAt: new Date().toISOString(),
    logo,
    colors,
  };
}
