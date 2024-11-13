// import { StyleSheet } from 'react-native';

// export default StyleSheet.create({
//   buttonRowContainer: {
//     flexDirection: 'row', 
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop:5,
//   },
//   backToWelcomeButton: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//     padding: 5,
//   },
//   BecomeVolunteer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop:10,
//     padding: 5,
//   },
//   BecomeVolunteerText: {
//     fontSize: 14,
//     textDecorationLine: 'underline',
//     color: '#e19d49', // 可根据需要自定义颜色
//   },  

//   RowContainer: {
//     flexDirection: 'row', 
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  
//   backToWelcomeText: {
//     fontSize: 16,
//     color: '#e19d49', // 可根据需要自定义颜色
//   },  
//   logoutButton: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     padding: 10,
//     backgroundColor: '#e1d4a7',
//     borderRadius: 5,
//     zIndex: 1,
//   },
//   logoutButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

  
//   emergencyButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ad282f',
//     width: 115, 
//     height: 100, 
//     borderRadius: 35, 
//     padding: 10,
    
//   },
  
//   emergencyText: {
//     color: 'white',
//     fontSize: 16,
//   },

//   checkInButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#eac47c',
//     width: 115, 
//     height: 100, 
//     borderRadius: 35, 
//     marginLeft: 10, 
//   },
  
//   checkInButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },

//   volunteerButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#dbc0af',
//     width: 115, 
//     height: 100, 
//     borderRadius: 35, 
//     marginLeft: 10, 
//     padding: 10,
    
//   },
  
//   volunteerText: {
//     color: 'white',
//     fontSize: 16,
//   },

//   checkLocationButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#eac47c',
//     width: 115, 
//     height: 100, 
//     borderRadius: 35, 
//   },
  
//   checkLocationButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },

//   ActivityRecordButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#e19d92',
//     width: 115, 
//     height: 100, 
//     borderRadius: 35, 
//     marginLeft: 10, 
//   },
  
//   ActivityRecordButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },

//   HealthDataButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#dbc0af',
//     width: 115, 
//     height: 100, 
//     borderRadius: 35, 
//     marginLeft: 10, 
//   },

//   linkButton: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     padding: 10,
//     backgroundColor: '#c4c9c2',
//     borderRadius: 5,
//     zIndex: 1,
//   },
  
//   linkButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },  

