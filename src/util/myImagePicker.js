import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result;
    try {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
     // allowsEditing: true,
      //aspect: [8, 3],
      quality: 1,
    });
  } catch (e) {
    console.error(e);   
  }
  return result;
  }; 
  export default pickImage;
  
