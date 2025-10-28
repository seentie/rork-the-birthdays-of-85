import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Camera, Calendar } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { useBirthdays } from '@/hooks/use-birthdays';
import { RetroButton } from '@/components/RetroButton';
import { monthsEn, monthsEs } from '@/utils/date';

export default function EditBirthdayScreen() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { birthdays, updateBirthday } = useBirthdays();
  const { id } = useLocalSearchParams();
  const months = language === 'es' ? monthsEs : monthsEn;
  
  const birthday = birthdays.find(b => b.id === id);
  
  const [name, setName] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState<string | undefined>();

  useEffect(() => {
    if (birthday) {
      setName(birthday.name);
      setSelectedMonth(birthday.date.month);
      setSelectedDay(birthday.date.day);
      setNotes(birthday.notes || '');
      setPhoto(birthday.photo);
    }
  }, [birthday]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      setPhoto(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const removePhoto = () => {
    Alert.alert(
      'Remove Photo',
      'Are you sure you want to remove this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => setPhoto(undefined)
        },
      ]
    );
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }

    if (!birthday) {
      Alert.alert('Error', 'Birthday not found');
      return;
    }

    await updateBirthday(birthday.id, {
      name: name.trim(),
      date: {
        month: selectedMonth,
        day: selectedDay,
      },
      photo,
      notes: notes.trim() || undefined,
    });

    router.back();
  };

  if (!birthday) {
    return (
      <LinearGradient colors={theme.backgroundGradient} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <X size={28} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              Edit Birthday
            </Text>
            <View style={{ width: 28 }} />
          </View>
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: theme.text }]}>
              Birthday not found
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const daysInMonth = months[selectedMonth - 1].days;

  return (
    <LinearGradient colors={theme.backgroundGradient} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <X size={28} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Edit Birthday
          </Text>
          <View style={{ width: 28 }} />
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={true}
          >
            <TouchableOpacity 
              style={[styles.photoContainer, { backgroundColor: theme.cardBackground }]}
              onPress={pickImage}
              onLongPress={photo ? removePhoto : undefined}
            >
              {photo ? (
                <>
                  <Image source={{ uri: photo }} style={styles.photo} />
                  <View style={[styles.photoOverlay, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                    <Camera size={24} color="white" />
                    <Text style={styles.photoOverlayText}>Tap to change</Text>
                    <Text style={styles.photoOverlaySubtext}>Hold to remove</Text>
                  </View>
                </>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Camera size={40} color={theme.textSecondary} />
                  <Text style={[styles.photoText, { color: theme.textSecondary }]}>
                    Add Photo
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Name</Text>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: theme.cardBackground,
                  color: theme.text,
                  borderColor: theme.primary,
                }]}
                placeholder="Enter name"
                placeholderTextColor={theme.textSecondary}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Birthday</Text>
              <View style={styles.dateRow}>
                <View style={[styles.dateSelector, { backgroundColor: theme.cardBackground }]}>
                  <Calendar size={16} color={theme.primary} />
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.monthScroll}
                  >
                    {months.map((month, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.monthOption,
                          selectedMonth === index + 1 && { backgroundColor: theme.primary },
                        ]}
                        onPress={() => {
                          setSelectedMonth(index + 1);
                          if (selectedDay > month.days) {
                            setSelectedDay(month.days);
                          }
                        }}
                      >
                        <Text style={[
                          styles.monthText,
                          { color: selectedMonth === index + 1 ? theme.text : theme.textSecondary }
                        ]}>
                          {month.name.slice(0, 3)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={[styles.dayScroll, { backgroundColor: theme.cardBackground }]}
                >
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.dayOption,
                        selectedDay === day && { backgroundColor: theme.secondary },
                      ]}
                      onPress={() => setSelectedDay(day)}
                    >
                      <Text style={[
                        styles.dayText,
                        { color: selectedDay === day ? theme.text : theme.textSecondary }
                      ]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Notes (Optional)</Text>
              <TextInput
                style={[styles.textArea, { 
                  backgroundColor: theme.cardBackground,
                  color: theme.text,
                  borderColor: theme.primary,
                }]}
                placeholder="Add notes..."
                placeholderTextColor={theme.textSecondary}
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.buttonRow}>
              <RetroButton
                title="Cancel"
                onPress={() => router.back()}
                variant="secondary"
                style={{ flex: 1 }}
              />
              <RetroButton
                title="Save Changes"
                onPress={handleSave}
                style={{ flex: 2 }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  photoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
  },
  photoOverlayText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },
  photoOverlaySubtext: {
    color: 'white',
    fontSize: 10,
    marginTop: 2,
  },
  photoPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    marginTop: 8,
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
  dateRow: {
    gap: 12,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  monthScroll: {
    marginLeft: 8,
  },
  monthOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  monthText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dayScroll: {
    borderRadius: 8,
    padding: 8,
  },
  dayOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
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