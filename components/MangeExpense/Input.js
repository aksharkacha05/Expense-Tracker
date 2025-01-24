import { TextInput, View,Text, StyleSheet } from "react-native";
import GlobalStyles from "../../constants/style";

function Input({label,style,textInputConfig,inVaild}){

    const  inputStyle = [styles.input];
    if(textInputConfig &&textInputConfig.multiline){
        inputStyle.push(styles.inputMultiline)
    }

    if(inVaild){
        inputStyle.push(styles.invaildInput)
    }

 return <View style={[styles.inputContanier,style]}>
    <Text style={[styles.lable,inVaild && styles.invaildLable]}>{label}</Text>
    <TextInput style={inputStyle}{...textInputConfig}/>
 </View>   
}
export default Input;

const styles = StyleSheet.create({
    inputContanier:{
        marginHorizontal:4,
        marginVertical:8
    },
    lable:{
        fontSize:12,
        color:GlobalStyles.colors.primary100,
        marginBottom:4,
    },
    input:{
        backgroundColor:GlobalStyles.colors.primary100,
        padding:6,
        borderRadius:6,
        fontSize:18,
        color:GlobalStyles.colors.primary700
    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical:'top'
    },
    invaildLable:{
        color:GlobalStyles.colors.error500
    },
    invaildInput:{
        backgroundColor:GlobalStyles.colors.error50
    }
})