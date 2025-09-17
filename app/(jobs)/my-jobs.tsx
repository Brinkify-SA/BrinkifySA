import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HamburgerLayout from '../(components)/HamburgerLayout';

// Mock Job Data — Enhanced with AI match and timeline
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
    aiMatch: 'good', // good, fair, low
    timeline: [
      { status: 'posted', date: '2025-04-01', label: 'Job Posted' },
      { status: 'offer', date: '2025-04-02', label: 'Offer Received' },
      { status: 'accepted', date: '2025-04-03', label: 'Offer Accepted' },
      { status: 'in-progress', date: '2025-04-05', label: 'Work Started' },
      { status: 'completed', date: '2025-04-07', label: 'Job Completed' },
    ],
    ratingGiven: false,
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
    aiMatch: 'fair',
    timeline: [
      { status: 'posted', date: '2025-04-05', label: 'Job Posted' },
      { status: 'offer', date: '2025-04-06', label: 'Offer Received' },
      { status: 'accepted', date: '2025-04-07', label: 'Offer Accepted' },
      { status: 'in-progress', date: '2025-04-10', label: 'Work Started' },
    ],
    ratingGiven: true,
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
    aiMatch: 'low',
    timeline: [
      { status: 'posted', date: '2025-04-10', label: 'Job Posted' },
    ],
    ratingGiven: false,
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
    aiMatch: 'good',
    timeline: [
      { status: 'posted', date: '2025-04-08', label: 'Job Posted' },
      { status: 'offer', date: '2025-04-12', label: 'Offer Received' },
    ],
    ratingGiven: false,
  },
];

export default function MyJobsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'open' | 'in-progress' | 'pending-offer' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const handleViewDetails = (jobId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/(jobs)/post-job`);
    }, 500);
  };

  const handleChat = (jobId: string, workerName: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push({
        pathname: '/(chat)/chat',
        params: { jobId, workerName },
      });
    }, 500);
  };

  const handleLeaveReview = (workerName: string) => {
    Alert.alert(
      '⭐ Leave Review',
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

  const handlePostJob = () => {
    router.push('/(jobs)/post-job');
  };

  const handleBrowseWorkers = () => {
    router.push('/explore');
  };

  const handleViewNewsfeed = () => {
    router.push('/(tabs)/newsfeed');
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('🔄 Jobs Updated', 'Your job listings are now up to date!');
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
          <MaterialIcons name="assignment" size={28} color="#007AFF" />
          <Text style={styles.title}>📋 My Posted Jobs</Text>
          <Text style={styles.subtitle}>Track and manage all your job requests</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={handlePostJob}>
            <MaterialIcons name="add-circle" size={24} color="#27ae60" />
            <Text style={styles.actionText}>Post New Job</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={handleBrowseWorkers}>
            <MaterialIcons name="search" size={24} color="#3498db" />
            <Text style={styles.actionText}>Browse Workers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={handleViewNewsfeed}>
            <MaterialIcons name="explore" size={24} color="#f39c12" />
            <Text style={styles.actionText}>View Newsfeed</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          {(['all', 'open', 'pending-offer', 'in-progress', 'completed'] as const).map((status) => (
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
                 status === 'pending-offer' ? 'Pending Offer' : 
                 status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Job List */}
        <View style={styles.jobsContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : filteredJobs.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcons name="assignment-late" size={48} color="#bdc3c7" />
              <Text style={styles.emptyText}>No jobs match this filter.</Text>
              {filter !== 'all' && (
                <TouchableOpacity onPress={() => setFilter('all')}>
                  <Text style={styles.resetFilter}>View All Jobs</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.primaryButton} onPress={handlePostJob}>
                <Text style={styles.primaryButtonText}>➕ Post Your First Job</Text>
              </TouchableOpacity>
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

                {/* AI Pricing Match */}
                <View style={styles.aiMatchContainer}>
                  <MaterialIcons name="auto-awesome" size={16} color={getAIMatchColor(job.aiMatch)} />
                  <Text style={[styles.aiMatchText, { color: getAIMatchColor(job.aiMatch) }]}>
                    {getAIMatchText(job.aiMatch)}
                  </Text>
                </View>

                {/* Job Timeline */}
                <View style={styles.timelineContainer}>
                  <Text style={styles.timelineTitle}>Job Timeline</Text>
                  <View style={styles.timeline}>
                    {job.timeline.map((event, index) => (
                      <View key={index} style={styles.timelineItem}>
                        <View style={styles.timelineDot} />
                        <View style={styles.timelineContent}>
                          <Text style={styles.timelineLabel}>{event.label}</Text>
                          <Text style={styles.timelineDate}>{event.date}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleViewDetails(job.id)}
                    disabled={isLoading}
                  >
                    <MaterialIcons name="visibility" size={18} color="#007AFF" />
                    <Text style={styles.actionText}>View Details</Text>
                  </TouchableOpacity>

                  {job.worker && (
                    <>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleChat(job.id, job.worker.name)}
                        disabled={isLoading}
                      >
                        <MaterialIcons name="chat" size={18} color="#007AFF" />
                        <Text style={styles.actionText}>Chat</Text>
                      </TouchableOpacity>

                      {job.status === 'completed' && !job.ratingGiven && (
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleLeaveReview(job.worker.name)}
                          disabled={isLoading}
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
  },
  actionCard: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 16,
    overflowX: 'auto',
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
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 12,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  workerAvatarText: {
    fontSize: 18,
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
  aiMatchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  aiMatchText: {
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 4,
  },
  timelineContainer: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  timeline: {
    marginLeft: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginTop: 6,
    marginRight: 8,
  },
  timelineContent: {
    flex: 1,
  },
  timelineLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2c3e50',
  },
  timelineDate: {
    fontSize: 12,
    color: '#7f8c8d',
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
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f7ff',
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
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
  primaryButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});