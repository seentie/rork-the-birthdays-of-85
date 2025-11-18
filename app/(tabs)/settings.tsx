import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, useWindowDimensions } from 'react-native';
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
  const isTablet = width >= 768;
  const containerWidth = isTablet ? Math.min(width * 0.7, 700) : '100%';

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
                  (Última Actualización: Enero 2025)
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Resumen</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  OLD SKOOL APPS ("nosotros", "nuestro" o "nos") respeta su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos su información cuando usa nuestra aplicación móvil.
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Información que Recopilamos</Text>
                
                <Text style={[styles.privacySubheading, { color: theme.text }]}>Información que Usted Proporciona</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  • Información de cuenta (nombre, dirección de correo electrónico){"\n"}
                  • Información de perfil que elige compartir{"\n"}
                  • Contenido que crea o carga{"\n"}
                  • Comunicaciones con nosotros
                </Text>

                <Text style={[styles.privacySubheading, { color: theme.text }]}>Información Recopilada Automáticamente</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  • Información del dispositivo (tipo de dispositivo, sistema operativo){"\n"}
                  • Datos de uso (cómo interactúa con la aplicación){"\n"}
                  • Datos de registro (fallos de la aplicación, métricas de rendimiento){"\n"}
                  • Datos de ubicación (si otorga permiso)
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Cómo Usamos su Información</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Usamos su información para:{"\n\n"}
                  • Proporcionar y mejorar nuestros servicios de aplicación{"\n"}
                  • Crear y mantener su cuenta{"\n"}
                  • Enviar actualizaciones y notificaciones importantes{"\n"}
                  • Responder a sus preguntas y solicitudes de soporte{"\n"}
                  • Analizar el uso de la aplicación para mejorar la experiencia del usuario{"\n"}
                  • Garantizar la seguridad de la aplicación y prevenir fraudes
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Compartir Información</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  No vendemos su información personal. Solo podemos compartir su información en estas situaciones:{"\n\n"}
                  • Con su consentimiento - Cuando usted acepta explícitamente{"\n"}
                  • Proveedores de servicios - Terceros que nos ayudan a operar la aplicación{"\n"}
                  • Requisitos legales - Cuando lo requiera la ley o para proteger derechos y seguridad{"\n"}
                  • Transferencias comerciales - Si nuestra empresa es vendida o fusionada
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Seguridad de Datos</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Implementamos medidas de seguridad apropiadas para proteger su información, incluyendo:{"\n\n"}
                  • Cifrado de datos sensibles{"\n"}
                  • Transmisión segura de datos{"\n"}
                  • Evaluaciones de seguridad regulares{"\n"}
                  • Acceso limitado a información personal
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Sus Derechos</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Usted tiene derecho a:{"\n\n"}
                  • Acceder a su información personal{"\n"}
                  • Corregir información inexacta{"\n"}
                  • Eliminar su cuenta y datos{"\n"}
                  • Optar por no recibir comunicaciones de marketing{"\n"}
                  • Solicitar portabilidad de datos (cuando corresponda){"\n\n"}
                  Para ejercer estos derechos, contáctenos en www.oldskoolapps.com
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Privacidad de Menores</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Nuestra aplicación no está destinada a niños menores de 13 años. No recopilamos a sabiendas información personal de niños menores de 13 años. Si descubrimos que hemos recopilado dicha información, la eliminaremos de inmediato.
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Servicios de Terceros</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Nuestra aplicación puede contener enlaces a servicios de terceros o integrarse con otras plataformas. Esta política de privacidad no se aplica a esos servicios. Revise sus políticas de privacidad por separado.
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Cambios a Esta Política</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos de cambios significativos mediante:{"\n\n"}
                  • Publicando la política actualizada en la aplicación{"\n"}
                  • Enviándole una notificación por correo electrónico{"\n"}
                  • Mostrando un aviso cuando abra la aplicación la próxima vez
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Contáctenos</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Si tiene preguntas sobre esta Política de Privacidad o nuestras prácticas de privacidad, contáctenos en:{"\n\n"}
                  Correo electrónico: sarah@oldskoolapps.com{"\n"}
                  Dirección: 2114 N Flamingo Road #867, Pembroke Pines, FL 33028{"\n"}
                  Teléfono: (646)-540-9602{"\n\n"}
                  Versión de la aplicación: 1.0
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
                  (Last Updated: January 2025)
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Overview</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  OLD SKOOL APPS ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our mobile application.
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Information We Collect</Text>
                
                <Text style={[styles.privacySubheading, { color: theme.text }]}>Information You Provide</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  ��� Account information (name, email address){"\n"}
                  • Profile information you choose to share{"\n"}
                  • Content you create or upload{"\n"}
                  • Communications with us
                </Text>

                <Text style={[styles.privacySubheading, { color: theme.text }]}>Information Automatically Collected</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  • Device information (device type, operating system){"\n"}
                  • Usage data (how you interact with the app){"\n"}
                  • Log data (app crashes, performance metrics){"\n"}
                  • Location data (if you grant permission)
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>How We Use Your Information</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  We use your information to:{"\n\n"}
                  • Provide and improve our app services{"\n"}
                  • Create and maintain your account{"\n"}
                  • Send important updates and notifications{"\n"}
                  • Respond to your questions and support requests{"\n"}
                  • Analyze app usage to improve user experience{"\n"}
                  • Ensure app security and prevent fraud
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Information Sharing</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  We do not sell your personal information. We may share your information only in these situations:{"\n\n"}
                  • With your consent - When you explicitly agree{"\n"}
                  • Service providers - Third parties who help us operate the app{"\n"}
                  • Legal requirements - When required by law or to protect rights and safety{"\n"}
                  • Business transfers - If our company is sold or merged
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Data Security</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  We implement appropriate security measures to protect your information, including:{"\n\n"}
                  • Encryption of sensitive data{"\n"}
                  • Secure data transmission{"\n"}
                  • Regular security assessments{"\n"}
                  • Limited access to personal information
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Your Rights</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  You have the right to:{"\n\n"}
                  • Access your personal information{"\n"}
                  • Correct inaccurate information{"\n"}
                  • Delete your account and data{"\n"}
                  • Opt out of marketing communications{"\n"}
                  • Request data portability (where applicable){"\n\n"}
                  To exercise these rights, contact us at www.oldskoolapps.com
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Children's Privacy</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Our app is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we discover we have collected such information, we will delete it promptly.
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Third-Party Services</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  Our app may contain links to third-party services or integrate with other platforms. This privacy policy does not apply to those services. Please review their privacy policies separately.
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Changes to This Policy</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  We may update this Privacy Policy from time to time. We will notify you of significant changes by:{"\n\n"}
                  • Posting the updated policy in the app{"\n"}
                  • Sending you an email notification{"\n"}
                  • Displaying a notice when you next open the app
                </Text>

                <Text style={[styles.privacyHeading, { color: theme.primary }]}>Contact Us</Text>
                <Text style={[styles.privacyBody, { color: theme.text }]}>
                  If you have questions about this Privacy Policy or our privacy practices, please contact us at:{"\n\n"}
                  Email: sarah@oldskoolapps.com{"\n"}
                  Address: 2114 N Flamingo Road #867, Pembroke Pines, FL 33028{"\n"}
                  Phone: (646)-540-9602{"\n\n"}
                  App version: 1.0
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