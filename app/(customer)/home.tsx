import { MaterialIcons } from '@expo/vector-icons';
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
const mockJobs = [
  {
    id: 'job-101',
    title: 'Fix leaking kitchen tap',
    status: 'completed',
    worker: 'Thabo N.',
    budget: 'R850',
    postedAt: '2025-04-01',
    ratingGiven: false,
  },
  {
    id: 'job-102',
    title: 'Paint bedroom walls',
    status: 'in-progress',
    worker: 'Lerato M.',
    budget: 'R2200',
    postedAt: '2025-04-05',
    ratingGiven: true,
  },
  {
    id: 'job-103',
    title: 'Install ceiling fan',
    status: 'open',
    worker: null,
    budget: 'R650',
    postedAt: '2025-04-10',
    ratingGiven: false,
  },
];

const mockMessages = [
  {
    id: 'msg-1',
    worker: 'Thabo N.',
    preview: 'Hi Sarah! I can start tomorrow morning.',
    time: '2 hours ago',
    unread: false,
  },
  {
    id: 'msg-2',
    worker: 'Lerato M.',
    preview: 'Here are the paint samples I mentioned.',
    time: '5 hours ago',
    unread: true,
  },
];

export default function CustomerHomeScreen() {
  const router = useRouter();
  const [jobs, setJobs] = useState(mockJobs);
  const [messages] = useState(mockMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handlePostJob = () => {
    router.push('/(jobs)/post-job');
  };

  const handleBrowseWorkers = () => {
    router.push('/explore');
  };

  const handleViewNewsfeed = () => {
    router.push('/(tabs)/newsfeed');
  };

  const handleViewJob = (jobId: string) => {
    router.push(`/(jobs)/my-jobs`);
  };

  const handleChat = (workerName: string) => {
    router.push({
      pathname: '/(chat)/chat',
      params: { workerName },
    });
  };

  const handleLeaveReview = (jobId: string, workerName: string) => {
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

  const submitReview = (jobId: string, rating: number) => {
    setJobs(prev =>
      prev.map(job =>
        job.id === jobId ? { ...job, ratingGiven: true } : job
      )
    );
    Alert.alert('✅ Thank You!', `You rated this worker ${rating} stars.`);
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
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'open': return 'Open for Offers';
      default: return 'Unknown';
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('🔄 Refreshed', 'Your dashboard is up to date!');
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
          <Text style={styles.title}>🏡 Customer Dashboard</Text>
          <Text style={styles.subtitle}>Manage your jobs, messages, and projects</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.notificationsButton}>
              <MaterialIcons name="notifications" size={20} color="#007AFF" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <MaterialIcons name="assignment" size={24} color="#007AFF" />
            <Text style={styles.statNumber}>{jobs.length}</Text>
            <Text style={styles.statLabel}>Total Jobs</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="star-rate" size={24} color="#FF9800" />
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="chat" size={24} color="#3498db" />
            <Text style={styles.statNumber}>{messages.filter(m => m.unread).length}</Text>
            <Text style={styles.statLabel}>Unread Messages</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard} onPress={handlePostJob}>
              <MaterialIcons name="add-circle" size={28} color="#27ae60" />
              <Text style={styles.actionText}>Post New Job</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={handleBrowseWorkers}>
              <MaterialIcons name="search" size={28} color="#3498db" />
              <Text style={styles.actionText}>Browse Workers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={handleViewNewsfeed}>
              <MaterialIcons name="explore" size={28} color="#f39c12" />
              <Text style={styles.actionText}>View Newsfeed</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Pricing Estimator */}
        <View style={styles.aiSection}>
          <View style={styles.aiHeader}>
            <MaterialIcons name="auto-awesome" size={24} color="#9b59b6" />
            <Text style={styles.aiTitle}>🤖 AI Pricing Estimator</Text>
          </View>
          <Text style={styles.aiDescription}>
            Our AI analyzes worker estimates and your budget to ensure fair and competitive pricing for your projects.
          </Text>
          <View style={styles.aiFeatures}>
            <View style={styles.aiFeature}>
              <MaterialIcons name="calculate" size={20} color="#9b59b6" />
              <Text style={styles.aiFeatureText}>Balances budgets</Text>
            </View>
            <View style={styles.aiFeature}>
              <MaterialIcons name="trending-up" size={20} color="#9b59b6" />
              <Text style={styles.aiFeatureText}>Competitive quotes</Text>
            </View>
            <View style={styles.aiFeature}>
              <MaterialIcons name="verified" size={20} color="#9b59b6" />
              <Text style={styles.aiFeatureText}>Fair pricing</Text>
            </View>
          </View>
        </View>

        {/* Recent Messages */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>💬 Recent Messages</Text>
            <TouchableOpacity onPress={() => router.push('/(chat)/chat')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <TouchableOpacity
                key={msg.id}
                style={[styles.messageCard, msg.unread && styles.unreadMessage]}
                onPress={() => handleChat(msg.worker)}
              >
                <View style={styles.messageAvatar}>
                  <Text style={styles.messageInitial}>{msg.worker.charAt(0)}</Text>
                </View>
                <View style={styles.messageContent}>
                  <View style={styles.messageHeader}>
                    <Text style={styles.messageWorker}>{msg.worker}</Text>
                    <Text style={styles.messageTime}>{msg.time}</Text>
                  </View>
                  <Text style={styles.messagePreview} numberOfLines={1}>
                    {msg.preview}
                  </Text>
                </View>
                {msg.unread && <View style={styles.messageIndicator} />}
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="chat-bubble-outline" size={48} color="#bdc3c7" />
              <Text style={styles.emptyText}>No messages yet</Text>
              <Text style={styles.emptySubtext}>Start a conversation with a worker after posting a job.</Text>
            </View>
          )}
        </View>

        {/* My Jobs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📋 My Posted Jobs</Text>
            <TouchableOpacity onPress={() => router.push('/(jobs)/my-jobs')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {jobs.length > 0 ? (
            jobs.slice(0, 3).map((job) => (
              <View key={job.id} style={styles.jobCard}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle} numberOfLines={1}>
                    {job.title}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(job.status)}</Text>
                  </View>
                </View>
                <Text style={styles.jobBudget}>Budget: R{job.budget}</Text>
                {job.worker && <Text style={styles.jobWorker}>Worker: {job.worker}</Text>}
                <View style={styles.jobActions}>
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => handleViewJob(job.id)}
                  >
                    <Text style={styles.viewButtonText}>View Details</Text>
                  </TouchableOpacity>
                  {job.status === 'completed' && !job.ratingGiven && (
                    <TouchableOpacity
                      style={styles.reviewButton}
                      onPress={() => handleLeaveReview(job.id, job.worker || '')}
                    >
                      <Text style={styles.reviewButtonText}>Leave Review</Text>
                    </TouchableOpacity>
                  )}
                  {job.worker && (
                    <TouchableOpacity
                      style={styles.chatButton}
                      onPress={() => handleChat(job.worker)}
                    >
                      <Text style={styles.chatButtonText}>Chat</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="assignment-late" size={48} color="#bdc3c7" />
              <Text style={styles.emptyText}>No jobs posted yet</Text>
              <TouchableOpacity style={styles.primaryButton} onPress={handlePostJob}>
                <Text style={styles.primaryButtonText}>➕ Post Your First Job</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Pending Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ Pending Reviews</Text>
          {jobs
            .filter(job => job.status === 'completed' && !job.ratingGiven && job.worker)
            .map((job) => (
              <View key={job.id} style={styles.reviewCard}>
                <Text style={styles.reviewTitle}>Job: {job.title}</Text>
                <Text style={styles.reviewWorker}>Worker: {job.worker}</Text>
                <TouchableOpacity
                  style={styles.reviewActionButton}
                  onPress={() => handleLeaveReview(job.id, job.worker || 'the worker')}
                >
                  <MaterialIcons name="rate-review" size={18} color="#fff" />
                  <Text style={styles.reviewActionText}>Leave Review</Text>
                </TouchableOpacity>
              </View>
            ))}
          {jobs.filter(job => job.status === 'completed' && !job.ratingGiven && job.worker).length === 0 && (
            <Text style={styles.noReviewsText}>No pending reviews. Great job staying on top of feedback! 🎉</Text>
          )}
        </View>

        {/* Commission Info */}
        <View style={styles.commissionSection}>
          <View style={styles.commissionHeader}>
            <MaterialIcons name="attach-money" size={24} color="#e74c3c" />
            <Text style={styles.commissionTitle}>💰 Brinkify Commission</Text>
          </View>
          <Text style={styles.commissionDescription}>
            Brinkify uses a commission-based model to support our platform. We retain a small percentage of each transaction to maintain quality service and platform development.
          </Text>
          <View style={styles.commissionFeatures}>
            <View style={styles.commissionFeature}>
              <MaterialIcons name="security" size={20} color="#e74c3c" />
              <Text style={styles.commissionFeatureText}>Secure payments</Text>
            </View>
            <View style={styles.commissionFeature}>
              <MaterialIcons name="support-agent" size={20} color="#e74c3c" />
              <Text style={styles.commissionFeatureText}>Customer support</Text>
            </View>
            <View style={styles.commissionFeature}>
              <MaterialIcons name="verified-user" size={20} color="#e74c3c" />
              <Text style={styles.commissionFeatureText}>Worker verification</Text>
            </View>
          </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
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
  headerActions: {
    flexDirection: 'row',
    position: 'absolute',
    top: 40,
    right: 16,
    gap: 12,
  },
  notificationsButton: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statCard: {
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
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAll: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
  },
  aiSection: {
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
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 8,
  },
  aiDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  aiFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  aiFeature: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    flex: 1,
  },
  aiFeatureText: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
    textAlign: 'center',
  },
  messageCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  unreadMessage: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  messageAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  messageInitial: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageWorker: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  messageTime: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  messagePreview: {
    fontSize: 14,
    color: '#555',
  },
  messageIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e74c3c',
    marginLeft: 8,
    alignSelf: 'center',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7f8c8d',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bdc3c7',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
    marginBottom: 12,
  },
  jobActions: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  viewButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  reviewButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  chatButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#FF9800',
    borderStyle: 'dashed',
  },
  reviewTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  reviewWorker: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  reviewActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9800',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  reviewActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  noReviewsText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 16,
  },
  commissionSection: {
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
  commissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  commissionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 8,
  },
  commissionDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  commissionFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  commissionFeature: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    flex: 1,
  },
  commissionFeatureText: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
    textAlign: 'center',
  },
});