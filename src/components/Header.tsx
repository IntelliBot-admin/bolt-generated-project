import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, User, Home, Calendar } from 'lucide-react';
import { useRecordingStore } from '../store/recordingStore';
import toast from 'react-hot-toast';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuthStore();
  const { isRecording } = useRecordingStore();

  const handleNavigation = (path: string) => {
    if (isRecording) {
      toast.error('Please stop recording before navigating');
      return;
    }
    navigate(path);
  };

  const handleSignOut = () => {
    if (isRecording) {
      toast.error('Please stop recording before signing out');
      return;
    }
    signOut();
  };

  const isHome = location.pathname === '/';
  const isCalendar = location.pathname === '/calendar';

  // Add a class to indicate the header is disabled
  const headerClass = isRecording ? 'opacity-50 pointer-events-none' : '';

  if (!user) return null;

  return (
    <header className={`bg-white shadow ${headerClass}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
            {!isHome && (
              <button
                onClick={() => handleNavigation('/')}
                disabled={isRecording}
                className={`p-2 rounded-full transition-colors ${
                  isRecording 
                    ? 'opacity-50 cursor-not-allowed text-gray-300'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
                }`}
                title={isRecording ? 'Stop recording to navigate' : 'Go to Home'}
              >
                <Home className="w-5 h-5" />
              </button>
            )}
            <div 
              onClick={() => !isRecording && handleNavigation('/')}
              className={`flex items-center space-x-2 ${
                isRecording ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900 cursor-pointer'
              }`}
            >
              <img 
                src="https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=800&auto=format&fit=crop&q=60"
                alt="Note Ninja Logo"
                className="w-14 h-14 object-contain rounded-full"
              />
              <h1 className="text-xl sm:text-2xl font-bold">
                Note Ninja
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => handleNavigation('/calendar')}
              disabled={isRecording}
              className={`p-2 rounded-full transition-colors ${
                isRecording 
                  ? 'opacity-50 cursor-not-allowed text-gray-300'
                  : isCalendar 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
              }`}
              title={isRecording ? 'Stop recording to navigate' : 'View Calendar'}
            >
              <Calendar className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center text-sm text-gray-700">
              <User className="w-4 h-4 mr-1" />
              {user.email}
            </div>
            <button
              onClick={handleSignOut}
              disabled={isRecording}
              className={`inline-flex items-center px-2 sm:px-3 py-1.5 border border-transparent text-sm font-medium rounded-md ${
                isRecording
                  ? 'opacity-50 cursor-not-allowed text-gray-300 bg-gray-100'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
              title={isRecording ? 'Stop recording to sign out' : 'Sign out'}
            >
              <LogOut className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
