import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HamburgerLayout from '../(components)/HamburgerLayout';

// Mock Data
const workerProfile = {
  name: 'Thabo Ndlovu',
  rating: 4.9,
  reviews: 24,
  availability: 'available', // 'available' or 'busy'
  workArea: 'Johannesburg, Gauteng',
  totalEarnings: 18500,
  pendingPayments: 3200,
  completedJobs: 42,
  totalJobs: 50,
  depositSecured: true,
};

const availableJobs = [
  {
    id: 'job-101',
    title: 'Fix leaking kitchen tap',
    description: 'Tap under sink is leaking badly. Needs urgent attention.',
    budget: 'R850',
    location: 'Sandton, Johannesburg',
    postedAt: '2 hours ago',
    customer: 'Sarah K.',
    aiMatch: 'good', // good, fair, low
    customerRating: 4.8,
  },
  {
    id: 'job-102',
    title: 'Paint bedroom walls',
    description: 'Two walls in master bedroom need repainting. White semi-gloss.',
    budget: 'R2200',
    location: 'Claremont, Cape Town',
    postedAt: '5 hours ago',
    customer: 'David M.',
    aiMatch: 'fair',
    customerRating: 4.5,
  },
  {
    id: 'job-103',
    title: 'Install ceiling fan',
    description: 'Need ceiling fan installed in living room. Fan provided.',
    budget: 'R650',
    location: 'Umhlanga, Durban',
    postedAt: '1 day ago',
    customer: 'Nomsa P.',
    aiMatch: 'low',
    customerRating: 5.0,
  },
];

const recentReviews = [
  {
    id: 1,
    customer: 'Sarah K.',
    rating: 5,
    comment: 'Thabo was punctual, professional, and did an amazing job on our ceiling. Highly recommend!',
    job: 'Kitchen Ceiling Installation',
    postedAt: '2 days ago',
  },
  {
    id: 2,
    customer: 'David M.',
    rating: 4,
    comment: 'Great work, only took a bit longer than expected, but worth it!',
    job: 'Garden Fence Build',
    postedAt: '1 week ago',
  },
];

