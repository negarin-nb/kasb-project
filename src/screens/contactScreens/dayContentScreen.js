import React, { useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import ContentView from '../../components/content/contentView';
import ContentEntry from "../../components/content/contentEntry";

export default function DayContentScreen({ navigation, route }) {
  const contentListModel = [
    {
      title: "روز مادر",
      text:
        "روز مادر رو به همه مادرهای عزیز وطن تبریک می‌گم به مناسبت این روز بزرگ بسته‌های هدیه مادر با ۲۰ درصد تخفیف به فروش می‌رسد.",
      reminder_time: "1401/07/14",
      category_id: 1, //instagram
      has_countdown: true,
     // media:null
    },
    {
      title: "روز مادر",
      text:
        "روز مادر رو به همه مادرهای عزیز وطن تبریک می‌گم به مناسبت این روز بزرگ بسته‌های هدیه مادر با ۲۰ درصد تخفیف به فروش می‌رسد.",
      reminder_time: "1401/07/14",
      category_id: 2, //linkedin
      has_countdown: true,
    },
    {
      title: "روز مادر",
      text:
        "روز مادر رو به همه مادرهای عزیز وطن تبریک می‌گم به مناسبت این روز بزرگ بسته‌های هدیه مادر با ۲۰ درصد تخفیف به فروش می‌رسد.",
      reminder_time: "1401/07/14",
      category_id: 3, //telegram
      has_countdown: true,
    },
  ];
  const [contents, setContents] = useState(contentListModel);
  const [contentViewVisible, setContentViewVisible] = useState(false);
  const [contentEntryVisible, setContentEntryVisible] = useState(false);
  const [contentCategory, setContentCategory] = useState(["اینستاگرام", "لینکدین", "کانال تلگرام"]);
  const { date, weekDay } = route.params;
  const { width, height } = useWindowDimensions();

  const editContent = {
    title: "روز مادر",
    category: "اینستاگرام",
    date: "۱۲ تیر",
    content:
      "روز مادر رو به همه مادرهای عزیز وطن تبریک می‌گم.به مناسبت این روز بزرگ بسته‌های هدیه مادر با ۲۰ درصد تخفیف به فروش می‌رسد. ",
    tags: ["روز مادر", "هدیه", "روز زن"],
  };

  const onEditPress = () => {
    setContentViewVisible(false);
    setContentEntryVisible(true);
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

          {contents.map((content) => (
            <View style={styles.listItem}>
              <TouchableOpacity
                style={{ paddingRight: 10 }}
                onPress={() => setContentViewVisible(true)}
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
                  {contentCategory[content.category_id - 1]}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* content view Modal */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={contentViewVisible}
        >
          <View style={[styles.modalContainer, { justifyContent: "center" }]}>
            <View style={[styles.modal, { width: width - 40 }]}>
              <TouchableOpacity
                style={{ paddingHorizontal: 15, paddingTop: 8 }}
                onPress={() => {
                  setContentViewVisible(false);
                }}
              >
                <Image
                  style={{ width: 20, height: 20, marginBottom: -5 }}
                  source={require("../../../assets/icons/close.png")}
                />
              </TouchableOpacity>
              <ContentView onEditPress={onEditPress} />
            </View>
          </View>
        </Modal>

        {/* content entry Modal */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={contentEntryVisible}
        >
          <View style={[styles.modalContainer, { paddingTop: height * 0.2 }]}>
            <View style={[styles.modal, { width: width - 40 }]}>
              <TouchableOpacity
                style={{ paddingHorizontal: 15, paddingTop: 8 }}
                onPress={() => {
                  setContentEntryVisible(false);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../../../assets/icons/close.png")}
                  />
                  <Text style={styles.dateText}>{weekDay + " " + date}</Text>
                </View>
              </TouchableOpacity>
              <ContentEntry prevContent={editContent} />
            </View>
          </View>
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
    //justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    height: "auto",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#24438E40",
    backgroundColor: "#F4F3F6",
    justifyContent: "center",
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dateText: {
    marginTop: 2,
    color: "#24408E",
    fontSize: 12,
    fontFamily: "IranYekanRegular",
    textAlign: "center",
  },
});
