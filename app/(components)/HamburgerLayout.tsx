// app/components/HamburgerLayout.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HamburgerLayout({ children }: { children: React.ReactNode }) {
const router = useRouter();
const [menuOpen, setMenuOpen] = useState(false);

const toggleMenu = () => {
    setMenuOpen(!menuOpen);
};

const navigateTo = (path: '/about' | '/' | '/workers' | string) => {
    setMenuOpen(false);
    router.push(path as any); // Cast path to any to bypass type checking
};

  return (
    <View style={styles.container}>
      {/* Header with Hamburger */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerButton}>
          <MaterialIcons name="menu" size={28} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Brinkify SA</Text>
      </View>

      {/* Sidebar Menu (Conditional Render) */}
      {menuOpen && (
        <Pressable style={styles.overlay} onPress={toggleMenu}>
          <View style={styles.sidebar}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
              <MaterialIcons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/')}>
              <MaterialIcons name="home" size={20} color="#fff" />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/explore')}>
              <MaterialIcons name="explore" size={20} color="#fff" />
              <Text style={styles.menuText}>Explore</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/(auth)/login')}>
              <MaterialIcons name="lock" size={20} color="#fff" />
              <Text style={styles.menuText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/(auth)/signup')}>
              <MaterialIcons name="person-add" size={20} color="#fff" />
              <Text style={styles.menuText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/about')}>
              <MaterialIcons name="info-outline" size={20} color="#fff" />
              <Text style={styles.menuText}>About Us</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}

      {/* Screen Content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10,
  },
  hamburgerButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.75,
    height: '100%',
    backgroundColor: '#007AFF',
    padding: 24,
    paddingTop: 60,
    zIndex: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
});