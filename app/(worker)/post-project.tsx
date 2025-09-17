import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import HamburgerLayout from '../(components)/HamburgerLayout';

type ProjectData = {
  title: string;
  description: string;
  location: string;
  skills: string[];
};

export default function PostProjectScreen() {
  const router = useRouter();
  const [projectData, setProjectData] = useState<ProjectData>({
    title: '',
    description: '',
    location: '',
    skills: [],
  });
  const [beforeImages, setBeforeImages] = useState<string[]>([]);
  const [afterImages, setAfterImages] = useState<string[]>([]);
  const [askingLocationPermission, setAskingLocationPermission] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [availableSkills] = useState([
    'Ceiling Installation',
    'Painting',
    'Plumbing',
    'Electrical',
    'Fencing',
    'Bricklaying',
    'Tiling',
    'Carpentry',
    'Gardening',
    'Other',
  ]);

  // Request location on mount
  useEffect(() => {
    (async () => {
      setAskingLocationPermission(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          '📍 Location Permission Needed',
          'Please enable location services so we can tag your project location. You can set it manually below.',
          [
            {
              text: 'OK',
              onPress: () => setProjectData(prev => ({ ...prev, location: 'Enter location manually' })),
            },
          ]
        );
      } else {
        try {
          const currentLocation = await Location.getCurrentPositionAsync({});
          const address = await Location.reverseGeocodeAsync({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          });
          if (address && address.length > 0) {
            const { street, city, region } = address[0];
            const formatted = [street, city, region].filter(Boolean).join(', ');
            setProjectData(prev => ({ ...prev, location: formatted }));
          }
        } catch (error) {
          console.error('Error getting location:', error);
          setProjectData(prev => ({ ...prev, location: 'Enter location manually' }));
        }
      }
      setAskingLocationPermission(false);
    })();
  }, []);

  // Pick before images
  const pickBeforeImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newUris = result.assets.map(asset => asset.uri);
      setBeforeImages(prev => [...prev, ...newUris]);
    }
  };

  // Pick after images
  const pickAfterImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newUris = result.assets.map(asset => asset.uri);
      setAfterImages(prev => [...prev, ...newUris]);
    }
  };

  // Remove before image
  const removeBeforeImage = (index: number) => {
    setBeforeImages(prev => prev.filter((_, i) => i !== index));
  };

  // Remove after image
  const removeAfterImage = (index: number) => {
    setAfterImages(prev => prev.filter((_, i) => i !== index));
  };

  // Toggle skill selection
  const toggleSkill = (skill: string) => {
    setProjectData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  // Handle input changes
  const handleInputChange = (field: keyof ProjectData, value: string) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  // Validate and submit project
  const handleSubmit = async () => {
    // Validation
    if (!projectData.title.trim()) {
      Alert.alert('❌ Validation Error', 'Please enter a project title.');
      return;
    }
    if (!projectData.description.trim()) {
      Alert.alert('❌ Validation Error', 'Please describe your project.');
      return;
    }
    if (!projectData.location.trim() || projectData.location.includes('manual')) {
      Alert.alert('❌ Validation Error', 'Please enter your project location.');
      return;
    }
    if (beforeImages.length === 0 || afterImages.length === 0) {
      Alert.alert('❌ Validation Error', 'Please upload at least one before and one after image.');
      return;
    }

    setIsPosting(true);

    // Simulate API call
    setTimeout(() => {
      setIsPosting(false);
      console.log('Project Posted:', projectData);
      console.log('Before Images:', beforeImages);
      console.log('After Images:', afterImages);

      Alert.alert(
        '✅ Project Posted Successfully!',
        'Your project has been shared with the Brinkify community. Workers and customers can now see your amazing work!',
        [
          {
            text: 'View on Newsfeed',
            onPress: () => router.replace('/newsfeed'),
          },
          {
            text: 'Post Another',
            onPress: () => {
              setProjectData({
                title: '',
                description: '',
                location: projectData.location,
                skills: [],
              });
              setBeforeImages([]);
              setAfterImages([]);
            },
            style: 'default',
          },
        ]
      );
    }, 2000);
  };

  return (
    <HamburgerLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons name="add-photo-alternate" size={32} color="#007AFF" />
          <Text style={styles.title}>📸 Post Your Project</Text>
          <Text style={styles.subtitle}>Share your completed work with the Brinkify community</Text>
        </View>

        {/* Project Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Project Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Project Title *</Text>
            <TextInput
                          style={styles.input}
                          value={projectData.title}
                          onChangeText={(text: string) => handleInputChange('title', text)}
                          placeholder="e.g., Modern Kitchen Ceiling Installation"
                          maxLength={100} multiline={undefined} numberOfLines={undefined} textAlignVertical={undefined} keyboardType={undefined}            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
                          style={[styles.input, styles.textArea]}
                          value={projectData.description}
                          onChangeText={(text: string) => handleInputChange('description', text)}
                          placeholder="Describe your project, materials used, challenges overcome, timeline, etc."
                          multiline
                          numberOfLines={5}
                          textAlignVertical="top" keyboardType={undefined} maxLength={undefined}            />
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Location</Text>
          <Text style={styles.sectionSubtitle}>
            Tag where this project was completed. This helps local customers find you.
          </Text>

          {askingLocationPermission ? (
            <View style={styles.locationLoader}>
              <MaterialIcons name="autorenew" size={20} color="#007AFF" />
              <Text style={styles.loaderText}>Detecting your location...</Text>
            </View>
          ) : (
            <TextInput
                              style={styles.input}
                              value={projectData.location}
                              onChangeText={(text: string) => handleInputChange('location', text)}
                              placeholder="Enter project location (e.g., Sandton, Johannesburg)" multiline={undefined} numberOfLines={undefined} textAlignVertical={undefined} keyboardType={undefined} maxLength={undefined}            />
          )}
        </View>

        {/* Skills/Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏷️ Skills Used</Text>
          <Text style={styles.sectionSubtitle}>
            Select the skills you used in this project. This helps customers find you for similar jobs.
          </Text>

          <View style={styles.skillsGrid}>
            {availableSkills.map((skill) => (
              <TouchableOpacity
                key={skill}
                style={[
                  styles.skillTag,
                  projectData.skills.includes(skill) && styles.skillTagSelected,
                ]}
                onPress={() => toggleSkill(skill)}
              >
                <Text
                  style={[
                    styles.skillText,
                    projectData.skills.includes(skill) && styles.skillTextSelected,
                  ]}
                >
                  {skill}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Before Images */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⬅️ Before Photos</Text>
          <Text style={styles.sectionSubtitle}>
            Show the project before you started work. Minimum 1 photo required.
          </Text>

          <TouchableOpacity style={styles.uploadButton} onPress={pickBeforeImages}>
            <MaterialIcons name="add-photo-alternate" size={24} color="#007AFF" />
            <Text style={styles.uploadText}>Add Before Photos</Text>
          </TouchableOpacity>

          {beforeImages.length > 0 && (
            <View style={styles.imageGrid}>
              {beforeImages.map((uri, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeBeforeImage(index)}
                  >
                    <MaterialIcons name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* After Images */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>➡️ After Photos</Text>
          <Text style={styles.sectionSubtitle}>
            Show the amazing results of your work! Minimum 1 photo required.
          </Text>

          <TouchableOpacity style={styles.uploadButton} onPress={pickAfterImages}>
            <MaterialIcons name="add-photo-alternate" size={24} color="#007AFF" />
            <Text style={styles.uploadText}>Add After Photos</Text>
          </TouchableOpacity>

          {afterImages.length > 0 && (
            <View style={styles.imageGrid}>
              {afterImages.map((uri, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeAfterImage(index)}
                  >
                    <MaterialIcons name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isPosting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isPosting}
        >
          {isPosting ? (
            <>
              <MaterialIcons name="hourglass-empty" size={20} color="#fff" />
              <Text style={styles.submitText}>Posting Project...</Text>
            </>
          ) : (
            <>
              <MaterialIcons name="send" size={20} color="#fff" />
              <Text style={styles.submitText}>🚀 Post to Newsfeed</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </HamburgerLayout>
  );
}

// Since we're using Expo, we need to create a TextInput component
const TextInput = ({
  style,
  value,
  onChangeText,
  placeholder,
  multiline,
  numberOfLines,
  textAlignVertical,
  keyboardType,
  maxLength,
}) => {
  const [text, setText] = useState(value || '');

  useEffect(() => {
    setText(value || '');
  }, [value]);

  const handleChange = (newText: string) => {
    setText(newText);
    if (onChangeText) {
      onChangeText(newText);
    }
  };

return (
    <input
        style={StyleSheet.flatten([styles.input, style, { textAlignVertical }])}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        multiple={multiline}
        rows={numberOfLines}
        type={keyboardType === 'number-pad' ? 'number' : 'text'}
        maxLength={maxLength}
    />
);
};

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
    marginBottom: 12,
    lineHeight: 20,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 12,
    lineHeight: 18,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  locationLoader: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loaderText: {
    marginTop: 0,
    marginLeft: 8,
    fontSize: 14,
    color: '#7f8c8d',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  skillTagSelected: {
    backgroundColor: '#007AFF',
  },
  skillText: {
    fontSize: 13,
    color: '#555',
  },
  skillTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 12,
    borderStyle: 'dashed',
    backgroundColor: '#f0f7ff',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 8,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  imageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 24,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});