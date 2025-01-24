import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Ionicons} from '@expo/vector-icons'

import MangeExpens from './screens/MangeExpens';
import RecentExpens from './screens/RecentExpens';
import AllExpens from './screens/AllExpens';

import { GlobalStyles } from './constants/style';
import IconButton from './components/Ui/IconButton';
import ExpenseContextProvider from './store/expense-context';

const Stack = createNativeStackNavigator();
const BoottomTabs = createBottomTabNavigator();

 function ExpenseOverview(){
  return <BoottomTabs.Navigator  screenOptions={({navigation})=>({
    headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
    headerTintColor:'white',
    tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
    tabBarActiveTintColor:GlobalStyles.colors.accent500,
    headerRight:({tintColor})=> <IconButton icon="add" size={30} color={tintColor} onPress={()=>{
      navigation.navigate('ManageExpense')
    }}/>
  })}> 
    <BoottomTabs.Screen name='RecentExpenses' component={RecentExpens} options={{
      title:'Recent Expenses',
      tabBarLabel:'Recent',
      tabBarIcon:({color,size}) => <Ionicons name='hourglass' size={size} color={color}/>
    }}/>
    <BoottomTabs.Screen name='AllExpens' component={AllExpens} options={{
      title:'All Expenses',
      tabBarLabel:'All Expenses',
      tabBarIcon:({color,size}) => <Ionicons name='calendar' size={size} color={color}/>
    }}/>
  </BoottomTabs.Navigator>
 }

export default function App() {
  return (
    <>
    <StatusBar style='light'/>
    <ExpenseContextProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
        headerTintColor:'white'
      }}>
        <Stack.Screen name='ExpenseOverView' component={ExpenseOverview}options={{headerShown:false}}/>
        <Stack.Screen name='ManageExpense' component={MangeExpens} options={{
          title:'Mange Expense',
          presentation:'modal'
        }} />
      </Stack.Navigator>

    </NavigationContainer>
    </ExpenseContextProvider>
    </>
  );
}

