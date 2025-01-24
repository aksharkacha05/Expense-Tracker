import {View,Text,StyleSheet}  from 'react-native'

import  GlobalStyles from '../../constants/style'
function ExpensesSummary({peroidName,expenes}){

    const expenesSum = expenes.reduce((sum,expens)=>{
        return sum + expens.amount
    }, 0);
    return(
    <View style={styles.container}> 
    <Text style={styles.peroid}> {peroidName}</Text>
    <Text style={styles.sum}>${expenesSum.toFixed(2)}</Text>
</View>)
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container:{
        padding:8,
        backgroundColor:GlobalStyles.colors.primary50,
        borderRadius:6,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    peroid:{
        fontSize:12,
        color:GlobalStyles.colors.primary400
    },
    sum:{
        fontSize:15,
        fontWeight:'bold',
        color:GlobalStyles.colors.primary500
    }
})