import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function IntroScreen() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/(auth)/signup');
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const openPrivacy = () => {
    Linking.openURL('https://brinkifysa.co.za/privacy');
  };

  const openTerms = () => {
    Linking.openURL('https://brinkifysa.co.za/terms');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <MaterialIcons name="home-repair-service" size={64} color="#007AFF" />
        <Text style={styles.heroTitle}>Welcome to Brinkify SA</Text>
        <Text style={styles.heroSubtitle}>
          South Africa’s trusted platform connecting skilled workers with homeowners.
          Get quality work. Build your reputation. Grow your income.
        </Text>
      </View>

      {/* Value Prop - Workers */}
      <View style={styles.section}>
        <View style={styles.badge}>
          <Ionicons name="construct-outline" size={20} color="#fff" />
          <Text style={styles.badgeText}>FOR WORKERS</Text>
        </View>
        <Text style={styles.sectionTitle}>Find Jobs. Build Trust. Grow Your Business.</Text>
        <View style={styles.featureGrid}>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <MaterialIcons name="verified-user" size={28} color="#27ae60" />
            </View>
            <Text style={styles.featureTitle}>Get Verified</Text>
            <Text style={styles.featureDesc}>
              Submit your ID and qualifications. Become a trusted Brinkify Pro.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <MaterialIcons name="assignment" size={28} color="#f39c12" />
            </View>
            <Text style={styles.featureTitle}>Browse Local Jobs</Text>
            <Text style={styles.featureDesc}>
              See job requests near you. Accept work that fits your skills and schedule.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <MaterialIcons name="chat" size={28} color="#3498db" />
            </View>
            <Text style={styles.featureTitle}>Chat with Customers</Text>
            <Text style={styles.featureDesc}>
              Communicate securely in-app. Clarify details, share updates, build trust.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <MaterialIcons name="star-rate" size={28} color="#FF9800" />
            </View>
            <Text style={styles.featureTitle}>Earn Reviews & Grow</Text>
            <Text style={styles.featureDesc}>
              Get rated after each job. Build your reputation and attract more customers.
            </Text>
          </View>
        </View>
      </View>

      {/* Value Prop - Customers */}
      <View style={styles.section}>
        <View style={styles.badge}>
          <Ionicons name="person-outline" size={20} color="#fff" />
          <Text style={styles.badgeText}>FOR CUSTOMERS</Text>
        </View>
        <Text style={styles.sectionTitle}>Post Jobs. Hire Pros. Get It Done Right.</Text>
        <View style={styles.featureGrid}>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <MaterialIcons name="post-add" size={28} color="#8e44ad" />
            </View>
            <Text style={styles.featureTitle}>Post a Job in Minutes</Text>
            <Text style={styles.featureDesc}>
              Describe your project, set your budget, upload reference photos.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <MaterialIcons name="location-on" size={28} color="#d35400" />
            </View>
            <Text style={styles.featureTitle}>Find Local Professionals</Text>
            <Text style={styles.featureDesc}>
              We match you with verified workers in your area. No more searching blindly.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <MaterialIcons name="payments" size={28} color="#27ae60" />
            </View>
            <Text style={styles.featureTitle}>Fair, Transparent Pricing</Text>
            <Text style={styles.featureDesc}>
              AI-powered estimates ensure you get competitive, fair quotes for your budget.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <MaterialIcons name="rate-review" size={28} color="#FF9800" />
            </View>
            <Text style={styles.featureTitle}>Review & Share</Text>
            <Text style={styles.featureDesc}>
              Leave honest reviews. Share project photos on our community newsfeed.
            </Text>
          </View>
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
        <Text style={styles.ctaSubtitle}>
          Join thousands of workers and homeowners already using Brinkify SA.
        </Text>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>✅ Create Free Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>🔑 Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By signing up, you agree to our{' '}
          <Text style={styles.linkText} onPress={openTerms}>
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text style={styles.linkText} onPress={openPrivacy}>
            Privacy Policy
          </Text>
          .
        </Text>
        <Text style={styles.copyright}>© 2025 Brinkify SA. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  hero: {
    padding: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 16,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 600,
  },
  section: {
    padding: 24,
    backgroundColor: '#fff',
    marginVertical: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 24,
    textAlign: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    lineHeight: 18,
  },
  ctaSection: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
  },
  ctaTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 500,
  },
  signUpButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  linkText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  copyright: {
    fontSize: 12,
    color: '#999',
  },
});