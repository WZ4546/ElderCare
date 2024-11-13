import styles from './styles';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import useAudioRecorder from './useAudioRecorder';
import useAIResponse from './useAIResponse';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomePageElder() {
  const navigation = useNavigation();
  const { isRecording, transcript, startRecording, stopRecordingAndTranscribe } = useAudioRecorder();
  const { getAIResponse, playTextAsSpeech } = useAIResponse();
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const [selectedReport, setSelectedReport] = useState('health');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        Alert.alert('Error', 'User not logged in.');
      } else {
        setUserId(userData.user.id);
      }
    };
    fetchUserId();
  }, []);

  // 登出功能
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', 'Failed to log out');
    } else {
      navigation.replace('SignIn'); // 假设 "SignIn" 是登录页面的名称
    }
  };

  // 呼吸动画逻辑
  const startBreathingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnimation, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopBreathingAnimation = () => {
    scaleAnimation.stopAnimation();
  };

  // 保存聊天记录到 Supabase
  const saveChatMessage = async (message, sender) => {
    if (!userId) {
      Alert.alert('Error', 'User ID not available.');
      return;
    }

    const { error } = await supabase.from('chat_logs').insert([
      { user_id: userId, message, sender },
    ]);
    if (error) console.error('Error saving message:', error);
  };

  // 处理点击事件以触发录音和动画
  const handlePress = () => {
    if (isRecording) {
      stopRecordingAndTranscribe(async (transcriptText) => {
        await saveChatMessage(transcriptText, 'user');
        const aiReply = await getAIResponse(transcriptText);
        if (aiReply) {
          await saveChatMessage(aiReply, 'AI');
          await playTextAsSpeech(aiReply);
        }
      });
      stopBreathingAnimation();
    } else {
      startRecording();
      startBreathingAnimation();
    }
  };

  // 生成报告
  const handleGenerateReport = async () => {
    if (!userId) {
      Alert.alert('Error', 'User ID not available.');
      return;
    }
  
    // 获取当天的开始和结束时间
    const today = new Date();
    const todayStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0)).toISOString();
    const todayEnd = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59)).toISOString();
  
    const { data, error } = await supabase
      .from('chat_logs')
      .select('message')
      .eq('user_id', userId)
      .gte('created_at', todayStart)
      .lte('created_at', todayEnd);
  
    if (error) {
      console.error('Error fetching chat logs:', error);
      Alert.alert('Error', 'Failed to fetch chat logs from the database.');
      return;
    }
  
    if (!data || data.length === 0) {
      Alert.alert('Error', 'No chat history found for today.');
      return;
    }
  
    const chatHistory = data.map((record) => record.message).join('\n');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `, // 替换为你的 OpenAI API 密钥
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: `You are a report generator. Based on the user's chat history, generate a report of type ${selectedReport}.` },
            { role: 'user', content: chatHistory },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const gptResponse = await response.json();
      const report = gptResponse?.choices?.[0]?.message?.content;

      if (report) {
        Alert.alert('Generated Report', report);
      } else {
        Alert.alert('Error', 'Failed to generate report. Please check the API response format.');
        console.error('Unexpected GPT API response format:', gptResponse);
      }
    } catch (error) {
      console.error('Error generating report:', error);
      Alert.alert('Error', 'An error occurred while generating the report. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('LinkPage')}>
          <Text style={styles.linkButtonText}>Link to Child</Text>
        </TouchableOpacity>

      <View style={styles.promptAndImageContainer}>
        <Text style={styles.promptText}>Tap to chat with your AI assistant</Text>
        <TouchableOpacity onPress={handlePress}>
          <Animated.View style={[styles.imageWrapper, { transform: [{ scale: scaleAnimation }] }]}>
            <Image source={{ uri: 'https://hips.hearstapps.com/hmg-prod/images/republican-presidential-candidate-former-president-donald-news-photo-1721157463.jpg?crop=0.66699xw:1xh;center,top&resize=640:*' }} style={styles.image} resizeMode="contain" />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <View style={styles.lowerSection}>
    <Text style={{ textAlign: 'start', fontSize: 18, color: '#8a745d', fontWeight: 'bold', marginBottom: 5 }}>
        Select Your AI Report Type
    </Text>

    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'top', // 水平居中
        backgroundColor: '#f7f2e9',
        padding: 10,
        borderRadius: 15,
        width: '90%',
        alignSelf: 'center' // 居中整个容器
    }}>
      <Picker
          selectedValue={selectedReport}
          onValueChange={(itemValue) => setSelectedReport(itemValue)}
          style={{
              width: 150,
              height: 40,
              borderRadius: 5,
              marginTop: -70,
          }}
      >
          <Picker.Item label="Health" value="health" />
          <Picker.Item label="Emotion" value="emotion" />
          <Picker.Item label="Other" value="other" />
      </Picker>
      <TouchableOpacity style={[styles.confirmButton, { paddingHorizontal: 20 }]}onPress={handleGenerateReport}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
      </View>
      </View>


      <View style={styles.buttonRowContainer}>

        <TouchableOpacity style={styles.emergencyButton} onPress={() => Alert.alert('Emergency Call', 'Dialing emergency number...')}>
          <Icon name="phone" size={20} color="white" />
          <Text style={styles.emergencyText}>Emergency</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkInButton} onPress={() => Alert.alert('Check In', 'Check in successfully!')}>
          <Icon name="check" size={20} color="white" />
          <Text style={styles.checkInButtonText}>Check in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.volunteerButton} onPress={() => Alert.alert('Volunteer Service', 'Contacting a suitable volunteer for you...')}>
          <Icon name="heart" size={20} color="white" />
          <Text style={styles.volunteerText}> Contact Volunteer</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}
