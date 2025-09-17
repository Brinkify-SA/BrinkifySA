import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HamburgerLayout from '../(components)/HamburgerLayout';

export default function WorkerProfileScreen() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [workArea, setWorkArea] = useState('Johannesburg, Gauteng');

  const mockWorker = {
    name: "Thabo Nkosi",
    trade: "Ceiling Specialist",
    location: "Johannesburg",
    rating: 4.9,
    reviewsCount: 12,
    bio: "Experienced ceiling and interior design specialist with over 8 years in the industry. Passionate about modern, high-quality finishes.",
    profilePic: "https://randomuser.me/api/portraits/men/46.jpg",
    skills: ["Ceiling Installation", "Drywall", "Painting", "Interior Finishes"],
    portfolio: [
      "https://via.placeholder.com/300x200/007AFF/FFFFFF?text=Project+1",
      "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Project+2",
      "https://via.placeholder.com/300x200/f39c12/FFFFFF?text=Project+3",
    ],
    reviews: [
      {
        id: 1,
        customer: "Sarah K.",
        text: "Amazing work! My ceiling looks brand new.",
        rating: 5,
        postedAt: "2 weeks ago",
      },
      {
        id: 2,
        customer: "David M.",
        text: "Professional and reliable. Highly recommend!",
        rating: 5,
        postedAt: "1 month ago",
      },
    ],
    stats: {
      totalJobs: 42,
      completedJobs: 40,
      totalEarnings: 18500,
      responseTime: "2 hours",
    },
  };

  const handleEditProfile = () => {
    Alert.alert('✏️ Edit Profile', 'Profile editing coming soon!');
  };

  const handleShareProfile = () => {
    Alert.alert('📤 Share Profile', 'Sharing profile via email, WhatsApp, etc.');
  };

  const handleSetWorkArea = () => {
    Alert.alert(
      '📍 Set Work Area',
      'Enter your service area (e.g., Johannesburg, Pretoria, Midrand)',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: () => Alert.alert('✅ Work Area Updated', 'Your service area has been updated.'),
        },
      ]
    );
  };

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    Alert.alert(
      '✅ Availability Updated',
      `You are now ${isAvailable ? 'Busy' : 'Available'} for new jobs.`
    );
  };

  return (
    <HamburgerLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <MaterialIcons name="edit" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={handleShareProfile}>
            <MaterialIcons name="share" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Image source={{ uri: mockWorker.profilePic }} style={styles.avatar} />
          <Text style={styles.name}>{mockWorker.name}</Text>
          <Text style={styles.trade}>{mockWorker.trade}</Text>
          <Text style={styles.location}>📍 {mockWorker.location}</Text>

          {/* Ratings */}
          <View style={styles.ratingRow}>
            {[...Array(5)].map((_, i) => (
              <MaterialIcons
                key={i}
                name={i < Math.floor(mockWorker.rating) ? "star" : "star-border"}
                size={18}
                color={i < Math.floor(mockWorker.rating) ? "#FF9800" : "#ddd"}
              />
            ))}
            <Text style={styles.ratingText}>
              {mockWorker.rating} ({mockWorker.reviewsCount} reviews)
            </Text>
          </View>

          {/* Availability Toggle */}
          <View style={styles.availabilityRow}>
            <Text style={styles.availabilityText}>
              {isAvailable ? "✅ Available" : "⛔ Busy"}
            </Text>
            <Switch
              value={isAvailable}
              onValueChange={toggleAvailability}
              trackColor={{ false: "#ccc", true: "#4cd964" }}
              thumbColor={isAvailable ? "#fff" : "#f4f3f4"}
            />
          </View>

          {/* Hire Button */}
          <TouchableOpacity style={styles.hireButton}>
            <MaterialIcons name="work" size={20} color="#fff" />
            <Text style={styles.hireButtonText}>Hire Me</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Performance Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <MaterialIcons name="assignment" size={24} color="#007AFF" />
              <Text style={styles.statNumber}>{mockWorker.stats.completedJobs}</Text>
              <Text style={styles.statLabel}>Jobs Completed</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="attach-money" size={24} color="#27ae60" />
              <Text style={styles.statNumber}>R{mockWorker.stats.totalEarnings.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Total Earnings</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="timer" size={24} color="#f39c12" />
              <Text style={styles.statNumber}>{mockWorker.stats.responseTime}</Text>
              <Text style={styles.statLabel}>Avg Response Time</Text>
            </View>
          </View>
        </View>

        {/* Work Area Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📍 Work Area</Text>
            <TouchableOpacity onPress={handleSetWorkArea}>
              <MaterialIcons name="edit" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.workAreaText}>{workArea}</Text>
          <Text style={styles.workAreaHint}>
            Customers in your work area will be matched with you for job requests.
          </Text>
        </View>

        {/* Bio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 About Me</Text>
          <Text style={styles.paragraph}>{mockWorker.bio}</Text>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛠️ Skills & Expertise</Text>
          <View style={styles.skillsRow}>
            {mockWorker.skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Portfolio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🖼️ Portfolio</Text>
          {mockWorker.portfolio.length > 0 ? (
            <View style={styles.portfolioGrid}>
              {mockWorker.portfolio.map((img, index) => (
                <Image key={index} source={{ uri: img }} style={styles.portfolioImg} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="photo-library" size={48} color="#bdc3c7" />
              <Text style={styles.emptyText}>No portfolio items yet</Text>
              <Text style={styles.emptySubtext}>Add photos of your completed projects to showcase your work</Text>
            </View>
          )}
        </View>

        {/* Reviews Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ Customer Reviews</Text>
          {mockWorker.reviews.length > 0 ? (
            mockWorker.reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewCustomer}>{review.customer}</Text>
                  <Text style={styles.reviewDate}>{review.postedAt}</Text>
                </View>
                <View style={styles.reviewRating}>
                  {[...Array(5)].map((_, i) => (
                    <MaterialIcons
                      key={i}
                      name={i < review.rating ? "star" : "star-border"}
                      size={14}
                      color={i < review.rating ? "#FF9800" : "#ddd"}
                    />
                  ))}
                </View>
                <Text style={styles.reviewText}>“{review.text}”</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="star-outline" size={48} color="#bdc3c7" />
              <Text style={styles.emptyText}>No reviews yet</Text>
              <Text style={styles.emptySubtext}>Complete jobs to start receiving reviews from customers</Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Profile last updated: Today</Text>
          <Text style={styles.footerSubtext}>Keep your profile updated to get more job offers</Text>
        </View>
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
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 8,
  },
  shareButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  trade: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  location: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#555',
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 12,
    width: '100%',
    maxWidth: 300,
  },
  availabilityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  hireButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27ae60',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#27ae60',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  hireButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  workAreaText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  workAreaHint: {
    fontSize: 13,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },
  paragraph: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skillText: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '500',
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  portfolioImg: {
    width: '30%',
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7f8c8d',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#bdc3c7',
    textAlign: 'center',
    lineHeight: 20,
  },
  reviewCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewCustomer: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  reviewDate: {
    fontSize: 12,
    color: '#95a5a6',
  },
  reviewRating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 16,
  },
  footerText: {
    fontSize: 13,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#bdc3c7',
    marginTop: 4,
  },
});