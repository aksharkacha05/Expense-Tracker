import { Text,StyleSheet} from "react-native"
import ExpenseOutput from "../components/ExpenseOutput/ExpenseOutput"
import { useContext } from "react";
import { ExpensesContext } from "../store/expense-context";
function AllExpens (){
    const expenseCtx = useContext(ExpensesContext);

    return <ExpenseOutput expenes={expenseCtx.expenses} expenesperoid="Total" FallbackText={"No registerd expense found!!"}/>;
    
}

export default AllExpens

const styles = StyleSheet.create({
    
})