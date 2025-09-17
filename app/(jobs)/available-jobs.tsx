import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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

// Mock Job Data
const mockJobs = [
  {
    id: 'job-101',
    title: 'Fix leaking kitchen tap',
    description: 'Tap under sink is leaking badly. Needs urgent attention.',
    budget: 'R850',
    location: 'Sandton, Johannesburg',
    postedAt: '2 hours ago',
    customer: 'Sarah K.',
    status: 'pending',
    trade: 'Plumbing',
    customerRating: 4.8,
    aiMatch: 'good', // good, fair, low
    saved: false,
  },
  {
    id: 'job-102',
    title: 'Paint bedroom walls',
    description: 'Two walls in master bedroom need repainting. White semi-gloss.',
    budget: 'R2200',
    location: 'Claremont, Cape Town',
    postedAt: '5 hours ago',
    customer: 'David M.',
    status: 'pending',
    trade: 'Painting',
    customerRating: 4.5,
    aiMatch: 'fair',
    saved: false,
  },
  {
    id: 'job-103',
    title: 'Install ceiling fan',
    description: 'Need ceiling fan installed in living room. Fan provided.',
    budget: 'R650',
    location: 'Umhlanga, Durban',
    postedAt: '1 day ago',
    customer: 'Nomsa P.',
    status: 'accepted',
    trade: 'Electrical',
    customerRating: 5.0,
    aiMatch: 'good',
    saved: true,
  },
  {
    id: 'job-104',
    title: 'Build garden fence',
    description: 'Wooden fence around back garden, approx. 20m length.',
    budget: 'R8500',
    location: 'Pretoria East',
    postedAt: '3 days ago',
    customer: 'John S.',
    status: 'declined',
    trade: 'Fencing',
    customerRating: 4.2,
    aiMatch: 'low',
    saved: false,
  },
];

