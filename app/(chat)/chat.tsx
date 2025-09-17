// app/chat.tsx
import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ChatScreen() {
  const router = useRouter();

  const [messages, setMessages] = useState([
    { id: "1", text: "Hi, I’m interested in your bathroom job!", sender: "worker" },
    { id: "2", text: "Great! Can you start next week?", sender: "customer" },
    { id: "3", text: "Yes, I’ll bring all materials.", sender: "worker" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = (text: string, type: "text" | "image" | "file" = "text") => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: "customer", // later: dynamic role
      type,
    };
    setMessages([...messages, newMessage]);
  };

  const handleAttach = async () => {
    Alert.alert(
      "📎 Attach",
      "Choose a file type to attach",
      [
        { text: "Image/Video", onPress: pickImageOrVideo },
        { text: "Document", onPress: pickDocument },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const pickImageOrVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // allows images & videos
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      sendMessage(result.assets[0].uri, "image");
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
    if (result.type === "success") {
      sendMessage(result.name, "file");
    }
  };

  const handleViewProfile = (userType: string) => {
    Alert.alert("👤 Profile", `Viewing ${userType}'s profile...`);
    // router.push(`/${userType}-profile`);
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isCustomer = item.sender === "customer";

    const profile = isCustomer
      ? {
          name: "Sarah K.",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
        }
      : {
          name: "Thabo N.",
          image: "https://randomuser.me/api/portraits/men/46.jpg",
        };

    return (
      <View
        style={[
          styles.messageRow,
          { justifyContent: isCustomer ? "flex-end" : "flex-start" },
        ]}
      >
        {!isCustomer && (
          <TouchableOpacity onPress={() => handleViewProfile("worker")}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: profile.image }} style={styles.avatar} />
              <Text style={styles.avatarName}>{profile.name}</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Handle different message types */}
        <View
          style={[
            styles.messageBubble,
            isCustomer ? styles.customerBubble : styles.workerBubble,
          ]}
        >
          {item.type === "image" ? (
            <Image source={{ uri: item.text }} style={styles.attachmentImage} />
          ) : item.type === "file" ? (
            <Text style={[styles.messageText, { fontStyle: "italic" }]}>
              📄 {item.text}
            </Text>
          ) : (
            <Text
              style={[
                styles.messageText,
                isCustomer ? styles.customerText : styles.workerText,
              ]}
            >
              {item.text}
            </Text>
          )}
        </View>

        {isCustomer && (
          <TouchableOpacity onPress={() => handleViewProfile("customer")}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: profile.image }} style={styles.avatar} />
              <Text style={styles.avatarName}>{profile.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      {/* Navbar */}
      <View style={styles.navbar}>
        <Image
          source={{ uri: "https://via.placeholder.com/40x40.png?text=B" }}
          style={styles.logo}
        />
        <Text style={styles.navTitle}>Brinkify Chat</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
      />

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.attachBtn} onPress={handleAttach}>
          <MaterialIcons name="attach-file" size={22} color="#555" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => {
            sendMessage(input);
            setInput("");
          }}
        />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => {
            sendMessage(input);
            setInput("");
          }}
        >
          <MaterialIcons name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "lightgray" },

  // Navbar
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#007AFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  navTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },

  // Chat
  chatContainer: { padding: 12 },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 6,
  },
  avatarContainer: { alignItems: "center", marginHorizontal: 6 },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  avatarName: {
    fontSize: 11,
    color: "#333",
    marginTop: 2,
    maxWidth: 60,
    textAlign: "center",
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 12,
    borderRadius: 18,
  },
  customerBubble: {
    backgroundColor: "#007AFF",
    borderBottomRightRadius: 4,
  },
  workerBubble: {
    backgroundColor: "#e0e0e0",
    borderBottomLeftRadius: 4,
  },
  messageText: { fontSize: 15 },
  customerText: { color: "#fff" },
  workerText: { color: "#333" },
  attachmentImage: { width: 150, height: 100, borderRadius: 8 },

  // Input bar
  inputBar: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  attachBtn: { padding: 6, marginRight: 4 },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
