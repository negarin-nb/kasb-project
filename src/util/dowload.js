import {useState} from "react";
import { View, Text } from 'react-native';
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";



export default async function Download(url) {

    //const [downloadProgress, setDownloadProgress] = useState();

    /* const callback = (downloadProgress) => {
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress);
      /* this.setState({
        downloadProgress: progress,
      }); 
    }; */
    
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        FileSystem.documentDirectory + "image.jpg",
        {}
        //callback
      );
      let downloadedFile;
      try {
        downloadedFile = await downloadResumable.downloadAsync();
        console.log("Finished downloading to ", downloadedFile.uri);
      } catch (e) {
        console.error(e);
      }
    

    /* const perm = await MediaLibrary.requestPermissionsAsync();
    if (perm.status != "granted") {
      return;
    } */

    //const UTI = "public.item";
    //const shareResult = await Sharing.shareAsync(downloadedFile.uri);
try {
    const saveImage = await MediaLibrary.saveToLibraryAsync(downloadedFile.uri);
    alert("تصویر با موفقیت ذخیره شد");
  } catch (e) {
    console.error(e);
    alert("خطایی در ذخیر‌سازی تصویر رخ داده ست!"); 
  }


    

  
}
