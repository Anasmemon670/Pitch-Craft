import { useState } from 'react';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import CreatePitch from './components/CreatePitch';
import GeneratedPitch from './components/GeneratedPitch';
import LandingPageGenerator from './components/LandingPageGenerator';
import ExportShare from './components/ExportShare';
import BrandKit from './components/BrandKit';
import { Toaster } from 'sonner'; // ✅ Correct import

type Page = 'home' | 'login' | 'register' | 'dashboard' | 'create' | 'generated-pitch' | 'landing-generator' | 'export' | 'brand-kit';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPitchId, setCurrentPitchId] = useState<string | undefined>();

  const handleNavigate = (page: string, pitchId?: string) => {
    setCurrentPage(page as Page);
    setCurrentPitchId(pitchId);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} onRegister={handleRegister} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'create':
        return <CreatePitch onNavigate={handleNavigate} />;
      case 'generated-pitch':
        return <GeneratedPitch pitchId={currentPitchId} onNavigate={handleNavigate} />;
      case 'landing-generator':
        return <LandingPageGenerator pitchId={currentPitchId} onNavigate={handleNavigate} />;
      case 'export':
        return <ExportShare pitchId={currentPitchId} onNavigate={handleNavigate} />;
      case 'brand-kit':
        return <BrandKit pitchId={currentPitchId} onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAuthenticated={isAuthenticated}
      />
      <main>{renderPage()}</main>
      <Toaster />
    </div>
  );
  
}
