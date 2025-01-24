import { useContext, useEffect, useState } from "react"

import ExpenseOutput from "../components/ExpenseOutput/ExpenseOutput"
import { ExpensesContext } from "../store/expense-context"
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";
import LodingOverlay from "../components/Ui/LodingOverly";
import ErrorOverlay from "../components/Ui/ErrorOverlay";

function RecentExpens() {
    const [isFetchhing, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const expenesCtx = useContext(ExpensesContext);


    useEffect(() => {
        async function getExpense() {
            setIsFetching(true);
            try{
                const expenes = await fetchExpense();
                expenesCtx.setExpenses(expenes);
            }catch (error) {
                setError('Could not fetch expense!!')
            }
            setIsFetching(false);
        }
        getExpense();
    }, []);


    if(error && !isFetchhing){
        return <ErrorOverlay message={error} />
    }

    if (isFetchhing) {
        return <LodingOverlay />
    }

    const recentExpense = expenesCtx.expenses.filter((expenes) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (expenes.date >= date7DaysAgo) && (expenes.date <= today);
    })
    return <ExpenseOutput expenes={recentExpense} expenesperoid="Last 7 days" FallbackText="No expense registerd for the last 7 days." />
}

export default RecentExpens