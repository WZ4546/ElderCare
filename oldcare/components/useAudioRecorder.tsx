import { useState, useRef } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Alert, Platform } from 'react-native';

export default function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recordingRef = useRef<Audio.Recording | null>(null);

  // 请求麦克风权限
  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'You need to grant microphone permission to use this feature.');
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert('Error', 'Failed to request microphone permission.');
      return false;
    }
  };

  // 开始录音
  const startRecording = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) return;

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      const recordingOptions = {
        android: {
          extension: '.wav',
          outputFormat: Audio.AndroidOutputFormat.WEBM,
          audioEncoder: Audio.AndroidAudioEncoder.LINEAR16,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
        },
        ios: {
          extension: '.wav',
          audioQuality: Audio.IOSAudioQuality.HIGH,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      };

      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
      recordingRef.current = recording;
      setIsRecording(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording.');
    }
  };

  // 停止录音并转录
  const stopRecordingAndTranscribe = async (onTranscribe: (transcript: string) => void) => {
    try {
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        const uri = recordingRef.current.getURI();

        if (uri) {
          let base64Audio = '';
          if (Platform.OS === 'web') {
            const response = await fetch(uri);
            const blob = await response.blob();
            base64Audio = await readBlobAsBase64(blob);
          } else {
            base64Audio = await FileSystem.readAsStringAsync(uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
          }

          const transcriptText = await transcribeSpeech(base64Audio);
          setTranscript(transcriptText || 'Transcription failed');

          // 将转录的文本传递给处理 AI 的部分
          if (transcriptText) {
            onTranscribe(transcriptText);
          }
        }

        setIsRecording(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording or transcribe.');
      setIsRecording(false);
    }
  };

  // 将 Blob 转换为 Base64
  const readBlobAsBase64 = (blob: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result?.toString().split(',')[1] ?? '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // 调用 Google Speech-to-Text API
  const transcribeSpeech = async (base64Audio: string) => {
    try {
      const response = await fetch('https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyBoZ1j6OBsSvVrg2Pcx08d6RT6HzmUA3ww', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
          },
          audio: {
            content: base64Audio,
          },
        }),
      });

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].alternatives[0].transcript;
      }
      return null;
    } catch (error) {
      console.error('Error transcribing speech:', error);
      return null;
    }
  };

  return {
    isRecording,
    transcript,
    startRecording,
    stopRecordingAndTranscribe,
  };
}
