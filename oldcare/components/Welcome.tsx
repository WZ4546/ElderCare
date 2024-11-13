import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'; 
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    
    <View style={styles.container}>
      <View style={styles.RowContainer}>
        <Icon name="blind" size={90} color="#e19d49" />
        <Icon name="heart" size={65} color="#e19d49" />
      </View>
      <Text style={styles.title}>Welcome to CareMate</Text>
      <Text style={styles.subtitle}>Please sign in or sign up to continue</Text>
      
      <View style={styles.buttonContainer }>
        <Button
          title="Sign In"
          onPress={() =>  navigation.replace('SignIn')}
          color="#86a373"
        />
        <Button
          title="Sign Up"
          onPress={() =>  navigation.replace('SignUp')}
          color="#f7c967" // Optional: different color for the button
        />

        <TouchableOpacity style={styles.BecomeVolunteer} onPress={() => navigation.replace('VolunteerRegister')}>
        <Text style={styles.BecomeVolunteerText}>{"Join us to become a volunteer!"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}