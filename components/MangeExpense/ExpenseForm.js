import { StyleSheet, View,Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../Ui/Button";
import { getFormattedDate } from "../../util/date";
import GlobalStyles from "../../constants/style";

function ExpenseForm({submitButtonLabel,onCancel,onSubmit,defultValues}){

    const [inputs,setInputs] = useState({
        amount:{value:defultValues ? defultValues.amount.toString() : '',isVaild: true,},
        date:{value:defultValues ? getFormattedDate(defultValues.date) :'',isVaild:true,},
        description:{ value: defultValues? defultValues.description :'',isVaild: true,},
    }) 

    function inputChangeHandler(inputIdentifier,enterdValue){
        setInputs((curInputs)=>{
            return{
                ...curInputs,
                [inputIdentifier]: {value: enterdValue,isVaild:true}
            }})   }

    function submitHandler(){
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description:inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount)  && expenseData.amount >0;
        const dateIsVaild = expenseData.date.toString() !== 'Invaild Date';
        const descriptionIsVaild = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsVaild || !descriptionIsVaild) {
            // Alert.alert('Invaild input', 'Please check your input values')
            setInputs((curInputs)=>{
                return{
                    amount:{value:curInputs.amount.value,isVaild:amountIsValid},
                    date:{value:curInputs.date.value,isVaild:dateIsVaild},
                    description:{value:curInputs.description.value,isVaild:descriptionIsVaild},
                }
            })
        }

        onSubmit(expenseData);
    }

    const formIsVaild = !inputs.amount.isVaild ||!inputs.date.isVaild || !inputs.description.isVaild

    return (
    <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>

        <View style={styles.inputRow}>
        <Input style={styles.rowInput} inVaild={!inputs.amount.isVaild} label="Amount" textInputConfig={{
            keyboardType:"decimal-pad",
            onChangeText:inputChangeHandler.bind(this,'amount'),
            value:inputs.amount.value
        }}/>
        <Input style={styles.rowInput} inVaild={!inputs.date.isVaild} label="Date" textInputConfig={{
            placeholder:"YYYY-MM-DD",
            maxlength:10,
            onChangeText:inputChangeHandler.bind(this,'date'),
            value:inputs.date.value
        }}/>
        </View>
        <Input label="Description" inVaild={!inputs.description.isVaild} textInputConfig={{
            multiline:true,
            // autoCorrect:false
            // autoCapitalize:'none
            onChangeText:inputChangeHandler.bind(this,'description'),
            value:inputs.description.value
        }}/>

        {formIsVaild && (<Text style={styles.errorText}>Invaild inputs values - please check your entered data</Text>)}
         <View style={styles.buttons}>
                <Button style={styles.button} mode="flat"onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
    </View>)
}
export default ExpenseForm;

const styles = StyleSheet.create({
    inputRow:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowInput:{
        flex:1
    },
    form:{
        marginTop:40, 
    },
    errorText:{
        textAlign:'center',
        color:GlobalStyles.colors.error500,
        margin:8,

    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'white',
        marginVertical:24,
        textAlign:'center'
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        minWidth:120,
        marginHorizontal:8
    },

})