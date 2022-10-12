import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";


export default function ContentView({ prevContent, onEditPress }) {
  const [title, setTitle] = useState("روز مادر");
  const [category, setCategory] = useState("اینستاگرام");
  const [categoryList, setCategoryList] = useState([
    "اینستاگرام",
    "لینکدین",
    "کانال تلگرام",
    "واتساپ",
  ]);
  const [date, setDate] = useState("۱۲ تیر");
  const [content, setContent] = useState("روز مادر رو به همه مادرهای عزیز وطن تبریک می‌گم.به مناسبت این روز بزرگ بسته‌های هدیه مادر با ۲۰ درصد تخفیف به فروش می‌رسد. ");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(["روز مادر", "هدیه", "روز زن"]);
  const [image, setImage] = useState(null);
  const [links, setLinks] = useState(null);
  const { width } = useWindowDimensions();

  const handleEditContent = () => {};
  const handleDeleteContent = () => {};
  const handleDownloadImage = () => {};
  const handleCopyTags = () => {};

  
  return (
    <View style={[styles.container]}>
      <View>
        <View style={{ flexDirection: "row" }}>
          {/* date */}
          <View style={[styles.input, { flex: 1 }]}>
            <Text
              style={[
                styles.inputText,
                { fontFamily: "IranYekanLight", fontSize: 12 },
              ]}
            >
              {date}
            </Text>
          </View>

          {/* social media */}
          <View style={[styles.input, { flex:1 }]}>
            <Text style={[styles.inputText]}>{category}</Text>
          </View>

          {/* title */}
          <View style={[styles.input, { flex: 1 }]}>
            <Text style={[styles.inputText]}>{title}</Text>
          </View>
        </View>

        {/* content */}
        <View style={[styles.input, styles.inputArea]}>
          {/* text area input */}

          <Text style={[styles.inputText, styles.inputAreaText]}>
            {content}
          </Text>

          {/* tags list */}
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            {tags.map((tag, index) => (
              <Text style={[styles.inputText, { paddingHorizontal: 5 }]} key={index}>
                #{tag}
              </Text>
            ))}
          </View>

          {/* <View style={{ alignSelf: "flex-start" }}>
            <TouchableOpacity onPress={handlePickImage}>
              {image && (
                <Image source={{ uri: image }} style={styles.pickedImage} />
              )}
            </TouchableOpacity>
          </View> */}

          {/* bottom buttons */}
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              marginVertical: 5,
            }}
          >
            <TouchableOpacity
              style={[styles.tagButton, { flexDirection: "row" }]}
              onPress={handleDownloadImage}
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../../../assets/icons/addimage.png")}
              />
              <Text style={[styles.inputText, { paddingHorizontal: 5 }]}>
                دانلود تصویر
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tagButton, { flexDirection: "row" }]}
            >
              <Text
                style={[styles.inputText, { paddingHorizontal: 5 }]}
                onPress={handleCopyTags}
              >
                کپی کردن تگ‌ها
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* save buttons */}
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <TouchableOpacity style={styles.button} onPress={onEditPress}>
            <Text style={styles.buttonText}>ویرایش</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#DB4848" }]}
            onPress={handleDeleteContent}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>
              حذف محتوا
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
     margin: 15,
     marginTop: 4,
  },
  input: {
    marginTop: 8,
    paddingVertical: 4,
    height: 32,
    alignItems: "flex-end",
    fontSize: 12,
    fontFamily: "IranYekanLight",
    /* color: "#24408E",
    borderWidth: 2,
    borderColor: "#24438E10",
    backgroundColor: "#FFFFFF",
    borderRadius: 20, */
  },
  inputArea: {
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
    marginEnd: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    height: 32,
    backgroundColor: "#24438E10",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginRight: 5,
    marginTop: 10,
    paddingVertical: 4,
    backgroundColor: "#63D98A",
    borderRadius: 20,
    color: "#fff",
    width: 90,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "IranYekanBold",
    color: "#24408E",
    textAlign: "center",
  },
});
