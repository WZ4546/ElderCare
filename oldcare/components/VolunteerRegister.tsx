import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function VolunteerRegister() {
  const navigation = useNavigation();
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [areas, setExpertiseArea] = useState('health');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);

    if (!phone_number || !email || !areas) {
      Alert.alert('Error', 'Please fill in all fields.');
      setLoading(false);
      return;
    }

    // Insert user information into the 'volunteer' table
    
  
    Alert.alert('Success', 'Registered successfully!');
    navigation.replace('Welcome');
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

      <Text style={styles.title}>Volunteer Register</Text>
      <TextInput
        placeholder="Phone Number"
        value={phone_number}
        onChangeText={setPhoneNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Note (Special Skills)"
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />

      <View style={{ marginTop: -10, marginBottom: 20 }}>
        <Picker
          selectedValue={areas}
          onValueChange={(itemValue) => setExpertiseArea(itemValue)}
          style={{ width: 150, backgroundColor: 'white', marginTop: 20 }}
        >
          <Picker.Item label="Health" value="health" />
          <Picker.Item label="Emotion" value="emotion" />
          <Picker.Item label="Others" value="others" />
        </Picker>
      </View>

      <Button
        title={loading ? "Registering..." : "Volunteer Register"}
        onPress={handleSignUp}
        color="#86a373"
        disabled={loading}
      />
    </View>
  );
}