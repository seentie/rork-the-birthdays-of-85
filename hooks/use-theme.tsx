import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { themes, Theme } from '@/constants/themes';

export const [ThemeProvider, useTheme] = createContextHook(() => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.miami);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedThemeId = await AsyncStorage.getItem('selectedTheme');
      if (savedThemeId && themes[savedThemeId]) {
        setCurrentTheme(themes[savedThemeId]);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeTheme = async (themeId: string) => {
    if (themes[themeId]) {
      setCurrentTheme(themes[themeId]);
      try {
        await AsyncStorage.setItem('selectedTheme', themeId);
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    }
  };

  return {
    theme: currentTheme,
    themes: Object.values(themes),
    changeTheme,
    isLoading,
  };
});