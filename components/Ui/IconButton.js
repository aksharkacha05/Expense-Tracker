import { Pressable,StyleSheet,View } from "react-native";
import {Ionicons} from '@expo/vector-icons'

function IconButton ({icon,size,color,onPress}){
    return (
    <Pressable onPress={onPress} style={({pressed})=>pressed && styels.pressed}>
        <View style={styels.buttonContainer}>
            <Ionicons name={icon} size={size} color={color}/>
        </View>
    </Pressable>)
}

export default IconButton;

const styels = StyleSheet.create({
    buttonContainer:{
        borderRadius:24,
        padding:6,
        marginHorizontal:8,
        marginVertical:2
    },
    pressed:{
        opacity:0.75
    }
})