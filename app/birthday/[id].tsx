import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Edit2, Trash2, Calendar, FileText } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { useBirthdays } from '@/hooks/use-birthdays';
import { formatBirthdayDate, getDaysUntilText } from '@/utils/date';


export default function BirthdayDetailScreen() {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const { id } = useLocalSearchParams();
  const { birthdays, deleteBirthday } = useBirthdays();
  
  const birthday = birthdays.find(b => b.id === id);

  const handleDelete = () => {
    Alert.alert(
      t('birthdayDetail.deleteTitle'),
      t('birthdayDetail.deleteMessage').replace('{{name}}', birthday?.name || ''),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('common.delete'), 
          style: 'destructive',
          onPress: async () => {
            if (birthday) {
              await deleteBirthday(birthday.id);
              router.back();
            }
          }
        },
      ]
    );
  };

  if (!birthday) {
    return (
      <LinearGradient colors={theme.backgroundGradient} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={28} color={theme.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: theme.text }]}>
              {t('birthdayDetail.birthdayNotFound')}
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={theme.backgroundGradient} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={28} color={theme.text} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={() => router.push(`/edit-birthday?id=${birthday.id}`)}>
              <Edit2 size={24} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Trash2 size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileSection}>
            {birthday.photo ? (
              <Image source={{ uri: birthday.photo }} style={styles.photo} />
            ) : (
              <View style={[styles.photoPlaceholder, { backgroundColor: theme.secondary }]}>
                <Text style={[styles.photoInitial, { color: theme.text }]}>
                  {birthday.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}

            <Text style={[styles.name, { color: theme.primary }]}>
              {birthday.name}
            </Text>

            <View style={[styles.countdownBadge, { backgroundColor: theme.accent + '30' }]}>
              <Text style={[styles.countdownText, { color: theme.accent }]}>
                {getDaysUntilText(birthday, language)}
              </Text>
            </View>
          </View>

          <View style={[styles.infoCard, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.infoRow}>
              <Calendar size={20} color={theme.primary} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                  {t('birthdayDetail.birthday')}
                </Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>
                  {formatBirthdayDate(birthday.date.month, birthday.date.day, language)}
                </Text>
              </View>
            </View>

            {birthday.notes && (
              <View style={styles.infoRow}>
                <FileText size={20} color={theme.primary} />
                <View style={styles.infoContent}>
                  <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                    {t('birthdayDetail.notes')}
                  </Text>
                  <Text style={[styles.infoValue, { color: theme.text }]}>
                    {birthday.notes}
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View style={[styles.retroCard, { backgroundColor: theme.primary + '20' }]}>
            <Text style={[styles.retroTitle, { color: theme.primary }]}>
              {t('birthdayDetail.partyTime')}
            </Text>
            <Text style={[styles.retroText, { color: theme.text }]}>
              {t('birthdayDetail.partyMessage')}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  photoInitial: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
    textAlign: 'center',
  },
  countdownBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  countdownText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    lineHeight: 22,
  },
  retroCard: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  retroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  retroText: {
    fontSize: 14,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
  },
});