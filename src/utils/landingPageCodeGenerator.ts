// Dynamic landing page code generator based on pitch data
import { Pitch } from './storage';

export function generateLandingPageCode(pitch: Pitch): string {
  const componentName = pitch.name.replace(/[^a-zA-Z0-9]/g, '');
  const { colors } = pitch;
  
  return `import { motion } from 'motion/react';
import { Check, ArrowRight, Star, Zap, Shield, Users } from 'lucide-react';

export default function ${componentName}Landing() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-lg border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[${colors.primary}] to-[${colors.secondary}] flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <span className="text-xl">${pitch.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
            <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
            <button className="px-6 py-2 bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}] rounded-lg hover:shadow-lg hover:shadow-[${colors.primary}]/50 transition">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[${colors.primary}]/10 via-transparent to-[${colors.secondary}]/10"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-[${colors.primary}]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[${colors.secondary}]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[${colors.primary}]/10 border border-[${colors.primary}]/30 rounded-full mb-8"
            >
              <Star className="w-4 h-4 text-[${colors.primary}]" />
              <span className="text-sm text-gray-300">${pitch.industry}</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              ${pitch.tagline}
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              ${pitch.elevator}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}] rounded-lg hover:shadow-lg hover:shadow-[${colors.primary}]/50 transition flex items-center justify-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl mb-1" style={{ color: '${colors.primary}' }}>10K+</div>
                <p className="text-gray-500 text-sm">Active Users</p>
              </div>
              <div>
                <div className="text-3xl mb-1" style={{ color: '${colors.secondary}' }}>99%</div>
                <p className="text-gray-500 text-sm">Satisfaction</p>
              </div>
              <div>
                <div className="text-3xl mb-1" style={{ color: '${colors.accent}' }}>24/7</div>
                <p className="text-gray-500 text-sm">Support</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-6">
                <span className="text-sm text-red-400">The Problem</span>
              </div>
              <h2 className="text-4xl mb-6">
                ${pitch.problem.split('.')[0]}
              </h2>
              <p className="text-gray-400 mb-6">
                ${pitch.problem}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-[${colors.primary}]/20 to-[${colors.secondary}]/20 rounded-2xl border border-gray-800"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 md:order-1"
            >
              <div className="aspect-square bg-gradient-to-br from-[${colors.secondary}]/20 to-[${colors.accent}]/20 rounded-2xl border border-gray-800"></div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="inline-block px-4 py-2 bg-[${colors.primary}]/10 border border-[${colors.primary}]/30 rounded-full mb-6">
                <span className="text-sm" style={{ color: '${colors.primary}' }}>Our Solution</span>
              </div>
              <h2 className="text-4xl mb-6">
                ${pitch.solution.split('.')[0]}
              </h2>
              <p className="text-gray-400 mb-6">
                ${pitch.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-xl">Everything you need to succeed</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap />, title: 'Lightning Fast', desc: 'Optimized for speed and performance' },
              { icon: <Shield />, title: 'Secure & Safe', desc: 'Enterprise-grade security' },
              { icon: <Users />, title: 'Team Ready', desc: 'Collaborate with your team' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-gradient-to-br from-gray-900 to-gray-800/50 border border-gray-800 rounded-2xl hover:border-[${colors.primary}]/50 transition group"
              >
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[${colors.primary}] to-[${colors.secondary}] flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-2xl mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">Simple Pricing</h2>
            <p className="text-gray-400 text-xl">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Starter', price: '$9', features: ['Basic features', '5 projects', 'Email support'] },
              { name: 'Pro', price: '$29', features: ['All features', 'Unlimited projects', 'Priority support', 'Advanced analytics'], popular: true },
              { name: 'Enterprise', price: '$99', features: ['Everything in Pro', 'Custom integrations', 'Dedicated support', 'SLA'] }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={\`p-8 rounded-2xl border transition \${plan.popular ? 'bg-gradient-to-br from-[${colors.primary}]/10 to-[${colors.secondary}]/10 border-[${colors.primary}]' : 'bg-gray-900/50 border-gray-800'}\`}
              >
                {plan.popular && (
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}] rounded-full text-sm mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl">{plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-300">
                      <Check className="w-5 h-5" style={{ color: '${colors.primary}' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={\`w-full py-3 rounded-lg transition \${plan.popular ? 'bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}] hover:shadow-lg hover:shadow-[${colors.primary}]/50' : 'bg-gray-800 hover:bg-gray-700'}\`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-gradient-to-br from-[${colors.primary}]/20 to-[${colors.secondary}]/20 border border-[${colors.primary}]/30 rounded-3xl"
          >
            <h2 className="text-5xl mb-6">Ready to get started?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of users already using ${pitch.name}
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}] rounded-lg hover:shadow-lg hover:shadow-[${colors.primary}]/50 transition flex items-center justify-center gap-2 mx-auto">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[${colors.primary}] to-[${colors.secondary}]"></div>
                <span className="text-lg">${pitch.name}</span>
              </div>
              <p className="text-gray-500 text-sm">${pitch.tagline}</p>
            </div>
            <div>
              <h4 className="mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © 2025 ${pitch.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}`;
}
