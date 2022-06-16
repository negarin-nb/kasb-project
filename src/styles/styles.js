import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    
  },

  authImage: {
    resizeMode: "contain",
    height: 132,
    width: 132,
    alignSelf: "center",
    marginTop: 100,

  },

  title: {
    textAlign: "center",
    fontFamily: "YekanBakhMedium",
    color: "#AEAEB2",
    fontSize: 18,
  },

  input: {
    backgroundColor: "white",
    borderColor: "#3A9458",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
    width: 250,
    height: 50,
    alignItems: "center",
    textAlign: "center",
    fontFamily: "YekanBakhThin",
  },

  signUpButton: {
    color: "#3A9458",
    fontWeight: "700",
    fontSize: 18,
    fontFamily: "YekanBakhMedium",
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
  },

  forgotPassButton: {
    textAlign: "center",
    fontFamily: "YekanBakhMedium",
    color: "#AEAEB2",
    fontSize: 18,
  },

  switchButton:{

    marginLeft:10,
    alignItems:'center',
    alignSelf:'flex-end'

  },

  button: {
    marginBottom: 30,
    paddingVertical: 10,
    borderRadius: 20,
    height: 50,
    width: 250,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontFamily: "YekanBakhThin",
  },


});
