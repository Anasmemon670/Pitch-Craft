import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Palette, Download, Copy, Check, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { getPitchById, type Pitch } from '../utils/storage';
import { generateLogoVariations } from '../utils/logoGenerator';
import { toast } from 'sonner';

interface BrandKitProps {
  pitchId?: string;
  onNavigate: (page: string, pitchId?: string) => void;
}

export default function BrandKit({ pitchId, onNavigate }: BrandKitProps) {
  const [pitchData, setPitchData] = useState<Pitch | null>(null);
  const [logoVariations, setLogoVariations] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  useEffect(() => {
    if (pitchId) {
      const pitch = getPitchById(pitchId);
      if (pitch) {
        setPitchData(pitch);
        const variations = generateLogoVariations({
          name: pitch.name,
          industry: pitch.industry,
          colors: {
            primary: pitch.colors.primary,
            secondary: pitch.colors.secondary,
            accent: pitch.colors.accent,
          },
        });
        setLogoVariations(variations);
      } else {
        toast.error('Pitch not found');
        onNavigate('dashboard');
      }
    }
  }, [pitchId, onNavigate]);

  const handleCopyColor = (color: string, name: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    toast.success(`${name} color copied: ${color}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleDownloadLogo = (svg: string, index: number) => {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pitchData?.name}-logo-${index + 1}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Logo downloaded');
  };

  if (!pitchData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#4F46E5] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading brand kit...</p>
        </div>
      </div>
    );
  }

  const colorPalette = [
    { name: 'Primary', hex: pitchData.colors.primary, description: 'Main brand color' },
    { name: 'Secondary', hex: pitchData.colors.secondary, description: 'Supporting color' },
    { name: 'Accent', hex: pitchData.colors.accent, description: 'Highlight color' },
    { name: 'Background', hex: pitchData.colors.background, description: 'Background color' },
    { name: 'Text', hex: pitchData.colors.text, description: 'Text color' },
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/40 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-2 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] bg-clip-text text-transparent">
                Brand Kit
              </h1>
              <p className="text-gray-400">{pitchData.name} - Complete Brand Assets</p>
            </div>
            <button
              onClick={() => onNavigate('generated-pitch', pitchData.id)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
            >
              Back to Pitch
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Logo Variations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-[#4F46E5]" />
            <h2 className="text-2xl">Logo Variations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logoVariations.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800/50 border-gray-800 hover:border-gray-700 transition-all group">
                  <CardHeader>
                    <CardTitle className="text-lg">Version {index + 1}</CardTitle>
                    <CardDescription>
                      {['Geometric', 'Lettermark', 'Abstract', 'Tech', 'Minimal'][index]} Style
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-white rounded-lg p-6 mb-4 flex items-center justify-center">
                      <div
                        dangerouslySetInnerHTML={{ __html: logo }}
                        className="w-full h-full"
                      />
                    </div>
                    <button
                      onClick={() => handleDownloadLogo(logo, index)}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-lg hover:shadow-lg hover:shadow-[#4F46E5]/50 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download SVG
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Color Palette */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-[#8B5CF6]" />
            <h2 className="text-2xl">Color Palette</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {colorPalette.map((color, index) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800/50 border-gray-800 hover:border-gray-700 transition-all overflow-hidden">
                  <div
                    className="h-32 w-full transition-all"
                    style={{ backgroundColor: color.hex }}
                  />
                  <CardContent className="pt-4">
                    <h3 className="text-white mb-1">{color.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{color.description}</p>
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm text-gray-300 bg-gray-800/50 px-2 py-1 rounded">
                        {color.hex}
                      </code>
                      <button
                        onClick={() => handleCopyColor(color.hex, color.name)}
                        className="p-2 hover:bg-gray-700 rounded transition-all"
                      >
                        {copiedColor === color.hex ? (
                          <Check className="w-4 h-4 text-[#22C55E]" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      RGB: {parseInt(color.hex.slice(1, 3), 16)}, {parseInt(color.hex.slice(3, 5), 16)}, {parseInt(color.hex.slice(5, 7), 16)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Typography Guidelines */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl mb-6">Typography</h2>
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800/50 border-gray-800">
            <CardContent className="p-8 space-y-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Brand Name</p>
                <h1 className="text-5xl" style={{ color: pitchData.colors.primary }}>
                  {pitchData.name}
                </h1>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Tagline</p>
                <p className="text-2xl text-gray-300">{pitchData.tagline}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Recommended Fonts</p>
                <div className="flex flex-wrap gap-3">
                  {['Poppins', 'Montserrat', 'Inter', 'Plus Jakarta Sans'].map((font) => (
                    <span
                      key={font}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm"
                    >
                      {font}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Usage Guidelines */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl mb-6">Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Do's</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-300">
                <p>✓ Use logo on light backgrounds</p>
                <p>✓ Maintain minimum spacing</p>
                <p>✓ Keep colors consistent</p>
                <p>✓ Use approved fonts</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Don'ts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-300">
                <p>✗ Don't distort logo</p>
                <p>✗ Don't change colors</p>
                <p>✗ Don't add effects</p>
                <p>✗ Don't rotate logo</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-300">
                <p>→ Use high-res logos</p>
                <p>→ Consistent spacing</p>
                <p>→ Clear visibility</p>
                <p>→ Professional tone</p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 pt-6"
        >
          <button
            onClick={() => onNavigate('generated-pitch', pitchData.id)}
            className="flex-1 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
          >
            Back to Pitch
          </button>
          <button
            onClick={() => onNavigate('export', pitchData.id)}
            className="flex-1 py-3 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-lg hover:shadow-lg hover:shadow-[#4F46E5]/50 transition-all"
          >
            Export Everything
          </button>
        </motion.div>
      </div>
    </div>
  );
}
