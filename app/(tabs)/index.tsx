import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Sparkles } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useBirthdays } from '@/hooks/use-birthdays';
import { useLanguage } from '@/hooks/use-language';
import { BirthdayCard } from '@/components/BirthdayCard';
import { QuoteDisplay } from '@/components/QuoteDisplay';
import { RetroButton } from '@/components/RetroButton';
import { BalloonText } from '@/components/BalloonText';



export default function DashboardScreen() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const { birthdays, getUpcoming, getBirthdaysByMonth } = useBirthdays();
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const containerWidth = isTablet ? Math.min(width * 0.7, 700) : '100%';

  
  const upcomingBirthdays = getUpcoming(5);
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const thisMonthCount = birthdays.filter(b => b.date.month === currentMonth).length;
  
  const displayedBirthdays = selectedMonth 
    ? getBirthdaysByMonth(selectedMonth)
    : upcomingBirthdays;
  
  const monthNames = language === 'es' 
    ? ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



  return (
    <LinearGradient
      colors={theme.backgroundGradient}
      style={styles.container}
    >

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { alignItems: isTablet ? 'center' : 'stretch' }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: containerWidth, maxWidth: '100%' }}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <BalloonText text="The Birthdays" color={theme.primary} />
            <BalloonText text="of '85" color={theme.primary} />
          </View>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {t('home.subtitle')}
          </Text>
        </View>

        <QuoteDisplay />

        <View style={styles.stats}>
          <TouchableOpacity 
            style={[styles.statCard, { backgroundColor: theme.cardBackground }]}
            onPress={() => setSelectedMonth(null)}
            activeOpacity={0.7}
          >
            <Text style={[styles.statNumber, { color: theme.primary }]}>
              {birthdays.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {t('home.totalBirthdays')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.statCard, { backgroundColor: theme.cardBackground }]}
            onPress={() => setSelectedMonth(currentMonth)}
            activeOpacity={0.7}
          >
            <Text style={[styles.statNumber, { color: theme.secondary }]}>
              {thisMonthCount}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {t('home.thisMonth')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Sparkles size={20} color={theme.accent} />
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {selectedMonth ? monthNames[selectedMonth - 1] : t('home.upcomingBirthdays')}
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/add-birthday')}>
              <Plus size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>
          {selectedMonth && (
            <TouchableOpacity 
              onPress={() => setSelectedMonth(null)}
              style={styles.clearFilterButton}
            >
              <Text style={[styles.clearFilterText, { color: theme.accent }]}>
                {language === 'es' ? '← Mostrar próximos' : '← Show upcoming'}
              </Text>
            </TouchableOpacity>
          )}

          {displayedBirthdays.length > 0 ? (
            displayedBirthdays.map((birthday) => (
              <BirthdayCard
                key={birthday.id}
                birthday={birthday}
                onPress={() => router.push(`/birthday/${birthday.id}`)}
              />
            ))
          ) : (
            <View style={[styles.emptyState, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                {t('list.noBirthdays')}
              </Text>
              <RetroButton
                title={t('list.addFirst')}
                onPress={() => router.push('/add-birthday')}
                style={{ marginTop: 16 }}
              />
            </View>
          )}
        </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '900' as const,
    letterSpacing: -1,
    textAlign: 'center',
    fontFamily: 'monospace',
    textTransform: 'uppercase' as const,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    letterSpacing: 1,
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  emptyState: {
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 8,
  },
  clearFilterButton: {
    marginBottom: 12,
  },
  clearFilterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});