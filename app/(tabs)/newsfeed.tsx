import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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

// Mock Newsfeed Data
const mockPosts = [
  {
    id: 1,
    user: {
      name: 'Thabo N.',
      role: 'worker',
      avatar: '👷',
      location: 'Johannesburg',
    },
    type: 'project',
    title: 'Modern Kitchen Ceiling Installation',
    description: 'Transformed outdated ceiling into sleek modern design with LED lighting. Client was thrilled!',
    images: ['https://via.placeholder.com/400x250/007AFF/FFFFFF?text=Before'],
    afterImages: ['https://via.placeholder.com/400x250/27ae60/FFFFFF?text=After'],
    likes: 24,
    comments: 5,
    shares: 3,
    postedAt: '2 hours ago',
    liked: false,
  },
  {
    id: 2,
    user: {
      name: 'Sarah K.',
      role: 'customer',
      avatar: '👩',
      location: 'Cape Town',
    },
    type: 'review',
    worker: 'Lerato M.',
    title: 'Amazing Garden Fence!',
    description: 'Lerato built a beautiful wooden fence around my garden. Weatherproof finish and perfect craftsmanship. Highly recommend!',
    images: ['https://via.placeholder.com/400x250/FF6B6B/FFFFFF?text=Fence+Project'],
    rating: 5,
    likes: 18,
    comments: 3,
    shares: 2,
    postedAt: '5 hours ago',
    liked: true,
  },
  {
    id: 3,
    user: {
      name: 'Sipho K.',
      role: 'worker',
      avatar: '🪵',
      location: 'Durban',
    },
    type: 'update',
    title: 'New Tools, Better Results!',
    description: 'Just invested in new power tools. Faster, cleaner cuts for all my woodworking projects. DM me for bookings!',
    images: ['https://via.placeholder.com/400x250/3498db/FFFFFF?text=New+Tools'],
    likes: 12,
    comments: 8,
    shares: 1,
    postedAt: '1 day ago',
    liked: false,
  },
  {
    id: 4,
    user: {
      name: 'David M.',
      role: 'customer',
      avatar: '👨',
      location: 'Pretoria',
    },
    type: 'project',
    title: 'Bathroom Renovation Complete!',
    description: 'Huge thanks to Thabo for the amazing bathroom renovation. Waterproofing, tiling, and fixtures — all perfect!',
    images: ['https://via.placeholder.com/400x250/f39c12/FFFFFF?text=Bathroom+Before'],
    afterImages: ['https://via.placeholder.com/400x250/27ae60/FFFFFF?text=Bathroom+After'],
    likes: 31,
    comments: 7,
    shares: 5,
    postedAt: '2 days ago',
    liked: false,
  },
];

