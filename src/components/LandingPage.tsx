import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap, Target, Code, ArrowRight, Check } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import { getAllPitches } from '../utils/storage';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [currentExample, setCurrentExample] = useState(0);

  const examplePitches = [
    { name: 'EcoTrack', tagline: 'Sustainability tracking for modern businesses', industry: 'Sustainability' },
    { name: 'HealthHub', tagline: 'AI-powered personal health companion', industry: 'Healthcare' },
    { name: 'CodeMentor', tagline: 'Learn programming through interactive mentorship', industry: 'Education' },
    { name: 'FinFlow', tagline: 'Smart financial management for startups', industry: 'Finance' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examplePitches.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI-Powered Generation',
      description: 'Create compelling startup pitches in seconds with advanced AI technology',
      color: '#4F46E5',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Targeted Content',
      description: 'Customize tone and industry to match your audience perfectly',
      color: '#8B5CF6',
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Landing Page Code',
      description: 'Get production-ready React code for your startup landing page',
      color: '#14B8A6',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Export & Share',
      description: 'Download PDFs and share your pitch with a single click',
      color: '#22C55E',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      features: ['5 pitches per month', 'Basic templates', 'PDF export'],
      color: '#4F46E5',
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      features: ['Unlimited pitches', 'All templates', 'Code generation', 'Priority support'],
      color: '#8B5CF6',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$49',
      period: '/month',
      features: ['Everything in Pro', 'Custom branding', 'Team collaboration', 'API access'],
      color: '#14B8A6',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-[#8B5CF6]/10 animate-pulse"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#4F46E5]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F46E5]/10 border border-[#4F46E5]/30 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#4F46E5]" />
              <span className="text-sm text-gray-300">AI-Powered Pitch Generator</span>
            </motion.div>

            {/* Rotating Examples */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6 h-16 flex items-center justify-center overflow-hidden"
            >
              <motion.div
                key={currentExample}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-xs text-gray-500 mb-1">Example: {examplePitches[currentExample].industry}</p>
                <h3 className="text-lg text-[#4F46E5]">{examplePitches[currentExample].name}</h3>
                <p className="text-xs text-gray-600">{examplePitches[currentExample].tagline}</p>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <span className="block bg-gradient-to-r from-[#4F46E5] via-[#8B5CF6] to-[#14B8A6] bg-clip-text text-transparent">
                Craft Perfect Pitches
              </span>
              <span className="block text-white mt-2">In Seconds, Not Hours</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 max-w-2xl mx-auto mb-10"
            >
              Transform your startup idea into a compelling pitch deck with AI. Get professional content,
              landing page code, and export-ready materials instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => onNavigate('register')}
                className="group px-8 py-4 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-lg hover:shadow-2xl hover:shadow-[#4F46E5]/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-all duration-300"
              >
                Watch Demo
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-white">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to create, customize, and share your startup pitch
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-gradient-to-br from-gray-900 to-gray-800/50 border border-gray-800 rounded-xl hover:border-opacity-50 transition-all duration-300"
                style={{ borderColor: `${feature.color}20` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${feature.color}80`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${feature.color}20`;
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-white">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the perfect plan for your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 bg-gradient-to-br from-gray-900 to-gray-800/50 border rounded-xl transition-all duration-300 ${
                  plan.popular
                    ? 'border-[#8B5CF6] shadow-xl shadow-[#8B5CF6]/20 scale-105'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-full text-sm">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="mb-2 text-white">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.period && <span className="text-gray-400 text-sm">{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: plan.color }}
                      />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onNavigate('register')}
                  className={`w-full py-3 rounded-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#4F46E5]/50'
                      : 'bg-gray-800 border border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="relative p-12 bg-gradient-to-br from-[#4F46E5]/10 to-[#8B5CF6]/10 border border-[#4F46E5]/30 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/5 to-[#8B5CF6]/5"></div>
            <div className="relative">
              <h2 className="mb-4 text-white">Ready to Craft Your Perfect Pitch?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of founders who have created compelling pitches with PitchCraft
              </p>
              <button
                onClick={() => onNavigate('register')}
                className="px-8 py-4 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-lg hover:shadow-2xl hover:shadow-[#4F46E5]/50 transition-all duration-300"
              >
                Start Creating Now
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
