import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Profile {
  id: string;
  name: string;
  color: string;
  avatar: string;
  createdAt: number;
}

interface ProfileContextType {
  profiles: Profile[];
  currentProfile: Profile | null;
  selectProfile: (profileId: string) => void;
  createProfile: (name: string, color: string, avatar: string) => void;
  deleteProfile: (profileId: string) => void;
  updateProfile: (profileId: string, updates: Partial<Profile>) => void;
  clearCurrentProfile: () => void;
  canCreateProfile: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const MAX_PROFILES = 5;

const PROFILE_COLORS = [
  '#10b981', // Grün
  '#3b82f6', // Blau
  '#f59e0b', // Orange
  '#8b5cf6', // Violett
  '#ec4899', // Pink
  '#14b8a6', // Türkis
  '#f97316', // Orange-Rot
  '#06b6d4', // Cyan
];

const PROFILE_AVATARS = ['👤', '🎓', '📚', '🕌', '☪️', '📖', '🌙', '⭐'];

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);

  // Lade Profile beim Start
  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    try {
      const savedProfiles = localStorage.getItem('profiles');
      if (savedProfiles) {
        const parsedProfiles = JSON.parse(savedProfiles);
        setProfiles(parsedProfiles);

        // Lade aktuelles Profil
        const currentProfileId = localStorage.getItem('currentProfileId');
        if (currentProfileId) {
          const profile = parsedProfiles.find((p: Profile) => p.id === currentProfileId);
          if (profile) {
            setCurrentProfile(profile);
            console.log('✅ Profil geladen:', profile.name);
          }
        }
      }
    } catch (error) {
      console.error('Fehler beim Laden der Profile:', error);
    }
  };

  const saveProfiles = (newProfiles: Profile[]) => {
    try {
      localStorage.setItem('profiles', JSON.stringify(newProfiles));
      setProfiles(newProfiles);
    } catch (error) {
      console.error('Fehler beim Speichern der Profile:', error);
    }
  };

  const selectProfile = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      setCurrentProfile(profile);
      localStorage.setItem('currentProfileId', profileId);
      console.log('✅ Profil ausgewählt:', profile.name);
    }
  };

  const createProfile = (name: string, color: string, avatar: string) => {
    if (profiles.length >= MAX_PROFILES) {
      throw new Error(`Maximal ${MAX_PROFILES} Profile erlaubt`);
    }

    const newProfile: Profile = {
      id: Date.now().toString(),
      name: name.trim(),
      color,
      avatar,
      createdAt: Date.now(),
    };

    const newProfiles = [...profiles, newProfile];
    saveProfiles(newProfiles);
    
    console.log('✅ Neues Profil erstellt:', newProfile.name);
  };

  const deleteProfile = (profileId: string) => {
    // Lösche Profil-spezifischen Fortschritt
    localStorage.removeItem(`quiz_progress_${profileId}`);
    
    const newProfiles = profiles.filter(p => p.id !== profileId);
    saveProfiles(newProfiles);

    // Wenn das aktuelle Profil gelöscht wurde, clearen
    if (currentProfile?.id === profileId) {
      setCurrentProfile(null);
      localStorage.removeItem('currentProfileId');
    }

    console.log('🗑️ Profil gelöscht:', profileId);
  };

  const updateProfile = (profileId: string, updates: Partial<Profile>) => {
    const newProfiles = profiles.map(p => 
      p.id === profileId ? { ...p, ...updates } : p
    );
    saveProfiles(newProfiles);

    // Update current profile if it's the one being updated
    if (currentProfile?.id === profileId) {
      setCurrentProfile({ ...currentProfile, ...updates });
    }

    console.log('✏️ Profil aktualisiert:', profileId);
  };

  const clearCurrentProfile = () => {
    setCurrentProfile(null);
    localStorage.removeItem('currentProfileId');
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        currentProfile,
        selectProfile,
        createProfile,
        deleteProfile,
        updateProfile,
        clearCurrentProfile,
        canCreateProfile: profiles.length < MAX_PROFILES,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}

export { PROFILE_COLORS, PROFILE_AVATARS, MAX_PROFILES };
