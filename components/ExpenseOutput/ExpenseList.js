import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData){
    return <ExpenseItem {...itemData.item}/>
}

function ExpensesList({expenes}){
    return <FlatList data={expenes} renderItem={renderExpenseItem} keyExtractor={(item)=>item.id}/>
}

export default ExpensesList;