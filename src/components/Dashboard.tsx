import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Sparkles, Calendar, TrendingUp, MoreVertical, Edit, Trash2, Eye, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { getAllPitches, deletePitch } from '../utils/storage';
import { exportPitchToPDF } from '../utils/pdfExport';
import { toast } from 'sonner';

interface DashboardProps {
  onNavigate: (page: string, pitchId?: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [pitches, setPitches] = useState(getAllPitches());
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setPitches(getAllPitches());
  }, []);

  const handleDelete = (id: string, name: string) => {
    setDeletingId(id);
    setTimeout(() => {
      try {
        deletePitch(id);
        setPitches(getAllPitches());
        toast.success(`"${name}" deleted successfully`);
      } catch (error) {
        toast.error('Failed to delete pitch');
      } finally {
        setDeletingId(null);
      }
    }, 300);
  };

  const handleExport = (pitch: any) => {
    try {
      exportPitchToPDF(pitch);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      toast.error('Failed to export PDF');
    }
  };

  const getColorFromIndustry = (industry: string): string => {
    const colorMap: Record<string, string> = {
      sustainability: '#2E7D32',
      healthcare: '#0EA5E9',
      education: '#F59E0B',
      technology: '#4F46E5',
      finance: '#059669',
      'e-commerce': '#8B5CF6',
      'food & beverage': '#EF4444',
      entertainment: '#EC4899',
      travel: '#14B8A6',
      'real estate': '#7C3AED',
    };
    return colorMap[industry.toLowerCase()] || '#4F46E5';
  };

  const thisMonthCount = pitches.filter(p => {
    const pitchDate = new Date(p.createdAt);
    const now = new Date();
    return pitchDate.getMonth() === now.getMonth() && pitchDate.getFullYear() === now.getFullYear();
  }).length;

  const stats = [
    { label: 'Total Pitches', value: pitches.length.toString(), icon: <Sparkles className="w-5 h-5" />, color: '#4F46E5' },
    { label: 'This Month', value: thisMonthCount.toString(), icon: <Calendar className="w-5 h-5" />, color: '#8B5CF6' },
    { label: 'Industries', value: new Set(pitches.map(p => p.industry)).size.toString(), icon: <TrendingUp className="w-5 h-5" />, color: '#14B8A6' },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="mb-2 text-white">My Pitches</h1>
              <p className="text-gray-400">Manage and create your startup pitches</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('create')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-lg hover:shadow-lg hover:shadow-[#4F46E5]/50 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Pitch</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800/50 border-gray-800 hover:border-gray-700 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                      <p className="text-white">{stat.value}</p>
                    </div>
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                    >
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pitches Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="mb-4 text-white">Recent Pitches</h2>
        </motion.div>

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pitches.map((pitch, index) => (
              <motion.div
                key={pitch.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Card className="group bg-gradient-to-br from-gray-900 to-gray-800/50 border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden">
                  <div
                    className="h-2 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${getColorFromIndustry(pitch.industry)}, ${getColorFromIndustry(pitch.industry)}80)`,
                    }}
                  />
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      {pitch.logo && (
                        <div className="w-16 h-16 bg-white rounded-lg p-2 flex-shrink-0">
                          <div dangerouslySetInnerHTML={{ __html: pitch.logo }} className="w-full h-full" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-white mb-1">{pitch.name}</CardTitle>
                        <CardDescription className="text-gray-400 text-sm">
                          {pitch.tagline}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Industry</span>
                        <span className="text-gray-300 capitalize">{pitch.industry}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Tone</span>
                        <span className="text-gray-300 capitalize">{pitch.tone}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Created</span>
                        <span className="text-gray-300">
                          {new Date(pitch.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onNavigate('generated-pitch', pitch.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleExport(pitch)}
                        className="flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all"
                        title="Export PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pitch.id, pitch.name)}
                        disabled={deletingId === pitch.id}
                        className="flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-red-900/20 border border-gray-700 hover:border-red-500/50 rounded-lg transition-all text-red-400 disabled:opacity-50"
                      >
                        <Trash2 className={`w-4 h-4 ${deletingId === pitch.id ? 'animate-pulse' : ''}`} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Empty State (show when no pitches) */}
        {pitches.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#4F46E5]/10 mb-6">
              <Sparkles className="w-10 h-10 text-[#4F46E5]" />
            </div>
            <h3 className="mb-2 text-white">No pitches yet</h3>
            <p className="text-gray-400 mb-6">Create your first startup pitch to get started</p>
            <button
              onClick={() => onNavigate('create')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-lg hover:shadow-lg hover:shadow-[#4F46E5]/50 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Pitch</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
