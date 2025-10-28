import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Birthday } from '@/types/birthday';
import { getUpcomingBirthdays } from '@/utils/date';

export const [BirthdayProvider, useBirthdays] = createContextHook(() => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBirthdays();
  }, []);

  const loadBirthdays = async () => {
    try {
      const stored = await AsyncStorage.getItem('birthdays');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setBirthdays(parsed);
          } else {
            console.error('Stored birthdays is not an array, resetting...');
            await AsyncStorage.removeItem('birthdays');
            setBirthdays([]);
          }
        } catch (parseError) {
          console.error('Error parsing birthdays JSON:', parseError);
          await AsyncStorage.removeItem('birthdays');
          setBirthdays([]);
        }
      }
    } catch (error) {
      console.error('Error loading birthdays:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBirthdays = async (newBirthdays: Birthday[]) => {
    try {
      await AsyncStorage.setItem('birthdays', JSON.stringify(newBirthdays));
      setBirthdays(newBirthdays);
    } catch (error) {
      console.error('Error saving birthdays:', error);
    }
  };

  const addBirthday = async (birthday: Omit<Birthday, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBirthday: Birthday = {
      ...birthday,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    const updated = [...birthdays, newBirthday];
    await saveBirthdays(updated);
    return newBirthday;
  };

  const updateBirthday = async (id: string, updates: Partial<Birthday>) => {
    const updated = birthdays.map(b => 
      b.id === id 
        ? { ...b, ...updates, updatedAt: Date.now() }
        : b
    );
    await saveBirthdays(updated);
  };

  const deleteBirthday = async (id: string) => {
    const updated = birthdays.filter(b => b.id !== id);
    await saveBirthdays(updated);
  };

  const getBirthdaysByMonth = (month: number) => {
    return birthdays.filter(b => b.date.month === month);
  };

  const getUpcoming = (limit?: number) => {
    return getUpcomingBirthdays(birthdays, limit);
  };

  return {
    birthdays,
    isLoading,
    addBirthday,
    updateBirthday,
    deleteBirthday,
    getBirthdaysByMonth,
    getUpcoming,
  };
});