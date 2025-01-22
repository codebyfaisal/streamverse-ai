import { useState, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import SearchPage from "./pages/SearchPage";
import { ThemeProvider } from "./components/ThemeProvider";
import ProfilePage from "./pages/ProfilePage";
import PlaylistPage from "./pages/PlaylistPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/error/NotFoundPage";
import ServerErrorPage from "./pages/error/ServerErrorPage";
import OfflinePage from "./pages/error/OfflinePage";
import AboutPage from "./pages/about/AboutPage";
import FAQPage from "./pages/about/FAQPage";
import ContactPage from "./pages/about/ContactPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import TermsPage from "./pages/legal/TermsPage";
import TrendingPage from "./pages/TrendingPage";
import AnimePage from "./pages/AnimePage";
import HistoryPage from "./pages/HistoryPage";
import LibraryPage from "./pages/LibraryPage";
import NotificationsPage from "./pages/NotificationsPage";
import VideoPage from "./pages/VideoPage";
import UploadPage from "./pages/UploadPage";
import { cn } from "./lib/utils";
import { TooltipProvider } from "./components/ui/tooltip";
import AccountPage from "./pages/AccountPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { LoadingPage } from "./components/ui/loading";
import Comments from "@/components/comments/Comments";

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation();
  const isVideoPage = location.pathname.startsWith("/video/");

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && !isVideoPage) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isVideoPage]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    if (window.innerWidth < 1024 || isVideoPage) {
      setIsSidebarOpen(false);
    }
  };

  if (!isOnline) {
    return <OfflinePage />;
  }

  return (
    <div className="h-screen min-h-screen flex flex-col overflow-hidden">
      <Header onMenuClick={handleSidebarToggle} />
      <div className="flex-1 flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
          isVideoPage={isVideoPage}
        />
        <main
          className={cn(
            "h-[calc(100vh-3.5rem)] overflow-y-auto custom-scrollbar w-full pb-10",
            !isVideoPage && "lg:ml-0",
            !isVideoPage && isSidebarOpen && "lg:ml-0",
            "transition-[margin] duration-300"
          )}
        >
          <ErrorBoundary>
            <Suspense fallback={<LoadingPage />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<MainContent />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/video/:id" element={<VideoPage />} />
                <Route path="/channel/:id" element={<ProfilePage />} />
                <Route path="/playlist/:id" element={<PlaylistPage />} />
                <Route path="/trending" element={<TrendingPage />} />
                <Route path="/anime" element={<AnimePage />} />
                <Route path="/library" element={<LibraryPage />} />

                {/* Protected Routes */}
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <ProtectedRoute>
                      <HistoryPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <NotificationsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <UploadPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user/profile/:username"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user/account"
                  element={
                    <ProtectedRoute>
                      <AccountPage />
                    </ProtectedRoute>
                  }
                />

                {/* Error Routes */}
                <Route path="/500" element={<ServerErrorPage />} />
                <Route path="/offline" element={<OfflinePage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <TooltipProvider delayDuration={200}>
          <Router
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
