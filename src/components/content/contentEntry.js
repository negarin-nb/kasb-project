import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  Image,
  ScrollView
} from "react-native";
import pickImage from "../../util/myImagePicker";
import CustomDatePicker from '../../util/customDatePicker';
import ModalPicker from '../modalPicker';


export default function ContentEntry({prevContent}) {

  const [title, setTitle] = useState(prevContent.title || "");//
  const [category, setCategory] = useState(prevContent.category || "شبکه");//
  const [categoryList, setCategoryList] = useState(["اینستاگرام", "لینکدین", "کانال تلگرام", "واتساپ"]);
  const [categoryVisible, setCategoryVisible] = useState(false); // modal
  const [date, setDate] = useState(prevContent.date || "تاریخ ثبت");//
  const [dateVisible, setDateVisible] = useState(false);// modal
  const [content, setContent] = useState(prevContent.content || "متن");//
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState(prevContent.tags || []);//
  const [image, setImage] = useState(null);
  const { width } = useWindowDimensions();

  const handlePickImage = async () => {
    const resultImage = await pickImage();
    if (!resultImage.cancelled) {
      setImage(resultImage.uri);
    }
  };
  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };

  const handleEditContent = () => {};
  const handleCreateContent = () => {};
  const handleAddTag = (tag) => {
    const _tags = [...tags];
    _tags.push(tag);
    setTags(_tags);
  };
  

  return (
    <View style={styles.container}>
      <View>
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

          <View style={{ alignSelf: "flex-start" }}>
            <TouchableOpacity onPress={handlePickImage}>
              {image && (
                <Image source={{ uri: image }} style={styles.pickedImage} />
              )}
            </TouchableOpacity>
          </View>

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
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../../../assets/icons/addimage.png")}
              />
              <Text style={[styles.inputText, { paddingHorizontal: 5 }]}>
                بارگذاری تصویر
              </Text>
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
          {prevContent ? (
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
              {tags.map((tag) => (
                <TouchableOpacity
                  key={tag}
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
