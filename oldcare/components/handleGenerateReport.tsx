// import { Picker } from '@react-native-picker/picker';
// import { useEffect } from 'react';
// import { supabase } from '../lib/supabase';

// const handleGenerateReport = async () => {
//   // 获取当天的聊天记录
//   const { data, error } = await supabase
//     .from('chat_logs')
//     .select('message')
//     .eq('user_id', 1)
//     .gte('created_at', new Date().toISOString().split('T')[0]); // 仅限当天记录

//   if (error) {
//     console.error('Error fetching chat logs:', error);
//     return;
//   }

//   // 将聊天记录传递给 GPT API 生成报告
//   const response = await fetch('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer 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`,
//     },
//     body: JSON.stringify({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: `你是一个报告生成器，根据用户的聊天记录生成${selectedReport}类型的报告。` },
//         { role: 'user', content: data.map((record) => record.message).join('\n') },
//       ],
//     }),
//   });

//   const gptResponse = await response.json();
//   const report = gptResponse.choices[0]?.message?.content;

//   if (report) {
//     // 弹窗显示报告
//     alert(`报告内容: ${report}`);
//   } else {
//     alert('未能生成报告');
//   }
// };
