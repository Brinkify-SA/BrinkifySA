import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function WorkerPendingApprovalScreen() {
  const router = useRouter();

  const contactSupport = () => {
    Alert.alert(
      'Contact Support',
      'Would you like to email our verification team?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send Email',
          onPress: () => {
            Linking.openURL('mailto:support@brinkifysa.co.za?subject=Worker Verification Query');
          },
        },
      ]
    );
  };

  const checkEmail = () => {
    Alert.alert(
      'Check Your Email',
      'We’ve sent a confirmation email to the address you provided. Please check your inbox (and spam folder).'
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="hourglass-empty" size={48} color="#f39c12" />
        </View>
        <Text style={styles.title}>⏳ Almost There!</Text>
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
          Our team is reviewing your ID and qualifications. This usually takes <Text style={styles.bold}>24–48 hours</Text>.
        </Text>
        <Text style={styles.statusText}>
          You’ll receive an email and in-app notification once approved.
        </Text>
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
          <Ionicons name="document-text-outline" size={20} color="#7f8c8d" />
          <Text style={styles.tipText}>Ensure your documents are clear and valid.</Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="help-circle-outline" size={20} color="#7f8c8d" />
          <Text style={styles.tipText}>Need help? Contact our support team.</Text>
          <TouchableOpacity onPress={contactSupport}>
            <Text style={styles.tipAction}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notification Note */}
      <View style={styles.noteCard}>
        <MaterialIcons name="notifications-active" size={24} color="#27ae60" />
        <Text style={styles.noteTitle}>Stay Updated</Text>
        <Text style={styles.noteText}>
          Make sure notifications are enabled so you don’t miss your approval alert!
        </Text>
      </View>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace('/(auth)/login')}
        >
          <Text style={styles.secondaryButtonText}>Go to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={contactSupport}>
          <Text style={styles.primaryButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 60 }} />
    </ScrollView>
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
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
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
  noteCard: {
    backgroundColor: '#e8f4f8',
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2980b9',
    marginLeft: 12,
  },
  noteText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 12,
    flex: 1,
    lineHeight: 18,
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
    borderRadius: 10,
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
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});