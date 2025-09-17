import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import HamburgerLayout from '../(components)/HamburgerLayout';

type JobData = {
  title: string;
  description: string;
  budget: string;
  location: string;
  jobType: string;
};

export default function PostJobScreen() {
  const router = useRouter();
  const [jobData, setJobData] = useState<JobData>({
    title: '',
    description: '',
    budget: '',
    location: '',
    jobType: 'select',
  });
  const [pickedImages, setPickedImages] = useState<string[]>([]);
  const [askingLocationPermission, setAskingLocationPermission] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [showMapPreview, setShowMapPreview] = useState(false);

  // Calculate form completion percentage
  const getCompletionPercentage = () => {
    let completed = 0;
    if (jobData.title.trim()) completed++;
    if (jobData.description.trim()) completed++;
    if (jobData.budget.trim() && !isNaN(Number(jobData.budget)) && Number(jobData.budget) > 0) completed++;
    if (jobData.location.trim() && !jobData.location.includes('manual')) completed++;
    if (jobData.jobType !== 'select') completed++;
    return Math.round((completed / 5) * 100);
  };

  // AI Pricing Suggestions based on job type
  const getAIPriceSuggestion = (jobType: string) => {
    const suggestions: Record<string, string> = {
      plumbing: 'R800 - R1,500',
      painting: 'R1,500 - R3,000',
      electrical: 'R600 - R1,200',
      fencing: 'R5,000 - R10,000',
      ceiling: 'R2,000 - R4,500',
      bricklaying: 'R3,000 - R6,000',
    };
    return suggestions[jobType] || 'R1,000 - R5,000';
  };

  // Request location on mount
  useEffect(() => {
    (async () => {
      setAskingLocationPermission(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          '📍 Location Permission Needed',
          'Please enable location services so we can find workers near you. You can set it manually below.',
          [
            {
              text: 'OK',
              onPress: () => setJobData(prev => ({ ...prev, location: 'Enter your location manually' })),
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
            setJobData(prev => ({ ...prev, location: formatted }));
          }
        } catch (error) {
          console.error('Error getting location:', error);
          setJobData(prev => ({ ...prev, location: 'Enter your location manually' }));
        }
      }
      setAskingLocationPermission(false);
    })();
  }, []);

  // Pick image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newUris = result.assets.map(asset => asset.uri);
      setPickedImages(prev => [...prev, ...newUris]);
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    setPickedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Handle input changes
  const handleInputChange = (field: keyof JobData, value: string) => {
    setJobData(prev => ({ ...prev, [field]: value }));
  };

  // Validate and submit job
  const handleSubmit = async () => {
    // Validation
    if (!jobData.title.trim()) {
      Alert.alert('❌ Validation Error', 'Please enter a job title.');
      return;
    }
    if (!jobData.description.trim()) {
      Alert.alert('❌ Validation Error', 'Please describe the job in detail.');
      return;
    }
    if (!jobData.budget.trim() || isNaN(Number(jobData.budget)) || Number(jobData.budget) <= 0) {
      Alert.alert('❌ Validation Error', 'Please enter a valid budget (numbers only).');
      return;
    }
    if (!jobData.location.trim() || jobData.location.includes('manual')) {
      Alert.alert('❌ Validation Error', 'Please enter your location so we can find nearby workers.');
      return;
    }
    if (jobData.jobType === 'select') {
      Alert.alert('❌ Validation Error', 'Please select a job type.');
      return;
    }

    setIsPosting(true);

    // Simulate API call
    setTimeout(() => {
      setIsPosting(false);
      console.log('Job Posted:', jobData);
      console.log('Images:', pickedImages);

      Alert.alert(
        '✅ Job Posted Successfully!',
        'Workers near you will be notified. You’ll receive offers shortly.',
        [
          {
            text: 'View My Jobs',
            onPress: () => router.replace('/(jobs)/my-jobs'),
          },
          {
            text: 'Post Another',
            onPress: () => {
              setJobData({
                title: '',
                description: '',
                budget: '',
                location: jobData.location,
                jobType: 'select',
              });
              setPickedImages([]);
            },
            style: 'default',
          },
        ]
      );
    }, 2000);
  };

  // Save as draft
  const handleSaveDraft = async () => {
    if (!jobData.title.trim()) {
      Alert.alert('❌ Validation Error', 'Please enter a job title to save as draft.');
      return;
    }

    setIsSavingDraft(true);

    // Simulate API call
    setTimeout(() => {
      setIsSavingDraft(false);
      Alert.alert(
        '✅ Draft Saved!',
        'Your job draft has been saved. You can complete and post it later from your drafts section.',
        [
          {
            text: 'OK',
          },
        ]
      );
    }, 1500);
  };

  // Toggle map preview
  const toggleMapPreview = () => {
    setShowMapPreview(!showMapPreview);
  };

  return (
    <HamburgerLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons name="assignment-add" size={32} color="#007AFF" />
          <Text style={styles.title}>📝 Post a New Job</Text>
          <Text style={styles.subtitle}>Describe your job and get matched with skilled workers nearby.</Text>
          
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Form Completion: {getCompletionPercentage()}%</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${getCompletionPercentage()}%` }]} />
            </View>
          </View>
        </View>

        {/* Job Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Job Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Job Title *</Text>
            <TextInput
              style={styles.input}
              value={jobData.title}
              onChangeText={(text) => handleInputChange('title', text)}
              placeholder="e.g., Fix leaking kitchen tap"
              maxLength={100}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Job Type *</Text>
            <View style={styles.pickerContainer}>
              <MaterialIcons name="category" size={20} color="#7f8c8d" style={styles.pickerIcon} />
              <select
                style={styles.select}
                value={jobData.jobType}
                onChange={(e) => handleInputChange('jobType', e.target.value)}
                id="jobType"
              >
                <option value="select" disabled>Select Job Type</option>
                <option value="plumbing">Plumbing</option>
                <option value="painting">Painting</option>
                <option value="electrical">Electrical</option>
                <option value="fencing">Fencing</option>
                <option value="ceiling">Ceiling</option>
                <option value="bricklaying">Bricklaying</option>
                <option value="other">Other</option>
              </select>
            </View>
          </View>

          {jobData.jobType !== 'select' && (
            <View style={styles.aiSuggestion}>
              <MaterialIcons name="auto-awesome" size={20} color="#9b59b6" />
              <Text style={styles.aiText}>
                💡 AI Suggestion: Typical budget for {jobData.jobType} jobs is {getAIPriceSuggestion(jobData.jobType)}
              </Text>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Detailed Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={jobData.description}
              onChangeText={(text) => handleInputChange('description', text)}
              placeholder="Describe the work needed, materials, access instructions, timeline, etc."
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Budget (ZAR) *</Text>
            <View style={styles.budgetContainer}>
              <Text style={styles.currencySymbol}>R</Text>
              <TextInput
                style={styles.budgetInput}
                value={jobData.budget}
                onChangeText={(text) => handleInputChange('budget', text)}
                placeholder="1500"
                keyboardType="number-pad"
              />
            </View>
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Location</Text>
          <Text style={styles.sectionSubtitle}>
            We’ll use this to find workers near you. Your address won’t be shared publicly.
          </Text>

          {askingLocationPermission ? (
            <View style={styles.locationLoader}>
              <MaterialIcons name="autorenew" size={20} color="#007AFF" />
              <Text style={styles.loaderText}>Detecting your location...</Text>
            </View>
          ) : (
            <>
              <TextInput
                style={styles.input}
                value={jobData.location}
                onChangeText={(text) => handleInputChange('location', text)}
                placeholder="Enter your suburb, street, or city (e.g., Sandton, Johannesburg)"
              />
              {jobData.location && !jobData.location.includes('manual') && (
                <TouchableOpacity style={styles.mapButton} onPress={toggleMapPreview}>
                  <MaterialIcons name="map" size={18} color="#007AFF" />
                  <Text style={styles.mapButtonText}>
                    {showMapPreview ? 'Hide Map Preview' : 'Show Map Preview'}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}

          {showMapPreview && jobData.location && !jobData.location.includes('manual') && (
            <View style={styles.mapPreview}>
              <Text style={styles.mapTitle}>📍 Location Preview</Text>
              <Image
                source={{ uri: `https://via.placeholder.com/400x200/3498db/FFFFFF?text=Map+Preview+-+${encodeURIComponent(jobData.location)}` }}
                style={styles.mapImage}
              />
              <Text style={styles.mapCaption}>This is approximately where your job will be located.</Text>
            </View>
          )}
        </View>

        {/* Reference Images */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📎 Reference Images (Optional)</Text>
          <Text style={styles.sectionSubtitle}>
            Help workers understand the job better by uploading photos.
          </Text>

          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <MaterialIcons name="add-photo-alternate" size={24} color="#007AFF" />
            <Text style={styles.uploadText}>Add Photos from Gallery</Text>
          </TouchableOpacity>

          {pickedImages.length > 0 && (
            <View style={styles.imageGrid}>
              {pickedImages.map((uri, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <MaterialIcons name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.draftButton, isSavingDraft && styles.buttonDisabled]}
            onPress={handleSaveDraft}
            disabled={isSavingDraft}
          >
            {isSavingDraft ? (
              <ActivityIndicator color="#007AFF" />
            ) : (
              <>
                <MaterialIcons name="save" size={20} color="#007AFF" />
                <Text style={styles.buttonText}>Save Draft</Text>
              </>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.submitButton, isPosting && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isPosting}
          >
            {isPosting ? (
              <>
                <MaterialIcons name="hourglass-empty" size={20} color="#fff" />
                <Text style={styles.buttonText}>Posting Job...</Text>
              </>
            ) : (
              <>
                <MaterialIcons name="send" size={20} color="#fff" />
                <Text style={styles.buttonText}>🚀 Post Job</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
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
    marginBottom: 12,
    lineHeight: 20,
  },
  progressContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
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
    marginBottom: 16,
    textAlign: 'center',
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
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  pickerIcon: {
    paddingHorizontal: 12,
  },
  select: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'transparent',
    outline: 'none',
  },
  aiSuggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  aiText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 8,
    flex: 1,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  currencySymbol: {
    paddingHorizontal: 12,
    fontSize: 18,
    color: '#27ae60',
    fontWeight: 'bold',
  },
  budgetInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
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
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 8,
  },
  mapButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  mapPreview: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  mapTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  mapImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  mapCaption: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginBottom: 24,
  },
  draftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    flex: 1,
    marginRight: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    flex: 1,
    marginLeft: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});