import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Code, Eye, Copy, Check, Download, Smartphone, Monitor, Share2, RefreshCw, ArrowRight, Star, Zap, Shield, Users } from 'lucide-react';
import { getPitchById, type Pitch } from '../utils/storage';
import { generateUniqueLandingPageCode } from '../utils/dynamicLandingPageGenerator';
import { generateLayoutVariation, type LayoutVariation } from '../utils/layoutVariations';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

interface LandingPageGeneratorProps {
  pitchId?: string;
  onNavigate: (page: string, pitchId?: string) => void;
}

export default function LandingPageGenerator({ pitchId, onNavigate }: LandingPageGeneratorProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [pitchData, setPitchData] = useState<Pitch | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [currentLayout, setCurrentLayout] = useState<LayoutVariation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate new layout
  const generateNewLayout = (pitch: Pitch) => {
    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    setTimeout(() => {
      const newLayout = generateLayoutVariation(pitch);
      setCurrentLayout(newLayout);
      const code = generateUniqueLandingPageCode(pitch, newLayout);
      setGeneratedCode(code);
      setIsGenerating(false);
      toast.success('New landing page generated!');
    }, 800);
  };

  useEffect(() => {
    if (pitchId) {
      const pitch = getPitchById(pitchId);
      if (pitch) {
        setPitchData(pitch);
        generateNewLayout(pitch);
      } else {
        toast.error('Pitch not found');
        onNavigate('dashboard');
      }
    }
  }, [pitchId, onNavigate]);

  if (!pitchData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b]">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="w-12 h-12 border-4 border-[#4F46E5] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">Loading pitch data...</p>
        </div>
      </div>
    );
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pitchData.name.replace(/\s+/g, '-').toLowerCase()}-landing-${Date.now()}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code downloaded successfully!');
  };

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const maxWidth = pageWidth - 2 * margin;

      // Title
      doc.setFontSize(18);
      doc.text(`${pitchData.name} - Landing Page Code`, margin, margin);
      
      // Layout info
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, margin, margin + 8);
      if (currentLayout) {
        doc.text(`Layout: ${currentLayout.heroStyle} | ${currentLayout.featureLayout}`, margin, margin + 14);
      }

      // Code
      doc.setFontSize(7);
      const lines = doc.splitTextToSize(generatedCode, maxWidth);
      doc.text(lines, margin, margin + 22);

      doc.save(`${pitchData.name.replace(/\s+/g, '-').toLowerCase()}-landing-${Date.now()}.pdf`);
      toast.success('PDF exported successfully!');
    } catch (error) {
      toast.error('Failed to export PDF');
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/#/pitch/${pitchData.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Share link copied to clipboard!');
  };

  const handleRegenerate = () => {
    if (pitchData) {
      generateNewLayout(pitchData);
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b]">
        <div className="text-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 1, ease: 'linear' },
              scale: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' }
            }}
            className="w-16 h-16 border-4 border-[#4F46E5] border-t-transparent rounded-full mx-auto mb-6"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <p className="text-xl text-white">Generating unique landing page...</p>
            <p className="text-gray-500 text-sm">Creating layout variations, colors, and animations</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-gray-800 bg-black/90 backdrop-blur-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl mb-1 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] bg-clip-text text-transparent">
                AI Landing Page Generator
              </h1>
              <p className="text-gray-400 text-sm">
                {pitchData.name} • Every generation is unique
                {currentLayout && (
                  <span className="ml-2 text-[#14B8A6]">
                    ({currentLayout.heroStyle} layout • {currentLayout.typography.heading} font)
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRegenerate}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-lg hover:shadow-lg hover:shadow-[#8B5CF6]/50 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">Regenerate</span>
              </button>
              <button
                onClick={() => onNavigate('generated-pitch', pitchData.id)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
              >
                Back to Pitch
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
              <span className="text-sm">{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handleDownloadCode}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Download Code</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Export PDF</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-lg hover:shadow-lg hover:shadow-[#4F46E5]/50 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share Link</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Split Screen */}
      <div className="grid lg:grid-cols-2 h-[calc(100vh-160px)]">
        {/* Left Side - Live Preview */}
        <div className="border-r border-gray-800 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#4F46E5]" />
              <span>Live Preview</span>
              {currentLayout && (
                <span className="ml-3 px-3 py-1 bg-[#4F46E5]/10 border border-[#4F46E5]/30 rounded-full text-xs">
                  {currentLayout.animationStyle.type} animation • {currentLayout.featureLayout}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'desktop'
                    ? 'bg-[#4F46E5] text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'mobile'
                    ? 'bg-[#4F46E5] text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-gray-900 p-6 flex items-start justify-center">
            <motion.div
              key={currentLayout?.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`bg-[#0b0b0b] rounded-lg shadow-2xl overflow-hidden border border-gray-800 ${
                viewMode === 'mobile' ? 'w-[375px]' : 'w-full max-w-6xl'
              }`}
              style={{ minHeight: viewMode === 'mobile' ? '667px' : 'auto' }}
            >
              {/* Live Preview Content */}
              {currentLayout && <LivePreview pitch={pitchData} layout={currentLayout} />}
            </motion.div>
          </div>
        </div>

        {/* Right Side - Code Editor */}
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-[#8B5CF6]" />
              <span>React Code</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{generatedCode.split('\n').length} lines</span>
              {currentLayout && (
                <span className="px-3 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full text-xs">
                  {currentLayout.typography.heading} + {currentLayout.typography.body}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-[#1e1e1e] p-6">
            <pre className="text-sm leading-relaxed">
              <code className="text-gray-300 font-mono">{generatedCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// Live Preview Component with Dynamic Layout
function LivePreview({ pitch, layout }: { pitch: Pitch; layout: LayoutVariation }) {
  const { colorPalette } = layout;

  return (
    <div 
      className="min-h-full overflow-auto" 
      style={{ 
        backgroundColor: colorPalette.background,
        color: colorPalette.text,
        fontFamily: `${layout.typography.body}, sans-serif`
      }}
    >
      {/* Navigation */}
      <nav 
        className="backdrop-blur-lg border-b" 
        style={{ 
          backgroundColor: `${colorPalette.background}cc`,
          borderColor: `${colorPalette.primary}30`
        }}
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {pitch.logo && (
              <div className="w-10 h-10 bg-white rounded-lg p-1.5">
                <div dangerouslySetInnerHTML={{ __html: pitch.logo }} className="w-full h-full" />
              </div>
            )}
            <span className="text-lg" style={{ fontFamily: `${layout.typography.heading}, sans-serif` }}>
              {pitch.name}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm hover:opacity-80 transition" style={{ color: colorPalette.textSecondary }}>
              Features
            </button>
            <button className="text-sm hover:opacity-80 transition" style={{ color: colorPalette.textSecondary }}>
              Pricing
            </button>
            <button
              className="px-4 py-2 text-sm rounded-lg"
              style={{
                background: `linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary})`,
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Dynamic based on layout */}
      <section className="px-6 py-20 relative overflow-hidden">
        {layout.heroStyle !== 'minimal' && (
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: colorPalette.primary }}
            />
            <div
              className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: colorPalette.secondary, animationDelay: '1s' }}
            />
          </div>
        )}

        <div className={`relative max-w-7xl mx-auto ${layout.heroStyle === 'centered' ? 'text-center' : ''}`}>
          {layout.heroStyle === 'split' ? (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div 
                  className="inline-block px-4 py-2 rounded-full mb-6 text-sm"
                  style={{
                    backgroundColor: `${colorPalette.primary}10`,
                    color: colorPalette.primary,
                    border: `1px solid ${colorPalette.primary}40`
                  }}
                >
                  {pitch.industry}
                </div>
                <h1 
                  className="text-5xl md:text-6xl mb-6" 
                  style={{ fontFamily: `${layout.typography.display}, sans-serif` }}
                >
                  {pitch.tagline}
                </h1>
                <p className="text-lg mb-8" style={{ color: colorPalette.textSecondary }}>
                  {pitch.elevator}
                </p>
                <div className="flex gap-4">
                  <button
                    className="px-8 py-3 rounded-lg"
                    style={{
                      background: `linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary})`,
                    }}
                  >
                    Get Started
                  </button>
                  <button 
                    className="px-8 py-3 border rounded-lg" 
                    style={{ borderColor: `${colorPalette.primary}40` }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
              <div
                className="aspect-square rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, ${colorPalette.primary}20, ${colorPalette.secondary}20)`,
                  border: `1px solid ${colorPalette.primary}30`,
                }}
              />
            </div>
          ) : (
            <div className={layout.heroStyle === 'centered' ? 'max-w-4xl mx-auto' : 'max-w-5xl'}>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border"
                style={{
                  backgroundColor: `${colorPalette.primary}10`,
                  borderColor: `${colorPalette.primary}40`,
                }}
              >
                <Star className="w-4 h-4" style={{ color: colorPalette.primary }} />
                <span className="text-sm">{pitch.industry}</span>
              </div>

              <h1
                className={`mb-6 ${layout.heroStyle === 'bold' ? 'text-6xl md:text-8xl' : layout.heroStyle === 'minimal' ? 'text-7xl md:text-8xl' : 'text-5xl md:text-7xl'}`}
                style={{
                  fontFamily: `${layout.typography.display}, sans-serif`,
                  background: `linear-gradient(to right, ${colorPalette.text}, ${colorPalette.textSecondary})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {pitch.tagline}
              </h1>

              <p 
                className={`mb-8 ${layout.heroStyle === 'minimal' ? 'text-2xl' : 'text-xl'} ${layout.heroStyle === 'centered' ? 'max-w-3xl mx-auto' : 'max-w-2xl'}`}
                style={{ color: colorPalette.textSecondary }}
              >
                {pitch.elevator}
              </p>

              <div className={`flex gap-4 ${layout.heroStyle === 'centered' ? 'justify-center' : ''}`}>
                <button
                  className="px-8 py-4 rounded-lg flex items-center gap-2"
                  style={{
                    background: `linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary})`,
                  }}
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  className="px-8 py-4 border rounded-lg"
                  style={{ borderColor: `${colorPalette.primary}40` }}
                >
                  Watch Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section - Dynamic Layout */}
      <section className="px-6 py-20" style={{ backgroundColor: colorPalette.surface }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: `${layout.typography.heading}, sans-serif` }}>
              Powerful Features
            </h2>
            <p className="text-xl" style={{ color: colorPalette.textSecondary }}>
              Everything you need to succeed
            </p>
          </div>

          <div className={`grid gap-8 ${
            layout.featureLayout === 'grid-3' ? 'md:grid-cols-3' :
            layout.featureLayout === 'grid-4' ? 'md:grid-cols-4' :
            layout.featureLayout === 'horizontal' ? 'md:grid-cols-6' :
            layout.featureLayout === 'stacked' ? 'md:grid-cols-1 max-w-2xl mx-auto' :
            'md:grid-cols-3'
          }`}>
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for peak performance' },
              { icon: Shield, title: 'Secure & Safe', desc: 'Enterprise-grade security' },
              { icon: Users, title: 'Team Ready', desc: 'Collaborate seamlessly' },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${colorPalette.primary}10, ${colorPalette.secondary}10)`,
                  border: `1px solid ${colorPalette.primary}20`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.secondary})`,
                  }}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-sm" style={{ color: colorPalette.textSecondary }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dynamic Style */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div
            className={`p-12 rounded-3xl border text-center ${layout.ctaStyle === 'full-width' ? 'bg-gradient-to-r' : ''}`}
            style={
              layout.ctaStyle === 'full-width'
                ? {
                    background: `linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary})`,
                  }
                : {
                    background: `linear-gradient(135deg, ${colorPalette.primary}20, ${colorPalette.secondary}20)`,
                    borderColor: `${colorPalette.primary}40`,
                  }
            }
          >
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: `${layout.typography.heading}, sans-serif` }}>
              Ready to get started?
            </h2>
            <p className="text-xl mb-8" style={{ color: layout.ctaStyle === 'full-width' ? 'rgba(255,255,255,0.9)' : colorPalette.textSecondary }}>
              Join thousands already using {pitch.name}
            </p>
            <button
              className="px-10 py-4 rounded-lg text-lg flex items-center justify-center gap-2 mx-auto"
              style={{
                background: layout.ctaStyle === 'full-width' ? colorPalette.background : `linear-gradient(to right, ${colorPalette.primary}, ${colorPalette.secondary})`,
                color: layout.ctaStyle === 'full-width' ? colorPalette.primary : colorPalette.text,
              }}
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t" style={{ borderColor: `${colorPalette.primary}20` }}>
        <div className="max-w-7xl mx-auto text-center text-sm" style={{ color: colorPalette.textSecondary }}>
          © 2025 {pitch.name}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
