import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Palette, Info, Heart, Globe, Shield } from 'lucide-react-native';
import { useTheme } from '../../hooks/use-theme';
import { themes } from '../../constants/themes';
import { useLanguage } from '../../hooks/use-language';

export default function SettingsScreen() {
  const { theme, changeTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isTablet = width >= 768;
  const containerWidth = isTablet ? Math.min(width * 0.7, 700) : '100%';

  return (
    <LinearGradient
      colors={theme.backgroundGradient}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { alignItems: isTablet ? 'center' : 'stretch', paddingTop: insets.top, paddingBottom: Math.max(20, insets.bottom) }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: containerWidth, maxWidth: '100%' }}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Palette size={20} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('settings.theme')}
            </Text>
          </View>

          <View style={styles.themesGrid}>
            {Object.values(themes).map((t) => (
              <TouchableOpacity
                key={t.id}
                style={[
                  styles.themeCard,
                  { 
                    backgroundColor: t.cardBackground,
                    borderColor: theme.id === t.id ? t.primary : 'transparent',
                    borderWidth: theme.id === t.id ? 2 : 1,
                  },
                ]}
                onPress={() => changeTheme(t.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={t.headerGradient}
                  style={styles.themePreview}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
                <Text style={[styles.themeName, { color: t.primary }]}>
                  {t.name}
                </Text>
                {theme.id === t.id && (
                  <View style={[styles.selectedBadge, { backgroundColor: t.primary }]}>
                    <Text style={styles.selectedText}>{language === 'es' ? 'Activo' : 'Active'}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, styles.languageSection]}>
          <View style={styles.sectionHeader}>
            <Globe size={24} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('settings.language')}
            </Text>
          </View>

          <View style={styles.languageOptions}>
            <TouchableOpacity
              style={[
                styles.languageCard,
                { 
                  backgroundColor: theme.cardBackground,
                  borderColor: language === 'en' ? theme.primary : theme.textSecondary,
                  borderWidth: language === 'en' ? 3 : 1,
                  opacity: language === 'en' ? 1 : 0.7,
                },
              ]}
              onPress={() => setLanguage('en')}
              activeOpacity={0.8}
            >
              <Text style={styles.flagEmoji}>🇺🇸</Text>
              <Text style={[styles.languageName, { color: theme.text, fontWeight: language === 'en' ? 'bold' : '600' }]}>
                English
              </Text>
              {language === 'en' && (
                <View style={[styles.languageBadge, { backgroundColor: theme.primary }]}>
                  <Text style={styles.selectedText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.languageCard,
                { 
                  backgroundColor: theme.cardBackground,
                  borderColor: language === 'es' ? theme.primary : theme.textSecondary,
                  borderWidth: language === 'es' ? 3 : 1,
                  opacity: language === 'es' ? 1 : 0.7,
                },
              ]}
              onPress={() => setLanguage('es')}
              activeOpacity={0.8}
            >
              <Text style={styles.flagEmoji}>🇪🇸</Text>
              <Text style={[styles.languageName, { color: theme.text, fontWeight: language === 'es' ? 'bold' : '600' }]}>
                Español
              </Text>
              {language === 'es' && (
                <View style={[styles.languageBadge, { backgroundColor: theme.primary }]}>
                  <Text style={styles.selectedText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Info size={20} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('settings.about')}
            </Text>
          </View>
          
          <View style={[styles.aboutCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.aboutTitle, { color: theme.text }]}>
              The Birthdays of '85
            </Text>
            <Text style={[styles.versionText, { color: theme.primary }]}>
              Version 1.0
            </Text>
            <Text style={[styles.aboutText, { color: theme.textSecondary }]}>
              {language === 'es' 
                ? 'Un calendario perpetuo de cumpleaños con estilo retro de los 80.'
                : 'A perpetual calendar of birthdays with retro 80s style.'}
            </Text>
            <View style={styles.madeWith}>
              <Text style={[styles.madeWithText, { color: theme.textSecondary }]}>
                {language === 'es' ? 'Hecho por Old Skool Apps con' : 'Made by Old Skool Apps with'}
              </Text>
              <Heart size={16} color={theme.primary} fill={theme.primary} />
              <Text style={[styles.madeWithText, { color: theme.textSecondary }]}>
                {language === 'es' ? 'en el espíritu de los 80' : "in the 80's spirit"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={20} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {language === 'es' ? 'PRIVACIDAD' : 'PRIVACY'}
            </Text>
          </View>
          
          <TouchableOpacity
            style={[styles.privacyCard, { backgroundColor: theme.cardBackground }]}
            onPress={() => setShowPrivacyPolicy(true)}
            activeOpacity={0.8}
          >
            <Text style={[styles.privacyTitle, { color: theme.text }]}>
              {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
            </Text>
            <Text style={[styles.privacyText, { color: theme.textSecondary }]}>
              {language === 'es' 
                ? 'Toca para ver nuestra política de privacidad completa'
                : 'Tap to view our complete privacy policy'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={[styles.statsCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.statsTitle, { color: theme.primary }]}>
              {language === 'es' ? 'Datos Curiosos' : 'Fun Facts'}
            </Text>
            <Text style={[styles.statsText, { color: theme.textSecondary }]}>
              {language === 'es' 
                ? '• Los 80 tenían la mejor música\n• Los colores neón estaban en todas partes\n• El cabello grande era genial\n• Todos tenían un Walkman'
                : "• The 80's had the best music\n• Neon colors were everywhere\n• Big hair was totally rad\n• Everyone had a Walkman"}
            </Text>
          </View>
        </View>
        </View>
      </ScrollView>

      <Modal
        visible={showPrivacyPolicy}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowPrivacyPolicy(false)}
      >
        <LinearGradient
          colors={theme.backgroundGradient}
          style={styles.modalContainer}
        >
          <View style={[styles.modalHeader, { borderBottomColor: theme.textSecondary }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
            </Text>
            <TouchableOpacity
              onPress={() => setShowPrivacyPolicy(false)}
              style={[styles.closeButton, { backgroundColor: theme.primary }]}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            style={styles.modalScroll}
            contentContainerStyle={styles.modalContent}
            showsVerticalScrollIndicator={true}
          >
            {language === 'es' ? (
              <>
                <Text style={[styles.privacySection, { color: theme.textSecondary }]}>
                  Actualizado: Noviembre 2025
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>La Versión Corta</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  No te rastreamos. No recopilamos tus datos. No vendemos nada a nadie. Haz lo tuyo.
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>La Versión Un Poco Más Larga</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Old Skool Apps cree que tus asuntos son tus asuntos. Esto es lo que significa:
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Qué No Recopilamos</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  • Información personal{"\n"}
                  • Datos de uso{"\n"}
                  • Datos de ubicación{"\n"}
                  • Información del dispositivo{"\n"}
                  • Cookies o píxeles de seguimiento{"\n"}
                  • Análisis{"\n"}
                  • Literalmente nada sobre ti
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Qué No Hacemos</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  • Rastrear tu actividad{"\n"}
                  • Vender tus datos{"\n"}
                  • Compartir información con terceros{"\n"}
                  • Enviarte correos de marketing (a menos que te inscribas explícitamente){"\n"}
                  • Conectar con redes sociales{"\n"}
                  • Usar redes publicitarias espeluznantes
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Lo que Sucede en Tu Dispositivo Se Queda en Tu Dispositivo</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Todas nuestras aplicaciones almacenan datos localmente en tu dispositivo. Tus diarios, listas, cumpleaños, contactos, preferencias—todo vive en tu teléfono o tableta. No en nuestros servidores. No en la nube (a menos que elijas hacer una copia de seguridad a través de las funciones de respaldo integradas de tu dispositivo).{"\n\n"}
                  Si eliminas la aplicación, tus datos se van con ella. Nosotros nunca los vemos en primer lugar.
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Servicios de Terceros</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Algunas aplicaciones pueden usar las funciones integradas de tu dispositivo (como el acceso a la biblioteca de fotos o la cámara) pero solo cuando des permiso, y solo para que la aplicación funcione. No enviamos esos datos a ninguna parte.
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Cambios a Esta Política</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Si alguna vez cambiamos esta política (spoiler: probablemente no lo haremos), actualizaremos esta página y la fecha en la parte superior. Pero nuestra filosofía sigue siendo la misma: tus datos son tuyos.
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>¿Preguntas?</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Si tienes preguntas sobre esta Política de Privacidad o nuestras prácticas de privacidad, contáctanos en:{"\n\n"}
                  Correo electrónico: sarah@oldskoolapps.com{"\n"}
                  Dirección: 2114 N Flamingo Road #867, Pembroke Pines, FL 33028{"\n"}
                  Teléfono: (646)-540-9602{"\n\n"}
                  Somos humanos reales que sí responden.
                </Text>

                <Text style={[styles.privacyBody, { color: theme.text, fontStyle: 'italic', marginTop: 20 }]}>
                  Somos old skool con las aplicaciones, y también con la privacidad. Haz lo tuyo.{"\n\n"}
                  Old Skool Apps{"\n"}
                  Donde la nostalgia se encuentra con la función, y tu privacidad es realmente tuya.
                </Text>

                <View style={styles.photoSection}>
                  <Image
                    source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/036wuk6k4o8appixjhr61' }}
                    style={styles.photo}
                    resizeMode="contain"
                  />
                  <Text style={[styles.photoCaption, { color: theme.textSecondary }]}>
                    Nuestra desarrolladora y sus hermanos, disfrutando en los años 80{"\n"}
                    Los cumpleaños siempre eran GRANDES y siempre se celebraban 🩷
                  </Text>
                </View>
              </>
            ) : (
              <>
                <Text style={[styles.privacySection, { color: theme.textSecondary }]}>
                  Updated: November 2025
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>The Short Version</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  We don't track you. We don't collect your data. We don't sell anything to anyone. You do you.
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>The Slightly Longer Version</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Old Skool Apps believes your business is your business. Here's what that means:
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>What We Don't Collect</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  • Personal information{"\n"}
                  • Usage data{"\n"}
                  • Location data{"\n"}
                  • Device information{"\n"}
                  • Cookies or tracking pixels{"\n"}
                  • Analytics{"\n"}
                  • Literally anything about you
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>What We Don't Do</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  • Track your activity{"\n"}
                  • Sell your data{"\n"}
                  • Share information with third parties{"\n"}
                  • Send you marketing emails (unless you explicitly sign up){"\n"}
                  • Connect to social media{"\n"}
                  • Use creepy ad networks
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>What Happens on Your Device Stays on Your Device</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  All our apps store data locally on your device. Your journals, lists, birthdays, contacts, preferences—everything lives on your phone or tablet. Not our servers. Not the cloud (unless you choose to back up via your device's built-in backup features).{"\n\n"}
                  If you delete the app, your data goes with it. We never see it in the first place.
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Third-Party Services</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Some apps may use your device's built-in features (like photo library access or camera) but only when you give permission, and only to make the app work. We don't send that data anywhere.
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Changes to This Policy</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  If we ever change this policy (spoiler: we probably won't), we'll update this page and the date at the top. But our philosophy stays the same: your data is yours.
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Questions?</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  If you have questions about this Privacy Policy or our privacy practices, please contact us at:{"\n\n"}
                  Email: sarah@oldskoolapps.com{"\n"}
                  Address: 2114 N Flamingo Road #867, Pembroke Pines, FL 33028{"\n"}
                  Phone: (646)-540-9602{"\n\n"}
                  We're real humans who do respond.
                </Text>

                <Text style={[styles.privacyBody, { color: theme.text, fontStyle: 'italic', marginTop: 20 }]}>
                  We're old skool about apps, and privacy too. You do you.{"\n\n"}
                  Old Skool Apps{"\n"}
                  Where nostalgia meets function, and your privacy is actually yours.
                </Text>

                <View style={styles.photoSection}>
                  <Image
                    source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/036wuk6k4o8appixjhr61' }}
                    style={styles.photo}
                    resizeMode="contain"
                  />
                  <Text style={[styles.photoCaption, { color: theme.textSecondary }]}>
                    Our dev and her sibs, living it up in the 80s{"\n"}
                    Birthdays were always BIG and always celebrated 🩷
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
        </LinearGradient>
      </Modal>
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
  section: {
    marginBottom: 24,
  },
  languageSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  themesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  themeCard: {
    width: '47%',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  themePreview: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  themeName: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  aboutCard: {
    padding: 20,
    borderRadius: 12,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  madeWith: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  madeWithText: {
    fontSize: 12,
  },
  statsCard: {
    padding: 20,
    borderRadius: 12,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statsText: {
    fontSize: 14,
    lineHeight: 22,
  },
  languageOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  languageCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
    minHeight: 70,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  flagEmoji: {
    fontSize: 28,
    flexShrink: 0,
  },
  languageName: {
    fontSize: 15,
    fontWeight: '600',
    flexShrink: 0,
  },
  languageBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    flexShrink: 0,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  privacyCard: {
    padding: 20,
    borderRadius: 12,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  privacyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalScroll: {
    flex: 1,
  },
  modalContent: {
    padding: 20,
    paddingBottom: 40,
  },
  privacySection: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  privacyHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  privacySubheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  privacyBody: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  photoSection: {
    marginTop: 32,
    alignItems: 'center',
    paddingVertical: 20,
  },
  photo: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  photoCaption: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
