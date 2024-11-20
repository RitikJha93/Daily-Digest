import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import welcome from "@/assets/images/getting-started.jpg"
import { Colors } from "@/constants/Colors";
const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"default"} />
      <ImageBackground source={welcome} style={{ flex: 1 }}>
        <View style={styles.wrapper} className="px-4 pb-10 items-center gap-6 w-full">
          <Text style={{ fontFamily: "Inter_700Bold" }} className="text-white text-4xl text-center">Stay Updated!</Text>
          <Text style={{ fontFamily: "Inter_500Medium" }} className="text-white w-[70%] text-xl text-center">Get breaking news and updated directly to your feed</Text>
          <TouchableOpacity style={{ backgroundColor: Colors.tabIconSelected }} className="text-white w-full py-4 rounded-lg px-4 items-center" onPress={() => router.replace("/(tabs)")}>
            <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-white text-center text-xl">Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end"
  }
});
