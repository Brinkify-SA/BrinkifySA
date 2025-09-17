import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'worker' | 'customer'>('customer');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLogin = async (data: FormData) => {
    if (!data.email || !data.password) {
      Alert.alert('⚠️ Validation Error', 'Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      // In real app: call API, get user.role from backend
      let userRole = userType; // Use selected role for demo
      if (data.email.toLowerCase().includes('pending')) {
        userRole = 'worker-pending';
      }

      console.log('Login successful for:', data.email, 'Role:', userRole);

      // Redirect based on role
      if (userRole === 'worker-pending') { // Fixed: Check for pending first
        Alert.alert(
          '⏳ Verification Pending',
          'Your account is under review. We’ll notify you once approved.',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/(auth)/worker-pending-approval'),
            },
          ]
        );
      } else if (userRole === 'worker') { // Fixed: Then check for worker
        Alert.alert(
          '✅ Welcome Back, Pro!',
          'Redirecting to your Worker Dashboard...',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/(worker)/dashboard'),
            },
          ]
        );
      } else { // Fixed: Removed the extra */ comment
        Alert.alert(
          '✅ Welcome Back!',
          'Redirecting to your Customer Dashboard...',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/(customer)/home'),
            },
          ]
        );
      }
    }, 2000);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      '📧 Forgot Password?',
      'Enter your email and we’ll send you a reset link.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Reset Link',
          onPress: () => Alert.alert('✅ Success', 'Password reset link sent to your email.'),
        },
      ]
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <HamburgerLayout>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Brand Header */}
        <View style={styles.brandHeader}>
          <MaterialIcons name="home-repair-service" size={56} color="#007AFF" />
          <Text style={styles.appTitle}>Brinkify SA</Text>
          <Text style={styles.appSubtitle}>South Africa’s Trusted Home Services Platform</Text>
        </View>

        {/* User Type Toggle */}
        <View style={styles.userTypeContainer}>
          <Text style={styles.userTypeLabel}>I am a:</Text>
          <View style={styles.userTypeToggle}>
            <TouchableOpacity
              style={[styles.userTypeButton, userType === 'customer' && styles.userTypeButtonActive]}
              onPress={() => setUserType('customer')}
            >
              <Ionicons name="person" size={20} color={userType === 'customer' ? '#fff' : '#555'} />
              <Text style={[styles.userTypeText, userType === 'customer' && styles.userTypeTextActive]}>
                Customer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.userTypeButton, userType === 'worker' && styles.userTypeButtonActive]}
              onPress={() => setUserType('worker')}
            >
              <Ionicons name="construct" size={20} color={userType === 'worker' ? '#fff' : '#555'} />
              <Text style={[styles.userTypeText, userType === 'worker' && styles.userTypeTextActive]}>
                Worker
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Log In to Your {userType === 'worker' ? 'Worker' : 'Customer'} Account</Text>

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
                    autoComplete="email"
                  />
                </View>
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
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
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                    <MaterialIcons
                      name={showPassword ? 'visibility' : 'visibility-off'}
                      size={20}
                      color="#7f8c8d"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
              </View>
            )}
          />

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, isSubmitting && styles.loginButtonDisabled]}
            onPress={handleSubmit(onLogin)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>🔓 Log In</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Social Login (Optional) */}
        <View style={styles.socialLoginContainer}>
          <Text style={styles.socialLoginTitle}>Or log in with</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={24} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={24} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <MaterialIcons name="facebook" size={24} color="#4267B2" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Section */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don’t have an account?{' '}
            <Text style={styles.signupLink} onPress={() => router.push('/(auth)/signup')}>
              Sign Up as {userType === 'worker' ? 'Worker' : 'Customer'}
            </Text>
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By logging in, you agree to our{' '}
            <Text style={styles.linkText} onPress={() => Alert.alert('Terms', 'Terms of Service')}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text style={styles.linkText} onPress={() => Alert.alert('Privacy', 'Privacy Policy')}>
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </ScrollView>
    </HamburgerLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 40,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 16,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 300,
  },
  userTypeContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  userTypeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
  },
  userTypeToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  userTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  userTypeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  userTypeText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
    fontWeight: '500',
  },
  userTypeTextActive: {
    color: '#fff',
  },
  formCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
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
  eyeButton: {
    paddingHorizontal: 12,
  },
  error: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  socialLoginContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  socialLoginTitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  signupContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  signupText: {
    color: '#555',
    fontSize: 15,
    textAlign: 'center',
  },
  signupLink: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
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