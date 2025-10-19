// Dynamic landing page code generator with full randomization
import { Pitch } from './storage';
import { generateLayoutVariation, LayoutVariation } from './layoutVariations';

export function generateUniqueLandingPageCode(pitch: Pitch, variation?: LayoutVariation): string {
  const layout = variation || generateLayoutVariation(pitch);
  const componentName = pitch.name.replace(/[^a-zA-Z0-9]/g, '');
  
  return `import { motion } from 'motion/react';
import { Check, ArrowRight, Star, Zap, Shield, Users, Target, TrendingUp, Award, Globe } from 'lucide-react';

export default function ${componentName}Landing() {
  return (
    <div className="min-h-screen" style={{ 
      fontFamily: '${layout.typography.body}, sans-serif',
      backgroundColor: '${layout.colorPalette.background}',
      color: '${layout.colorPalette.text}'
    }}>
      ${generateSections(pitch, layout)}
    </div>
  );
}`;
}

function generateSections(pitch: Pitch, layout: LayoutVariation): string {
  const sections = layout.sectionOrder.map(section => {
    switch (section) {
      case 'hero':
        return generateHeroSection(pitch, layout);
      case 'features':
        return generateFeaturesSection(pitch, layout);
      case 'problem':
        return generateProblemSection(pitch, layout);
      case 'solution':
        return generateSolutionSection(pitch, layout);
      case 'pricing':
        return generatePricingSection(pitch, layout);
      case 'stats':
        return generateStatsSection(pitch, layout);
      case 'cta':
        return generateCTASection(pitch, layout);
      case 'footer':
        return generateFooterSection(pitch, layout);
      default:
        return '';
    }
  });
  
  return sections.join('\n\n');
}

function getAnimationProps(layout: LayoutVariation, delay: number = 0): string {
  const { animationStyle } = layout;
  
  switch (animationStyle.type) {
    case 'fade':
      return `
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ${animationStyle.speed === 'fast' ? 0.3 : animationStyle.speed === 'slow' ? 0.8 : 0.5}, delay: ${delay}, ease: '${animationStyle.easing}' }}
      `;
    case 'slide':
      return `
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: ${animationStyle.speed === 'fast' ? 0.4 : animationStyle.speed === 'slow' ? 0.9 : 0.6}, delay: ${delay}, ease: '${animationStyle.easing}' }}
      `;
    case 'zoom':
      return `
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: ${animationStyle.speed === 'fast' ? 0.4 : animationStyle.speed === 'slow' ? 1 : 0.7}, delay: ${delay}, ease: '${animationStyle.easing}' }}
      `;
    case 'glow':
      return `
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: ${animationStyle.speed === 'fast' ? 0.5 : animationStyle.speed === 'slow' ? 1.2 : 0.8}, delay: ${delay} }}
      `;
    case 'parallax':
      return `
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: ${animationStyle.speed === 'fast' ? 0.6 : animationStyle.speed === 'slow' ? 1.5 : 1}, delay: ${delay}, ease: '${animationStyle.easing}' }}
      `;
    default:
      return `initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: ${delay} }}`;
  }
}

