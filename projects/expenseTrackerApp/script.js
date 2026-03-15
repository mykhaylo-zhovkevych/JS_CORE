const balanceEl = document.getElementById('balance');

const incomeAmountEl = document.getElementById('income-amount');
const expenseAmountEl = document.getElementById('expense-amount');

const transactionListEl = document.getElementById('transaction-list');
const transactionFormEl = document.getElementById('transaction-form');

const descriptionEl = document.getElementById('description');
const amountEl = document.getElementById('amount');


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
    // prevent the default form submission behavior
    e.preventDefault();

    // get form values by default type is string
    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value.trim());

    if (!description || Number.isNaN(amount)) {
        return;
    }

    transactions.push({
        id:Date.now(),
        description,
        amount
    })

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();
    transactionFormEl.reset();

}

function updateTransactionList() {
    transactionListEl.innerHTML = "";

    const sortedTransactions = [...transactions].reverse();

    sortedTransactions.forEach((transaction) => {
        const transactionEl = createTransactionElement(transaction);
        transactionListEl.appendChild(transactionEl);
    })
}

function createTransactionElement(transaction) {
    const li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amount > 0 ? "income" : "expense");

    li.innerHTML = `
        <span>${transaction.description}</span>
        <span>${transaction.amount}
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        </span>
    `
    return li;
}

function updateSummary() {
    const balance = transactions.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
    
    const income = transactions
        .filter(transaction => transaction.amount > 0)
        .reduce((accumulator, transaction) => accumulator + transaction.amount, 0); 

    const expenses = transactions
        .filter(transaction => transaction.amount < 0)
        .reduce((accumulator, transaction) => accumulator + transaction.amount, 0); 

    // update the UI
    balanceEl.textContent = formatCurrency(balance);
    incomeAmountEl.textContent = formatCurrency(income);
    expenseAmountEl.textContent = formatCurrency(expenses);
}


function formatCurrency(number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(number);
} 

// function removeTransaction(transactionId) {
//     transactions = transactions.filter((transaction) => transaction.id !== transactionId);
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//     updateTransactionList();
//     updateSummary();
// }

function removeTransaction(id) {
    // filter out the transaction that we need to delete
    transactions = transactions.filter(transaction => transaction.id !== id);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();
}


// Initial render
updateTransactionList();
updateSummary();

