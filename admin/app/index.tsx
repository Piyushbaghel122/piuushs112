import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type AuthResponse = {
  message: string;
  data?: {
    username: string;
    email: string;
  };
  token?: string;
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuthResponse | null>(null);

  async function handleSubmit() {
    try {
      setLoading(true);
      setResult(null);

      const response = await fetch("http://localhost:5000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      
      const data: AuthResponse = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Request failed");
        return;
      }

      setResult(data);
    } catch {
      Alert.alert("Error", "Cannot connect to backend server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Submit" onPress={handleSubmit} />
      )}

      {result ? <Text style={styles.message}>{result.message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    justifyContent: "center",
    padding: 24,
  },
  input: {
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  message: {
    marginTop: 12,
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
});
