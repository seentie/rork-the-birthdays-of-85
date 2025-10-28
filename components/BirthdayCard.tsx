import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar, User } from 'lucide-react-native';
import { Birthday } from '@/types/birthday';
import { formatBirthdayDate, getDaysUntilText } from '@/utils/date';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';

interface BirthdayCardProps {
  birthday: Birthday;
  onPress: () => void;
  onLongPress?: () => void;
}

export function BirthdayCard({ birthday, onPress, onLongPress }: BirthdayCardProps) {
  const { theme } = useTheme();
  const { language } = useLanguage();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.primary,
        },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {birthday.photo ? (
          <Image source={{ uri: birthday.photo }} style={styles.photo} />
        ) : (
          <View style={[styles.photoPlaceholder, { backgroundColor: theme.secondary }]}>
            <User size={24} color={theme.text} />
          </View>
        )}
        
        <View style={styles.info}>
          <Text style={[styles.name, { color: theme.text }]}>{birthday.name}</Text>
          <View style={styles.dateRow}>
            <Calendar size={14} color={theme.textSecondary} />
            <Text style={[styles.date, { color: theme.textSecondary }]}>
              {formatBirthdayDate(birthday.date.month, birthday.date.day, language)}
            </Text>
          </View>
        </View>
        
        <View style={styles.countdown}>
          <Text style={[styles.countdownText, { color: theme.accent }]}>
            {getDaysUntilText(birthday, language)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  photoPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    fontSize: 14,
  },
  countdown: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  countdownText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});