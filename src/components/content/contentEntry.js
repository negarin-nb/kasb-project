import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  
} from "react-native";
import CustomDatePicker from '../../util/customDatePicker';
import ModalPicker from '../modalPicker';
import contentApi from '../../api/content';
import { AuthContext } from "../../store/auth-context";
import moment from "jalali-moment";
import pickImage from "../../util/myImagePicker";
import UploadScreen from "../../screens/uploadScreen";
import * as Progress from "react-native-progress";


export default function ContentEntry({ prevContent, selectedDate, onUpdate, modalVisible }) {
  const authCtx = useContext(AuthContext);

  const [id, setId] = useState(prevContent.id);
  const [title, setTitle] = useState(prevContent.title || ""); //
  const [category, setCategory] = useState(prevContent.social_media || "شبکه"); //
  const [categoryList, setCategoryList] = useState([
    "اینستاگرام",
    "لینکدین",
    "کانال تلگرام",
    "واتساپ",
  ]);
  const [categoryVisible, setCategoryVisible] = useState(false); // modal
  const [date, setDate] = useState("تاریخ ثبت"); //
  const [dateVisible, setDateVisible] = useState(false); // modal
  const [content, setContent] = useState(prevContent.text || "");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(prevContent.tags || []);
  const [image, setImage] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePickImage = async () => {
    const resultImage = await pickImage();
    if (!resultImage.cancelled) {
      setImage(resultImage.uri);
    }
  };
  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };

  useEffect(() => {
    if (prevContent.upload_time) {
      setDate(
        moment(prevContent.upload_time, "YYYY-MM-DD")
          .locale("fa")
          .format("YYYY/MM/DD")
      );
    }
  }, []);

  const reRender = () => {
    setTitle("");
    setCategory("شبکه");
    setDate("تاریخ ثبت");
    setContent("");
    //setLink("");
  };

  const handleEditContent = async () => {
    const data = {
      content_id: id,
      title: title,
      reminder_time: prevContent.reminder_time,
      upload_time: moment.from(date, "fa", "YYYY/MM/DD").format("YYYY-MM-DD"),
      text: content,
      link: "link",
      social_media: category,
      media: "image-url",
    };
    // is edit portable
    const result = await contentApi.edit(authCtx.accessToken, data);
    if (!result.ok) alert("ویرایش محتوا با خطا مواجه شده است!");
    else {
      alert("محتوای مورد نظر ویرایش شد");
      onUpdate();
    }
    console.log(result.data.Message);
    console.log(result.data.Item);
  };

  const handleCreateContent = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append(
      "reminder_time",
      moment.from(selectedDate, "YYYY/MM/DD").format("YYYY-MM-DD")
    );
    formData.append(
      "upload_time",
      moment.from(date, "fa", "YYYY/MM/DD").format("YYYY-MM-DD")
    );
    formData.append("text", content);
    formData.append("link", "example.com");
    formData.append("social_media", category);
    formData.append("media", image && {
      uri: image,
      type: "image/png",
      name: "omgitsme.png",
    });

    setUploadVisible(true);
    const result = await contentApi.enter(
      authCtx.accessToken,
      formData,
      (progress) => setProgress(progress)
    );
    
    if (!result.ok) alert("ثبت محتوا با خطا مواجه شده است!");
    else {
      alert("محتوای مورد نظر ثبت شد");
    }
    console.log(result.data.Message);
    console.log(result.data.Item);
    //reRender();
    setUploadVisible(false);
    modalVisible(false);
  };

  const handleAddTag = (tag) => {
    if(tag !== ""){
      const _tags = [...tags];
      _tags.push(tag);
      setTags(_tags);
    }   
  }

  return (
    <View style={styles.container}>
      <View>
        <Modal visible={uploadVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <Progress.Circle
              progress={progress}
              color="#24408E"
              borderColor={"#24408E"}
            />
            <Text style={styles.inputText}>{parseInt(progress * 100)}%</Text>
          </View>
        </Modal>

        <View style={{ flexDirection: "row" }}>
          {/* date */}
          <TouchableOpacity
            onPress={() => setDateVisible(true)}
            style={[styles.input, { flex: 0.6 }]}
          >
            <Text
              style={[
                styles.inputText,
                { fontFamily: "IranYekanLight", fontSize: 12 },
              ]}
            >
              {date}
            </Text>
          </TouchableOpacity>
          <Modal
            transparent={true}
            animationType="fade"
            visible={dateVisible}
            onRequestClose={() => changeModalVisibiblity(false, setDateVisible)}
          >
            <CustomDatePicker
              setDate={setDate}
              changeModalVisibiblity={changeModalVisibiblity}
              setDateModalVisible={setDateVisible}
            />
          </Modal>

          {/* social media */}
          <TouchableOpacity
            onPress={() => setCategoryVisible(true)}
            style={[styles.input, { flex: 0.6 }]}
          >
            <Text style={[styles.inputText]}>{category}</Text>
          </TouchableOpacity>
          <Modal
            transparent={true}
            animationType="fade"
            visible={categoryVisible}
            onRequestClose={() => setCategoryVisible(false)}
          >
            <ModalPicker
              //addNew={"+ ایجاد جدید"}
              dataList={categoryList}
              setData={setCategory}
              setModalVisible={setCategoryVisible}
              changeModalVisibiblity={changeModalVisibiblity}
            />
          </Modal>

          {/* title */}
          <TextInput
            placeholder="عنوان محتوا"
            placeholderTextColor="#24408E"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            autoCapitalize="none"
            style={[styles.input, { flex: 1 }]}
          />
        </View>

        {/* content */}
        <View style={[styles.input, styles.inputArea]}>
          {/* text area input */}
          <TextInput
            placeholder="متن"
            numberOfLines={5}
            multiline
            value={content}
            maxLength={700}
            onChangeText={(text) => setContent(text)}
            style={[styles.inputText, styles.inputAreaText]}
            required
          />

          {/* bottom buttons */}
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              marginVertical: 5,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", marginEnd: 5 }}
              onPress={handlePickImage}
            >
              {image ? (
                <Image
                  style={{ width: 24, borderRadius: 2 }}
                  source={{ uri: image }}
                />
              ) : (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../../assets/icons/addimage.png")}
                />
              )}
              {image ? (
                <Text style={[styles.inputText, { paddingHorizontal: 5 }]}>
                  جایگزینی تصویر
                </Text>
              ) : (
                <Text style={[styles.inputText, { paddingHorizontal: 5 }]}>
                  بارگذاری تصویر
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row" }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../../../assets/icons/link.png")}
              />
              <Text style={[styles.inputText, { paddingHorizontal: 5 }]}>
                افزودن لینک
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* add tag */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.tagButton}
            onPress={() => handleAddTag(tag)}
          >
            <Text style={styles.inputText}>افزودن تگ</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="تگ"
            placeholderTextColor="#24408E"
            value={tag}
            onChangeText={(text) => {
              setTag(text);
            }}
            autoCapitalize="none"
            style={[
              styles.input,
              { flex: 1, textAlign: "right", paddingHorizontal: 10 },
            ]}
          />
        </View>

        {/* save buttons */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {prevContent.title ? (
            <TouchableOpacity style={styles.button} onPress={handleEditContent}>
              <Text style={styles.buttonText}>ذخیره تغییرات</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={handleCreateContent}
            >
              <Text style={styles.buttonText}>ذخیره</Text>
            </TouchableOpacity>
          )}
          {/* tags list */}
          <ScrollView horizontal={true}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              {tags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.tagButton, { flexDirection: "row" }]}
                >
                  <Image
                    style={{ width: 14, height: 14 }}
                    source={require("../../../assets/icons/close.png")}
                  />
                  <Text style={[styles.inputText, { paddingHorizontal: 5 }]}>
                    #{tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 10,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#00000087",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 8,
    paddingHorizontal: 2,
    paddingVertical: 4,
    marginHorizontal: 2,
    height: 32,
    alignItems: "center",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "IranYekanLight",
    color: "#24408E",
    borderWidth: 2,
    borderColor: "#24438E20",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  inputArea: {
    paddingHorizontal: 10,
    alignItems: "flex-end",
    height: 180,
  },
  inputText: {
    fontSize: 12,
    fontFamily: "IranYekanLight",
    color: "#24408E",
  },
  inputAreaText: {
    textAlignVertical: "top",
    flex: 4,
    textAlign: "right",
  },
  pickedImage: {
    width: 100,
    height: 100,
    marginVertical: 5,
    borderRadius: 5,
  },
  tagButton: {
    marginHorizontal: 4,
    marginTop: 10,
    paddingHorizontal: 10,
    height: 32,
    backgroundColor: "#24438E10",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 4,
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 30,
    backgroundColor: "#63D98A",
    borderRadius: 20,
    color: "#fff",
    width: "auto",
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "IranYekanBold",
    color: "#24408E",
    textAlign: "center",
  },

  whiteButton: {
    marginTop: 0,
    flexDirection: "row",
    width: 120,
    justifyContent: "center",
    paddingHorizontal: 4,
    marginHorizontal: 2,
    height: 25,
    paddingVertical: 1,
    borderWidth: 2,
    borderColor: "#24438E10",
    backgroundColor: "#FFFFFFC2",
    borderRadius: 20,
  },
  title: {
    color: "#24408E",
    textAlign: "right",
    fontSize: 16,
    fontFamily: "IranYekanBold",
  },

  dropDown: {
    padding: 10,
    width: 200,
    minHeight: 100,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#24438E40",
    backgroundColor: "#FFFFFF",
    // justifyContent: "center",
  },
  dropDownText: {
    marginVertical: 5,
    color: "#24408E",
    fontSize: 13,
    fontFamily: "IranYekanLight",
    textAlign: "center",
  },
});
