import { Animated, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { Video } from "expo-av";
import Easing from "react-native/Libraries/Animated/Easing";
import { getMusicNoteAnimation } from "./utils";
import { windowHeight, windowWidth } from "./data";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function VideoItem({ data }) {
  const { uri, caption, channelName, musicName, likes, comments, avatarUri } =
    data;
  const discAnimationValue = useRef(new Animated.Value(0)).current;
  const musicNoteAnimationValue1 = useRef(new Animated.Value(0)).current;
  const musicNoteAnimationValue2 = useRef(new Animated.Value(0)).current;
  const discAnimation = {
    transform: [
      {
        rotate: discAnimationValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };
  const musicNoteAnimation1 = getMusicNoteAnimation(
    musicNoteAnimationValue1,
    false
  );
  const musicNoteAnimation2 = getMusicNoteAnimation(
    musicNoteAnimationValue2,
    true
  );
  useEffect(() => {
    Animated.loop(
      Animated.timing(discAnimationValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(musicNoteAnimationValue1, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(musicNoteAnimationValue2, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [discAnimationValue, musicNoteAnimation1, musicNoteAnimation2]);
  const bottomTabHeight = useBottomTabBarHeight();
  return (
    <View
      style={[styles.container, { height: windowHeight - bottomTabHeight }]}
    >
      <Video
        style={styles.video}
        source={{
          uri,
        }}
        shouldPlay
        resizeMode="cover"
      />
      <View style={styles.bottomSection}>
        <View style={styles.bottomLeftSection}>
          <Text style={styles.channelName}>{channelName}</Text>
          <Text style={styles.caption}>{caption}</Text>
          <View style={styles.musicNameContainer}>
            <Image
              source={require("../assets/tiktok/music-note.png")}
              style={styles.musicNameIcon}
            />
            <Text style={styles.musicName}>{musicName}</Text>
          </View>
        </View>
        <View style={styles.bottomRightSection}>
          <Animated.Image
            source={require("../assets/tiktok/floating-music-note.png")}
            style={[styles.floatingMusicNote, musicNoteAnimation1]}
          />
          <Animated.Image
            source={require("../assets/tiktok/floating-music-note.png")}
            style={[styles.floatingMusicNote, musicNoteAnimation2]}
          />
          <Animated.Image
            source={require("../assets/tiktok/disc.png")}
            style={[styles.musicDisc, discAnimation]}
          />
        </View>
      </View>
      <View style={styles.verticalBar}>
        <View style={[styles.verticalBarItem, styles.avatarContainer]}>
          <Image style={styles.avatar} source={{ uri: avatarUri }} />
          <View style={styles.followButton}>
            <Image
              source={require("../assets/tiktok/plus-button.png")}
              style={styles.followIcon}
            />
          </View>
        </View>
        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require("../assets/tiktok/heart.png")}
          />
          <Text style={styles.verticalBarText}>{likes}</Text>
        </View>
        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require("../assets/tiktok/message-circle.png")}
          />
          <Text style={styles.verticalBarText}>{comments}</Text>
        </View>
        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require("../assets/tiktok/reply.png")}
          />
          <Text style={styles.verticalBarText}>Share</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  bottomSection: {
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  bottomLeftSection: {
    flex: 4,
  },
  bottomRightSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  channelName: {
    color: "white",
    fontWeight: "bold",
  },
  caption: {
    color: "white",
    marginVertical: 8,
  },
  musicNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  musicName: {
    color: "white",
  },
  musicNameIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  musicDisc: {
    width: 40,
    height: 40,
  },
  verticalBar: {
    position: "absolute",
    right: 8,
    bottom: 72,
  },
  verticalBarItem: {
    marginBottom: 24,
    alignItems: "center",
  },
  verticalBarIcon: {
    width: 32,
    height: 32,
  },
  verticalBarText: {
    color: "white",
    marginTop: 4,
  },
  avatarContainer: {
    marginBottom: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  followButton: {
    position: "absolute",
    bottom: -8,
  },
  followIcon: {
    width: 21,
    height: 21,
  },
  floatingMusicNote: {
    position: "absolute",
    right: 40,
    bottom: 16,
    width: 16,
    height: 16,
    tintColor: "white",
  },
});
