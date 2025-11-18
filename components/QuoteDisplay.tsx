import React, { useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { quotes } from '@/constants/quotes';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';

export function QuoteDisplay() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const currentQuotes = quotes[language] || quotes.en;
  const [currentQuote, setCurrentQuote] = useState(currentQuotes[0]);
  const fadeAnim = useMemo(() => new Animated.Value(1), []);

  console.log('QuoteDisplay - Current language:', language);
  console.log('QuoteDisplay - Current quote:', currentQuote);

  useEffect(() => {
    // Set initial random quote
    setCurrentQuote(currentQuotes[Math.floor(Math.random() * currentQuotes.length)]);
    
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        const newQuote = currentQuotes[Math.floor(Math.random() * currentQuotes.length)];
        setCurrentQuote(newQuote);
        console.log('QuoteDisplay - New quote:', newQuote);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentQuotes, fadeAnim]);

  if (!currentQuote) {
    return null;
  }

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: theme.cardBackground,
        borderWidth: 1,
        borderColor: `${theme.accent}44`,
      }
    ]}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={[
          styles.quote, 
          { 
            color: theme.text,
            textShadowColor: theme.accent,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 4,
          }
        ]}>
          <Text>&ldquo;</Text>
          <Text>{currentQuote}</Text>
          <Text>&rdquo;</Text>
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
  },
  quote: {
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '600' as const,
    letterSpacing: 0.3,
  },
});