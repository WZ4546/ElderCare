import styles from './styles';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 处理登录逻辑
  const handleSignIn = async () => {
    setLoading(true);
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter both email and password.');
      setLoading(false);
      return;
    }

    // 使用 Supabase 的身份验证
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      Alert.alert('Error', signInError.message);
      console.error(signInError);
      setLoading(false);
      return;
    }

    // 从 auth.users 中获取 user_type
    const { data: userMetadata, error: metadataError } = await supabase.auth.getUser();

    if (metadataError || !userMetadata.user?.user_metadata?.user_type) {
      Alert.alert('Error', 'Failed to fetch user metadata.');
      console.error(metadataError || 'User metadata is missing user_type.');
      setLoading(false);
      return;
    }

    // 根据 user_type 导航到不同的页面
    const userType = userMetadata.user.user_metadata.user_type;
    if (userType === 'elder') {
      navigation.replace('HomePageElder');
    } else if (userType === 'child') {
      navigation.replace('HomePageChild');
    } else {
      Alert.alert('Error', 'Unknown user type.');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* 返回到欢迎页面的按钮，定位在左上角 */}
      <TouchableOpacity style={styles.backToWelcomeButton} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.backToWelcomeText}>{"< Back to Welcome"}</Text>
      </TouchableOpacity>

      <View style={styles.buttonRowContainer}>
        <Icon name="blind" size={60} color="#e19d49" />
        <Icon name="heart" size={30} color="#e19d49" />
      </View>

      <Text style={styles.title}>Sign In</Text>
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
        textContentType="oneTimeCode" // 避免 iOS 自动弹出强密码建议
      />
      <View style={{marginTop: 20}}>
      <Button 
        title={loading ? "Signing In..." : "Sign In"} 
        onPress={handleSignIn} 
        color="#86a373"
        disabled={loading} />
      </View>
      
    </View>
  );
}
