import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Edit2, Check, X, Download, Share2, Code, Palette, ChevronRight, Save, RefreshCw, Sparkles } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getPitchById, updatePitch, savePitch, type Pitch } from '../utils/storage';
import { exportPitchToPDF } from '../utils/pdfExport';
import { generatePitch } from '../utils/pitchGenerator';
import { toast } from 'sonner';
import TypingText from './TypingText';

interface GeneratedPitchProps {
  pitchId?: string;
  onNavigate: (page: string, pitchId?: string) => void;
}

export default function GeneratedPitch({ pitchId, onNavigate }: GeneratedPitchProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [pitchData, setPitchData] = useState<Pitch | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (pitchId) {
      const pitch = getPitchById(pitchId);
      if (pitch) {
        setPitchData(pitch);
        // Check if this is a new pitch (created within last 5 seconds)
        const createdAt = new Date(pitch.createdAt).getTime();
        const now = Date.now();
        if (now - createdAt < 5000) {
          setShowTyping(true);
        }
      } else {
        toast.error('Pitch not found');
        onNavigate('dashboard');
      }
    }
  }, [pitchId, onNavigate]);

  if (!pitchData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#4F46E5] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading pitch...</p>
        </div>
      </div>
    );
  }

  const handleEdit = (field: string) => {
    setEditingField(field);
    setTempValue(pitchData[field as keyof Pitch] as string);
  };

  const handleSave = (field: string) => {
    if (pitchData) {
      try {
        updatePitch(pitchData.id, { [field]: tempValue });
        setPitchData({ ...pitchData, [field]: tempValue });
        setEditingField(null);
        toast.success('Changes saved');
      } catch (error) {
        toast.error('Failed to save changes');
      }
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleExportPDF = () => {
    try {
      exportPitchToPDF(pitchData);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      toast.error('Failed to export PDF');
    }
  };

  const handleSavePitch = () => {
    try {
      updatePitch(pitchData.id, pitchData);
      toast.success('Pitch saved successfully');
    } catch (error) {
      toast.error('Failed to save pitch');
    }
  };

  const handleRegenerate = () => {
    if (!pitchData) return;
    
    setIsRegenerating(true);
    
    setTimeout(() => {
      try {
        // Create a mock input from existing pitch data
        const newPitch = generatePitch({
          idea: pitchData.elevator,
          industry: pitchData.industry,
          tone: pitchData.tone as 'formal' | 'fun',
        });
        
        // Keep the same ID but update content
        const updatedPitch = { ...newPitch, id: pitchData.id };
        savePitch(updatedPitch);
        setPitchData(updatedPitch);
        setShowTyping(true);
        setIsRegenerating(false);
        toast.success('Pitch regenerated successfully!');
      } catch (error) {
        setIsRegenerating(false);
        toast.error('Failed to regenerate pitch');
      }
    }, 2000);
  };

  const sections = [
    {
      key: 'name',
      title: 'Startup Name',
      icon: '🚀',
      color: '#4F46E5',
      isInput: true,
    },
    {
      key: 'tagline',
      title: 'Tagline',
      icon: '✨',
      color: '#8B5CF6',
      isInput: true,
    },
    {
      key: 'elevator',
      title: 'Elevator Pitch',
      icon: '🎯',
      color: '#14B8A6',
      isInput: false,
    },
    {
      key: 'problem',
      title: 'Problem Statement',
      icon: '⚠️',
      color: '#F59E0B',
      isInput: false,
    },
    {
      key: 'solution',
      title: 'Solution',
      icon: '💡',
      color: '#22C55E',
      isInput: false,
    },
    {
      key: 'target',
      title: 'Target Audience',
      icon: '👥',
      color: '#EC4899',
      isInput: false,
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="mb-2 text-white">Your Generated Pitch</h1>
              <p className="text-gray-400">Review and edit your AI-generated content</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Regenerate</span>
              </button>
              <button
                onClick={handleSavePitch}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save</span>
              </button>
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export PDF</span>
              </button>
              <button
                onClick={() => onNavigate('export', pitchData.id)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-lg hover:shadow-lg hover:shadow-[#4F46E5]/50 transition-all duration-300"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>

          {/* Logo Display */}
          {pitchData.logo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="w-32 h-32 bg-white rounded-2xl p-4 shadow-lg shadow-[#4F46E5]/20">
                <div dangerouslySetInnerHTML={{ __html: pitchData.logo }} className="w-full h-full" />
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('landing-generator', pitchData.id)}
              className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5]/10 border border-[#4F46E5]/30 rounded-lg hover:bg-[#4F46E5]/20 transition-all text-sm text-gray-300"
            >
              <Code className="w-4 h-4 text-[#4F46E5]" />
              Generate Landing Page
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('brand-kit', pitchData.id)}
              className="flex items-center gap-2 px-4 py-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-lg hover:bg-[#8B5CF6]/20 transition-all text-sm text-gray-300"
            >
              <Palette className="w-4 h-4 text-[#8B5CF6]" />
              View Brand Kit
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Pitch Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800/50 border-gray-800 hover:border-gray-700 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-white">
                      <span className="text-2xl">{section.icon}</span>
                      {section.title}
                    </CardTitle>
                    {editingField === section.key ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(section.key)}
                          className="p-2 bg-[#22C55E]/20 text-[#22C55E] rounded-lg hover:bg-[#22C55E]/30 transition-all"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(section.key)}
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-gray-400 hover:text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {editingField === section.key ? (
                    section.isInput ? (
                      <Input
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="bg-gray-900/50 border-gray-700 focus:border-[#4F46E5] focus:ring-[#4F46E5]/20 text-white"
                        autoFocus
                      />
                    ) : (
                      <Textarea
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="min-h-[120px] bg-gray-900/50 border-gray-700 focus:border-[#4F46E5] focus:ring-[#4F46E5]/20 text-white resize-none"
                        autoFocus
                      />
                    )
                  ) : showTyping && section.key === 'name' ? (
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      <TypingText 
                        text={pitchData[section.key as keyof Pitch] as string} 
                        speed={50}
                        onComplete={() => setShowTyping(false)}
                      />
                    </p>
                  ) : (
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {pitchData[section.key as keyof Pitch]}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Color Palette & Logo Concepts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Palette className="w-6 h-6 text-[#8B5CF6]" />
                Suggested Brand Identity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Color Palette */}
                <div>
                  <h4 className="mb-4 text-gray-300">Color Palette</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Primary', color: pitchData.colors.primary, hex: pitchData.colors.primary },
                      { name: 'Secondary', color: pitchData.colors.secondary, hex: pitchData.colors.secondary },
                      { name: 'Accent', color: pitchData.colors.accent, hex: pitchData.colors.accent },
                      { name: 'Background', color: pitchData.colors.background, hex: pitchData.colors.background },
                      { name: 'Text', color: pitchData.colors.text, hex: pitchData.colors.text },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-gray-700 shadow-lg"
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <p className="text-sm text-white">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logo Concepts */}
                <div>
                  <h4 className="mb-4 text-gray-300">Logo Concepts</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg flex items-center justify-center hover:border-[#2E7D32] transition-all cursor-pointer group"
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                            {i === 1 ? '🌱' : i === 2 ? '♻️' : i === 3 ? '🌍' : '🍃'}
                          </div>
                          <p className="text-xs text-gray-500">Concept {i}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex-1 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => onNavigate('create')}
            className="flex-1 py-3 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-lg hover:shadow-lg hover:shadow-[#4F46E5]/50 transition-all duration-300"
          >
            Create Another Pitch
          </button>
        </motion.div>
      </div>
    </div>
  );
}
