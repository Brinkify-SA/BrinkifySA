import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HamburgerLayout from '../(components)/HamburgerLayout';

export default function ExploreScreen() {
  const router = useRouter();
  const [likedProjects, setLikedProjects] = useState<Set<number>>(new Set());
  const [refreshing, setRefreshing] = useState(false);
  const [filterLocation, setFilterLocation] = useState<'all' | 'johannesburg' | 'cape-town' | 'durban'>('all');

  // Mock Data
  const trendingServices = [
    { name: 'Ceiling Installation', icon: 'roofing', jobs: 42, location: 'Johannesburg' },
    { name: 'Fencing', icon: 'fence', jobs: 38, location: 'Cape Town' },
    { name: 'Painting', icon: 'format-paint', jobs: 56, location: 'Durban' },
    { name: 'Bricklaying', icon: 'category', jobs: 29, location: 'Johannesburg' },
  ];

  const completedProjects = [
    {
      id: 1,
      title: 'Modern Kitchen Ceiling Installation',
      worker: 'Thabo N. (Ceiling Pro)',
      location: 'Johannesburg',
      rating: 5,
      reviews: 3,
      likes: 12,
      comments: 3,
      shares: 5,
      description: 'Transformed outdated ceiling into sleek modern design with LED lighting.',
      image: 'https://via.placeholder.com/400x200/007AFF/FFFFFF?text=Kitchen+Ceiling',
    },
    {
      id: 2,
      title: 'Garden Fence Build & Paint',
      worker: 'Lerato M. (Fencing Expert)',
      location: 'Cape Town',
      rating: 4.9,
      reviews: 2,
      likes: 8,
      comments: 2,
      shares: 3,
      description: 'Built 25m wooden fence with custom paint finish. Weatherproof and stylish.',
      image: 'https://via.placeholder.com/400x200/FF6B6B/FFFFFF?text=Garden+Fence',
    },
    {
      id: 3,
      title: 'Bathroom Tiling Renovation',
      worker: 'Sipho K. (Tiling Master)',
      location: 'Durban',
      rating: 4.8,
      reviews: 5,
      likes: 15,
      comments: 4,
      shares: 2,
      description: 'Full bathroom renovation with waterproof grouting and premium tiles.',
      image: 'https://via.placeholder.com/400x200/f39c12/FFFFFF?text=Bathroom+Tiling',
    },
  ];

  const customerReviews = [
    {
      id: 1,
      customer: 'Sarah K.',
      worker: 'Thabo N.',
      rating: 5,
      comment: '“Thabo was punctual, professional, and did an amazing job on our ceiling. Highly recommend!”',
    },
    {
      id: 2,
      customer: 'David M.',
      worker: 'Lerato M.',
      rating: 5,
      comment: '“Lerato went above and beyond. The fence looks better than I imagined. Will hire again!”',
    },
    {
      id: 3,
      customer: 'Nomsa P.',
      worker: 'Sipho K.',
      rating: 4,
      comment: '“Great attention to detail. Only reason not 5 stars is it took 1 extra day, but worth it!”',
    },
  ];

  const topWorkers = [
    {
      id: 1,
      name: 'Thabo Ndlovu',
      skill: 'Ceiling Specialist',
      rating: 4.9,
      jobs: 120,
      avatar: 'https://via.placeholder.com/60/007AFF/FFFFFF?text=👷',
      bio: '10+ years experience. Precision, quality, and reliability.',
      location: 'Johannesburg',
    },
    {
      id: 2,
      name: 'Lerato Mokoena',
      skill: 'Fencing Expert',
      rating: 4.8,
      jobs: 85,
      avatar: 'https://via.placeholder.com/60/FF6B6B/FFFFFF?text=🪵',
      bio: 'Custom designs, weatherproof finishes, and fast turnaround.',
      location: 'Cape Town',
    },
    {
      id: 3,
      name: 'Sipho Khumalo',
      skill: 'Tiling Master',
      rating: 4.7,
      jobs: 95,
      avatar: 'https://via.placeholder.com/60/f39c12/FFFFFF?text=🧱',
      bio: 'Specialist in waterproofing and premium tile installations.',
      location: 'Durban',
    },
  ];

  // Handlers
  const handleViewWorker = (workerName: string, workerId: number) => {
    Alert.alert(
      '👷 Worker Profile',
      `Viewing profile for ${workerName}`,
      [
        {
          text: 'View Profile',
          onPress: () => router.push(`/(worker)/worker-profile`),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const toggleLike = (projectId: number) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
    Alert.alert('❤️', likedProjects.has(projectId) ? 'Unliked!' : 'Liked!');
  };

  const handleComment = (projectId: number) => {
    Alert.alert('💬 Comment', `Commenting on project #${projectId}`);
  };

  const handleShare = (projectId: number) => {
    Alert.alert('📤 Share', `Sharing project #${projectId}`);
  };

  const postJob = () => {
    router.push('/(jobs)/post-job');
  };

  const postProject = () => {
    router.push('/(worker)/post-project');
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('🔄 Content Updated', 'New projects and workers are now available!');
    }, 2000);
  }, []);

  // Filter data based on location
  const filteredProjects = completedProjects.filter(project => {
    if (filterLocation === 'all') return true;
    return project.location.toLowerCase().includes(filterLocation.replace('-', ''));
  });

  const filteredWorkers = topWorkers.filter(worker => {
    if (filterLocation === 'all') return true;
    return worker.location.toLowerCase().includes(filterLocation.replace('-', ''));
  });

  return (
    <HamburgerLayout>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <MaterialIcons name="explore" size={36} color="#007AFF" />
          <Text style={styles.title}>🌟 Explore Brinkify SA</Text>
          <Text style={styles.subtitle}>
            Discover top-rated workers, trending services, and inspiring completed projects.
          </Text>
          <TouchableOpacity style={styles.postProjectButton} onPress={postProject}>
            <MaterialIcons name="add-circle" size={20} color="#fff" />
            <Text style={styles.postProjectText}>Post Your Project</Text>
          </TouchableOpacity>
        </View>

        {/* Location Filter */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>📍 Filter by Location:</Text>
          <View style={styles.filterButtons}>
            <TouchableOpacity
              style={[styles.filterButton, filterLocation === 'all' && styles.filterButtonActive]}
              onPress={() => setFilterLocation('all')}
            >
              <Text style={[styles.filterButtonText, filterLocation === 'all' && styles.filterButtonTextActive]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filterLocation === 'johannesburg' && styles.filterButtonActive]}
              onPress={() => setFilterLocation('johannesburg')}
            >
              <Text style={[styles.filterButtonText, filterLocation === 'johannesburg' && styles.filterButtonTextActive]}>JHB</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filterLocation === 'cape-town' && styles.filterButtonActive]}
              onPress={() => setFilterLocation('cape-town')}
            >
              <Text style={[styles.filterButtonText, filterLocation === 'cape-town' && styles.filterButtonTextActive]}>CPT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filterLocation === 'durban' && styles.filterButtonActive]}
              onPress={() => setFilterLocation('durban')}
            >
              <Text style={[styles.filterButtonText, filterLocation === 'durban' && styles.filterButtonTextActive]}>DBN</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trending Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Trending Services</Text>
          <Text style={styles.sectionSubtitle}>Popular in your area right now</Text>
          <View style={styles.trendingGrid}>
            {trendingServices
              .filter(service => filterLocation === 'all' || service.location.toLowerCase().includes(filterLocation.replace('-', '')))
              .map((service, index) => (
                <TouchableOpacity key={index} style={styles.trendingCard} activeOpacity={0.8}>
                  <View style={styles.trendingIcon}>
                    <MaterialIcons name={service.icon as any} size={28} color="#007AFF" />
                  </View>
                  <Text style={styles.trendingName}>{service.name}</Text>
                  <Text style={styles.trendingCount}>{service.jobs} jobs posted</Text>
                  <Text style={styles.trendingLocation}>📍 {service.location}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        {/* Completed Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Recently Completed Projects</Text>
          <Text style={styles.sectionSubtitle}>Real work by real professionals</Text>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <View key={project.id} style={styles.projectCard}>
                <Image source={{ uri: project.image }} style={styles.projectImage} />
                <Text style={styles.projectTitle}>{project.title}</Text>
                <TouchableOpacity onPress={() => handleViewWorker(project.worker, 1)}>
                  <Text style={styles.workerName}>{project.worker}</Text>
                </TouchableOpacity>
                <Text style={styles.projectLocation}>📍 {project.location}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>
                <View style={styles.ratingRow}>
                  {[...Array(5)].map((_, i) => (
                    <MaterialIcons
                      key={i}
                      name={i < Math.floor(project.rating) ? 'star' : 'star-border'}
                      size={16}
                      color={i < Math.floor(project.rating) ? '#FF9800' : '#ddd'}
                    />
                  ))}
                  <Text style={styles.ratingText}>
                    {project.rating} ({project.reviews} review{project.reviews !== 1 ? 's' : ''})
                  </Text>
                </View>
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => toggleLike(project.id)}
                  >
                    <MaterialIcons
                      name={likedProjects.has(project.id) ? 'favorite' : 'favorite-border'}
                      size={20}
                      color={likedProjects.has(project.id) ? '#e74c3c' : '#e74c3c'}
                    />
                    <Text style={[styles.actionText, likedProjects.has(project.id) && styles.likedText]}>
                      {project.likes + (likedProjects.has(project.id) ? 1 : 0)} Likes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleComment(project.id)}
                  >
                    <MaterialIcons name="comment" size={20} color="#3498db" />
                    <Text style={styles.actionText}>{project.comments} Comments</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleShare(project.id)}
                  >
                    <MaterialIcons name="share" size={20} color="#95a5a6" />
                    <Text style={styles.actionText}>{project.shares} Shares</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="assignment-late" size={48} color="#bdc3c7" />
              <Text style={styles.emptyText}>No projects match your location filter</Text>
              <TouchableOpacity style={styles.resetButton} onPress={() => setFilterLocation('all')}>
                <Text style={styles.resetText}>Show All Projects</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Top Workers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Top-Rated Workers</Text>
          <Text style={styles.sectionSubtitle}>Trusted professionals in your area</Text>
          {filteredWorkers.length > 0 ? (
            <View style={styles.workersGrid}>
              {filteredWorkers.map((worker) => (
                <View key={worker.id} style={styles.workerCard}>
                  <Image source={{ uri: worker.avatar }} style={styles.workerAvatar} />
                  <Text style={styles.workerName}>{worker.name}</Text>
                  <Text style={styles.workerSkill}>{worker.skill}</Text>
                  <View style={styles.workerRating}>
                    {[...Array(5)].map((_, i) => (
                      <MaterialIcons
                        key={i}
                        name={i < Math.floor(worker.rating) ? 'star' : 'star-border'}
                        size={14}
                        color={i < Math.floor(worker.rating) ? '#FF9800' : '#ddd'}
                      />
                    ))}
                    <Text style={styles.workerRatingText}>{worker.rating}</Text>
                  </View>
                  <Text style={styles.workerBio}>{worker.bio}</Text>
                  <Text style={styles.workerLocation}>📍 {worker.location}</Text>
                  <TouchableOpacity 
                    style={styles.viewProfileButton}
                    onPress={() => handleViewWorker(worker.name, worker.id)}
                  >
                    <Text style={styles.viewProfileText}>View Profile</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="person-off" size={48} color="#bdc3c7" />
              <Text style={styles.emptyText}>No workers match your location filter</Text>
              <TouchableOpacity style={styles.resetButton} onPress={() => setFilterLocation('all')}>
                <Text style={styles.resetText}>Show All Workers</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Customer Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ Customer Reviews</Text>
          <Text style={styles.sectionSubtitle}>Honest feedback from real clients</Text>
          {customerReviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{review.customer.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={styles.customerName}>{review.customer}</Text>
                  <Text style={styles.reviewJob}>Worked with {review.worker}</Text>
                </View>
              </View>
              <Text style={styles.reviewText}>{review.comment}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>✨ Inspired by These Projects?</Text>
          <Text style={styles.ctaSubtitle}>
            Post your job and get matched with top-rated professionals today.
          </Text>
          <TouchableOpacity style={styles.postJobButton} onPress={postJob} activeOpacity={0.8}>
            <MaterialIcons name="add-circle" size={24} color="#fff" />
            <Text style={styles.postJobText}>➕ Post a Job Now</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>New projects and reviews added daily!</Text>
          <Text style={styles.footerSubtext}>Keep scrolling to discover more talent.</Text>
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
  hero: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
    maxWidth: 500,
  },
  postProjectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  postProjectText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
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
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 13,
    color: '#555',
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 16,
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  trendingCard: {
    width: '48%',
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  trendingIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  trendingName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  trendingCount: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 4,
  },
  trendingLocation: {
    fontSize: 12,
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  projectCard: {
    backgroundColor: '#fdfdfd',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  projectImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 14,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#2c3e50',
  },
  workerName: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '500',
    marginBottom: 6,
  },
  projectLocation: {
    fontSize: 13,
    color: '#777',
    marginBottom: 8,
    fontWeight: '500',
  },
  projectDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  ratingText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 6,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 6,
    fontWeight: '500',
  },
  likedText: {
    color: '#e74c3c',
  },
  workersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  workerCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  workerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  workerSkill: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  workerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  workerRatingText: {
    fontSize: 13,
    color: '#7f8c8d',
    marginLeft: 4,
  },
  workerBio: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 8,
  },
  workerLocation: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 12,
    fontWeight: '500',
  },
  viewProfileButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  viewProfileText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: '#f8f9fa',
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  reviewJob: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  reviewText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#333',
    lineHeight: 22,
    marginTop: 8,
  },
  ctaSection: {
    padding: 28,
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    margin: 16,
    borderRadius: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: 400,
  },
  postJobButton: {
    flexDirection: 'row',
    backgroundColor: '#27ae60',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#27ae60',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  postJobText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
  resetButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  resetText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});