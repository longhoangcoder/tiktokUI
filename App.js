import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VideoItem from "./src/VideoItem";
import { data } from "./src/data";
const BottomTab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <FlatList
      data={data}
      pagingEnabled
      renderItem={({ item, index }) => <VideoItem data={item} />}
    />
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "black" },
          headerShown: false,
          tabBarActiveTintColor: "white",
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/tiktok/home.png")}
                style={[
                  styles.BottomTabIcon,
                  focused && styles.BottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Discover"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/tiktok/search.png")}
                style={[
                  styles.BottomTabIcon,
                  focused && styles.BottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="NewVideo"
          component={HomeScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/tiktok/new-video.png")}
                style={[
                  styles.newVideoButton,
                  focused && styles.BottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Inbox"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/tiktok/message.png")}
                style={[
                  styles.BottomTabIcon,
                  focused && styles.BottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/tiktok/user.png")}
                style={[
                  styles.BottomTabIcon,
                  focused && styles.BottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  BottomTabIcon: {
    width: 20,
    height: 20,
    tintColor: "grey",
  },
  BottomTabIconFocused: {
    tintColor: "white",
  },
  newVideoButton: {
    width: 48,
    height: 24,
  },
});
