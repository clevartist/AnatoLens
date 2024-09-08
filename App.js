import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import BodyPart from "./components/screens/BodyPart";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  function splashErr() {
    SplashScreen.hideAsync();
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home">
          {() => <Home splashErr={splashErr} />}
        </Stack.Screen>
        <Stack.Screen name="BodyPart">{() => <BodyPart />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
