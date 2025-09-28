import { useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useApi } from '../../services/useApi';
import usersApi from '../../services/usersApi';

export default function ProfileScreen() {
  const { logout } = useAuth();

  const { data: user, loading, error, request: loadUser } = useApi(usersApi.getMe);

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => logout() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      
      {user && (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>
      )}
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
  infoContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: 'gray',
  },
  info: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 5,
  },
});