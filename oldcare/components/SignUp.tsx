import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('elder'); // 默认用户类型为 elder
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    if (!email || !password || !confirmPassword || !userType) {
      Alert.alert('Error', 'Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    // 注册用户到 Supabase 的 auth 系统
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { user_type: userType }, // 将用户类型存储在 profile 数据中
      },
    });

    if (authError) {
      Alert.alert('Error', authError.message);
      console.error(authError);
      setLoading(false);
      return;
    }

    // 将用户信息存储到 `users` 表中，并将 auth 用户的 `id` 存储到 `id2` 字段中
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ email, user_type: userType, id2: authData.user.id }]);

    if (insertError) {
      Alert.alert('Error', 'Failed to save user information.');
      console.error(insertError);
      setLoading(false);
      return;
    }

    Alert.alert('Success', 'Account created successfully! Please check your email to verify your account.');
    
    // 根据 userType 导航到不同的主页
    if (userType === 'elder') {
      navigation.replace('HomePageElder'); // 导航到 Elder 的主页
    } else {
      navigation.replace('HomePageChild'); // 导航到 Child 的主页
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backToWelcomeButton} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.backToWelcomeText}>{"< Back to Welcome"}</Text>
      </TouchableOpacity>

      <View style={styles.buttonRowContainer}>
        <Icon name="blind" size={60} color="#e19d49" />
        <Icon name="heart" size={30} color="#e19d49" />
      </View>

      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        textContentType="oneTimeCode"
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
        textContentType="oneTimeCode"
      />

      <View style={{ marginTop: -10, marginBottom: 20 }}>
        <Picker
          selectedValue={userType}
          onValueChange={(itemValue) => {
            setUserType(itemValue);
          }}
          style={{ width: 150, backgroundColor: 'white', marginTop:20}}
        >
          <Picker.Item label="Elder" value="elder" />
          <Picker.Item label="Child" value="child" />
        </Picker>
      </View>

      <View style={{  }}>
        <Button 
          title={loading ? "Signing Up..." : "Sign Up"} 
          onPress={handleSignUp} 
          color="#86a373"
          disabled={loading} />
      </View>

  
    </View>
  );
}
