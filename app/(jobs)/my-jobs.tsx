import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Mock Job Data
const mockJobs = [
  {
    id: 'job-101',
    title: 'Fix leaking kitchen tap',
    description: 'Tap under sink is leaking badly. Needs urgent attention.',
    budget: 'R850',
    status: 'completed',
    worker: {
      name: 'Thabo Ndlovu',
      rating: 4.9,
      avatar: '👷',
    },
    postedAt: '2025-04-01',
    images: ['https://via.placeholder.com/80/007AFF/FFFFFF?text=IMG1'],
  },
  {
    id: 'job-102',
    title: 'Paint bedroom walls',
    description: 'Two walls in master bedroom need repainting. White semi-gloss.',
    budget: 'R2200',
    status: 'in-progress',
    worker: {
      name: 'Lerato Mokoena',
      rating: 4.7,
      avatar: '🎨',
    },
    postedAt: '2025-04-05',
    images: [],
  },
  {
    id: 'job-103',
    title: 'Install ceiling fan',
    description: 'Need ceiling fan installed in living room. Fan provided.',
    budget: 'R650',
    status: 'open',
    worker: null,
    postedAt: '2025-04-10',
    images: ['https://via.placeholder.com/80/FF6B6B/FFFFFF?text=FAN'],
  },
  {
    id: 'job-104',
    title: 'Build garden fence',
    description: 'Wooden fence around back garden, approx. 20m length.',
    budget: 'R8500',
    status: 'pending-offer',
    worker: {
      name: 'Sipho Khumalo',
      rating: 4.5,
      avatar: '🪵',
    },
    postedAt: '2025-04-08',
    images: [],
  },
];

export default function MyJobsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'open' | 'in-progress' | 'completed'>('all');

  const filteredJobs = filter === 'all'
    ? mockJobs
    : mockJobs.filter(job => job.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#27ae60';
      case 'in-progress': return '#f39c12';
      case 'pending-offer': return '#3498db';
      case 'open': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'pending-offer': return 'Offer Received';
      case 'open': return 'Open for Offers';
      default: return 'Unknown';
    }
  };

  const handleViewDetails = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  const handleChat = (jobId: string, workerName: string) => {
    router.push({
      pathname: '/(chat)/chat',
      params: { jobId, workerName },
    });
  };

  const handleLeaveReview = (workerName: string) => {
    Alert.alert(
      'Leave Review',
      `How would you rate your experience with ${workerName}?`,
      [
        { text: '⭐️ 1', onPress: () => submitReview(1) },
        { text: '⭐️⭐️ 2', onPress: () => submitReview(2) },
        { text: '⭐️⭐️⭐️ 3', onPress: () => submitReview(3) },
        { text: '⭐️⭐️⭐️⭐️ 4', onPress: () => submitReview(4) },
        { text: '⭐️⭐️⭐️⭐️⭐️ 5', onPress: () => submitReview(5) },
      ],
      { cancelable: true }
    );
  };

  const submitReview = (rating: number) => {
    Alert.alert('✅ Thank You!', `You rated this worker ${rating} stars.`);
    // In real app: POST to API
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="assignment" size={28} color="#007AFF" />
        <Text style={styles.title}>📋 My Posted Jobs</Text>
        <Text style={styles.subtitle}>Track and manage all your job requests</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {(['all', 'open', 'in-progress', 'completed'] as const).map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterTab,
              filter === status && styles.filterTabActive,
            ]}
            onPress={() => setFilter(status)}
          >
            <Text style={[
              styles.filterText,
              filter === status && styles.filterTextActive,
            ]}>
              {status === 'all' ? 'All' :
               status === 'in-progress' ? 'In Progress' :
               status === 'pending-offer' ? 'Pending Offer' : status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Job List */}
      <ScrollView style={styles.jobsContainer} showsVerticalScrollIndicator={false}>
        {filteredJobs.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="assignment-late" size={48} color="#bdc3c7" />
            <Text style={styles.emptyText}>No jobs match this filter.</Text>
            {filter !== 'all' && (
              <TouchableOpacity onPress={() => setFilter('all')}>
                <Text style={styles.resetFilter}>View All Jobs</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filteredJobs.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <View style={styles.titleRow}>
                  <Text style={styles.jobTitle} numberOfLines={1}>{job.title}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(job.status)}</Text>
                  </View>
                </View>
                <Text style={styles.budget}>R{job.budget}</Text>
              </View>

              <Text style={styles.description} numberOfLines={2}>{job.description}</Text>

              {job.images && job.images.length > 0 && (
                <View style={styles.imagePreview}>
                  <MaterialIcons name="image" size={16} color="#7f8c8d" />
                  <Text style={styles.imageText}>{job.images.length} reference image{job.images.length > 1 ? 's' : ''}</Text>
                </View>
              )}

              {job.worker && (
                <View style={styles.workerInfo}>
                  <Text style={styles.workerLabel}>Assigned to:</Text>
                  <View style={styles.workerRow}>
                    <View style={styles.workerAvatar}>
                      <Text style={styles.workerAvatarText}>{job.worker.avatar}</Text>
                    </View>
                    <View style={styles.workerDetails}>
                      <Text style={styles.workerName}>{job.worker.name}</Text>
                      <View style={styles.ratingRow}>
                        {[...Array(5)].map((_, i) => (
                          <MaterialIcons
                            key={i}
                            name={i < Math.floor(job.worker!.rating) ? 'star' : 'star-border'}
                            size={14}
                            color={i < Math.floor(job.worker!.rating) ? '#FF9800' : '#ddd'}
                          />
                        ))}
                        <Text style={styles.workerRating}>{job.worker.rating}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleViewDetails(job.id)}
                >
                  <MaterialIcons name="visibility" size={18} color="#007AFF" />
                  <Text style={styles.actionText}>View Details</Text>
                </TouchableOpacity>

                {job.worker && (
                  <>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleChat(job.id, job.worker.name)}
                    >
                      <MaterialIcons name="chat" size={18} color="#007AFF" />
                      <Text style={styles.actionText}>Chat</Text>
                    </TouchableOpacity>

                    {job.status === 'completed' && (
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleLeaveReview(job.worker.name)}
                      >
                        <MaterialIcons name="rate-review" size={18} color="#007AFF" />
                        <Text style={styles.actionText}>Review</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/(jobs)/post-job')}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 16,
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  filterTabActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 13,
    color: '#555',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  jobsContainer: {
    flex: 1,
    padding: 16,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
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
  budget: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    lineHeight: 20,
  },
  imagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    width: 'fit-content',
  },
  imageText: {
    fontSize: 13,
    color: '#7f8c8d',
    marginLeft: 4,
  },
  workerInfo: {
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  workerLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 8,
    fontWeight: '500',
  },
  workerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  workerAvatarText: {
    fontSize: 16,
  },
  workerDetails: {
    flex: 1,
  },
  workerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workerRating: {
    fontSize: 13,
    color: '#7f8c8d',
    marginLeft: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f7ff',
  },
  actionText: {
    fontSize: 13,
    color: '#007AFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 16,
    textAlign: 'center',
  },
  resetFilter: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});