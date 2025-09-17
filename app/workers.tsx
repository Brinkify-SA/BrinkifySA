// app/workers.tsx
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HamburgerLayout from './(components)/HamburgerLayout';

export default function WorkersScreen() {
  const workers = [
    {
      id: 1,
      name: "John M.",
      skill: "Plumber Pro",
      rating: 4.9,
      jobs: 32,
      location: "Pretoria",
      image: "https://via.placeholder.com/100x100.png?text=John",
    },
    {
      id: 2,
      name: "Lerato P.",
      skill: "Tiling Expert",
      rating: 4.8,
      jobs: 27,
      location: "Johannesburg",
      image: "https://via.placeholder.com/100x100.png?text=Lerato", // ✅ Fixed whitespace
    },
    {
      id: 3,
      name: "Sipho K.",
      skill: "Electrician",
      rating: 4.7,
      jobs: 40,
      location: "Durban",
      image: "https://via.placeholder.com/100x100.png?text=Sipho", // ✅ Fixed whitespace
    },
  ];

  const handleViewProfile = (workerName: string) => {
    Alert.alert("👷 Worker Profile", `Viewing profile for ${workerName}`);
    // later: router.push(`/worker/${id}`)
  };

  return (
    <HamburgerLayout> {/* ✅ Wrap with HamburgerLayout */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>🔎 Find Skilled Workers</Text>
        <Text style={styles.subtitle}>
          Browse professionals by skill, rating, and location.
        </Text>

        <View style={styles.workerList}>
          {workers.map((worker) => (
            <View key={worker.id} style={styles.workerCard}>
              <Image source={{ uri: worker.image }} style={styles.avatar} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.workerName}>{worker.name}</Text>
                <Text style={styles.workerSkill}>{worker.skill}</Text>
                <Text style={styles.workerLocation}>📍 {worker.location}</Text>
                <Text style={styles.workerJobs}>
                  ✅ {worker.jobs} jobs completed
                </Text>
                <Text style={styles.workerRating}>⭐ {worker.rating} rating</Text>
              </View>
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => handleViewProfile(worker.name)}
              >
                <MaterialIcons name="visibility" size={20} color="#fff" />
                <Text style={styles.viewBtnText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </HamburgerLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 16 },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  workerList: { marginTop: 8 },
  workerCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  workerName: { fontSize: 16, fontWeight: "600", color: "#2c3e50" },
  workerSkill: { fontSize: 14, color: "#007AFF", marginBottom: 2 },
  workerLocation: { fontSize: 13, color: "#555" },
  workerJobs: { fontSize: 13, color: "#27ae60" },
  workerRating: { fontSize: 13, color: "#FF9800" },
  viewBtn: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  viewBtnText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 4,
  },
});