// LocalStorage utilities for pitch data persistence

const STORAGE_KEY = 'pitchcraft_pitches';

export interface Pitch {
  id: string;
  name: string;
  tagline: string;
  elevator: string;
  problem: string;
  solution: string;
  target: string;
  industry: string;
  tone: string;
  createdAt: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

// Get all pitches
export function getAllPitches(): Pitch[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading pitches:', error);
    return [];
  }
}

// Get single pitch by ID
export function getPitchById(id: string): Pitch | null {
  const pitches = getAllPitches();
  return pitches.find(pitch => pitch.id === id) || null;
}

// Save pitch
export function savePitch(pitch: Pitch): void {
  try {
    const pitches = getAllPitches();
    const existingIndex = pitches.findIndex(p => p.id === pitch.id);
    
    if (existingIndex >= 0) {
      pitches[existingIndex] = pitch;
    } else {
      pitches.unshift(pitch);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pitches));
  } catch (error) {
    console.error('Error saving pitch:', error);
    throw new Error('Failed to save pitch');
  }
}

// Update pitch
export function updatePitch(id: string, updates: Partial<Pitch>): void {
  try {
    const pitches = getAllPitches();
    const index = pitches.findIndex(p => p.id === id);
    
    if (index >= 0) {
      pitches[index] = { ...pitches[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pitches));
    }
  } catch (error) {
    console.error('Error updating pitch:', error);
    throw new Error('Failed to update pitch');
  }
}

// Delete pitch
export function deletePitch(id: string): void {
  try {
    const pitches = getAllPitches();
    const filtered = pitches.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting pitch:', error);
    throw new Error('Failed to delete pitch');
  }
}

// Clear all pitches
export function clearAllPitches(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing pitches:', error);
  }
}

// Generate shareable link (mock implementation)
export function generateShareableLink(pitchId: string): string {
  const baseUrl = window.location.origin;
  const shareId = btoa(pitchId).replace(/=/g, '');
  return `${baseUrl}/share/${shareId}`;
}
