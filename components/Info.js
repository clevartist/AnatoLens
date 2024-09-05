import { useRef, useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable,
  Image,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");

export default function Info({ info }) {
  const [readMore, setReadMore] = useState(false);
  const barHeight = useRef(new Animated.Value(screenHeight / 2.5)).current;

  useEffect(() => {
    Animated.timing(barHeight, {
      toValue: readMore ? screenHeight : screenHeight / 2.5,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [readMore]);

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <Animated.View style={[styles.container, { maxHeight: barHeight }]}>
        <ScrollView
          style={{ overflow: readMore ? "hidden" : "visible" }}
          scrollEnabled={readMore ? true : false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Text style={styles.title}>{info.title}</Text>
          <Text style={styles.bigText}>{info.bigtext}</Text>
        </ScrollView>
      </Animated.View>
      {!readMore && (
        <LinearGradient
          colors={["black", "transparent"]}
          start={{ x: 0.5, y: 0.7 }}
          end={{ x: 0.5, y: 0 }}
          style={{
            paddingTop: 30,
            position: "absolute",
            display: "flex",
            bottom: -2,
            alignSelf: "center",
            width: "100%",
          }}
        >
          <Pressable onPress={() => setReadMore(true)}>
            <View>
              <Text style={{ color: "white", fontSize: 12 }}>Read more...</Text>
              <Image
                source={require("../assets/down.png")}
                style={{ width: 44, height: 44 }}
              />
            </View>
          </Pressable>
        </LinearGradient>
      )}
      {readMore && (
        <Pressable
          onPress={() => setReadMore(false)}
          style={{ position: "absolute", display: "flex", bottom: 0 }}
        >
          <View>
            <Image
              source={require("../assets/down.png")}
              style={{
                width: 44,
                height: 44,
                transform: "rotateX(180deg)",
              }}
            />
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 18,
    paddingRight: 18,
  },
  title: {
    color: "white",
    fontSize: 28,
  },
  bigText: {
    color: "white",
    fontSize: 18,
  },
});
