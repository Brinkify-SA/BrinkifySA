import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import HamburgerLayout from '../(components)/HamburgerLayout';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  idNumber: string;
  trade: string;
  experienceYears: string;
  password: string;
  confirmPassword: string;
};

type DocumentType = 'id' | 'certificate' | 'license' | 'other';
type UploadedDoc = {
  name: string;
  type: string;
  category: DocumentType;
};

export default function WorkerRegisterScreen() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Personal, 2: Professional, 3: Account, 4: Documents

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      idNumber: '',
      trade: '',
      experienceYears: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  // Pick multiple documents
  const pickDocument = async () => {
    setUploading(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        multiple: true,
      });

      if (result.assets) {
        const newFiles = result.assets.map(file => ({
          name: file.name || 'Unknown File',
          type: file.mimeType?.includes('image') ? 'Image' : 'PDF',
          category: 'other' as DocumentType,
        }));
        setUploadedDocs(prev => [...prev, ...newFiles]);
        Alert.alert('✅ Success', `${result.assets.length} file(s) added. Please categorize them below.`);
      }
    } catch (err) {
      Alert.alert('❌ Error', 'Failed to select documents.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // Remove a document
  const removeDocument = (index: number) => {
    setUploadedDocs(prev => prev.filter((_, i) => i !== index));
  };

  // Set document category
  const setDocumentCategory = (index: number, category: DocumentType) => {
    setUploadedDocs(prev =>
      prev.map((doc, i) => (i === index ? { ...doc, category } : doc))
    );
  };

  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/)) strength++;
    if (pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = (strength: number) => {
    switch (strength) {
      case 0: return '#ccc';
      case 1: return '#e74c3c';
      case 2: return '#f39c12';
      case 3: return '#f1c40f';
      case 4: return '#27ae60';
      case 5: return '#27ae60';
      default: '#ccc';
    }
  };

  const showTooltip = (field: string) => {
    let message = '';
    switch (field) {
      case 'idNumber':
        message = 'We verify your ID to ensure safety and trust on our platform.';
        break;
      case 'trade':
        message = 'This helps us match you with relevant jobs in your area of expertise.';
        break;
      case 'experienceYears':
        message = 'Customers value experience. This helps you get more job offers.';
        break;
      default:
        message = 'This information helps us serve you better.';
    }
    Alert.alert('ℹ️ Why We Need This', message);
  };

  const onSubmit = async (data: FormData) => {
    // Check if at least one ID and one certificate are uploaded
    const hasId = uploadedDocs.some(doc => doc.category === 'id');
    const hasCertificate = uploadedDocs.some(doc => doc.category === 'certificate');

    if (!hasId || !hasCertificate) {
      Alert.alert(
        '📋 Incomplete Submission',
        'Please upload at least one ID document and one qualification certificate.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Scroll to documents section
              setCurrentStep(4);
            },
          },
        ]
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Registration Submitted:', data);
      console.log('Documents:', uploadedDocs);

      setIsSubmitting(false);
      Alert.alert(
        '✅ Application Submitted!',
        'Thank you for registering with Brinkify SA! Your documents are under review. You’ll receive a notification via email once approved.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(auth)/worker-pending-approval'),
          },
        ]
      );
    }, 2000);
  };

  const DocumentCategoryButton = ({ category, label, index }: { category: DocumentType; label: string; index: number }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        uploadedDocs[index]?.category === category && styles.categoryButtonActive,
      ]}
      onPress={() => setDocumentCategory(index, category)}
    >
      <Text style={[
        styles.categoryButtonText,
        uploadedDocs[index]?.category === category && styles.categoryButtonTextActive,
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <HamburgerLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons name="construction" size={32} color="#007AFF" />
          <Text style={styles.title}>👷‍♂️ Brinkify Worker Registration</Text>
          <Text style={styles.subtitle}>
            Join South Africa’s trusted platform for skilled workers
          </Text>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressSteps}>
            <View style={[styles.progressStep, currentStep >= 1 && styles.progressStepActive]}>
              <Text style={styles.progressStepText}>1</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={[styles.progressStep, currentStep >= 2 && styles.progressStepActive]}>
              <Text style={styles.progressStepText}>2</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={[styles.progressStep, currentStep >= 3 && styles.progressStepActive]}>
              <Text style={styles.progressStepText}>3</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={[styles.progressStep, currentStep >= 4 && styles.progressStepActive]}>
              <Text style={styles.progressStepText}>4</Text>
            </View>
          </View>
          <Text style={styles.progressLabel}>
            {currentStep === 1 ? 'Personal Info' :
             currentStep === 2 ? 'Professional Details' :
             currentStep === 3 ? 'Account Setup' :
             'Document Upload'}
          </Text>
        </View>

        {/* Personal Info */}
        {currentStep >= 1 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>📋 Personal Information</Text>
              <TouchableOpacity onPress={() => setCurrentStep(1)}>
                <MaterialIcons name="keyboard-arrow-down" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>

            <Controller
              control={control}
              name="fullName"
              rules={{ required: 'Full name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name *</Text>
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="e.g. Thabo Ndlovu"
                  />
                  {errors.fullName && <Text style={styles.error}>{errors.fullName.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address *</Text>
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="thabo@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="phone"
              rules={{ required: 'Phone number is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Phone Number *</Text>
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="+27 71 234 5678"
                    keyboardType="phone-pad"
                  />
                  {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="idNumber"
              rules={{ required: 'ID Number is required', minLength: { value: 13, message: 'Must be 13 digits' } }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>ID Number *</Text>
                    <TouchableOpacity onPress={() => showTooltip('idNumber')}>
                      <Ionicons name="information-circle-outline" size={16} color="#007AFF" />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="e.g. 9001015001087"
                    keyboardType="number-pad"
                  />
                  {errors.idNumber && <Text style={styles.error}>{errors.idNumber.message}</Text>}
                </View>
              )}
            />
          </View>
        )}

        {/* Professional Info */}
        {currentStep >= 2 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>💼 Professional Details</Text>
              <TouchableOpacity onPress={() => setCurrentStep(2)}>
                <MaterialIcons name="keyboard-arrow-down" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>

            <Controller
              control={control}
              name="trade"
              rules={{ required: 'Please specify your trade' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Trade / Skill *</Text>
                    <TouchableOpacity onPress={() => showTooltip('trade')}>
                      <Ionicons name="information-circle-outline" size={16} color="#007AFF" />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="e.g. Electrician, Plumber, Carpenter"
                  />
                  {errors.trade && <Text style={styles.error}>{errors.trade.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="experienceYears"
              rules={{ required: 'Years of experience required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Years of Experience *</Text>
                    <TouchableOpacity onPress={() => showTooltip('experienceYears')}>
                      <Ionicons name="information-circle-outline" size={16} color="#007AFF" />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="e.g. 5"
                    keyboardType="number-pad"
                  />
                  {errors.experienceYears && <Text style={styles.error}>{errors.experienceYears.message}</Text>}
                </View>
              )}
            />
          </View>
        )}

        {/* Login Credentials */}
        {currentStep >= 3 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🔐 Account Setup</Text>
              <TouchableOpacity onPress={() => setCurrentStep(3)}>
                <MaterialIcons name="keyboard-arrow-down" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password *</Text>
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="••••••••"
                    secureTextEntry
                  />
                  {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                  {value && (
                    <View style={styles.passwordStrength}>
                      <View style={[styles.strengthBar, { backgroundColor: getPasswordStrengthColor(getPasswordStrength(value)) }]} />
                      <Text style={styles.strengthText}>
                        {getPasswordStrength(value) === 0 ? 'Too Weak' :
                         getPasswordStrength(value) === 1 ? 'Very Weak' :
                         getPasswordStrength(value) === 2 ? 'Weak' :
                         getPasswordStrength(value) === 3 ? 'Fair' :
                         getPasswordStrength(value) === 4 ? 'Strong' : 'Very Strong'}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Confirm Password *</Text>
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="••••••••"
                    secureTextEntry
                  />
                  {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
                </View>
              )}
            />
          </View>
        )}

        {/* Document Upload */}
        {currentStep >= 4 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>📎 Upload Verification Documents</Text>
              <TouchableOpacity onPress={() => setCurrentStep(4)}>
                <MaterialIcons name="keyboard-arrow-down" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionSubtitle}>
              Upload your ID and qualification certificates. Minimum 1 ID and 1 certificate required.
            </Text>

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={pickDocument}
              disabled={uploading}
            >
              <MaterialIcons name="cloud-upload" size={24} color="#007AFF" />
              <Text style={styles.uploadText}>
                {uploading ? 'Uploading...' : 'Tap to Select Documents (PDF/Image)'}
              </Text>
            </TouchableOpacity>

            {uploadedDocs.length > 0 && (
              <View style={styles.fileList}>
                {uploadedDocs.map((doc, index) => (
                  <View key={index} style={styles.fileItem}>
                    <View style={styles.fileInfo}>
                      <MaterialIcons
                        name={doc.type === 'Image' ? 'image' : 'picture-as-pdf'}
                        size={20}
                        color="#555"
                      />
                      <Text style={styles.fileName} numberOfLines={1}>
                        {doc.name}
                      </Text>
                      <Text style={styles.fileType}>({doc.type})</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeDocument(index)}>
                      <MaterialIcons name="delete-outline" size={20} color="#e74c3c" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {uploadedDocs.length > 0 && (
              <View style={styles.categorySection}>
                <Text style={styles.categoryTitle}>Categorize Your Documents:</Text>
                {uploadedDocs.map((doc, index) => (
                  <View key={index} style={styles.categoryRow}>
                    <Text style={styles.categoryLabel}>{doc.name}</Text>
                    <View style={styles.categoryButtons}>
                      <DocumentCategoryButton category="id" label="ID" index={index} />
                      <DocumentCategoryButton category="certificate" label="Certificate" index={index} />
                      <DocumentCategoryButton category="license" label="License" index={index} />
                      <DocumentCategoryButton category="other" label="Other" index={index} />
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Navigation Buttons */}
        <View style={styles.navButtons}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={styles.prevButton}
              onPress={() => setCurrentStep(currentStep - 1)}
            >
              <MaterialIcons name="arrow-back" size={20} color="#007AFF" />
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          {currentStep < 4 && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setCurrentStep(currentStep + 1)}
            >
              <Text style={styles.navButtonText}>Next</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Submit Button (only on last step) */}
        {currentStep === 4 && (
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>✅ Submit for Verification</Text>
            )}
          </TouchableOpacity>
        )}

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already registered? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.loginLink}>Log In</Text>
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
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  progressSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressStepActive: {
    backgroundColor: '#007AFF',
  },
  progressStepText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#eee',
    marginHorizontal: 4,
  },
  progressLineActive: {
    backgroundColor: '#007AFF',
  },
  progressLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
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
  inputGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  error: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
  passwordStrength: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  strengthBar: {
    width: 100,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
  },
  strengthText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 16,
    lineHeight: 18,
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
    flex: 1,
  },
  fileList: {
    marginTop: 12,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileName: {
    fontSize: 13,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  fileType: {
    fontSize: 11,
    color: '#777',
    marginLeft: 4,
  },
  categorySection: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  categoryRow: {
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#555',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  prevButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#007AFF',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginRight: 8,
  },
  navButtonTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#27ae60',
    marginHorizontal: 24,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  submitButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  loginText: {
    color: '#555',
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});