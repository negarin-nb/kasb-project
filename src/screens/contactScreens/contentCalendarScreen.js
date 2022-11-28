import React , {useState} from "react";
import { View, Text, StyleSheet, useWindowDimensions, Modal, TouchableOpacity, Image } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import ContentEntry from "../../components/content/contentEntry";
import ContentView from "../../components/content/contentView";
import MonthCalendar from "../../util/monthCalendar";
import moment from "jalali-moment";
import CloseButton from "../../components/closeButton";

export default function ContentCalendarScreen({ navigation }) {

  const [dayValue, setDayValue] = useState(); // selected day number of month
  const [dateValue, setDateValue] = useState("");// selected month and year (here day is incorrect)
 
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [date, setDate] = useState("");
  
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
    }
  ];
  const handleOption = (option) => {
    setMoreModalVisible(false);
    console.log(option.title);
    option.title === "مشاهده"
      ? navigation.navigate("DayContentListScreen", { date , weekDay })
      : option.setVisible(true);

  };
  const onDayPress = (dayValue, dateValue, wDay) => {
    setMoreModalVisible(true);
    setDayValue(dayValue);
    setDateValue(dateValue);
    setWeekDay(wDay);

    const _month = moment(dateValue).locale("fa").format("MMMM");
    const _year = moment(dateValue).locale("fa").format("YYYY");
    setDay(dayValue);
    setMonth(_month);
    setYear(_year);
    setDate(dayValue + " " + _month + " " + _year);
    console.log(date); 
    /* const month = moment(dateValue).locale("fa").format(dayValue+ " " + "MMMM YYYY");
    setDate(month);
    console.log(dayValue); 
    console.log(date); 
    console.log(weekDay); */
   // makeDate();
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
  const onSelectedChange = (date) => {
    setContentViewVisible(true);
    //setMoreModalVisible(true);
    //navigation.navigate("DayCalendarScreen", { date });
  };

  const editContent = {
    title: "",
    category: "",
    date: "",
    content:"",
    tags: [],
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

        <View style={styles.calendar}>
          <MonthCalendar textColor={"#63D98A"} onDayPress={onDayPress} />
        </View>

        {/* <DatePicker
          style={[styles.datePicker, { width: width - 40 }]}
          isGregorian={false}
          options={{
            defaultFont: "IranYekanRegular",
            headerFont: "YekanBakhBold",
            textFontSize: 14,
            backgroundColor: "#24408E",
            textHeaderColor: "#fff",
            textDefaultColor: "#fff",
            selectedTextColor: "#24408E",
            mainColor: "#fff",
            textSecondaryColor: "#fff",
            borderColor: "#63D98A",
          }}
          mode="calendar"
          onSelectedChange={() => onSelectedChange()}
        />
   */}
      </View>

      {/* More modal */}
      <Modal transparent={true} animationType="fade" visible={moreModalVisible}>
        <View style={[styles.modalContainer, { justifyContent: "center" }]}>
          <View style={[styles.modal, { padding: 20 }]}>
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
        <View style={[styles.modalContainer, { paddingTop: height * 0.2 }]}>
          <View style={[styles.modal, { width: width - 40 }]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                paddingTop: 8 
              }}
            >
              <CloseButton setModalVisible={setContentEntryVisible} />
              <Text style={styles.dateText}>{weekDay + " " + date}</Text>
            </View>
            <ContentEntry prevContent={editContent} />
          </View>
        </View>
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
    padding: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#24438E40",
    borderRadius: 40,
    backgroundColor: "#24408E",
  },
  datePicker: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#24438E40",
    borderRadius: 40,
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
