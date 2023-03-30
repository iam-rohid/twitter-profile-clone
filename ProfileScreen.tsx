import { StyleSheet, View, Image, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";

const COVER_PHOTO = `https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80`;
const PROFILE_PIC =
  "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=512&h=512&q=80";

const APPBAR_HEIGHT = 52;
const DEFAULT_PADDING = 44;

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const appBarPaddingBottom = useSharedValue(DEFAULT_PADDING);
  const profileOffset = useSharedValue(0);
  const blurIntensity = useSharedValue(0);
  const appBarInfoOffset = useSharedValue(122);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      appBarPaddingBottom.value = Math.max(
        0,
        DEFAULT_PADDING - event.contentOffset.y
      );
      profileOffset.value = -event.contentOffset.y;
      blurIntensity.value = Math.min(60, Math.max(0, -event.contentOffset.y));
      if (event.contentOffset.y > 122) {
        const y = event.contentOffset.y - 122;
        blurIntensity.value = interpolate(
          y,
          [0, 80],
          [0, 60],
          Extrapolate.CLAMP
        );
      }
      appBarInfoOffset.value = Math.max(0, -event.contentOffset.y + 156);
    },
  });

  const appBarAnimatedStyles = useAnimatedStyle(
    () => ({
      paddingBottom: appBarPaddingBottom.value,
      zIndex: appBarPaddingBottom.value === 0 ? 1 : -1,
    }),
    []
  );

  const profilePicStyles = useAnimatedStyle(
    () => ({
      top: insets.top + APPBAR_HEIGHT + profileOffset.value,
      transform: [
        {
          scale: interpolate(
            appBarPaddingBottom.value,
            [0, DEFAULT_PADDING],
            [0.65, 1],
            Extrapolate.CLAMP
          ),
        },
        {
          translateY: interpolate(
            appBarPaddingBottom.value,
            [0, DEFAULT_PADDING],
            [DEFAULT_PADDING, 16],
            Extrapolate.CLAMP
          ),
        },
      ],
    }),
    []
  );

  const appBarInfoAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: appBarInfoOffset.value,
        },
      ],
    }),
    []
  );

  const blurViewProps = useAnimatedProps(() => {
    return {
      intensity: blurIntensity.value,
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          styles.appBarContainer,
          appBarAnimatedStyles,
          {
            paddingTop: insets.top,
          },
        ]}
      >
        <Animated.Image
          source={{
            uri: COVER_PHOTO,
          }}
          resizeMode="cover"
          style={[styles.coverPhoto]}
        />
        <AnimatedBlurView
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
          animatedProps={blurViewProps}
        />
        <View style={styles.appBar}>
          <TouchableOpacity style={styles.appBarIconButton}>
            <Icons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Animated.View
            style={[
              { flex: 1, paddingHorizontal: 16 },
              appBarInfoAnimatedStyle,
            ]}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                fontWeight: "800",
                shadowRadius: 2,
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowOffset: { height: 0, width: 0 },
              }}
            >
              Rohid
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#fff",
                shadowRadius: 2,
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowOffset: { height: 0, width: 0 },
              }}
            >
              @rohiddev
            </Text>
          </Animated.View>
          <TouchableOpacity style={styles.appBarIconButton}>
            <Icons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.profilePic,
          profilePicStyles,
          {
            width: 80,
            height: 80,
            position: "absolute",
            left: 16,
          },
        ]}
      >
        <Image
          source={{
            uri: PROFILE_PIC,
          }}
          style={{ flex: 1 }}
        />
      </Animated.View>
      <Animated.ScrollView
        style={[styles.container]}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View
          style={{ height: insets.top + APPBAR_HEIGHT + DEFAULT_PADDING }}
        />
        <View
          style={{
            paddingHorizontal: 12,
            paddingTop: 12,
            flexDirection: "row",
          }}
        >
          <View style={{ paddingTop: 48, flex: 1 }}>
            <Text style={{ fontSize: 24, color: "#000", fontWeight: "800" }}>
              Rohid
            </Text>
            <Text
              style={{ fontSize: 16, color: "rgba(0,0,0,0.5)", marginTop: 4 }}
            >
              @rohiddev
            </Text>
          </View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 48,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Edit Proifle
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 12, gap: 12 }}>
          <Text style={{ fontSize: 16, lineHeight: 24 }}>
            Self-thought Full-Stack Developer 🧑‍💻. Learn more about me at{" "}
            <Text style={{ color: "#1D97FA" }}>rohid.dev</Text>
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            <View style={{ flexDirection: "row", gap: 2 }}>
              <Icons name="pin-drop" size={20} color="rgba(0,0,0,0.5)" />
              <Text>Bangladesh</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 2 }}>
              <Icons name="link" size={20} color="rgba(0,0,0,0.5)" />
              <Text style={{ color: "#1D97FA" }}>rohid.dev</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 2 }}>
              <Icons name="date-range" size={20} color="rgba(0,0,0,0.5)" />
              <Text>Joined March 2021</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            <Text style={{ fontSize: 16 }}>
              <Text style={{ color: "#000", fontWeight: "600" }}>56</Text>{" "}
              Following
            </Text>
            <Text style={{ fontSize: 16 }}>
              <Text style={{ color: "#000", fontWeight: "600" }}>69</Text>{" "}
              Followers
            </Text>
          </View>
        </View>
        <View style={{ height: 2000 }} />
      </Animated.ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBarContainer: {
    position: "absolute",
    overflow: "hidden",
    top: 0,
    left: 0,
    right: 0,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: APPBAR_HEIGHT,
    alignItems: "center",
  },
  appBarIconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  coverPhoto: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  profilePic: {
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#fff",
  },
});
