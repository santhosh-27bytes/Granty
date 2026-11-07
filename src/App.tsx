import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GrantlyProvider, useGrantly } from './context/GrantlyContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DashboardPage } from './pages/DashboardPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ScholarshipsListPage } from './pages/ScholarshipsListPage';
import { TrackerPage } from './pages/TrackerPage';
import { SavedPage } from './pages/SavedPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage';
import { ProfileModal } from './components/ProfileModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { ScholarshipDetailModal } from './components/ScholarshipDetailModal';
import { LiveStatusModal } from './components/LiveStatusModal';
import { GrantlyChatbot } from './components/GrantlyChatbot';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useGrantly();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 selection:bg-blue-500 selection:text-white">
        <AuthPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white relative">
      {/* Top Header Bar */}
      <Header />

      {/* Main App Content Area */}
      <main className="flex-1 pb-16">
        <Routes>
          {/* Step 1: Education Levels Dashboard */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Step 2: Categories of Education for selected Level */}
          <Route path="/categories/:levelId" element={<CategoriesPage />} />
          
          {/* Step 3: Scholarships for selected Level and Category */}
          <Route path="/scholarships/:levelId/:categoryId" element={<ScholarshipsListPage />} />
          <Route path="/scholarships/:levelId" element={<ScholarshipsListPage />} />

          {/* Core Application Pages */}
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <ProfileModal />
      <NotificationDrawer />
      <NotificationSettingsModal />
      <ScholarshipDetailModal />
      <LiveStatusModal />

      {/* 24/7 Verified GovTech Chatbot Assistant in Right Corner */}
      <GrantlyChatbot />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GrantlyProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </GrantlyProvider>
  );
};

export default App;
