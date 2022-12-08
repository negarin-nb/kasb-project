import React , {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Modal,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import ContentEntry from "../../components/content/contentEntry";
import ReminderEntry from "../../components/content/reminderEntry";
import ContentView from "../../components/content/contentView";
import MonthCalendar from "../../util/monthCalendar";
import moment from "jalali-moment";
import CloseButton from "../../components/closeButton";

export default function ContentCalendarScreen({ navigation }) {
  const [dayValue, setDayValue] = useState(); // selected day number of month
  const [dateValue, setDateValue] = useState(""); // selected month and year (here day is incorrect)

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [weekDay, setWeekDay] = useState(""); //selected date: 1401/9/9 (for api)
  const [date, setDate] = useState(""); // selected date: 1041 azar 9 (for ui)
  const [dateNumFormat, setDateNumFormat] = useState("");

  const [moreModalVisible, setMoreModalVisible] = useState(false);
  const [reminderEntryVisible, setReminderEntryVisible] = useState(false);
  const [contentEntryVisible, setContentEntryVisible] = useState(false);
  const [contentViewVisible, setContentViewVisible] = useState(false);
  const { width, height } = useWindowDimensions();

  const optionList = [
    {
      title: "افزودن یادآور",
      setVisible: setReminderEntryVisible,
    },
    {
      title: "افزودن محتوا برای انتشار",
      setVisible: setContentEntryVisible,
    },
    {
      title: "مشاهده",
      setVisible: setContentViewVisible,
    },
  ];

  const handleOption = (option) => {
    setMoreModalVisible(false);
    console.log(option.title);
    option.title === "مشاهده"
      ? navigation.navigate("DayContentListScreen", {
          date,
          dateNumFormat,
          weekDay,
        })
      : option.setVisible(true);
  };
  // extract selected date
  const onDayPress = (dayValue, dateValue, wDay) => {
    setMoreModalVisible(true);
    setDayValue(dayValue); // to get selected date day
    setDateValue(dateValue); // to get selected date month and year
    setWeekDay(wDay); // to get selected date day of week name

    const _monthName = moment(dateValue).locale("fa").format("MMMM"); // selected date month name
    const _monthNum = moment(dateValue).locale("fa").format("M"); // selected date month number
    const _year = moment(dateValue).locale("fa").format("YYYY"); // selected date year
    setDay(dayValue);
    setMonth(_monthName);
    setYear(_year);
    setDate(dayValue + " " + _monthName + " " + _year); // format 1041 azar 9
    setDateNumFormat(_year  + "/" + _monthNum + "/" + dayValue); // format 1401/9/9
  };
  /* const makeDate = () =>{
    const _month = moment(dateValue).locale("fa").format("MMMM");
    const _year = moment(dateValue).locale("fa").format("YYYY");
    setDay(dayValue);
    setMonth(_month);
    setYear(_year);
    setDate(_year + " " + _month + " " + dayValue);
    console.log(date); 
    
  }; */
 

  const emptyContent = {
    title: "",
    category: "",
    date: "",
    content: "",
    tags: [],
  };

  const emptyReminder = {
    title: "",
    category: "",
    date: "",
    content: "",
    reminder_time: "",
  };

  return (
    <View style={styles.container}>
      <HeaderScreen navigation={navigation} />

      {/*Top Bar*/}
      <View style={{ flex: 1 }}>
        <TopBar
          iconSourc={require("../../../assets/icons/MegaphoneWhite.png")}
          title="ارتباطات"
        />
        <TopBar
          iconSourc={require("../../../assets/icons/calendar.png")}
          title="تقویم"
        />

        {/*Calendar View*/}
        <View style={styles.calendar}>
          <MonthCalendar textColor={"#63D98A"} onDayPress={onDayPress} />
        </View>
      </View>

      {/* More modal */}
      <Modal transparent={true} animationType="fade" visible={moreModalVisible}>
        <View style={[styles.modalContainer, { justifyContent: "center" }]}>
          <View style={[styles.modal, { padding: 10, paddingTop: 10 }]}>
            <CloseButton setModalVisible={setMoreModalVisible} />
            {optionList.map((option, index) => {
              return (
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleOption(option)}
                  key={index}
                >
                  <Text style={styles.text}>{option.title}</Text>
                  {/* <Image style={styles.icon} source={option.imgSource} /> */}
                </TouchableOpacity>
              );
            })}
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
                  prevContent={emptyContent}
                  selectedDate={dateNumFormat}
                  modalVisible={setContentEntryVisible}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* reminder entry Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={reminderEntryVisible}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.modalContainer]}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1, justifyContent: "center" }}
            >
              <View style={[styles.modal, { width: width - 40 }]}>
                <View style={styles.modalHeader}>
                  <CloseButton setModalVisible={setReminderEntryVisible} />
                  <Text style={styles.dateText}>
                    {"یادآور -  " + weekDay + " " + date}
                  </Text>
                </View>
                <ReminderEntry
                  prevReminder={emptyReminder}
                  selectedDate={dateNumFormat}
                  modalVisible={setReminderEntryVisible}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* content view Modal */}
      {/*  <Modal
        transparent={true}
        animationType="fade"
        visible={contentViewVisible}
      >
        <View style={[styles.modalContainer, { justifyContent: "center" }]}>
          <View style={[styles.modal, { width: width - 40 }]}>
            <CloseButton setModalVisible={setContentViewVisible} />
            <Text style={styles.dateText}>
              {weekDay + " " + date}
            </Text>
            <ContentView />
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingEnd: 20,
    paddingStart: 20,
  },
  calendar: {
    padding: 10,
    marginTop: 0,
    borderWidth: 2,
    borderColor: "#24438E40",
    borderRadius: 40,
    backgroundColor: "#24408E",
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
    paddingHorizontal: 10,
  },
  icon: {
    marginVertical: 8,
    marginTop: 13,
    width: 13,
    height: 13,
  },
  text: {
    marginVertical: 8,
    color: "#24408E",
    fontSize: 16,
    fontFamily: "YekanBakhThin",
    textAlign: "center",
  },
  dateText: {
    color: "#24408E",
    fontSize: 12,
    fontFamily: "IranYekanRegular",
    textAlign: "right",
  },
});
