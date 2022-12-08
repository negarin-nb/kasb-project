import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import ContentView from '../../components/content/contentView';
import ContentEntry from "../../components/content/contentEntry";
import CloseButton from "../../components/closeButton";
import { AuthContext } from "../../store/auth-context";
import contentApi from "../../api/content";

export default function DayContentScreen({ navigation, route }) {
  
  const authCtx = useContext(AuthContext);
  const [contents, setContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState();
  const [contentViewVisible, setContentViewVisible] = useState(false);
  const [contentEntryVisible, setContentEntryVisible] = useState(false);
  const [delConfirmVisible, setDelConfirmVisible] = useState(false);
  const [contentCategory, setContentCategory] = useState(["اینستاگرام", "لینکدین", "کانال تلگرام"]);
  const { date, dateNumFormat, weekDay } = route.params;
  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = useState();

    
  useEffect(() => {
    getContents();
  }, []);

  const getContents = async () => {
    setLoading(true);
    const result = await contentApi.get(authCtx.accessToken, dateNumFormat);
    setLoading(false);
    if (!result.ok) alert("بازیابی محتوا با خطا مواجه شده است!");
    else {
      setContents(result.data.ListItems);
      console.log("retrived contents:");
      console.log(result.data.ListItems);
    }
    console.log(result.data.Message); 
  }

  const onEditPress = () => {
    setContentViewVisible(false);
    setContentEntryVisible(true);
  }

  const onUpdate = async () => {
    setContentEntryVisible(false);
    console.log("onUpdate");
    await getContents();
  }

  const onDeletePress = async () => { 
    setDelConfirmVisible(true);
    setContentViewVisible(false);
  }

  const onDelete = async () => {
    const id = contents[selectedContent].id;
    setContents(
      contents.filter((content) => content.id !== contents[selectedContent].id)
    );
    console.log("contents");
    console.log(contents);
    const result = await contentApi.del(authCtx.accessToken, id);
    if (!result.ok) alert("حذف محتوا با خطا مواجه شده است!");
    else {
      alert("محتوا حذف شد!");
    }
    console.log(result.data.Message);
    setDelConfirmVisible(false);
  }

  return (
    <View style={styles.container}>
      <HeaderScreen navigation={navigation} />
      {/*Top Bar*/}
      <View style={{ flex: 1 }}>
        <TopBar
          iconSourc={require("../../../assets/icons/calendar.png")}
          title={weekDay + " " + date}
        />

        <View style={[styles.card, { width: width - 40 }]}>
          <View style={{ flexDirection: "row", paddingBottom: 10 }}>
            <View style={{ paddingTop: 10, flex: 1 }}>
              <Image
                style={{ width: 12, height: 8 }}
                source={require("../../../assets/icons/chevronbottom.png")}
              />
            </View>
            <View>
              <Text style={styles.cardTitle}>{"محتوا جهت انتشار"}</Text>
            </View>
          </View>

          {contents.map((content, index) => (
            <View key={index} style={styles.listItem}>
              <TouchableOpacity
                style={{ paddingRight: 10 }}
                onPress={() => {
                  setContentViewVisible(true);
                  setSelectedContent(index);
                }}
              >
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../../assets/icons/content.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../../assets/icons/mediaWhite.png")}
                />
              </TouchableOpacity>

              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle}>
                  {content.social_media}
                  {/* contentCategory[content.category_id - 1] */}
                </Text>
              </View>
            </View>
          ))}
          {loading && <ActivityIndicator animating={loading} size="large" />}
        </View>
        {/* content view Modal */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={contentViewVisible}
        >
          <View style={[styles.modalContainer]}>
            <View style={[styles.modal, { width: width - 40 }]}>
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingTop: 8,
                }}
              >
                <CloseButton setModalVisible={setContentViewVisible} />
              </View>
              <ContentView
                onEditPress={onEditPress}
                onDeletePress={onDeletePress}
                prevContent={contents[selectedContent]}
              />
            </View>
          </View>
        </Modal>

        {/*confirm delete modal */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={delConfirmVisible}
        >
          <View style={[styles.modalContainer]}>
            <View
              style={[
                styles.modal,
                {
                  alignItems: "center",
                  paddingVertical: 20,
                  width: width - 40,
                },
              ]}
            >
              <Text style={styles.text}>از حذف این محتوا مطمئن هستید؟</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => setDelConfirmVisible(false)}>
                  <Text style={styles.text}>خیر</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => onDelete(contents[selectedContent])}
                >
                  <Text style={styles.buttonText}>بله</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* content entry Modal */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={contentEntryVisible}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.modalContainer]}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <View style={[styles.modal, { width: width - 40 }]}>
                  <View style={styles.modalHeader}>
                    <CloseButton setModalVisible={setContentEntryVisible} />
                    <Text style={styles.dateText}>{weekDay + " " + date}</Text>
                  </View>
                  <ContentEntry
                    onUpdate={onUpdate}
                    prevContent={contents[selectedContent]}
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingEnd: 20,
    paddingStart: 20,
  },
  card: {
    marginBottom: 10,
    borderRadius: 20,
    height: "auto",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#24438E",
  },
  cardTitle: {
    color: "#fff",
    textAlign: "right",
    fontSize: 18,
    fontFamily: "YekanBakhBold",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomColor: "#ffffff79",
    borderBottomWidth: 0.5,
    paddingVertical: 7,
  },
  listTitle: {
    color: "#fff",
    textAlign: "right",
    fontSize: 14,
    fontFamily: "IranYekanBold",
    justifyContent: "center",
    textTransform: "capitalize",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#00000087",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    height: "auto",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#24438E40",
    backgroundColor: "#F4F3F6",
    justifyContent: "center",
    //alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 8,
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dateText: {
    color: "#24408E",
    fontSize: 12,
    fontFamily: "IranYekanRegular",
    textAlign: "right",
  },
  text: {
    margin: 8,
    marginHorizontal: 20,
    color: "#24408E",
    fontSize: 12,
    fontFamily: "IranYekanLight",
    textAlign: "center",
  },
  button: {
    marginTop: 5,
    marginHorizontal: 2,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: "#63D98A",
    borderRadius: 20,
    color: "#fff",
    width: 70,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "IranYekanLight",
    color: "#fff",
    textAlign: "center",
  },
});
