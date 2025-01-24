import axois from 'axios'

const BACKEND_URL = 'https://react-native-course-7a139-default-rtdb.firebaseio.com' ;

export async function storeExpense(expenseData){
    const response = await axois.post( BACKEND_URL + '/expenses.json',expenseData);
    const id = response.data.name;
    return id;
}

export async function fetchExpense(){
    const response = await axois.get(BACKEND_URL + '/expenses.json');
    
    const expenses = [];

    for(const key in response.data){
        const expenesObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description:response.data[key].description
        };
        expenses.push(expenesObj);
    }

    return expenses;
}


export  function updateExpense(id,expenseData){
    return axois.put(BACKEND_URL + `/expenses/${id}.json`,expenseData)
 }

export function deleteExpense(id){
    return axois.delete(BACKEND_URL +`/expenses/${id}.json`)
}