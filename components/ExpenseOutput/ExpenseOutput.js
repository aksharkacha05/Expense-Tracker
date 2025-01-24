import { View, Text,StyleSheet} from "react-native";

import ExpensesSummary from "./ExpenseSummary";
import ExpensesList from "./ExpenseList";
import GlobalStyles from "../../constants/style";



function ExpenseOutput ({expenes,expenesperoid,FallbackText}){

    let content = <Text style={styles.infotext}>{FallbackText}</Text>

    if (expenes.length > 0) {
        content = <ExpensesList expenes={expenes}/>
        
    }

    return <View style={styles.container}>
        <ExpensesSummary expenes={expenes} peroidName={expenesperoid}/>
        {content}
    </View>
}

export default ExpenseOutput;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop:24,
        paddingBottom:0,
        backgroundColor:GlobalStyles.colors.primary700
    },
    infotext:{
        color:'white',
        fontSize:16,
        textAlign:'center',
        marginTop:32
    }
})