function generateHeroSection(pitch: Pitch, layout: LayoutVariation): string {
  const { colorPalette, heroStyle, typography } = layout;
  
  const baseNav = `
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-lg z-50 border-b" style={{ 
        backgroundColor: '${colorPalette.background}cc',
        borderColor: '${colorPalette.primary}30'
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
              background: \`linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.secondary})\`
            }}>
              <span className="text-xl">✨</span>
            </div>
            <span className="text-xl" style={{ fontFamily: '${typography.heading}, sans-serif' }}>${pitch.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="hover:opacity-80 transition" style={{ color: '${colorPalette.textSecondary}' }}>Features</a>
            <a href="#pricing" className="hover:opacity-80 transition" style={{ color: '${colorPalette.textSecondary}' }}>Pricing</a>
            <button className="px-6 py-2 rounded-lg transition hover:shadow-lg" style={{
              background: \`linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary})\`,
              boxShadow: \`0 0 20px ${colorPalette.primary}40\`
            }}>
              Get Started
            </button>
          </div>
        </div>
      </nav>`;
  
  switch (heroStyle) {
    case 'centered':
      return `${baseNav}
      
      {/* Hero Section - Centered */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '${colorPalette.primary}' }}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '${colorPalette.secondary}', animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div ${getAnimationProps(layout)}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border" style={{
              backgroundColor: '${colorPalette.primary}10',
              borderColor: '${colorPalette.primary}40'
            }}>
              <Star className="w-4 h-4" style={{ color: '${colorPalette.primary}' }} />
              <span className="text-sm">${pitch.industry}</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl mb-6" style={{ 
              fontFamily: '${typography.display}, sans-serif',
              background: \`linear-gradient(to right, ${colorPalette.text}, ${colorPalette.textSecondary})\`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ${pitch.tagline}
            </h1>
            
            <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: '${colorPalette.textSecondary}' }}>
              ${pitch.elevator}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-lg hover:shadow-lg transition" style={{
                background: \`linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary})\`
              }}>
                Start Free Trial <ArrowRight className="inline w-5 h-5 ml-2" />
              </button>
              <button className="px-8 py-4 rounded-lg border transition hover:opacity-80" style={{
                borderColor: '${colorPalette.primary}',
                color: '${colorPalette.primary}'
              }}>
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>`;
      
    case 'split':
      return `${baseNav}
      
      {/* Hero Section - Split */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div ${getAnimationProps(layout)}>
            <div className="inline-block px-4 py-2 rounded-full mb-6" style={{
              backgroundColor: '${colorPalette.primary}10',
              color: '${colorPalette.primary}'
            }}>
              ${pitch.industry}
            </div>
            
            <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: '${typography.display}, sans-serif' }}>
              ${pitch.tagline}
            </h1>
            
            <p className="text-lg mb-8" style={{ color: '${colorPalette.textSecondary}' }}>
              ${pitch.elevator}
            </p>
            
            <div className="flex gap-4">
              <button className="px-8 py-3 rounded-lg" style={{
                background: \`linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary})\`
              }}>
                Get Started
              </button>
              <button className="px-8 py-3 border rounded-lg" style={{ borderColor: '${colorPalette.primary}40' }}>
                Learn More
              </button>
            </div>
          </motion.div>
          
          <motion.div ${getAnimationProps(layout, 0.2)}>
            <div className="aspect-square rounded-3xl" style={{
              background: \`linear-gradient(135deg, ${colorPalette.primary}20, ${colorPalette.secondary}20)\`,
              border: \`1px solid ${colorPalette.primary}30\`
            }}></div>
          </motion.div>
        </div>
      </section>`;
      
    case 'minimal':
      return `${baseNav}
      
      {/* Hero Section - Minimal */}
      <section className="pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div ${getAnimationProps(layout)} className="space-y-8">
            <h1 className="text-7xl md:text-8xl leading-tight" style={{ 
              fontFamily: '${typography.display}, sans-serif',
              color: '${colorPalette.text}'
            }}>
              ${pitch.tagline}
            </h1>
            
            <p className="text-2xl" style={{ color: '${colorPalette.textSecondary}' }}>
              ${pitch.elevator}
            </p>
            
            <button className="px-10 py-4 rounded-full text-lg" style={{
              background: '${colorPalette.primary}',
              color: '${colorPalette.text}'
            }}>
              Get Started →
            </button>
          </motion.div>
        </div>
      </section>`;
      
    case 'bold':
      return `${baseNav}
      
      {/* Hero Section - Bold */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: \`linear-gradient(135deg, ${colorPalette.primary}15, ${colorPalette.secondary}15)\`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div ${getAnimationProps(layout)} className="text-center">
            <div className="text-sm uppercase tracking-widest mb-6" style={{ color: '${colorPalette.accent}' }}>
              ${pitch.industry}
            </div>
            
            <h1 className="text-6xl md:text-8xl mb-8 leading-tight" style={{ 
              fontFamily: '${typography.display}, sans-serif'
            }}>
              ${pitch.tagline.split(' ').slice(0, 3).join(' ')}<br/>
              <span style={{ color: '${colorPalette.primary}' }}>${pitch.tagline.split(' ').slice(3).join(' ')}</span>
            </h1>
            
            <p className="text-xl max-w-2xl mx-auto mb-10" style={{ color: '${colorPalette.textSecondary}' }}>
              ${pitch.elevator}
            </p>
            
            <button className="px-12 py-5 text-xl rounded-lg shadow-2xl" style={{
              background: \`linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary})\`,
              boxShadow: \`0 20px 40px ${colorPalette.primary}40\`
            }}>
              Start Now
            </button>
          </motion.div>
        </div>
      </section>`;
      
    case 'gradient-bg':
      return `${baseNav}
      
      {/* Hero Section - Gradient Background */}
      <section className="relative pt-32 pb-24 px-6" style={{
        background: \`linear-gradient(to bottom, ${colorPalette.background}, ${colorPalette.surface})\`
      }}>
        <div className="max-w-6xl mx-auto">
          <motion.div ${getAnimationProps(layout)} className="text-center">
            <div className="inline-block px-6 py-3 rounded-full mb-8 border" style={{
              background: '${colorPalette.primary}20',
              borderColor: '${colorPalette.primary}'
            }}>
              <span className="text-sm">${pitch.industry} • ${pitch.name}</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl mb-8" style={{ fontFamily: '${typography.display}, sans-serif' }}>
              ${pitch.tagline}
            </h1>
            
            <p className="text-xl mb-10 max-w-3xl mx-auto" style={{ color: '${colorPalette.textSecondary}' }}>
              ${pitch.elevator}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 rounded-xl" style={{
                background: \`linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.secondary})\`
              }}>
                Get Started Free
              </button>
              <button className="px-8 py-4 rounded-xl" style={{
                backgroundColor: '${colorPalette.surface}',
                border: \`2px solid ${colorPalette.primary}30\`
              }}>
                View Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>`;
      
    default:
      return baseNav;
  }
}

