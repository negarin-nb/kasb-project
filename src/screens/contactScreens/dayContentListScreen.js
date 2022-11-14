import React, { useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import ReminderBtn from "../../components/content/reminderBtn";
import ContentBtn from "../../components/content/contentBtn";

export default function DayContentListScreen({ navigation, route }) {

  const reminderModel = [
    {
      title: "اتمام کالای ۱",
      content: "متن تست",
      reminder_time: "1401/07/14",
      category_id: 1,
      has_countdown: true,
    },
    {
      title: "انقضای کالای۲ نزدیک است",
      content: "متن تست",
      reminder_time: "1401/07/14",
      category_id: 1,
      has_countdown: true,
    }
  ];
  const [reminders, setReminders] = useState(reminderModel);
  const {date, weekDay} = route.params;


  const handleOnPress = () => {
    navigation.navigate("DayContentScreen" , {weekDay,  date});
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
        {/* reminders list */}
        {reminders.map((reminder) => (
          <ReminderBtn
            iconSource={require("../../../assets/icons/bell.png")}
            title={reminder.title}
            key={reminder.title}
          />
        ))}
        {/* content button */}
        <ContentBtn
          iconSource={require("../../../assets/icons/add2.png")}
          title={"محتوا جهت انتشار"}
          handleOnPress={handleOnPress}
        />
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
});
