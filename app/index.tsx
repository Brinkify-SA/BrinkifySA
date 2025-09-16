import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;

export default function LandingPage() {
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
        <MaterialIcons name="home-repair-service" size={72} color="#007AFF" />
        <Text style={styles.heroTitle}>Brinkify SA</Text>
        <Text style={styles.heroT}> South Africa’s Trusted Platform Connecting Skilled Workers & Homeowners</Text>
        <Text style={styles.heroSubtitle}>
         
          Get quality work. Build your reputation. Grow your income.
        </Text>
        {/* Final CTA */}
      <View style={styles.finalCta}>
        <Text style={styles.finalCtaTitle}>Ready to Transform Your Home or Career?</Text>
        <Text style={styles.finalCtaSubtitle}>
          Join Brinkify SA today — where skilled work meets trusted service.
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
          <Text style={styles.primaryButtonText}>✅ Sign Up Free</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ghostButton} onPress={handleLogin}>
          <Text style={styles.ghostButtonText}>🔑 Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
      </View>

      {/* How It Works - Split View */}
      <View style={styles.howItWorks}>
        <View style={styles.halfSection}>
          <View style={styles.badge}>
            <Ionicons name="construct-outline" size={20} color="#fff" />
            <Text style={styles.badgeText}>FOR WORKERS</Text>
          </View>
          <Text style={styles.halfTitle}>Find Jobs. Build Trust. Grow.</Text>
          <Text style={styles.halfDesc}>
            Get verified, browse local job requests, chat with customers, and earn reviews to grow your reputation.
          </Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/(auth)/worker-register')}>
            <Text style={styles.secondaryButtonText}>👷 Register as Worker</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.halfSection, styles.halfSectionRight]}>
          <View style={styles.badge}>
            <Ionicons name="person-outline" size={20} color="#fff" />
            <Text style={styles.badgeText}>FOR CUSTOMERS</Text>
          </View>
          <Text style={styles.halfTitle}>Post Jobs. Hire Pros. Done Right.</Text>
          <Text style={styles.halfDesc}>
            Describe your project, set your budget, get matched with verified local workers, and track progress in-app.
          </Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.secondaryButtonText}>🏡 Post a Job</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Key Features Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose Brinkify SA?</Text>
        <View style={styles.featureGrid}>
          <View style={styles.featureCard}>
            <MaterialIcons name="verified-user" size={32} color="#27ae60" />
            <Text style={styles.featureTitle}>Verified Professionals</Text>
            <Text style={styles.featureDesc}>
              Every worker is ID-verified and background-checked for your safety.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <MaterialIcons name="location-on" size={32} color="#f39c12" />
            <Text style={styles.featureTitle}>Local Matching</Text>
            <Text style={styles.featureDesc}>
              We connect you with skilled workers in your neighborhood.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <MaterialIcons name="chat" size={32} color="#3498db" />
            <Text style={styles.featureTitle}>Secure In-App Chat</Text>
            <Text style={styles.featureDesc}>
              Communicate directly, share photos, and confirm details safely.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <MaterialIcons name="payments" size={32} color="#8e44ad" />
            <Text style={styles.featureTitle}>Fair Commission Model</Text>
            <Text style={styles.featureDesc}>
              Transparent pricing. You only pay when you’re satisfied.
            </Text>
          </View>
        </View>
      </View>

      {/* Testimonials / Social Proof */}
      <View style={styles.testimonialSection}>
        <Text style={styles.sectionTitle}>Trusted by Thousands</Text>
        <View style={styles.testimonialCard}>
          <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <MaterialIcons key={i} name="star" size={18} color="#FF9800" />
            ))}
          </View>
          <Text style={styles.testimonialText}>
            “Brinkify connected me with a top-rated electrician in 2 hours. Job done perfectly!”
          </Text>
          <Text style={styles.testimonialAuthor}>— Sarah K., Cape Town</Text>
        </View>
        <View style={styles.testimonialCard}>
          <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <MaterialIcons key={i} name="star" size={18} color="#FF9800" />
            ))}
          </View>
          <Text style={styles.testimonialText}>
            “Since joining Brinkify, my monthly income doubled. Great platform for serious workers.”
          </Text>
          <Text style={styles.testimonialAuthor}>— Thabo N., Johannesburg</Text>
        </View>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.logoRow}>
          <MaterialIcons name="home-repair-service" size={24} color="#007AFF" />
          <Text style={styles.logoText}>Brinkify SA</Text>
        </View>
        <Text style={styles.footerText}>
          © 2025 Brinkify SA. Connecting skilled workers with homeowners across South Africa.
        </Text>
        <Text style={styles.footerLinks}>
          <Text style={styles.linkText} onPress={openTerms}>Terms</Text> •{' '}
          <Text style={styles.linkText} onPress={openPrivacy}>Privacy</Text> •{' '}
          <Text style={styles.linkText} onPress={() => Linking.openURL('mailto:support@brinkifysa.co.za')}>
            Contact
          </Text>
        </Text>
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
    backgroundColor: '#007AFF',
    color: '#fff',
    marginLeft: 6,
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 12,
    borderRadius:25,
    textAlign: 'center',
  },
  heroT: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 12,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 600,
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  howItWorks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  halfSection: {
    width: '50%',
    padding: 24,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  halfSectionRight: {
    borderRightWidth: 0,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
  },
  badge: {
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
  halfTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 12,
  },
  halfDesc: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    maxWidth: 280,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 24,
    backgroundColor: '#fff',
    marginVertical: 1,
  },
  sectionTitle: {
    fontSize: 24,
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
    width: CARD_WIDTH,
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
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    lineHeight: 18,
  },
  testimonialSection: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  testimonialCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginVertical: 12,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  testimonialText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 22,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  finalCta: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
  },
  finalCtaTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  finalCtaSubtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 500,
  },
  primaryButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  ghostButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  ghostButtonText: {
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
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginLeft: 8,
  },
  footerText: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerLinks: {
    fontSize: 13,
    color: '#777',
  },
  linkText: {
    color: '#007AFF',
    fontWeight: '500',
  },
});