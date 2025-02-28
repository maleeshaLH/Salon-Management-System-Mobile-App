import { Stack } from "expo-router";
import {store} from "../store/store";
import {Provider} from "react-redux";

function RootLayout() {
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name='login' options={{headerShown:false}}/>
                <Stack.Screen name='dashboard' options={{headerShown:false}}/>
                <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
                <Stack.Screen name='signUp' options={{headerShown:false}}/>
                <Stack.Screen name='signIn' options={{headerShown:false}}/>
            </Stack>
        </Provider>
    );
}
export default RootLayout;
