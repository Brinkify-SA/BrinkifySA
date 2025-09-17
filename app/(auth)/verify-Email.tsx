import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import HamburgerLayout from '../(components)/HamburgerLayout';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { email = 'user@example.com', userType = 'customer' } = useLocalSearchParams();
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendEmail = () => {
    if (!canResend) return;

    // Simulate API call to resend verification email
    Alert.alert(
      '📧 Email Sent!',
      `A new verification link has been sent to ${email}. Please check your inbox (and spam folder).`,
      [
        {
          text: 'OK',
          onPress: () => {
            setCanResend(false);
            setCountdown(60);
          },
        },
      ]
    );
  };

  const handleOpenEmailApp = () => {
    const mailtoLink = `mailto:${email}`;
    const emailAppLink = Platform.OS === 'ios' ? 'message://' : 'mailto:';

    Linking.canOpenURL(emailAppLink)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(emailAppLink);
        } else {
          return Linking.openURL(mailtoLink);
        }
      })
      .catch((err) => {
        console.error('Error opening email app:', err);
        Alert.alert('Error', 'Could not open email app. Please check manually.');
      });
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const handleContactSupport = () => {
    Alert.alert(
      '📞 Contact Support',
      'Our team is here to help you verify your account.',
      [
        {
          text: 'Email Support',
          onPress: () => Linking.openURL('mailto:support@brinkifysa.co.za'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <HamburgerLayout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons name="email" size={64} color="#3498db" />
          <Text style={styles.title}>📧 Verify Your Email</Text>
          <Text style={styles.subtitle}>
            We’ve sent a verification link to:
          </Text>
          <View style={styles.emailContainer}>
            <Text style={styles.emailText}>{email}</Text>
          </View>
        </View>

        {/* Role-Specific Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionTitle}>
            {userType === 'worker'
              ? '👷‍♂️ Next Steps for Workers:'
              : '👩‍💻 Next Steps for Customers:'}
          </Text>
          <View style={styles.step}>
            <MaterialIcons name="check-circle" size={20} color="#27ae60" />
            <Text style={styles.stepText}>Check your inbox (and spam folder)</Text>
          </View>
          <View style={styles.step}>
            <MaterialIcons name="link" size={20} color="#f39c12" />
            <Text style={styles.stepText}>Click the verification link</Text>
          </View>
          <View style={styles.step}>
            <MaterialIcons name="lock-open" size={20} color="#3498db" />
            <Text style={styles.stepText}>
              Log in to your {userType === 'worker' ? 'Worker Dashboard' : 'Customer Dashboard'}
            </Text>
          </View>
          {userType === 'worker' && (
            <View style={styles.step}>
              <MaterialIcons name="verified-user" size={20} color="#9b59b6" />
              <Text style={styles.stepText}>Complete profile setup after login</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleOpenEmailApp}
          >
            <MaterialIcons name="mail" size={20} color="#fff" />
            <Text style={styles.buttonText}>Open Email App</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, !canResend && styles.disabledButton]}
            onPress={handleResendEmail}
            disabled={!canResend}
          >
            <MaterialIcons name="refresh" size={20} color={canResend ? "#007AFF" : "#ccc"} />
            <Text style={[styles.secondaryButtonText, !canResend && styles.disabledText]}>
              {canResend ? 'Resend Verification Email' : `Resend in ${countdown}s`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already verified? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLink}>Log In Now</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>❓ Didn’t receive the email?</Text>
          <TouchableOpacity style={styles.faqItem} onPress={() => Alert.alert('Check Spam', 'Sometimes our emails land in spam. Please check there first.')}>
            <Ionicons name="alert-circle-outline" size={16} color="#f39c12" />
            <Text style={styles.faqText}>Check your spam/junk folder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem} onPress={() => Alert.alert('Wait a Bit', 'Email delivery can take up to 5 minutes. Please wait and check again.')}>
            <Ionicons name="time-outline" size={16} color="#3498db" />
            <Text style={styles.faqText}>Wait a few minutes and check again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem} onPress={handleContactSupport}>
            <Ionicons name="help-circle-outline" size={16} color="#e74c3c" />
            <Text style={styles.faqText}>Contact support for help</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            For security, never share your verification link with anyone.
          </Text>
        </View>
      </View>
    </HamburgerLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 12,
  },
  emailContainer: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
    textAlign: 'center',
  },
  instructions: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 32,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  stepText: {
    fontSize: 15,
    color: '#555',
    marginLeft: 12,
    flex: 1,
  },
  actions: {
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
  },
  disabledButton: {
    borderColor: '#ccc',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  disabledText: {
    color: '#ccc',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 15,
    color: '#555',
  },
  loginLink: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  faqSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  faqText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 13,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },
});