//   container: {
//     flex: 1,
//     backgroundColor: '#f7eabb', // 背景颜色：淡黄色
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   promptAndImageContainer: {
//     justifyContent: 'center', // 垂直方向居中
//     alignItems: 'center', // 水平方向居中
//     backgroundColor: '#f7f3e5', // White background for the assistant section
//     padding: 20, // Padding around the text and image
//     borderRadius: 30, // Optional: rounded corners for the section
//     width: '90%', 
//     shadowColor: '#000', 
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 5, 
//     marginTop: 40,
//   },
//   upperSection: {
//     flex: 1,
//     justifyContent: 'center', // 垂直居中
//     alignItems: 'center',
//     width: '100%',
//   },
//   lowerSection: {
    
//     //justifyContent: 'flex-start',
//     alignItems: 'center',
//     //marginTop: 80,
//     marginBottom: 40,
//     justifyContent: 'center', // 垂直方向居中
//     backgroundColor: '#f7f3e5', // White background for the assistant section
//     padding: 20, // Padding around the text and image
//     borderRadius: 30, // Optional: rounded corners for the section
//     width: '90%', // Adjust width as needed
//     marginVertical: 20, 
//     shadowColor: '#000', 
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 5, 
//   },
//   promptText: {
//     fontSize: 26,
//     fontWeight: 'bold', // 加粗文本
//     color: '#d7835e',
//     textAlign: 'center', // 居中对齐
//     marginBottom: 20, // 图像与提示语之间的间距
//   },
//   Text: {
//     fontSize: 20,
//     fontWeight: 'bold', // 加粗文本
//     color: '#b5b24d',
//     textAlign: 'center', // 居中对齐
//     marginBottom: 20, // 图像与提示语之间的间距
//   },
//   imageWrapper: {
//     borderWidth: 2, // 边框宽度
//     borderColor: '#f7c967', // 边框颜色：淡蓝色
//     borderRadius: 100, // 圆形边框
//     padding: 5, // 内边距
//     marginTop: 0, // 去除默认的上边距
//   },
//   image: {
//     width: 150,
//     height: 150,
//     borderRadius: 75, // 使图片本身也为圆形
//   },
//   outputBox: {
//     fontSize: 18,
//     color: '#333',
//   },
//   reportButton: {
//     backgroundColor: '#ADD8E6',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   reportButtonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   input: {
//     width: '80%',
//     padding: 10,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     backgroundColor: 'white', 
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#e19d49',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     width: '50%',
//     justifyContent: 'space-between',
//   },
//   confirmButtonContainer: {
//     //flexDirection: 'row',
//     justifyContent: 'flex-end',
//     width: '40%',
//     marginTop: 10,
//   },
//   confirmButton: {
//     backgroundColor: '#86a373',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   confirmButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

  
// });

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonRowContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
  },
  backToWelcomeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 5,
  },

  RowContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  backToWelcomeText: {
    fontSize: 16,
    color: '#e19d49', // 可根据需要自定义颜色
  },  
  logoutButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: '#e1d4a7',
    borderRadius: 5,
    zIndex: 1,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ad282f',
    width: 115, 
    height: 60, 
    borderRadius: 35, 
    padding: 10,
    marginTop: -30,
  },
  
  emergencyText: {
    color: 'white',
    fontSize: 16,
  },

  checkInButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eac47c',
    width: 115, 
    height: 60, 
    borderRadius: 35, 
    marginLeft: 10, 
    marginTop: -30,
  },
  
  checkInButtonText: {
    color: 'white',
    fontSize: 16,
  },

  volunteerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbc0af',
    width: 115, 
    height: 60, 
    borderRadius: 35, 
    marginLeft: 10, 
    padding: 10,
    marginTop: -30,
  },
  
  volunteerText: {
    color: 'white',
    fontSize: 16,
  },

  checkLocationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eac47c',
    width: 115, 
    height: 100, 
    borderRadius: 35, 
    marginLeft: 10, 
    marginTop: -30,
  },
  
  checkLocationButtonText: {
    color: 'white',
    fontSize: 16,
  },

  ActivityRecordButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e19d92',
    width: 115, 
    height: 100, 
    borderRadius: 35, 
    marginLeft: 10, 
  },
  
  ActivityRecordButtonText: {
    color: 'white',
    fontSize: 16,
  },

  HealthDataButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dbc0af',
    width: 115, 
    height: 60, 
    borderRadius: 35, 
    marginLeft: 10, 
    marginTop: -30,
  },

  linkButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#c4c9c2',
    borderRadius: 5,
    //zIndex: 1,
  },
  
  linkButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },  

  container: {
    flex: 1,
    backgroundColor: '#f7eabb', // 背景颜色：淡黄色
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptAndImageContainer: {
    justifyContent: 'center', // 垂直方向居中
    alignItems: 'center', // 水平方向居中
    backgroundColor: '#f7f3e5', // White background for the assistant section
    padding: 20, // Padding around the text and image
    borderRadius: 30, // Optional: rounded corners for the section
    width: '90%', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, 
    marginTop: 10,
  },
  upperSection: {
    flex: 1,
    justifyContent: 'center', // 垂直居中
    alignItems: 'center',
    width: '100%',
  },
  lowerSection: {
    
    //justifyContent: 'flex-start',
    alignItems: 'center',
    //marginTop: 80,
    marginBottom: 40,
    justifyContent: 'start', // 垂直方向居中
    backgroundColor: '#f7f3e5', // White background for the assistant section
    padding: 20, // Padding around the text and image
    borderRadius: 30, // Optional: rounded corners for the section
    height: '30%',
    width: '90%', // Adjust width as needed
    marginVertical: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, 
  },
  promptText: {
    fontSize: 26,
    fontWeight: 'bold', // 加粗文本
    color: '#d7835e',
    textAlign: 'center', // 居中对齐
    marginBottom: 20, // 图像与提示语之间的间距
  },
  Text: {
    fontSize: 20,
    fontWeight: 'bold', // 加粗文本
    color: '#b5b24d',
    textAlign: 'center', // 居中对齐
    marginBottom: 20, // 图像与提示语之间的间距
  },
  imageWrapper: {
    borderWidth: 2, // 边框宽度
    borderColor: '#f7c967', // 边框颜色：淡蓝色
    borderRadius: 100, // 圆形边框
    padding: 5, // 内边距
    marginTop: 0, // 去除默认的上边距
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75, // 使图片本身也为圆形
  },
  outputBox: {
    fontSize: 18,
    color: '#333',
  },
  reportButton: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  reportButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#e19d49',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '50%',
    justifyContent: 'space-between',
  },
  confirmButtonContainer: {
    justifyContent: 'flex-end',
    width: '40%',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#86a373',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  
});