function generateFeaturesSection(pitch: Pitch, layout: LayoutVariation): string {
  const { colorPalette, featureLayout } = layout;
  
  const features = [
    { icon: 'Zap', title: 'Lightning Fast', desc: 'Optimized for peak performance' },
    { icon: 'Shield', title: 'Secure & Safe', desc: 'Enterprise-grade security' },
    { icon: 'Users', title: 'Team Collaboration', desc: 'Work together seamlessly' },
    { icon: 'Target', title: 'Goal Tracking', desc: 'Measure what matters' },
    { icon: 'TrendingUp', title: 'Analytics', desc: 'Data-driven insights' },
    { icon: 'Award', title: 'Best in Class', desc: 'Industry-leading solution' },
  ];
  
  const gridClass = featureLayout === 'grid-3' ? 'md:grid-cols-3' : 
                    featureLayout === 'grid-4' ? 'md:grid-cols-4' :
                    featureLayout === 'horizontal' ? 'md:grid-cols-6' :
                    featureLayout === 'stacked' ? 'md:grid-cols-1 max-w-2xl mx-auto' :
                    'md:grid-cols-3';
  
  return `
      {/* Features Section */}
      <section id="features" className="py-20 px-6" style={{ backgroundColor: '${colorPalette.surface}' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div ${getAnimationProps(layout)} className="text-center mb-16">
            <h2 className="text-5xl mb-4" style={{ fontFamily: '${layout.typography.heading}, sans-serif' }}>
              Powerful Features
            </h2>
            <p className="text-xl" style={{ color: '${colorPalette.textSecondary}' }}>
              Everything you need to succeed
            </p>
          </motion.div>
          
          <div className="grid ${gridClass} gap-8">
            ${features.slice(0, featureLayout === 'grid-4' ? 4 : 3).map((f, i) => `
            <motion.div
              ${getAnimationProps(layout, i * 0.1)}
              className="p-8 rounded-2xl transition-all hover:scale-105"
              style={{
                background: \`linear-gradient(135deg, ${colorPalette.primary}10, ${colorPalette.secondary}10)\`,
                border: \`1px solid ${colorPalette.primary}20\`
              }}
            >
              <div className="w-14 h-14 rounded-lg mb-6 flex items-center justify-center" style={{
                background: \`linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.secondary})\`
              }}>
                <${f.icon} className="w-7 h-7" />
              </div>
              <h3 className="text-2xl mb-3">${f.title}</h3>
              <p style={{ color: '${colorPalette.textSecondary}' }}>${f.desc}</p>
            </motion.div>
            `).join('')}
          </div>
        </div>
      </section>`;
}

function generateProblemSection(pitch: Pitch, layout: LayoutVariation): string {
  const { colorPalette } = layout;
  
  return `
      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div ${getAnimationProps(layout)}>
            <div className="inline-block px-4 py-2 rounded-full mb-6" style={{
              backgroundColor: '#EF444410',
              color: '#EF4444',
              border: '1px solid #EF444430'
            }}>
              The Challenge
            </div>
            <h2 className="text-4xl mb-6" style={{ fontFamily: '${layout.typography.heading}, sans-serif' }}>
              ${pitch.problem.split('.')[0]}
            </h2>
            <p className="text-lg" style={{ color: '${colorPalette.textSecondary}' }}>
              ${pitch.problem}
            </p>
          </motion.div>
          
          <motion.div ${getAnimationProps(layout, 0.2)}>
            <div className="aspect-square rounded-2xl" style={{
              background: \`linear-gradient(135deg, #EF444420, ${colorPalette.primary}20)\`,
              border: \`1px solid ${colorPalette.primary}30\`
            }}></div>
          </motion.div>
        </div>
      </section>`;
}

function generateSolutionSection(pitch: Pitch, layout: LayoutVariation): string {
  const { colorPalette } = layout;
  
  return `
      {/* Solution Section */}
      <section className="py-20 px-6" style={{ backgroundColor: '${colorPalette.surface}' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div ${getAnimationProps(layout)} className="order-2 md:order-1">
            <div className="aspect-square rounded-2xl" style={{
              background: \`linear-gradient(135deg, ${colorPalette.secondary}20, ${colorPalette.accent}20)\`,
              border: \`1px solid ${colorPalette.secondary}30\`
            }}></div>
          </motion.div>
          
          <motion.div ${getAnimationProps(layout, 0.2)} className="order-1 md:order-2">
            <div className="inline-block px-4 py-2 rounded-full mb-6" style={{
              backgroundColor: '${colorPalette.primary}10',
              color: '${colorPalette.primary}',
              border: \`1px solid ${colorPalette.primary}30\`
            }}>
              Our Solution
            </div>
            <h2 className="text-4xl mb-6" style={{ fontFamily: '${layout.typography.heading}, sans-serif' }}>
              ${pitch.solution.split('.')[0]}
            </h2>
            <p className="text-lg" style={{ color: '${colorPalette.textSecondary}' }}>
              ${pitch.solution}
            </p>
          </motion.div>
        </div>
      </section>`;
}

function generatePricingSection(pitch: Pitch, layout: LayoutVariation): string {
  const { colorPalette } = layout;
  
  const plans = [
    { name: 'Starter', price: '$9', features: ['Basic features', '5 projects', 'Email support'] },
    { name: 'Pro', price: '$29', features: ['All features', 'Unlimited projects', 'Priority support', 'Analytics'], popular: true },
    { name: 'Enterprise', price: '$99', features: ['Everything in Pro', 'Custom integrations', 'Dedicated support', 'SLA'] }
  ];
  
  return `
      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div ${getAnimationProps(layout)} className="text-center mb-16">
            <h2 className="text-5xl mb-4" style={{ fontFamily: '${layout.typography.heading}, sans-serif' }}>
              Simple Pricing
            </h2>
            <p className="text-xl" style={{ color: '${colorPalette.textSecondary}' }}>
              Choose the plan that fits your needs
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            ${plans.map((plan, i) => `
            <motion.div
              ${getAnimationProps(layout, i * 0.1)}
              className="p-8 rounded-2xl border transition-all hover:scale-105"
              style={{
                background: plan.popular ? \`linear-gradient(135deg, ${colorPalette.primary}15, ${colorPalette.secondary}15)\` : '${colorPalette.surface}',
                borderColor: plan.popular ? '${colorPalette.primary}' : '${colorPalette.primary}20'
              }}
            >
              ${plan.popular ? `<div className="inline-block px-3 py-1 rounded-full text-sm mb-4" style={{ background: \`linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary})\` }}>Most Popular</div>` : ''}
              <h3 className="text-2xl mb-2">${plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl">${plan.price}</span>
                <span style={{ color: '${colorPalette.textSecondary}' }}>/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                ${plan.features.map(f => `<li className="flex items-center gap-2"><Check className="w-5 h-5" style={{ color: '${colorPalette.primary}' }} /><span style={{ color: '${colorPalette.textSecondary}' }}>${f}</span></li>`).join('')}
              </ul>
              <button className="w-full py-3 rounded-lg transition" style={{
                background: plan.popular ? \`linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary})\` : '${colorPalette.surface}',
                border: plan.popular ? 'none' : \`1px solid ${colorPalette.primary}40\`
              }}>
                Get Started
              </button>
            </motion.div>
            `).join('')}
          </div>
        </div>
      </section>`;
}

function generateStatsSection(pitch: Pitch, layout: LayoutVariation): string {
  const { colorPalette } = layout;
  
  return `
      {/* Stats Section */}
      <section className="py-20 px-6" style={{ backgroundColor: '${colorPalette.surface}' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div ${getAnimationProps(layout)}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              ${[
                { value: '10K+', label: 'Active Users' },
                { value: '99%', label: 'Satisfaction' },
                { value: '50+', label: 'Countries' },
                { value: '24/7', label: 'Support' }
              ].map((stat, i) => `
              <div className="text-center">
                <div className="text-5xl mb-2" style={{ color: '${colorPalette.primary}', fontFamily: '${layout.typography.heading}, sans-serif' }}>
                  ${stat.value}
                </div>
                <p style={{ color: '${colorPalette.textSecondary}' }}>${stat.label}</p>
              </div>
              `).join('')}
            </div>
          </motion.div>
        </div>
      </section>`;
}

function generateCTASection(pitch: Pitch, layout: LayoutVariation): string {
  const { colorPalette, ctaStyle } = layout;
  
  switch (ctaStyle) {
    case 'box':
      return `
      {/* CTA Section - Box */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            ${getAnimationProps(layout)}
            className="p-12 rounded-3xl border text-center"
            style={{
              background: \`linear-gradient(135deg, ${colorPalette.primary}20, ${colorPalette.secondary}20)\`,
              borderColor: '${colorPalette.primary}40'
            }}
          >
            <h2 className="text-5xl mb-6" style={{ fontFamily: '${layout.typography.heading}, sans-serif' }}>
              Ready to get started?
            </h2>
            <p className="text-xl mb-8" style={{ color: '${colorPalette.textSecondary}' }}>
              Join thousands already using ${pitch.name}
            </p>
            <button className="px-10 py-4 rounded-lg text-lg" style={{
              background: \`linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary})\`
            }}>
              Start Free Trial <ArrowRight className="inline w-5 h-5 ml-2" />
            </button>
          </motion.div>
        </div>
      </section>`;
      
    case 'full-width':
      return `
      {/* CTA Section - Full Width */}
      <section className="py-32 px-6" style={{
        background: \`linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary})\`
      }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div ${getAnimationProps(layout)}>
            <h2 className="text-6xl mb-8" style={{ fontFamily: '${layout.typography.heading}, sans-serif' }}>
              Transform your business today
            </h2>
            <p className="text-2xl mb-10 opacity-90">
              ${pitch.elevator}
            </p>
            <button className="px-12 py-5 text-xl rounded-lg" style={{
              backgroundColor: '${colorPalette.background}',
              color: '${colorPalette.primary}'
            }}>
              Get Started Now
            </button>
          </motion.div>
        </div>
      </section>`;
      
    case 'split':
      return `
      {/* CTA Section - Split */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div ${getAnimationProps(layout)}>
            <h2 className="text-5xl mb-6" style={{ fontFamily: '${layout.typography.heading}, sans-serif' }}>
              Ready to transform your workflow?
            </h2>
            <p className="text-xl mb-8" style={{ color: '${colorPalette.textSecondary}' }}>
              Join ${pitch.name} and experience the difference
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 rounded-lg" style={{
                background: \`linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary})\`
              }}>
                Get Started
              </button>
              <button className="px-8 py-4 border rounded-lg" style={{ borderColor: '${colorPalette.primary}40' }}>
                Contact Sales
              </button>
            </div>
          </motion.div>
          
          <motion.div ${getAnimationProps(layout, 0.2)}>
            <div className="aspect-square rounded-2xl" style={{
              background: \`linear-gradient(135deg, ${colorPalette.primary}20, ${colorPalette.accent}20)\`,
              border: \`1px solid ${colorPalette.primary}30\`
            }}></div>
          </motion.div>
        </div>
      </section>`;
      
    case 'minimal':
      return `
      {/* CTA Section - Minimal */}
      <section className="py-32 px-6 text-center">
        <motion.div ${getAnimationProps(layout)} className="max-w-3xl mx-auto">
          <h2 className="text-6xl mb-12" style={{ fontFamily: '${layout.typography.heading}, sans-serif' }}>
            Start your journey with ${pitch.name}
          </h2>
          <button className="px-12 py-5 text-xl rounded-full" style={{
            background: '${colorPalette.primary}',
            color: '${colorPalette.text}'
          }}>
            Get Started →
          </button>
        </motion.div>
      </section>`;
      
    default:
      return '';
  }
}

function generateFooterSection(pitch: Pitch, layout: LayoutVariation): string {
  const { colorPalette } = layout;
  
  return `
      {/* Footer */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: '${colorPalette.primary}20' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg" style={{
                  background: \`linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.secondary})\`
                }}></div>
                <span className="text-lg">${pitch.name}</span>
              </div>
              <p className="text-sm" style={{ color: '${colorPalette.textSecondary}' }}>
                ${pitch.tagline}
              </p>
            </div>
            
            ${['Product', 'Company', 'Resources', 'Legal'].map(section => `
            <div>
              <h4 className="mb-4">${section}</h4>
              <ul className="space-y-2 text-sm" style={{ color: '${colorPalette.textSecondary}' }}>
                <li><a href="#" className="hover:opacity-80 transition">Features</a></li>
                <li><a href="#" className="hover:opacity-80 transition">Pricing</a></li>
                <li><a href="#" className="hover:opacity-80 transition">Documentation</a></li>
              </ul>
            </div>
            `).join('')}
          </div>
          
          <div className="pt-8 border-t text-center text-sm" style={{ 
            borderColor: '${colorPalette.primary}20',
            color: '${colorPalette.textSecondary}'
          }}>
            © 2025 ${pitch.name}. All rights reserved.
          </div>
        </div>
      </footer>`;
}
