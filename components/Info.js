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
import { useNavigation } from "@react-navigation/native";

const { height: screenHeight } = Dimensions.get("window");

export default function Info({ info, lookAtObject, resetCamera }) {
  const navigation = useNavigation();
  const [readMore, setReadMore] = useState(false);
  const barHeight = useRef(new Animated.Value(0)).current;
  const [showMinimize, setShowMinimize] = useState(false);

  useEffect(() => {
    Animated.timing(barHeight, {
      toValue: readMore ? screenHeight : screenHeight / 2.5,
      duration: 500,
      useNativeDriver: false,
    }).start();

    if (!readMore) {
      setShowMinimize(false);
    }

    console.log("showMinimize:", showMinimize);
  }, [readMore, showMinimize]);

  function handleScroll(event) {
    //event.nativeEvent: Contains properties like contentOffset, contentSize and layoutMeasurement
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    const toggler =
      contentOffset.y >= 10 &&
      contentOffset.y + layoutMeasurement.height <= contentSize.height - 80;

    setShowMinimize(toggler);
  }

  return (
    <View
      style={{
        flex: 0.3,
      }}
    >
      <Animated.View style={[styles.container, { maxHeight: barHeight }]}>
        {info && (
          <>
            <Pressable
              onPress={() =>
                navigation.navigate({
                  name: "BodyPart",
                  params: { info: info },
                  merge: true,
                })
              }
            >
              <View style={{ backgroundColor: "white", padding: 10 }}>
                <Text style={{ fontSize: 18 }}>
                  Page dedicated to {info.title}
                </Text>
              </View>
            </Pressable>
            <ScrollView
              onScroll={handleScroll}
              scrollEnabled={readMore ? true : false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <Text style={styles.title}>{info.title}</Text>
              <Text style={styles.bigText}>{info.bigtext}</Text>
              <Pressable onPress={() => setReadMore(false)}>
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
            </ScrollView>
          </>
        )}
      </Animated.View>
      {lookAtObject && (
        <View style={styles.guiReset}>
          <Pressable
            onPress={resetCamera}
            style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}
          >
            <Text>Reset camera</Text>
          </Pressable>
        </View>
      )}
      {!readMore && (
        <LinearGradient
          colors={["black", "transparent"]}
          start={{ x: 0.5, y: 0.7 }}
          end={{ x: 0.5, y: 0 }}
          style={styles.gradient}
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
      {showMinimize && (
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
    paddingTop: 18,
    backgroundColor: "orange",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  gradient: {
    paddingTop: 30,
    position: "absolute",
    display: "flex",
    bottom: -2,
    alignSelf: "center",
    width: "100%",
  },
  title: {
    color: "white",
    fontSize: 28,
    fontFamily: "DESIGNER",
  },
  bigText: {
    color: "white",
    fontSize: 18,
  },
  guiReset: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 80,
    zIndex: 10,
  },
});
