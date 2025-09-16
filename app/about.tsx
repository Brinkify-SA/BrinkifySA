// app/about.tsx
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>ℹ️ About Brinkify SA</Text>
        <Text style={styles.subtitle}>
          Connecting Skilled Workers & Homeowners Across South Africa
        </Text>

        <Text style={styles.sectionHeader}>Our Mission</Text>
        <Text style={styles.paragraph}>
          Brinkify SA empowers skilled tradespeople and simplifies home improvement for customers. 
          We verify every worker, match you locally, and ensure fair pricing through AI-powered tools.
        </Text>

        <Text style={styles.sectionHeader}>For Workers</Text>
        <Text style={styles.paragraph}>
          ✅ Get verified and build your reputation {'\n'}
          ✅ Browse local job requests {'\n'}
          ✅ Chat securely with customers {'\n'}
          ✅ Earn reviews and grow your business
        </Text>

        <Text style={styles.sectionHeader}>For Customers</Text>
        <Text style={styles.paragraph}>
          ✅ Post jobs with budget & photos {'\n'}
          ✅ View worker profiles and ratings {'\n'}
          ✅ Communicate via in-app chat {'\n'}
          ✅ Leave reviews and share on our newsfeed
        </Text>

        <Text style={styles.sectionHeader}>Our Values</Text>
        <Text style={styles.paragraph}>
          Trust • Transparency • Quality • Community
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
  content: {
    padding: 24,
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
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
  },
});