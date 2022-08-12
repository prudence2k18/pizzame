import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Intro } from '../screens/intro';
import { Home } from '../screens/Homescreen';
import { Profile } from '../screens/Profile';
import { Popular } from '../screens/popular';
import { Theme } from '../theme/theme';
import { Order } from '../screens/order';

const Stack = createNativeStackNavigator();

export function AuthNavigator () {
    return (
        <Stack.Navigator initialRouteName='Intro' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Intro' component={Intro} />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='Popular' component={Popular}
             options={{headerShown:true,
             title:'Popular pizza',
             headerStyle:{
                 backgroundColor:Theme.colors.ui.success
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                fontWeight:'bold',
                fontSize:Theme.points[3]
            },
            headerBackTitle:'Go back'
            }} 
        />
        <Stack.Screen name='Order' component={Order} options={{headerShown:true}}/>
    </Stack.Navigator>
    )
}