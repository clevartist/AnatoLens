import { View, Text } from "react-native";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";

export default function BodyPart() {
  const route = useRoute();

  useEffect(() => {
    if (route.params?.info) {
    }
  }, [route.params?.info]);

  return (
    <View>
      <Text>Here I am: {route.params?.info.title}</Text>
    </View>
  );
}