export default function NewsfeedScreen() {
  const router = useRouter();
  const [posts, setPosts] = useState(mockPosts);
  const [refreshing, setRefreshing] = useState(false);

  const handleLike = (postId: number) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
    Alert.alert(postId % 2 === 0 ? '❤️ Liked!' : '💔 Unliked!');
  };

  const handleComment = (postId: number) => {
    Alert.alert('💬 Comment', `Commenting on post #${postId}`);
  };

  const handleShare = (postId: number) => {
    Alert.alert('📤 Share', `Sharing post #${postId}`);
  };

  const handleViewProfile = (userName: string) => {
    Alert.alert('👷‍♂️ Profile', `Viewing profile for ${userName}`);
  };

  const handlePostProject = () => {
    Alert.alert(
      '📸 Post a Project',
      'This feature lets you share your completed work with the Brinkify community.',
      [
        {
          text: 'Post Now',
          onPress: () => router.push('/(worker)/post-project'),
        },
        {
          text: 'Learn More',
          onPress: () => Alert.alert('ℹ️', 'Post before/after photos, descriptions, and location tags.'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('🔄 Feed Updated', 'New posts from workers and customers near you!');
    }, 2000);
  };

  const PostHeader = ({ post }: { post: typeof mockPosts[0] }) => (
    <View style={styles.postHeader}>
      <TouchableOpacity onPress={() => handleViewProfile(post.user.name)}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{post.user.avatar}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.headerInfo}>
        <TouchableOpacity onPress={() => handleViewProfile(post.user.name)}>
          <Text style={styles.userName}>
            {post.user.name} • <Text style={styles.userRole}>{post.user.role === 'worker' ? 'Worker' : 'Customer'}</Text>
          </Text>
        </TouchableOpacity>
        <Text style={styles.location}>📍 {post.user.location}</Text>
        <Text style={styles.postTime}>{post.postedAt}</Text>
      </View>
      <TouchableOpacity>
        <MaterialIcons name="more-vert" size={20} color="#7f8c8d" />
      </TouchableOpacity>
    </View>
  );

  const ProjectImages = ({ post }: { post: typeof mockPosts[0] }) => (
    <View style={styles.imageContainer}>
      {post.images && post.images.length > 0 && (
        <>
          <Image source={{ uri: post.images[0] }} style={styles.mainImage} />
          {post.afterImages && post.afterImages.length > 0 && (
            <View style={styles.beforeAfterContainer}>
              <View style={styles.beforeAfterColumn}>
                <Text style={styles.beforeAfterLabel}>Before</Text>
                <Image source={{ uri: post.images[0] }} style={styles.beforeAfterImage} />
              </View>
              <View style={styles.beforeAfterColumn}>
                <Text style={styles.beforeAfterLabel}>After</Text>
                <Image source={{ uri: post.afterImages[0] }} style={styles.beforeAfterImage} />
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );

  const PostActions = ({ post }: { post: typeof mockPosts[0] }) => (
    <View style={styles.actionRow}>
      <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(post.id)}>
        <MaterialIcons
          name={post.liked ? 'favorite' : 'favorite-border'}
          size={20}
          color={post.liked ? '#e74c3c' : '#7f8c8d'}
        />
        <Text style={[styles.actionText, post.liked && styles.likedText]}>{post.likes} Likes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => handleComment(post.id)}>
        <MaterialIcons name="comment" size={20} color="#7f8c8d" />
        <Text style={styles.actionText}>{post.comments} Comments</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => handleShare(post.id)}>
        <MaterialIcons name="share" size={20} color="#7f8c8d" />
        <Text style={styles.actionText}>{post.shares} Shares</Text>
      </TouchableOpacity>
    </View>
  );

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
          <MaterialIcons name="explore" size={32} color="#007AFF" />
          <Text style={styles.title}>🌟 Brinkify Community</Text>
          <Text style={styles.subtitle}>See projects, reviews, and updates from workers near you</Text>
        </View>

        {/* Post Button */}
        <View style={styles.postButtonContainer}>
          <TouchableOpacity style={styles.postButton} onPress={handlePostProject}>
            <MaterialIcons name="add-circle" size={24} color="#fff" />
            <Text style={styles.postButtonText}>Post Your Project</Text>
          </TouchableOpacity>
        </View>

        {/* Posts */}
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <PostHeader post={post} />

            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postDescription}>{post.description}</Text>

            {post.type === 'project' && <ProjectImages post={post} />}

            {post.type === 'review' && (
                <View style={styles.reviewContainer}>
                    <View style={styles.ratingContainer}>
                        {[...Array(5)].map((_, i) => (
                            <MaterialIcons
                                key={i}
                                name={i < (post.rating ?? 0) ? 'star' : 'star-border'}
                                size={16}
                                color={i < (post.rating ?? 0) ? '#FF9800' : '#ddd'}
                            />
                        ))}
                        <Text style={styles.ratingText}> {post.rating ?? 0}★ for {post.worker}</Text>
                    </View>
                </View>
            )}

            {post.type === 'update' && post.images && post.images.length > 0 && (
              <Image source={{ uri: post.images[0] }} style={styles.updateImage} />
            )}

            <PostActions post={post} />
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>No more posts. Check back later for updates!</Text>
          <Text style={styles.footerSubtext}>New projects posted daily by workers across South Africa.</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 500,
  },
  postButtonContainer: {
    padding: 16,
    alignItems: 'center',
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  postCard: {
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
  postHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
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
    fontSize: 18,
    fontWeight: '600',
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  userRole: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  location: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 2,
  },
  postTime: {
    fontSize: 12,
    color: '#bdc3c7',
    marginTop: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 16,
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  beforeAfterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  beforeAfterColumn: {
    flex: 1,
  },
  beforeAfterLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 4,
  },
  beforeAfterImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  reviewContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
    marginLeft: 4,
  },
  updateImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    fontSize: 13,
    color: '#7f8c8d',
    marginLeft: 4,
  },
  likedText: {
    color: '#e74c3c',
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
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#bdc3c7',
  },
});