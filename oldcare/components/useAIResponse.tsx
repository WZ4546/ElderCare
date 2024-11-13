import { useRef } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export default function useAIResponse() {
  const soundRef = useRef<Audio.Sound | null>(null); // 保存音频对象

  // 调用 GPT Edge Function 获取 AI 响应
  const getAIResponse = async (transcriptText: string) => {
    try {
      const response = await fetch('https://qxeluulysbotzhnzuvyi.supabase.co/functions/v1/gpt-function', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer `,
        },
        body: JSON.stringify({ prompt: transcriptText }),
      });

      const data = await response.json();
      if (data.message) {
        return data.message;
      }
      return null;
    } catch (error) {
      console.error('Error getting AI response:', error);
      return null;
    }
  };

  // 调用 Google Text-to-Speech API 将 AI 回复转换为语音并播放
  const playTextAsSpeech = async (text: string) => {
    try {
      const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyBoZ1j6OBsSvVrg2Pcx08d6RT6HzmUA3ww', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: { text },
          voice: { languageCode: 'en-US', name: 'en-US-Wavenet-D' },
          audioConfig: { audioEncoding: 'MP3' },
        }),
      });

      const data = await response.json();
      const audioContent = data.audioContent;

      if (audioContent) {
        const audioUri = `${FileSystem.cacheDirectory}ai-response.mp3`;
        await FileSystem.writeAsStringAsync(audioUri, audioContent, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // 清理之前的音频
        if (soundRef.current) {
          await soundRef.current.unloadAsync();
          soundRef.current = null;
        }

        const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
        soundRef.current = sound;
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error synthesizing speech:', error);
    }
  };

  return {
    getAIResponse,
    playTextAsSpeech,
    unloadSound: async () => {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    },
  };
}
