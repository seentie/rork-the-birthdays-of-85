import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { useBirthdays } from '@/hooks/use-birthdays';
import { months } from '@/utils/date';
import { router } from 'expo-router';

export default function CalendarScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { getBirthdaysByMonth } = useBirthdays();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const containerWidth = isTablet ? Math.min(width * 0.7, 600) : width;

  const monthBirthdays = getBirthdaysByMonth(currentMonth + 1);
  const daysInMonth = months[currentMonth].days;

  const navigateMonth = (direction: number) => {
    setCurrentMonth((prev) => {
      const newMonth = prev + direction;
      if (newMonth < 0) return 11;
      if (newMonth > 11) return 0;
      return newMonth;
    });
  };

  const renderCalendarColumns = () => {
    const daysPerColumn = Math.ceil(daysInMonth / 3);
    const column1 = [];
    const column2 = [];
    const column3 = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dayBirthdays = monthBirthdays.filter(b => b.date.day === day);
      const hasBirthday = dayBirthdays.length > 0;
      
      const dayCell = (
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            { 
              backgroundColor: hasBirthday ? theme.primary + '30' : theme.cardBackground,
              borderColor: hasBirthday ? theme.primary : 'transparent',
            },
          ]}
          onPress={() => {
            if (hasBirthday && dayBirthdays[0]) {
              router.push(`/birthday/${dayBirthdays[0].id}`);
            }
          }}
          disabled={!hasBirthday}
        >
          <Text style={[
            styles.dayNumber,
            { color: hasBirthday ? theme.primary : theme.textSecondary }
          ]}>
            {day}
          </Text>
          {hasBirthday && (
            <View style={styles.birthdayIndicator}>
              {dayBirthdays.map((b, index) => (
                <Text 
                  key={index} 
                  style={[styles.birthdayName, { color: theme.text }]}
                  numberOfLines={1}
                >
                  {b.name.split(' ')[0]}
                </Text>
              ))}
            </View>
          )}
        </TouchableOpacity>
      );
      
      if (day <= daysPerColumn) {
        column1.push(dayCell);
      } else if (day <= daysPerColumn * 2) {
        column2.push(dayCell);
      } else {
        column3.push(dayCell);
      }
    }
    
    return { column1, column2, column3 };
  };

  return (
    <LinearGradient
      colors={theme.backgroundGradient}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateMonth(-1)}>
          <ChevronLeft size={28} color={theme.primary} />
        </TouchableOpacity>
        
        <View style={styles.monthDisplay}>
          <Text style={[styles.monthName, { color: theme.primary }]}>
            {t('calendar.months')[currentMonth]}
          </Text>
          <Text style={[styles.yearText, { color: theme.textSecondary }]}>
            {t('calendar.perpetualCalendar')}
          </Text>
        </View>
        
        <TouchableOpacity onPress={() => navigateMonth(1)}>
          <ChevronRight size={28} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <View 
        style={styles.calendarScroll}
      >
        <View style={[styles.calendarContainer, { width: isTablet ? containerWidth : '100%', alignSelf: isTablet ? 'center' : 'stretch' }]}>
          <View style={styles.column}>
            {renderCalendarColumns().column1}
          </View>
          <View style={styles.column}>
            {renderCalendarColumns().column2}
          </View>
          <View style={styles.column}>
            {renderCalendarColumns().column3}
          </View>
        </View>
      </View>

      <View style={[styles.legendContainer, { alignItems: isTablet ? 'center' : 'stretch' }]}>
        <View style={[styles.legend, { backgroundColor: theme.cardBackground, width: isTablet ? containerWidth : undefined }]}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: theme.primary }]} />
            <Text style={[styles.legendText, { color: theme.textSecondary }]}>
              {t('calendar.hasBirthday')}
            </Text>
          </View>
          <Text style={[styles.birthdayCount, { color: theme.text }]}>
            {monthBirthdays.length} {t('calendar.birthdaysThisMonth')}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 10,
  },
  monthDisplay: {
    alignItems: 'center',
  },
  monthName: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  yearText: {
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 1,
  },
  calendarScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  calendarContainer: {
    flexDirection: 'row',
    gap: 6,
    flex: 1,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  dayCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 4,
    minHeight: 32,
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 28,
  },
  birthdayIndicator: {
    flex: 1,
    marginLeft: 6,
  },
  birthdayName: {
    fontSize: 10,
    marginBottom: 1,
  },
  moreIndicator: {
    fontSize: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  legendContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
  },
  birthdayCount: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});