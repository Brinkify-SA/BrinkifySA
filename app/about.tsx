// app/about.tsx
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HamburgerLayout from './(components)/HamburgerLayout';

export default function AboutScreen() {
  return (
    <HamburgerLayout> {/* ✅ Wrap with HamburgerLayout */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>ℹ️ About Brinkify SA</Text>
          <Text style={styles.subtitle}>
            Connecting Skilled Workers & Homeowners Across South Africa
          </Text>

          {/* Mission */}
          <View style={styles.section}>
            <MaterialIcons name="flag" size={28} color="#007AFF" />
            <Text style={styles.sectionHeader}>Our Mission</Text>
            <Text style={styles.paragraph}>
              Brinkify SA empowers skilled tradespeople and simplifies home
              improvement for customers. We verify every worker, match you
              locally, and ensure fair pricing through AI-powered tools.
            </Text>
          </View>

          {/* How It Works for Workers */}
          <View style={styles.section}>
            <MaterialIcons name="engineering" size={28} color="#27ae60" />
            <Text style={styles.sectionHeader}>For Workers</Text>
            <Text style={styles.paragraph}>
              ✔️ Get verified and showcase your skills {"\n"}
              ✔️ Build a trusted professional profile {"\n"}
              ✔️ Browse and accept local job requests {"\n"}
              ✔️ Chat securely with customers {"\n"}
              ✔️ Earn reviews and grow your business
            </Text>
          </View>

          {/* How It Works for Customers */}
          <View style={styles.section}>
            <MaterialIcons name="home-repair-service" size={28} color="#f39c12" />
            <Text style={styles.sectionHeader}>For Customers</Text>
            <Text style={styles.paragraph}>
              🏡 Post jobs with descriptions, budgets & photos {"\n"}
              👷 Browse verified worker profiles {"\n"}
              💬 Communicate via in-app secure chat {"\n"}
              ⭐ Leave reviews and share experiences {"\n"}
              📢 Engage in our community newsfeed
            </Text>
          </View>

          {/* Values */}
          <View style={styles.section}>
            <MaterialIcons name="favorite" size={28} color="#e74c3c" />
            <Text style={styles.sectionHeader}>Our Values</Text>
            <View style={styles.valuesRow}>
              <View style={styles.valueCard}>
                <MaterialIcons name="verified-user" size={24} color="#27ae60" />
                <Text style={styles.valueText}>Trust</Text>
              </View>
              <View style={styles.valueCard}>
                <MaterialIcons name="visibility" size={24} color="#3498db" />
                <Text style={styles.valueText}>Transparency</Text>
              </View>
              <View style={styles.valueCard}>
                <MaterialIcons name="star" size={24} color="#f39c12" />
                <Text style={styles.valueText}>Quality</Text>
              </View>
              <View style={styles.valueCard}>
                <MaterialIcons name="groups" size={24} color="#9b59b6" />
                <Text style={styles.valueText}>Community</Text>
              </View>
            </View>
          </View>

          {/* Closing */}
          <View style={styles.section}>
            <MaterialIcons name="handshake" size={28} color="#007AFF" />
            <Text style={styles.sectionHeader}>Why Brinkify?</Text>
            <Text style={styles.paragraph}>
              We bridge the gap between skilled workers and homeowners by
              providing a trusted, transparent, and engaging platform. Whether
              you're growing your career or improving your home, Brinkify SA is
              where quality meets trust.
            </Text>
          </View>
        </View>
      </ScrollView>
    </HamburgerLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 24,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
    marginTop: 8,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },
  valuesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  valueCard: {
    width: "47%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  valueText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
  },
});