export default function WorkerDashboardScreen() {
  const router = useRouter();
  const [availability, setAvailability] = useState(workerProfile.availability);
  const [refreshing, setRefreshing] = useState(false);

  const toggleAvailability = () => {
    setAvailability(prev => prev === 'available' ? 'busy' : 'available');
    Alert.alert(
      '✅ Availability Updated',
      `You are now ${availability === 'available' ? 'Busy' : 'Available'} for new jobs.`
    );
  };

  const handleViewJob = (jobId: string) => {
    router.push('/(jobs)/available-jobs');
  };

  const handleAcceptJob = (jobId: string, customerName: string) => {
    Alert.alert(
      '✅ Accept Job?',
      `Are you sure you want to accept this job from ${customerName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: () => {
            Alert.alert('🎉 Job Accepted!', 'You can now chat with the customer.');
            router.push({
              pathname: '/(chat)/chat',
              params: { workerName: workerProfile.name, customerId: jobId },
            });
          },
        },
      ]
    );
  };

  const handleDeclineJob = (jobId: string) => {
    Alert.alert(
      '❌ Decline Job?',
      'Are you sure you want to decline this job?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Decline',
          onPress: () => Alert.alert('Job Declined', 'This job will no longer appear in your list.'),
        },
      ]
    );
  };

  const handleViewProfile = () => {
    router.push('/(worker)/worker-profile');
  };

  const handleViewEarnings = () => {
    router.push('/(worker)/worker-profile');
  };

  const getAIMatchColor = (match: string) => {
    switch (match) {
      case 'good': return '#27ae60';
      case 'fair': return '#f39c12';
      case 'low': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getAIMatchText = (match: string) => {
    switch (match) {
      case 'good': return '💰 Good Match';
      case 'fair': return '⚖️ Fair Match';
      case 'low': return '⚠️ Low Match';
      default: return '❓ Unknown';
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('🔄 Dashboard Updated', 'Your dashboard is now up to date!');
    }, 2000);
  }, []);

  return (
    <HamburgerLayout>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons name="dashboard" size={32} color="#007AFF" />
          <Text style={styles.title}>👷‍♂️ Worker Dashboard</Text>
          <Text style={styles.subtitle}>Manage your jobs, availability, and earnings</Text>
        </View>

        {/* Profile Quick View */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <MaterialIcons name="construction" size={32} color="#fff" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{workerProfile.name}</Text>
              <View style={styles.ratingRow}>
                {[...Array(5)].map((_, i) => (
                  <MaterialIcons
                    key={i}
                    name={i < Math.floor(workerProfile.rating) ? 'star' : 'star-border'}
                    size={16}
                    color={i < Math.floor(workerProfile.rating) ? '#FF9800' : '#ddd'}
                  />
                ))}
                <Text style={styles.ratingText}>
                  {workerProfile.rating} ({workerProfile.reviews} reviews)
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleViewProfile}>
              <MaterialIcons name="edit" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>

          {/* Availability Toggle */}
          <View style={styles.availabilitySection}>
            <Text style={styles.sectionLabel}>Availability</Text>
            <TouchableOpacity
              style={[
                styles.availabilityToggle,
                availability === 'available' && styles.availabilityToggleActive,
              ]}
              onPress={toggleAvailability}
            >
              <Text style={styles.availabilityText}>
                {availability === 'available' ? '🟢 Available' : '🔴 Busy'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Work Area */}
          <View style={styles.workAreaSection}>
            <Text style={styles.sectionLabel}>Work Area</Text>
            <Text style={styles.workAreaText}>{workerProfile.workArea}</Text>
          </View>
        </View>

        {/* Deposit Security Info */}
        {workerProfile.depositSecured && (
          <View style={styles.securityCard}>
            <View style={styles.securityHeader}>
              <MaterialIcons name="security" size={24} color="#27ae60" />
              <Text style={styles.securityTitle}>🔒 Payment Security Enabled</Text>
            </View>
            <Text style={styles.securityDescription}>
              Congratulations! You've completed enough jobs to qualify for payment security. 
              A portion of customer payments will be held in escrow until job completion.
            </Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Earnings Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>💰 Earnings Summary</Text>
            <TouchableOpacity onPress={handleViewEarnings}>
              <Text style={styles.viewAll}>View Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.earningsGrid}>
            <View style={styles.earningCard}>
              <MaterialIcons name="attach-money" size={24} color="#27ae60" />
              <Text style={styles.earningNumber}>R{workerProfile.totalEarnings.toLocaleString()}</Text>
              <Text style={styles.earningLabel}>Total Earned</Text>
            </View>
            <View style={styles.earningCard}>
              <MaterialIcons name="hourglass-empty" size={24} color="#f39c12" />
              <Text style={styles.earningNumber}>R{workerProfile.pendingPayments.toLocaleString()}</Text>
              <Text style={styles.earningLabel}>Pending Payments</Text>
            </View>
            <View style={styles.earningCard}>
              <MaterialIcons name="assignment" size={24} color="#3498db" />
              <Text style={styles.earningNumber}>{workerProfile.completedJobs}</Text>
              <Text style={styles.earningLabel}>Jobs Completed</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>
              Job Completion: {Math.round((workerProfile.completedJobs / workerProfile.totalJobs) * 100)}%
            </Text>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${(workerProfile.completedJobs / workerProfile.totalJobs) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {workerProfile.completedJobs} of {workerProfile.totalJobs} jobs completed
            </Text>
          </View>
        </View>

        {/* Available Jobs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📋 Available Jobs</Text>
            <TouchableOpacity onPress={() => router.push('/(jobs)/available-jobs')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {availableJobs.length > 0 ? (
            availableJobs.slice(0, 2).map((job) => (
              <View key={job.id} style={styles.jobCard}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobDescription} numberOfLines={2}>
                  {job.description}
                </Text>
                <View style={styles.jobMeta}>
                  <View style={styles.metaItem}>
                    <MaterialIcons name="attach-money" size={16} color="#7f8c8d" />
                    <Text style={styles.metaText}>R{job.budget}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <MaterialIcons name="location-on" size={16} color="#7f8c8d" />
                    <Text style={styles.metaText}>{job.location}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={16} color="#7f8c8d" />
                    <Text style={styles.metaText}>{job.postedAt}</Text>
                  </View>
                </View>
                
                {/* AI Match and Customer Rating */}
                <View style={styles.jobInfo}>
                  <View style={styles.infoItem}>
                    <MaterialIcons name="auto-awesome" size={16} color={getAIMatchColor(job.aiMatch)} />
                    <Text style={[styles.infoText, { color: getAIMatchColor(job.aiMatch) }]}>
                      {getAIMatchText(job.aiMatch)}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <MaterialIcons name="star-rate" size={16} color="#FF9800" />
                    <Text style={styles.infoText}>{job.customerRating}★ Customer</Text>
                  </View>
                </View>

                <View style={styles.jobActions}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAcceptJob(job.id, job.customer)}
                  >
                    <Text style={styles.actionText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.declineButton}
                    onPress={() => handleDeclineJob(job.id)}
                  >
                    <Text style={styles.actionText}>Decline</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => handleViewJob(job.id)}
                  >
                    <Text style={styles.actionText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="assignment-late" size={48} color="#bdc3c7" />
              <Text style={styles.emptyText}>No available jobs at the moment</Text>
              <Text style={styles.emptySubtext}>Check back later or adjust your work area</Text>
            </View>
          )}
        </View>

        {/* Recent Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ Recent Reviews</Text>
          {recentReviews.length > 0 ? (
            recentReviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewInitial}>{review.customer.charAt(0)}</Text>
                  </View>
                  <View style={styles.reviewInfo}>
                    <Text style={styles.reviewCustomer}>{review.customer}</Text>
                    <Text style={styles.reviewJob}>for {review.job}</Text>
                    <Text style={styles.reviewDate}>{review.postedAt}</Text>
                  </View>
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
                <Text style={styles.reviewText}>“{review.comment}”</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="star-outline" size={48} color="#bdc3c7" />
              <Text style={styles.emptyText}>No reviews yet</Text>
              <Text style={styles.emptySubtext}>Complete jobs to start receiving reviews</Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/(worker)/worker-profile')}>
            <MaterialIcons name="person" size={24} color="#007AFF" />
            <Text style={styles.actionText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/(tabs)/newsfeed')}>
            <MaterialIcons name="photo" size={24} color="#FF9800" />
            <Text style={styles.actionText}>Post Work</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/(worker)/dashboard')}>
            <MaterialIcons name="calendar" size={24} color="#3498db" />
            <Text style={styles.actionText}>View Calendar</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Keep up the great work!</Text>
          <Text style={styles.footerSubtext}>Your next job is just around the corner</Text>
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
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 4,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginLeft: 6,
  },
  editButton: {
    padding: 8,
  },
  availabilitySection: {
    marginBottom: 16,
  },
  workAreaSection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  availabilityToggle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  availabilityToggleActive: {
    backgroundColor: '#27ae60',
  },
  availabilityText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  workAreaText: {
    fontSize: 15,
    color: '#555',
    fontWeight: '500',
  },
  securityCard: {
    backgroundColor: '#e8f4f8',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  securityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 8,
  },
  securityDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
  },
  learnMoreButton: {
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 16,
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
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
  },
  viewAll: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  earningsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  earningCard: {
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
  earningNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 8,
  },
  earningLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  progressContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  jobCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  jobDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    lineHeight: 20,
  },
  jobMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: '#7f8c8d',
    marginLeft: 4,
  },
  jobInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#555',
  },
  jobActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  acceptButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
    marginRight: 4,
    shadowColor: '#27ae60',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  declineButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  viewButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
    marginLeft: 4,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewInitial: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  reviewInfo: {
    flex: 1,
  },
  reviewCustomer: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  reviewJob: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 2,
  },
  stars: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    fontStyle: 'italic',
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7f8c8d',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bdc3c7',
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 32,
  },
  actionCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#bdc3c7',
    marginTop: 4,
  },
});