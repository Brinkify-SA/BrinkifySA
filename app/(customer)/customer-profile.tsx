import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HamburgerLayout from '../(components)/HamburgerLayout';

export default function CustomerProfile() {
  const customer = {
    name: 'Sarah K.',
    location: 'Pretoria',
    email: 'sarah.k@example.com',
    verified: true,
    profileCompletion: 80, // Percentage
  };

  const jobHistory = [
    {
      id: 1,
      title: 'Bathroom Renovation',
      status: 'completed',
      budget: 'R12,000',
      worker: 'Thabo N.',
      postedAt: '2025-03-15',
      ratingGiven: true,
    },
    {
      id: 2,
      title: 'Painting Living Room',
      status: 'in-progress',
      budget: 'R4,500',
      worker: 'Lerato M.',
      postedAt: '2025-04-01',
      ratingGiven: false,
    },
    {
      id: 3,
      title: 'Garden Landscaping',
      status: 'open',
      budget: 'R6,800',
      worker: null,
      postedAt: '2025-04-10',
      ratingGiven: false,
    },
  ];

  const reviews = [
    {
      id: 1,
      job: 'Bathroom Renovation',
      worker: 'Thabo N.',
      rating: 5,
      comment: 'Thabo did an amazing job! Very professional and clean work.',
      postedAt: '2025-03-20',
    },
    {
      id: 2,
      job: 'Kitchen Ceiling Installation',
      worker: 'Sipho K.',
      rating: 4,
      comment: 'Good work, but took a bit longer than expected.',
      postedAt: '2025-02-10',
    },
  ];

  const handleEditProfile = () => {
    Alert.alert('✏️ Edit Profile', 'Profile editing coming soon!');
  };

  const handleViewJob = (jobId: number) => {
    Alert.alert('📄 Job Details', `Viewing details for job #${jobId}`);
  };

  const handleChat = (workerName: string) => {
    Alert.alert('💬 Chat', `Starting chat with ${workerName}`);
  };

  const handleLeaveReview = (jobId: number, workerName: string) => {
    Alert.alert(
      '⭐ Leave Review',
      `How would you rate your experience with ${workerName}?`,
      [
        { text: '⭐️ 1', onPress: () => submitReview(jobId, 1) },
        { text: '⭐️⭐️ 2', onPress: () => submitReview(jobId, 2) },
        { text: '⭐️⭐️⭐️ 3', onPress: () => submitReview(jobId, 3) },
        { text: '⭐️⭐️⭐️⭐️ 4', onPress: () => submitReview(jobId, 4) },
        { text: '⭐️⭐️⭐️⭐️⭐️ 5', onPress: () => submitReview(jobId, 5) },
      ],
      { cancelable: true }
    );
  };

  const submitReview = (jobId: number, rating: number) => {
    Alert.alert('✅ Thank You!', `You rated this worker ${rating} stars.`);
    // In real app: POST to API
  };

  const handleContactSupport = () => {
    Alert.alert(
      '📞 Contact Support',
      'Our team is here to help you with any questions or issues.',
      [
        {
          text: 'Email Support',
          onPress: () => Alert.alert('Email', 'support@brinkifysa.co.za'),
        },
        {
          text: 'Call Support',
          onPress: () => Alert.alert('Phone', '+27 12 345 6789'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleSettings = () => {
    Alert.alert('⚙️ Settings', 'Settings page coming soon!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#27ae60';
      case 'in-progress': return '#f39c12';
      case 'open': return '#3498db';
      default: return '#95a5a6';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '✅ Completed';
      case 'in-progress': return '⏳ In Progress';
      case 'open': return '📌 Posted';
      default: return 'Unknown';
    }
  };

  return (
    <HamburgerLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons name="person" size={80} color="#007AFF" />
          <Text style={styles.name}>{customer.name}</Text>
          <Text style={styles.location}>📍 {customer.location}</Text>
          <Text style={styles.email}>{customer.email}</Text>
          {customer.verified && (
            <View style={styles.verifiedContainer}>
              <MaterialIcons name="verified" size={16} color="#27ae60" />
              <Text style={styles.verified}>Verified Account</Text>
            </View>
          )}
          <TouchableOpacity style={styles.editBtn} onPress={handleEditProfile}>
            <MaterialIcons name="edit" size={18} color="#fff" />
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Completion */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📊 Profile Completion</Text>
            <TouchableOpacity onPress={handleSettings}>
              <MaterialIcons name="settings" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View style={[styles.progressFill, { width: `${customer.profileCompletion}%` }]} />
            </View>
            <Text style={styles.progressText}>{customer.profileCompletion}% Complete</Text>
          </View>
          <Text style={styles.progressHint}>
            Complete your profile to get better job matches and recommendations.
          </Text>
        </View>

        {/* Job History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🛠️ Job History</Text>
            <Text style={styles.sectionCount}>({jobHistory.length} jobs)</Text>
          </View>
          {jobHistory.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(job.status)}</Text>
                </View>
              </View>
              <Text style={styles.jobBudget}>💰 Budget: {job.budget}</Text>
              {job.worker && <Text style={styles.jobWorker}>👷 Worker: {job.worker}</Text>}
              <Text style={styles.jobDate}>📅 Posted: {job.postedAt}</Text>
              <View style={styles.jobActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleViewJob(job.id)}
                >
                  <MaterialIcons name="visibility" size={16} color="#007AFF" />
                  <Text style={styles.actionText}>View Details</Text>
                </TouchableOpacity>
                {job.worker && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleChat(job.worker)}
                  >
                    <MaterialIcons name="chat" size={16} color="#3498db" />
                    <Text style={styles.actionText}>Chat</Text>
                  </TouchableOpacity>
                )}
                {job.status === 'completed' && !job.ratingGiven && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleLeaveReview(job.id, job.worker || '')}
                  >
                    <MaterialIcons name="rate-review" size={16} color="#FF9800" />
                    <Text style={styles.actionText}>Leave Review</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>⭐ My Reviews</Text>
            <Text style={styles.sectionCount}>({reviews.length} reviews)</Text>
          </View>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewJob}>Job: {review.job}</Text>
                <View style={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <MaterialIcons
                      key={i}
                      name={i < review.rating ? 'star' : 'star-border'}
                      size={14}
                      color={i < review.rating ? '#FF9800' : '#ddd'}
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewWorker}>Worker: {review.worker}</Text>
              <Text style={styles.reviewText}>“{review.comment}”</Text>
              <Text style={styles.reviewDate}>Posted on {review.postedAt}</Text>
            </View>
          ))}
        </View>

        {/* Support Section */}
        <View style={styles.supportSection}>
          <Text style={styles.supportTitle}>Need Help?</Text>
          <TouchableOpacity style={styles.supportButton} onPress={handleContactSupport}>
            <MaterialIcons name="support-agent" size={20} color="#fff" />
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportButton} onPress={handleSettings}>
            <MaterialIcons name="settings" size={20} color="#fff" />
            <Text style={styles.supportButtonText}>Account Settings</Text>
          </TouchableOpacity>
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
    backgroundColor: '#fff',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 8,
  },
  location: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  email: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  verified: {
    color: '#27ae60',
    fontWeight: '600',
    marginLeft: 4,
  },
  editBtn: {
    flexDirection: 'row',
    marginTop: 12,
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  editBtnText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
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
  sectionCount: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  progressText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    fontWeight: '500',
  },
  progressHint: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 8,
    lineHeight: 18,
  },
  jobCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  jobBudget: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: '600',
    marginBottom: 4,
  },
  jobWorker: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  jobDate: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  jobActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionText: {
    color: '#007AFF',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 4,
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
  reviewJob: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  stars: {
    flexDirection: 'row',
  },
  reviewWorker: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  supportSection: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 32,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: 'center',
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});