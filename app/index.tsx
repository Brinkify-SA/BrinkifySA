import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Linking,
  Pressable,
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
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignUp = () => {
    setMenuOpen(false);
    router.push('/(auth)/signup');
  };

  const handleLogin = () => {
    setMenuOpen(false);
    router.push('/(auth)/login');
  };

  const handleExplore = () => {
    setMenuOpen(false);
    router.push('/explore');
  };

  const handleAbout = () => {
    setMenuOpen(false);
    router.push('/about');
  };

  const openPrivacy = () => {
    Linking.openURL('https://brinkifysa.co.za/privacy');
  };

  const openTerms = () => {
    Linking.openURL('https://brinkifysa.co.za/terms');
  };

  return (
    <View style={styles.container}>
      {/* Header with Hamburger */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerButton}>
          <MaterialIcons name="menu" size={28} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Brinkify SA</Text>
      </View>

      {/* Sidebar Menu (Conditional Render) */}
      {menuOpen && (
        <Pressable style={styles.overlay} onPress={toggleMenu}>
          <View style={styles.sidebar}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
              <MaterialIcons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuOpen(false); }}>
              <MaterialIcons name="home" size={20} color="#fff" />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleExplore}>
              <MaterialIcons name="explore" size={20} color="#fff" />
              <Text style={styles.menuText}>Explore</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogin}>
              <MaterialIcons name="lock" size={20} color="#fff" />
              <Text style={styles.menuText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleSignUp}>
              <MaterialIcons name="person-add" size={20} color="#fff" />
              <Text style={styles.menuText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleAbout}>
              <MaterialIcons name="info-outline" size={20} color="#fff" />
              <Text style={styles.menuText}>About Us</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <MaterialIcons name="home-repair-service" size={72} color="#007AFF" />
          <Text style={styles.heroTitle}>Brinkify SA</Text>
          <Text style={styles.heroT}>
            South Africa’s Trusted Platform Connecting Skilled Workers & Homeowners
          </Text>
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
              Get verified, browse local job requests, chat with customers, and earn reviews to grow your
              reputation.
            </Text>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                setMenuOpen(false);
                router.push('/(auth)/worker-register');
              }}
            >
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
              Describe your project, set your budget, get matched with verified local workers, and track
              progress in-app.
            </Text>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleLogin}>
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
            <Text style={styles.linkText} onPress={openTerms}>
              Terms
            </Text>{' '}
            •{' '}
            <Text style={styles.linkText} onPress={openPrivacy}>
              Privacy
            </Text>{' '}
            •{' '}
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL('mailto:support@brinkifysa.co.za')}
            >
              Contact
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10,
  },
  hamburgerButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.75,
    height: '100%',
    backgroundColor: '#007AFF',
    padding: 24,
    paddingTop: 60,
    zIndex: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 16,
  },
  content: {
    flex: 1,
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
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 12,
    borderRadius: 25,
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  finalCta: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    borderRadius: 16,
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