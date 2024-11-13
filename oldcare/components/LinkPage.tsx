import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LinkPage() {
  const [elderEmail, setElderEmail] = useState('');
  const [childEmail, setChildEmail] = useState('');

  const fetchUserIdByEmail = async (email, userType) => {
    try {
      console.log(`Querying user: ${email}, Type: ${userType}`);
      
      const { data: user, error } = await supabase
        .from('users')
        .select('id2, user_type')
        .eq('email', email)
        .maybeSingle();
  
      console.log("Query result:", user);
  
      if (error) {
        console.error("Error fetching user:", error);
        Alert.alert("Error", `No matching ${userType} user found`);
        return null;
      }
  
      if (!user || user.user_type !== userType) {
        Alert.alert("Error", `No matching ${userType} user or user type mismatch`);
        return null;
      }
  
      return user.id2;  // 返回 id2 而不是 id
    } catch (error) {
      console.error("Error in fetching user by email:", error);
      Alert.alert("Error", "User verification failed");
      return null;
    }
  };
  

  // Handle linking users
  const handleLinkUsers = async () => {
    if (!elderEmail || !childEmail) {
      Alert.alert('Error', 'Please enter both Elder and Child user emails');
      return;
    }

    const elderId2 = await fetchUserIdByEmail(elderEmail, 'elder');
    const childId2 = await fetchUserIdByEmail(childEmail, 'child');

    if (elderId2 && childId2) {
      // Insert linked data into user_links table
      const { error } = await supabase
        .from('user_links')
        .insert([{ elder_user_id: elderId2, child_user_id: childId2 }]);

      if (error) {
        console.error("Error linking users:", error);
        Alert.alert("Error", "Failed to link users");
      } else {
        Alert.alert("Success", "Successfully linked Elder and Child users");
        setElderEmail('');
        setChildEmail('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRowContainer}>
        <Icon name="blind" size={60} color="#e19d49" />
        <Icon name="heart" size={30} color="#e19d49" />
      </View>

      <Text style={styles.title}>Link Elder and Child Users</Text>

      <TextInput
        value={elderEmail}
        onChangeText={setElderEmail}
        placeholder="Elder user email"
        style={styles.input}
        keyboardType="email-address"
      />
      <Text style={styles.subtitle}>Enter Elder User Email</Text>

      <TextInput
        value={childEmail}
        onChangeText={setChildEmail}
        placeholder="Child user email"
        style={styles.input}
        keyboardType="email-address"
      />
      <Text style={styles.subtitle}>Enter Child User Email</Text>

      <Button 
        title="Link Users" 
        color='#86a373'
        onPress={handleLinkUsers} />
    </View>
  );
}
