import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useBirthdays } from '@/hooks/use-birthdays';
import { BirthdayCard } from '@/components/BirthdayCard';
import { RetroButton } from '@/components/RetroButton';

export default function ListScreen() {
  const { theme } = useTheme();
  const { birthdays } = useBirthdays();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBirthdays = birthdays.filter(birthday =>
    birthday.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBirthdays = [...filteredBirthdays].sort((a, b) => {
    if (a.date.month !== b.date.month) {
      return a.date.month - b.date.month;
    }
    return a.date.day - b.date.day;
  });

  return (
    <LinearGradient
      colors={theme.backgroundGradient}
      style={styles.container}
    >
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.cardBackground }]}>
          <Search size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search birthdays..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sortedBirthdays.length > 0 ? (
          sortedBirthdays.map((birthday) => (
            <BirthdayCard
              key={birthday.id}
              birthday={birthday}
              onPress={() => router.push(`/birthday/${birthday.id}`)}
              onLongPress={() => router.push(`/edit-birthday?id=${birthday.id}`)}
            />
          ))
        ) : (
          <View style={[styles.emptyState, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              {searchQuery ? 'No birthdays found' : 'No birthdays yet'}
            </Text>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              {searchQuery 
                ? 'Try a different search term' 
                : 'Start adding birthdays to never forget a special day!'}
            </Text>
            {!searchQuery && (
              <RetroButton
                title="Add Birthday"
                onPress={() => router.push('/add-birthday')}
                style={{ marginTop: 20 }}
              />
            )}
          </View>
        )}
      </ScrollView>

      {sortedBirthdays.length > 0 && (
        <View style={styles.floatingButton}>
          <RetroButton
            title="+"
            onPress={() => router.push('/add-birthday')}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              paddingHorizontal: 0,
            }}
            textStyle={{ fontSize: 24 }}
          />
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  emptyState: {
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});