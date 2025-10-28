import { Birthday } from '@/types/birthday';

export const monthsEn: { name: string; days: number }[] = [
  { name: 'January', days: 31 },
  { name: 'February', days: 29 }, // Including leap year
  { name: 'March', days: 31 },
  { name: 'April', days: 30 },
  { name: 'May', days: 31 },
  { name: 'June', days: 30 },
  { name: 'July', days: 31 },
  { name: 'August', days: 31 },
  { name: 'September', days: 30 },
  { name: 'October', days: 31 },
  { name: 'November', days: 30 },
  { name: 'December', days: 31 },
];

export const monthsEs: { name: string; days: number }[] = [
  { name: 'Enero', days: 31 },
  { name: 'Febrero', days: 29 }, // Including leap year
  { name: 'Marzo', days: 31 },
  { name: 'Abril', days: 30 },
  { name: 'Mayo', days: 31 },
  { name: 'Junio', days: 30 },
  { name: 'Julio', days: 31 },
  { name: 'Agosto', days: 31 },
  { name: 'Septiembre', days: 30 },
  { name: 'Octubre', days: 31 },
  { name: 'Noviembre', days: 30 },
  { name: 'Diciembre', days: 31 },
];

export const months = monthsEn; // Default for backward compatibility

export function getUpcomingBirthdays(birthdays: Birthday[], limit: number = 5): Birthday[] {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Sort birthdays by upcoming date
  const sorted = [...birthdays].sort((a, b) => {
    // Calculate days until birthday (treating year as circular)
    const daysUntilA = getDaysUntilBirthday(a.date.month, a.date.day, currentMonth, currentDay);
    const daysUntilB = getDaysUntilBirthday(b.date.month, b.date.day, currentMonth, currentDay);
    
    return daysUntilA - daysUntilB;
  });

  return sorted.slice(0, limit);
}

function getDaysUntilBirthday(
  birthMonth: number,
  birthDay: number,
  currentMonth: number,
  currentDay: number
): number {
  let daysUntil = 0;
  
  if (birthMonth > currentMonth || (birthMonth === currentMonth && birthDay >= currentDay)) {
    // Birthday is this year
    for (let m = currentMonth; m < birthMonth; m++) {
      daysUntil += months[m - 1].days;
    }
    daysUntil += birthDay;
    if (currentMonth === birthMonth) {
      daysUntil -= currentDay;
    } else {
      daysUntil -= currentDay;
    }
  } else {
    // Birthday is next year
    // Days remaining in current year
    for (let m = currentMonth; m <= 12; m++) {
      daysUntil += months[m - 1].days;
    }
    daysUntil -= currentDay;
    
    // Days in next year until birthday
    for (let m = 1; m < birthMonth; m++) {
      daysUntil += months[m - 1].days;
    }
    daysUntil += birthDay;
  }
  
  return daysUntil;
}

export function formatBirthdayDate(month: number, day: number, language: 'en' | 'es' = 'en'): string {
  const monthsList = language === 'es' ? monthsEs : monthsEn;
  return `${monthsList[month - 1].name} ${day}`;
}

export function getDaysUntilText(birthday: Birthday, language: 'en' | 'es' = 'en'): string {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  
  const days = getDaysUntilBirthday(birthday.date.month, birthday.date.day, currentMonth, currentDay);
  
  if (language === 'es') {
    if (days === 0) return '¡Hoy! 🎉';
    if (days === 1) return '¡Mañana!';
    if (days <= 7) return `En ${days} ${days === 1 ? 'día' : 'días'}`;
    if (days <= 30) {
      const weeks = Math.floor(days / 7);
      return `En ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
    }
    const months = Math.floor(days / 30);
    return `En ${months} ${months === 1 ? 'mes' : 'meses'}`;
  } else {
    if (days === 0) return 'Today! 🎉';
    if (days === 1) return 'Tomorrow!';
    if (days <= 7) return `In ${days} ${days === 1 ? 'day' : 'days'}`;
    if (days <= 30) {
      const weeks = Math.floor(days / 7);
      return `In ${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
    }
    const months = Math.floor(days / 30);
    return `In ${months} ${months === 1 ? 'month' : 'months'}`;
  }
}