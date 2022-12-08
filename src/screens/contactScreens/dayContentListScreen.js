import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, useWindowDimensions, ActivityIndicator } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import ReminderBtn from "../../components/content/reminderBtn";
import ContentBtn from "../../components/content/contentBtn";
import reminderApi from "../../api/reminder";
import { AuthContext } from "../../store/auth-context";
import moment from "jalali-moment";

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
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState();
  const authCtx = useContext(AuthContext);
  const { date, dateNumFormat, weekDay } = route.params;

  useEffect(() => {
    getReminders();
  }, []);

  const getReminders = async () => {

    setLoading(true);
    const result = await reminderApi.get(
      authCtx.accessToken,
      moment.from(dateNumFormat, "fa", "YYYY/MM/DD").format("YYYY/MM/DD")
    ); //convert date from fa to en
     setLoading(false);

    if (!result.ok) alert("بازیابی یادآورها با خطا مواجه شده است!");
    else {
      setReminders(result.data.ListItems);
      /* console.log("retrived reminders:");
      console.log(result.data.ListItems); */
    }
    console.log(result.data.Message);
  };

 console.log(dateNumFormat);
  const handleOnPress = () => {
    navigation.navigate("DayContentScreen", { weekDay, dateNumFormat, date });
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
        {reminders &&
          reminders.map((reminder) => (
            <ReminderBtn
              iconSource={require("../../../assets/icons/bell.png")}
              title={reminder.title}
              key={reminder.id}
            />
          ))}
        {loading && <ActivityIndicator animating={loading} size="large" />}
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
