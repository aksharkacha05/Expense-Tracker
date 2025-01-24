import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native"

import IconButton from "../components/Ui/IconButton";
import GlobalStyles from "../constants/style";
import { ExpensesContext } from "../store/expense-context";
import ExpenseForm from "../components/MangeExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LodingOverlay from "../components/Ui/LodingOverly";
import ErrorOverlay from "../components/Ui/ErrorOverlay";
function MangeExpens({ route, navigation }) {

    const [IsSubmiting,setIsSubmiting]=useState(false);
    const [error,setError] = useState();

    const expenesCtx = useContext(ExpensesContext)
    
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expenesCtx.expenses.find(expense =>expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() { 
        setIsSubmiting(true);
        try{
            await deleteExpense(editedExpenseId);
            expenesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        }catch(error){
            setError('Could not delete expense - please try again later ');
            setIsSubmiting(false);
        }
    }
    function cancelHandeler(){
        navigation.goBack();
    }
    async function confirmHandler(expenseData){
        setIsSubmiting(true);
        try{
            if (isEditing) {
                expenesCtx.updateExpense(editedExpenseId,expenseData);
                await updateExpense(editedExpenseId,expenseData);
            }else{
                const id = await storeExpense(expenseData);
                expenesCtx.addExpense({...expenseData,id:id});
            }
            navigation.goBack();
        }catch(error){
            setError('Could not save data -please try again later!!');
            setIsSubmiting(false);
        }
    }

    if(error && !IsSubmiting){
        return <ErrorOverlay message={error} />
    }

    if (IsSubmiting){
        return  <LodingOverlay/>
    }

    return (
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandeler} onSubmit={confirmHandler} submitButtonLabel={isEditing ? 'Update': 'Add'}  defultValues={selectedExpense}/>
           
            {isEditing &&(<View style={styles.deleteContanier}>
                <IconButton icon={"trash-sharp"} color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
            </View>)}
        </View>
    )
}

export default MangeExpens

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.primary800
    },
    deleteContanier: {
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor:GlobalStyles.colors.primary200,
        alignItems:'center'
    }
})