export default function AvailableJobsScreen() {
  const router = useRouter();
  const [jobs, setJobs] = useState(mockJobs);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'plumbing' | 'painting' | 'electrical' | 'fencing'>('all');
  const [savedOnly, setSavedOnly] = useState(false);

  const handleAccept = (jobId: string) => {
    Alert.alert(
      '✅ Accept Job?',
      'Are you sure you want to accept this job? You’ll be connected to the customer via chat.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: () => {
            setJobs(prev =>
              prev.map(job =>
                job.id === jobId ? { ...job, status: 'accepted' } : job
              )
            );
            Alert.alert('🎉 Job Accepted!', 'You can now chat with the customer.');
          },
        },
      ]
    );
  };

  const handleDecline = (jobId: string) => {
    Alert.alert(
      '❌ Decline Job?',
      'Are you sure you want to decline this job?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Decline',
          onPress: () => {
            setJobs(prev =>
              prev.map(job =>
                job.id === jobId ? { ...job, status: 'declined' } : job
              )
            );
            Alert.alert('Job Declined', 'This job will no longer appear in your active list.');
          },
        },
      ]
    );
  };

  const handleChat = (customerId: string) => {
    router.push({
      pathname: '/(chat)/chat',
      params: { customerId },
    });
  };

  const toggleSave = (jobId: string) => {
    setJobs(prev =>
      prev.map(job =>
        job.id === jobId ? { ...job, saved: !job.saved } : job
      )
    );
    Alert.alert(jobId.includes('saved') ? '✅ Saved!' : '📌 Removed from Saved');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return '#27ae60';
      case 'declined': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted': return 'Accepted';
      case 'declined': return 'Declined';
      default: return 'Pending';
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

  const filteredJobs = jobs.filter(job => {
    if (savedOnly && !job.saved) return false;
    if (filter !== 'all' && job.trade.toLowerCase() !== filter) return false;
    return true;
  });

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('🔄 Jobs Updated', 'New job listings are now available!');
    }, 2000);
  };

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
          <MaterialIcons name="assignment" size={28} color="#fff" />
          <Text style={styles.title}>📋 Available Jobs</Text>
          <Text style={styles.subtitle}>Browse and respond to job requests</Text>
        </View>

        {/* Filters */}
        <View style={styles.filterContainer}>
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
              onPress={() => setFilter('all')}
            >
              <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'plumbing' && styles.filterButtonActive]}
              onPress={() => setFilter('plumbing')}
            >
              <Text style={[styles.filterText, filter === 'plumbing' && styles.filterTextActive]}>Plumbing</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'painting' && styles.filterButtonActive]}
              onPress={() => setFilter('painting')}
            >
              <Text style={[styles.filterText, filter === 'painting' && styles.filterTextActive]}>Painting</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'electrical' && styles.filterButtonActive]}
              onPress={() => setFilter('electrical')}
            >
              <Text style={[styles.filterText, filter === 'electrical' && styles.filterTextActive]}>Electrical</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'fencing' && styles.filterButtonActive]}
              onPress={() => setFilter('fencing')}
            >
              <Text style={[styles.filterText, filter === 'fencing' && styles.filterTextActive]}>Fencing</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, savedOnly && styles.filterButtonActive]}
              onPress={() => setSavedOnly(!savedOnly)}
            >
              <MaterialIcons name="bookmark" size={16} color={savedOnly ? "#fff" : "#555"} />
              <Text style={[styles.filterText, savedOnly && styles.filterTextActive]}>Saved</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Job List */}
        <View style={styles.jobsContainer}>
          {filteredJobs
            .filter(job => job.status === 'pending') // Only show pending jobs
            .length > 0 ? (
            filteredJobs
              .filter(job => job.status === 'pending')
              .map((job) => (
                <View key={job.id} style={styles.jobCard}>
                  <View style={styles.jobHeader}>
                    <View style={styles.titleRow}>
                      <Text style={styles.jobTitle} numberOfLines={1}>
                        {job.title}
                      </Text>
                      <TouchableOpacity onPress={() => toggleSave(job.id)}>
                        <MaterialIcons
                          name={job.saved ? "bookmark" : "bookmark-border"}
                          size={20}
                          color={job.saved ? "#FF9800" : "#95a5a6"}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) }]}>
                      <Text style={styles.statusText}>{getStatusText(job.status)}</Text>
                    </View>
                  </View>

                  <Text style={styles.description} numberOfLines={3}>
                    {job.description}
                  </Text>

                  <View style={styles.metaRow}>
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

                  <View style={styles.additionalInfo}>
                    <View style={styles.infoItem}>
                      <MaterialIcons name="category" size={16} color="#3498db" />
                      <Text style={styles.infoText}>{job.trade}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <MaterialIcons name="star-rate" size={16} color="#FF9800" />
                      <Text style={styles.infoText}>{job.customerRating}★</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <MaterialIcons name="auto-awesome" size={16} color={getAIMatchColor(job.aiMatch)} />
                      <Text style={[styles.infoText, { color: getAIMatchColor(job.aiMatch) }]}>
                        {getAIMatchText(job.aiMatch)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.acceptButton}
                      onPress={() => handleAccept(job.id)}
                    >
                      <MaterialIcons name="check" size={18} color="#fff" />
                      <Text style={styles.actionText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.declineButton}
                      onPress={() => handleDecline(job.id)}
                    >
                      <MaterialIcons name="close" size={18} color="#fff" />
                      <Text style={styles.actionText}>Decline</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="assignment-late" size={48} color="#bdc3c7" />
              <Text style={styles.emptyText}>No jobs match your filters</Text>
              <TouchableOpacity style={styles.resetButton} onPress={() => { setFilter('all'); setSavedOnly(false); }}>
                <Text style={styles.resetText}>Reset Filters</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Show Accepted/Declined Jobs Separately */}
          <Text style={styles.sectionTitle}>📊 My Responses</Text>
          {jobs
            .filter(job => job.status !== 'pending')
            .length > 0 ? (
            jobs
              .filter(job => job.status !== 'pending')
              .map((job) => (
                <View key={job.id} style={styles.jobCard}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobTitle} numberOfLines={1}>
                      {job.title}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) }]}>
                      <Text style={styles.statusText}>{getStatusText(job.status)}</Text>
                    </View>
                  </View>

                  <Text style={styles.description} numberOfLines={2}>
                    {job.description}
                  </Text>

                  <View style={styles.metaRow}>
                    <Text style={styles.customerText}>Customer: {job.customer}</Text>
                  </View>

                  {job.status === 'accepted' && (
                    <TouchableOpacity
                      style={styles.chatButton}
                      onPress={() => handleChat(job.customer)}
                    >
                      <MaterialIcons name="chat" size={18} color="#fff" />
                      <Text style={styles.chatText}>Chat with Customer</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="assignment-turned-in" size={48} color="#bdc3c7" />
              <Text style={styles.emptyText}>No responded jobs yet</Text>
              <Text style={styles.emptySubtext}>Accept or decline jobs to see them here.</Text>
            </View>
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
    backgroundColor: '#007AFF',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#b3e0ff',
    textAlign: 'center',
  },
  filterContainer: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  filterButtonActive: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginVertical: 16,
    textAlign: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
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
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    lineHeight: 20,
  },
  metaRow: {
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
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
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
  customerText: {
    fontSize: 13,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27ae60',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
    shadowColor: '#27ae60',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  declineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 12,
    justifyContent: 'center',
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  chatText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
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
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bdc3c7',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  resetButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});