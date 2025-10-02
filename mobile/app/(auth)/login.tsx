import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import authApi from '../../services/authApi';
import { useState } from 'react';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginScreen() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: any) => {
    setError(null);
    try {
      const response = await authApi.login({ email: values.email, password: values.password });
      if (response.data && response.data.token) {
        await login(response.data.token);
      } else {
        setError('Login failed: No token received.');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Invalid credentials or server error.';
      setError(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && touched.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            {error && <Text style={styles.errorText}>{error}</Text>}

            {isSubmitting ? (
              <ActivityIndicator size="large" style={{ marginTop: 10 }} />
            ) : (
              <Button onPress={() => handleSubmit()} title="Login" />
            )}
          </View>
        )}
      </Formik>

      <View style={styles.linkContainer}>
        <Text>Don't have an account? </Text>
        <Link href="/signup" style={styles.link}>
          Sign Up
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  link: {
    color: 'blue',
    fontWeight: 'bold',
  },
});