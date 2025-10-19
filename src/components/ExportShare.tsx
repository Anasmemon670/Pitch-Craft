import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, Share2, Link2, Mail, Check, Copy, FileText, Code, Palette, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { getPitchById, type Pitch } from '../utils/storage';
import { exportPitchToPDF, exportLandingPageCodeToPDF } from '../utils/pdfExport';
import { generateShareableLink } from '../utils/storage';
import { toast } from 'sonner';

interface ExportShareProps {
  pitchId?: string;
  onNavigate: (page: string, pitchId?: string) => void;
}

export default function ExportShare({ pitchId, onNavigate }: ExportShareProps) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [pitchData, setPitchData] = useState<Pitch | null>(null);
  const [shareableLink, setShareableLink] = useState('');

  useEffect(() => {
    if (pitchId) {
      const pitch = getPitchById(pitchId);
      if (pitch) {
        setPitchData(pitch);
        setShareableLink(generateShareableLink(pitch.id));
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
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    setLinkCopied(true);
    toast.success('Link copied to clipboard');
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleExportPitch = () => {
    try {
      exportPitchToPDF(pitchData);
      toast.success('Pitch PDF downloaded successfully');
    } catch (error) {
      toast.error('Failed to export pitch');
    }
  };

  const handleExportCode = () => {
    const sampleCode = `// ${pitchData.name} Landing Page Component\nimport React from 'react';\n\nexport default function ${pitchData.name.replace(/\s+/g, '')}Landing() {\n  return (\n    <div>Landing Page for ${pitchData.name}</div>\n  );\n}`;
    
    try {
      exportLandingPageCodeToPDF(pitchData.name, sampleCode);
      toast.success('Code PDF downloaded successfully');
    } catch (error) {
      toast.error('Failed to export code');
    }
  };

  const handleDownloadAll = () => {
    try {
      exportPitchToPDF(pitchData);
      toast.success('Complete package downloaded');
    } catch (error) {
      toast.error('Failed to download package');
    }
  };

  const handleShare = (platform: string) => {
    const text = `Check out my startup pitch: ${pitchData.name} - ${pitchData.tagline}`;
    const url = shareableLink;
    
    const shareUrls: Record<string, string> = {
      Twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      Email: `mailto:?subject=${encodeURIComponent(pitchData.name)}&body=${encodeURIComponent(text + '\n\n' + url)}`,
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
      toast.success(`Sharing on ${platform}`);
    }
  };

  const exportOptions = [
    {
      title: 'Pitch Document',
      description: 'Download your complete pitch as PDF',
      icon: <FileText className="w-6 h-6" />,
      color: '#4F46E5',
      format: 'PDF',
      size: '2.4 MB',
      handler: handleExportPitch,
    },
    {
      title: 'Landing Page Code',
      description: 'Export React/HTML code for your landing page',
      icon: <Code className="w-6 h-6" />,
      color: '#8B5CF6',
      format: 'PDF',
      size: '1.8 MB',
      handler: handleExportCode,
    },
    {
      title: 'Brand Assets',
      description: 'Color palette and logo concepts',
      icon: <Palette className="w-6 h-6" />,
      color: '#14B8A6',
      format: 'PDF',
      size: '856 KB',
      handler: handleExportPitch,
    },
    {
      title: 'Complete Package',
      description: 'Everything in one bundle',
      icon: <Download className="w-6 h-6" />,
      color: '#22C55E',
      format: 'PDF',
      size: '5.2 MB',
      handler: handleDownloadAll,
    },
  ];

  const socialPlatforms = [
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, color: '#1DA1F2' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, color: '#0A66C2' },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, color: '#1877F2' },
    { name: 'Email', icon: <Mail className="w-5 h-5" />, color: '#EA4335' },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#4F46E5]/20 to-[#8B5CF6]/20 mb-4">
            <Share2 className="w-8 h-8 text-[#4F46E5]" />
          </div>
          <h1 className="mb-2 text-white">Export & Share</h1>
          <p className="text-gray-400">Download your pitch or share it with the world</p>
        </motion.div>

        {/* Export Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="mb-4 text-white">Export Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="group bg-gradient-to-br from-gray-900 to-gray-800/50 border-gray-800 hover:border-gray-700 transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div
                        className="p-3 rounded-lg mb-4 transition-all group-hover:scale-110"
                        style={{ backgroundColor: `${option.color}20`, color: option.color }}
                      >
                        {option.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{option.format}</div>
                        <div className="text-xs text-gray-400">{option.size}</div>
                      </div>
                    </div>
                    <CardTitle className="text-white">{option.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <button
                      onClick={option.handler}
                      className="w-full py-2.5 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all"
                      style={{
                        borderColor: `${option.color}40`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${option.color}80`;
                        e.currentTarget.style.backgroundColor = `${option.color}10`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${option.color}40`;
                        e.currentTarget.style.backgroundColor = '';
                      }}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Share Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Link2 className="w-6 h-6 text-[#4F46E5]" />
                Shareable Link
              </CardTitle>
              <CardDescription className="text-gray-400">
                Generate a public link to share your pitch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={shareableLink}
                    readOnly
                    className="flex-1 bg-gray-900/50 border-gray-700 text-white"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      linkCopied
                        ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30'
                        : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="hidden sm:inline">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">Link expires in:</span>
                  <select className="px-3 py-1.5 bg-gray-900/50 border border-gray-700 rounded-lg text-sm text-white focus:border-[#4F46E5] focus:ring-[#4F46E5]/20">
                    <option>7 days</option>
                    <option>30 days</option>
                    <option>Never</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="password-protect"
                    className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-[#4F46E5] focus:ring-[#4F46E5] focus:ring-offset-0"
                  />
                  <label htmlFor="password-protect" className="text-sm text-gray-400">
                    Password protect this link
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Sharing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="mb-4 text-white">Share on Social Media</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialPlatforms.map((platform, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare(platform.name)}
                className="p-4 bg-gradient-to-br from-gray-900 to-gray-800/50 border border-gray-800 rounded-xl hover:border-gray-700 transition-all group"
              >
                <div
                  className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ backgroundColor: `${platform.color}20`, color: platform.color }}
                >
                  {platform.icon}
                </div>
                <p className="text-sm text-gray-300">{platform.name}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Sharing Statistics</CardTitle>
              <CardDescription className="text-gray-400">
                Track how your pitch is performing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-white mb-1">247</div>
                  <p className="text-sm text-gray-400">Views</p>
                </div>
                <div className="text-center">
                  <div className="text-white mb-1">18</div>
                  <p className="text-sm text-gray-400">Shares</p>
                </div>
                <div className="text-center">
                  <div className="text-white mb-1">12</div>
                  <p className="text-sm text-gray-400">Downloads</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-8 text-center"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-[#4F46E5]/10 to-[#8B5CF6]/10 border border-[#4F46E5]/30 rounded-2xl">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-2xl bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] bg-clip-text text-transparent mb-2">
              PitchCraft
            </h2>
            <p className="text-gray-400">Empowering Every Idea</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => onNavigate('generated-pitch', pitchData.id)}
            className="flex-1 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
          >
            Back to Pitch
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex-1 py-3 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-lg hover:shadow-lg hover:shadow-[#4F46E5]/50 transition-all duration-300"
          >
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    </div>
  );
}
