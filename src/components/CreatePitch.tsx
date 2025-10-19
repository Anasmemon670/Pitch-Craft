import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Lightbulb, Briefcase, Smile, FileText, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { generatePitch } from '../utils/pitchGenerator';
import { savePitch } from '../utils/storage';
import { toast } from 'sonner';

interface CreatePitchProps {
  onNavigate: (page: string, pitchId?: string) => void;
}

export default function CreatePitch({ onNavigate }: CreatePitchProps) {
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    idea: '',
    industry: '',
    tone: '' as 'formal' | 'fun' | '',
  });

  const industries = [
    'Technology',
    'Healthcare',
    'Education',
    'Finance',
    'E-commerce',
    'Food & Beverage',
    'Sustainability',
    'Entertainment',
    'Travel',
    'Real Estate',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.idea || !formData.industry || !formData.tone) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setGenerating(true);
    
    // Simulate AI generation delay for better UX
    setTimeout(() => {
      try {
        const pitch = generatePitch({
          idea: formData.idea,
          industry: formData.industry,
          tone: formData.tone,
        });
        
        savePitch(pitch);
        toast.success(`"${pitch.name}" created successfully!`);
        setGenerating(false);
        onNavigate('generated-pitch', pitch.id);
      } catch (error) {
        toast.error('Failed to generate pitch');
        setGenerating(false);
      }
    }, 2500);
  };

  const handleChange = (field: string, value: string | 'formal' | 'fun') => {
    setFormData((prev) => ({ ...prev, [field]: value as any }));
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#4F46E5]/20 to-[#8B5CF6]/20 mb-4">
            <Sparkles className="w-8 h-8 text-[#4F46E5]" />
          </div>
          <h1 className="mb-2 text-white">Create Your Pitch</h1>
          <p className="text-gray-400">Tell us about your startup idea and let AI do the magic</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800/50 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Startup Idea */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="idea" className="flex items-center gap-2 text-gray-300 mb-3">
                <Lightbulb className="w-5 h-5 text-[#4F46E5]" />
                Startup Idea
              </Label>
              <Textarea
                id="idea"
                placeholder="Describe your startup idea in a few sentences. What problem does it solve? Who is it for?"
                value={formData.idea}
                onChange={(e) => handleChange('idea', e.target.value)}
                className="min-h-[120px] bg-gray-900/50 border-gray-700 focus:border-[#4F46E5] focus:ring-[#4F46E5]/20 text-white placeholder:text-gray-500 resize-none"
                required
              />
              <p className="mt-2 text-xs text-gray-500">
                Be as detailed as possible for better results
              </p>
            </motion.div>

            {/* Industry */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="industry" className="flex items-center gap-2 text-gray-300 mb-3">
                <Briefcase className="w-5 h-5 text-[#8B5CF6]" />
                Industry
              </Label>
              <Select value={formData.industry} onValueChange={(value) => handleChange('industry', value)}>
                <SelectTrigger className="bg-gray-900/50 border-gray-700 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20 text-white">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {industries.map((industry) => (
                    <SelectItem
                      key={industry}
                      value={industry.toLowerCase()}
                      className="text-white hover:bg-gray-800 focus:bg-gray-800"
                    >
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Tone Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Label className="flex items-center gap-2 text-gray-300 mb-3">
                <Smile className="w-5 h-5 text-[#14B8A6]" />
                Pitch Tone
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleChange('tone', 'formal')}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    formData.tone === 'formal'
                      ? 'border-[#4F46E5] bg-[#4F46E5]/10'
                      : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        formData.tone === 'formal' ? 'bg-[#4F46E5]/20' : 'bg-gray-800'
                      }`}
                    >
                      <FileText className={`w-5 h-5 ${formData.tone === 'formal' ? 'text-[#4F46E5]' : 'text-gray-400'}`} />
                    </div>
                    <div className="text-left">
                      <p className={`${formData.tone === 'formal' ? 'text-white' : 'text-gray-300'}`}>
                        Formal
                      </p>
                      <p className="text-xs text-gray-500">Professional & corporate</p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleChange('tone', 'fun')}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    formData.tone === 'fun'
                      ? 'border-[#8B5CF6] bg-[#8B5CF6]/10'
                      : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        formData.tone === 'fun' ? 'bg-[#8B5CF6]/20' : 'bg-gray-800'
                      }`}
                    >
                      <Smile className={`w-5 h-5 ${formData.tone === 'fun' ? 'text-[#8B5CF6]' : 'text-gray-400'}`} />
                    </div>
                    <div className="text-left">
                      <p className={`${formData.tone === 'fun' ? 'text-white' : 'text-gray-300'}`}>
                        Fun
                      </p>
                      <p className="text-xs text-gray-500">Casual & engaging</p>
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <button
                type="submit"
                disabled={!formData.idea || !formData.industry || !formData.tone || generating}
                className="w-full py-4 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-lg hover:shadow-lg hover:shadow-[#4F46E5]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Your Pitch...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Pitch
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>

        {/* Loading/Generating State Overlay */}
        {generating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md mx-4 text-center"
            >
              <div className="relative w-20 h-20 mx-auto mb-6">
                <motion.div
                  className="absolute inset-0 border-4 border-[#4F46E5]/30 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <motion.div
                  className="absolute inset-0 border-4 border-t-[#4F46E5] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
                <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-[#4F46E5] animate-pulse" />
              </div>
              <h3 className="text-white mb-2">AI is Crafting Your Brand...</h3>
              <p className="text-gray-400 text-sm mb-4">Creating unique logo, pitch, and brand identity</p>
              <div className="flex justify-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-[#4F46E5] rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-[#8B5CF6] rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-[#14B8A6] rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* AI Landing Page Feature Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 p-6 bg-gradient-to-br from-[#EC4899]/10 to-[#F59E0B]/10 border border-[#EC4899]/30 rounded-xl"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#EC4899] to-[#F59E0B] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="mb-2 text-white flex items-center gap-2">
                AI-Powered Landing Page Generator
                <span className="px-2 py-0.5 bg-[#EC4899]/20 border border-[#EC4899]/40 rounded-full text-xs">NEW</span>
              </h3>
              <p className="text-sm text-gray-300 mb-3">
                Every pitch includes a <span className="text-[#EC4899]">completely unique</span> AI-generated landing page with dynamic layouts, colors, and animations tailored to your industry
              </p>
              <ul className="space-y-1.5 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899]"></span>
                  <span>5+ different layout variations per generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                  <span>Industry-specific color palettes & typography</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></span>
                  <span>Export as React code, PDF, or shareable link</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-6 bg-gradient-to-br from-[#4F46E5]/5 to-[#8B5CF6]/5 border border-[#4F46E5]/20 rounded-xl"
        >
          <h3 className="mb-3 text-white">Tips for a Great Pitch</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-[#4F46E5] mt-0.5">•</span>
              <span>Be specific about the problem your startup solves</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8B5CF6] mt-0.5">•</span>
              <span>Mention your target audience or market</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#14B8A6] mt-0.5">•</span>
              <span>Include what makes your solution unique</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22C55E] mt-0.5">•</span>
              <span>The more detail you provide, the better the AI-generated content</span>
            </li>
          </ul>
        </motion.div>

        {/* Loading Animation */}
        {generating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] mb-4"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              <p className="text-white mb-2">Crafting your perfect pitch...</p>
              <p className="text-gray-400 text-sm">This will only take a moment</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
