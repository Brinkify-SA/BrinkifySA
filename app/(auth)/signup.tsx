import { MaterialIcons } from '@expo/vector-icons';
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
  password: string;
};

export default function SignupScreen() {
  const router = useRouter();
  const [userType, setUserType] = useState<'worker' | 'customer'>('customer'); // Default to customer
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      console.log(`${userType === 'worker' ? '👷 Worker' : '👩‍💻 Customer'} Sign Up:`);

      // Redirect based on user type
      if (userType === 'worker') {
        // Pass along their basic info to worker registration
        Alert.alert(
          '✅ Almost There!',
          'Now let’s verify your identity and qualifications to get you started.',
          [
            {
              text: 'Continue to Worker Registration',
              onPress: () => router.push('/(auth)/worker-register'),
            },
          ]
        );
      } else {
        // For customers, go to home or profile setup
        Alert.alert(
          '✅ Welcome to Brinkify SA!',
          'Your account is ready. Start posting jobs or browse professionals.',
          [
            {
              text: 'Go to Home',
              onPress: () => router.replace('/(tabs)/explore'),
            },
          ]
        );
      }
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="how-to-reg" size={48} color="#27ae60" />
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>Join South Africa’s trusted platform for home services</Text>
      </View>

      {/* User Type Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, userType === 'customer' && styles.toggleButtonActive]}
          onPress={() => setUserType('customer')}
        >
          <MaterialIcons name="person" size={20} color={userType === 'customer' ? '#fff' : '#555'} />
          <Text style={[styles.toggleText, userType === 'customer' && styles.toggleTextActive]}>
            Customer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, userType === 'worker' && styles.toggleButtonActive]}
          onPress={() => setUserType('worker')}
        >
          <MaterialIcons name="construction" size={20} color={userType === 'worker' ? '#fff' : '#555'} />
          <Text style={[styles.toggleText, userType === 'worker' && styles.toggleTextActive]}>
            Worker
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Form */}
      <View style={styles.formCard}>
        <Controller
          control={control}
          name="fullName"
          rules={{ required: 'Full name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="person-outline" size={20} color="#7f8c8d" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="e.g. John Doe"
                />
              </View>
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
              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={20} color="#7f8c8d" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            </View>
          )}
        />

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
              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={20} color="#7f8c8d" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="••••••••"
                  secureTextEntry
                />
              </View>
              {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            </View>
          )}
        />

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.signupButton, isSubmitting && styles.signupButtonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signupButtonText}>
              Sign Up as {userType === 'worker' ? 'Worker' : 'Customer'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Login Link */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.loginLink}>Log In</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Note */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By signing up, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#7f8c8d',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  toggleButtonActive: {
    backgroundColor: '#007AFF',
  },
  toggleText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
    marginLeft: 6,
  },
  toggleTextActive: {
    color: '#fff',
  },
  formCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fafafa',
  },
  inputIcon: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 10,
  },
  signupButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#555',
    fontSize: 15,
  },
  loginLink: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 4,
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: '#007AFF',
    fontWeight: '500',
  },
});