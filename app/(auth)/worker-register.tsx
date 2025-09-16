import { MaterialIcons } from '@expo/vector-icons';
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

export default function WorkerRegisterScreen() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<{ name: string; type: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Pick multiple documents (ID + Qualifications)
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
        }));
        setUploadedDocs(prev => [...prev, ...newFiles]);
        Alert.alert('Success', `${result.assets.length} file(s) added.`);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to select documents.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // Remove a document
  const removeDocument = (index: number) => {
    setUploadedDocs(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    if (uploadedDocs.length < 2) {
      Alert.alert(
        'Incomplete Submission',
        'Please upload at least your ID and one qualification document.'
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
        'Your documents are under review. You’ll receive a notification once approved.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(auth)/worker-pending-approval'),
          },
        ]
      );
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <MaterialIcons name="verified-user" size={32} color="#27ae60" />
        <Text style={styles.title}>👷‍♂️ Brinkify Worker Registration</Text>
        <Text style={styles.subtitle}>
          Join Brinkify SA — South Africa’s trusted platform for skilled workers.
        </Text>
        <View style={styles.statusBadge}>
          <MaterialIcons name="info" size={14} color="#fff" />
          <Text style={styles.statusText}>Documents required for verification</Text>
        </View>
      </View>

      {/* Personal Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

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
              <Text style={styles.label}>ID Number *</Text>
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

      {/* Professional Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Details</Text>

        <Controller
          control={control}
          name="trade"
          rules={{ required: 'Please specify your trade' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Trade / Skill *</Text>
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
              <Text style={styles.label}>Years of Experience *</Text>
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

      {/* Login Credentials */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Setup</Text>

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

      {/* Document Upload */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📎 Upload Verification Documents</Text>
        <Text style={styles.sectionSubtitle}>
          Upload your ID and qualification certificates (PDF or Image). Minimum 2 documents required.
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
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Submit for Verification</Text>
        )}
      </TouchableOpacity>

      {/* Login Link */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already registered? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.loginLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 16,
    lineHeight: 18,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  error: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 8,
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
    paddingVertical: 10,
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