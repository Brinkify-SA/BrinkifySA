import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import HamburgerLayout from '../(components)/HamburgerLayout';

export default function WorkerPendingApprovalScreen() {
  const router = useRouter();
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const contactSupport = () => {
    Alert.alert(
      '📞 Contact Support',
      'Our verification team is here to help you get approved quickly.',
      [
        {
          text: 'Email Support',
          onPress: () => {
            Linking.openURL('mailto:support@brinkifysa.co.za?subject=Worker Verification Query');
          },
        },
        {
          text: 'Call Support',
          onPress: () => {
            Linking.openURL('tel:+27123456789');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const checkEmail = () => {
    Alert.alert(
      '📧 Check Your Email',
      'We’ve sent a confirmation email to the address you provided. Please check your inbox (and spam folder).',
      [
        {
          text: 'Open Email App',
          onPress: () => {
            Linking.openURL('message://');
          },
        },
        {
          text: 'OK',
        },
      ]
    );
  };

  const refreshStatus = () => {
    setCheckingStatus(true);
    // Simulate API call to check status
    setTimeout(() => {
      setCheckingStatus(false);
      setLastChecked(new Date());
      Alert.alert('🔄 Status Check', 'Your application is still under review. We’ll notify you as soon as it’s approved!');
    }, 2000);
  };

  const setupNotifications = () => {
    Alert.alert(
      '🔔 Enable Notifications',
      'To receive instant updates when your account is approved, please enable notifications in your device settings.',
      [
        {
          text: 'Show Me How',
          onPress: () => {
            Alert.alert(
              '📱 How to Enable Notifications',
              '1. Go to your device Settings\n2. Find Brinkify SA app\n3. Tap Notifications\n4. Enable Allow Notifications',
              [{ text: 'OK' }]
            );
          },
        },
        {
          text: 'Got It',
        },
      ]
    );
  };

  return (
    <HamburgerLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="hourglass-empty" size={48} color="#f39c12" />
          </View>
          <Text style={styles.title}>⏳ Almost There, Future Pro!</Text>
          <Text style={styles.subtitle}>
            Your documents are being reviewed by our verification team.
          </Text>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <MaterialIcons name="verified-user" size={28} color="#3498db" />
            <Text style={styles.statusTitle}>Verification in Progress</Text>
          </View>
          <Text style={styles.statusText}>
            Thank you for submitting your application to join Brinkify SA as a verified worker.
          </Text>
          <Text style={styles.statusText}>
            Our team is reviewing your ID and qualifications. This usually takes{' '}
            <Text style={styles.bold}>24–48 hours</Text>.
          </Text>
          <Text style={styles.statusText}>
            You’ll receive an email and in-app notification once approved.
          </Text>
        </View>

        {/* Verification Progress Tracker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Your Verification Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressStep}>
              <View style={[styles.stepIcon, styles.stepCompleted]}>
                <MaterialIcons name="check" size={16} color="#fff" />
              </View>
              <Text style={styles.stepText}>Application Submitted</Text>
            </View>
            <View style={styles.progressStep}>
              <View style={[styles.stepIcon, styles.stepActive]}>
                <MaterialIcons name="hourglass-empty" size={16} color="#fff" />
              </View>
              <Text style={styles.stepText}>Documents Under Review</Text>
            </View>
            <View style={styles.progressStep}>
              <View style={styles.stepIcon}>
                <MaterialIcons name="verified-user" size={16} color="#fff" />
              </View>
              <Text style={styles.stepText}>Account Approved</Text>
            </View>
            <View style={styles.progressStep}>
              <View style={styles.stepIcon}>
                <MaterialIcons name="assignment" size={16} color="#fff" />
              </View>
              <Text style={styles.stepText}>Start Browsing Jobs</Text>
            </View>
          </View>
        </View>

        {/* Document Checklist */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📄 Documents Submitted</Text>
          <View style={styles.checklist}>
            <View style={styles.checklistItem}>
              <MaterialIcons name="check-circle" size={20} color="#27ae60" />
              <Text style={styles.checklistText}>ID Document</Text>
            </View>
            <View style={styles.checklistItem}>
              <MaterialIcons name="check-circle" size={20} color="#27ae60" />
              <Text style={styles.checklistText}>Qualification Certificates</Text>
            </View>
            <View style={styles.checklistItem}>
              <MaterialIcons name="check-circle" size={20} color="#27ae60" />
              <Text style={styles.checklistText}>Profile Information</Text>
            </View>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📌 What You Can Do Now</Text>
          <View style={styles.tipItem}>
            <Ionicons name="mail-outline" size={20} color="#7f8c8d" />
            <Text style={styles.tipText}>Check your email for a confirmation message.</Text>
            <TouchableOpacity onPress={checkEmail}>
              <Text style={styles.tipAction}>Check Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="refresh-outline" size={20} color="#7f8c8d" />
            <Text style={styles.tipText}>Refresh to check your approval status.</Text>
            <TouchableOpacity onPress={refreshStatus} disabled={checkingStatus}>
              <Text style={[styles.tipAction, checkingStatus && styles.tipActionDisabled]}>
                {checkingStatus ? 'Checking...' : 'Refresh'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="notifications-outline" size={20} color="#7f8c8d" />
            <Text style={styles.tipText}>Enable notifications to get instant updates.</Text>
            <TouchableOpacity onPress={setupNotifications}>
              <Text style={styles.tipAction}>Set Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="help-circle-outline" size={20} color="#7f8c8d" />
            <Text style={styles.tipText}>Need help? Contact our support team.</Text>
            <TouchableOpacity onPress={contactSupport}>
              <Text style={styles.tipAction}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Last Checked */}
        {lastChecked && (
          <View style={styles.lastChecked}>
            <Text style={styles.lastCheckedText}>
              Last checked: {lastChecked.toLocaleTimeString()} on {lastChecked.toLocaleDateString()}
            </Text>
          </View>
        )}

        {/* Footer Actions */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.replace('/(auth)/login')}
          >
            <Text style={styles.secondaryButtonText}>Go to Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={contactSupport}>
            <Text style={styles.primaryButtonText}>📞 Contact Support</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </HamburgerLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fef5e7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  statusCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 12,
  },
  statusText: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  bold: {
    fontWeight: '600',
    color: '#2c3e50',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#bdc3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepCompleted: {
    backgroundColor: '#27ae60',
  },
  stepActive: {
    backgroundColor: '#f39c12',
  },
  stepText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  checklist: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checklistText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    marginLeft: 12,
    marginTop: 2,
  },
  tipAction: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  tipActionDisabled: {
    color: '#ccc',
  },
  lastChecked: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  lastCheckedText: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  secondaryButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});