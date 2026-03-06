import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useProfile } from './ProfileContext';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export interface DuellPlayer {
  profileId: string;
  profileName: string;
  profileColor: string;
  profileAvatar: string;
  answers: { questionId: number; answer: number; correct: boolean }[];
  score: number;
  isReady: boolean;
}

export interface Duell {
  id: string;
  category: string;
  questionIds: number[];
  player1: DuellPlayer;
  player2: DuellPlayer | null;
  currentRound: number;
  totalRounds: number;
  status: 'waiting' | 'active' | 'finished';
  createdAt: number;
  winner?: string; // profileId of winner
}

interface DuellContextType {
  createDuell: (category: string, totalRounds: number) => Promise<string>;
  joinDuell: (duellId: string) => Promise<boolean>;
  getDuell: (duellId: string) => Promise<Duell | null>;
  submitAnswer: (duellId: string, questionId: number, answer: number, correct: boolean) => Promise<void>;
  finishDuell: (duellId: string) => Promise<void>;
  currentDuell: Duell | null;
  setCurrentDuell: (duell: Duell | null) => void;
}

const DuellContext = createContext<DuellContextType | undefined>(undefined);

export function DuellProvider({ children }: { children: ReactNode }) {
  const { currentProfile } = useProfile();
  const [currentDuell, setCurrentDuell] = useState<Duell | null>(null);

  const createDuell = async (category: string, totalRounds: number): Promise<string> => {
    if (!currentProfile) {
      throw new Error('Kein Profil ausgewählt');
    }

    const duellId = `duell_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Generiere zufällige Frage-IDs basierend auf Kategorie
    const questionIds = generateQuestionIds(category, totalRounds);

    const duell: Duell = {
      id: duellId,
      category,
      questionIds,
      player1: {
        profileId: currentProfile.id,
        profileName: currentProfile.name,
        profileColor: currentProfile.color,
        profileAvatar: currentProfile.avatar,
        answers: [],
        score: 0,
        isReady: true,
      },
      player2: null,
      currentRound: 0,
      totalRounds,
      status: 'waiting',
      createdAt: Date.now(),
    };

    // Speichere Duell auf Server
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/duell/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ duell }),
        }
      );

      if (!response.ok) {
        throw new Error('Fehler beim Erstellen des Duells');
      }

      console.log('✅ Duell erstellt:', duellId);
      return duellId;
    } catch (error) {
      console.error('❌ Fehler beim Erstellen des Duells:', error);
      throw error;
    }
  };

  const joinDuell = async (duellId: string): Promise<boolean> => {
    if (!currentProfile) {
      throw new Error('Kein Profil ausgewählt');
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/duell/join`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            duellId,
            player: {
              profileId: currentProfile.id,
              profileName: currentProfile.name,
              profileColor: currentProfile.color,
              profileAvatar: currentProfile.avatar,
              answers: [],
              score: 0,
              isReady: true,
            },
          }),
        }
      );

      if (!response.ok) {
        return false;
      }

      console.log('✅ Duell beigetreten:', duellId);
      return true;
    } catch (error) {
      console.error('❌ Fehler beim Beitreten:', error);
      return false;
    }
  };

  const getDuell = async (duellId: string): Promise<Duell | null> => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/duell/${duellId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.duell;
    } catch (error) {
      console.error('❌ Fehler beim Laden des Duells:', error);
      return null;
    }
  };

  const submitAnswer = async (
    duellId: string,
    questionId: number,
    answer: number,
    correct: boolean
  ): Promise<void> => {
    if (!currentProfile) {
      throw new Error('Kein Profil ausgewählt');
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/duell/answer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            duellId,
            profileId: currentProfile.id,
            questionId,
            answer,
            correct,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Fehler beim Speichern der Antwort');
      }

      console.log('✅ Antwort gespeichert');
    } catch (error) {
      console.error('❌ Fehler beim Speichern der Antwort:', error);
      throw error;
    }
  };

  const finishDuell = async (duellId: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-87b5103a/duell/finish`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ duellId }),
        }
      );

      if (!response.ok) {
        throw new Error('Fehler beim Beenden des Duells');
      }

      console.log('✅ Duell beendet');
    } catch (error) {
      console.error('❌ Fehler beim Beenden des Duells:', error);
      throw error;
    }
  };

  return (
    <DuellContext.Provider
      value={{
        createDuell,
        joinDuell,
        getDuell,
        submitAnswer,
        finishDuell,
        currentDuell,
        setCurrentDuell,
      }}
    >
      {children}
    </DuellContext.Provider>
  );
}

export function useDuell() {
  const context = useContext(DuellContext);
  if (context === undefined) {
    throw new Error('useDuell must be used within a DuellProvider');
  }
  return context;
}

// Helper: Generiere Frage-IDs für eine Kategorie
function generateQuestionIds(category: string, totalRounds: number): number[] {
  const categoryRanges: { [key: string]: [number, number] } = {
    'Quran': [1, 57],
    'Hadith': [58, 114],
    'Fiqh': [115, 171],
    'Seerah': [172, 228],
    'Islamische Geschichte': [229, 285],
    'Aqidah': [286, 300],
  };

  const range = categoryRanges[category];
  if (!range) {
    // Alle Kategorien
    const allIds = Array.from({ length: 300 }, (_, i) => i + 1);
    return shuffleArray(allIds).slice(0, totalRounds);
  }

  const [start, end] = range;
  const categoryIds = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  return shuffleArray(categoryIds).slice(0, totalRounds);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
