const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

const expensesList = document.querySelector("ul")

amount.oninput = function() {
  let value = amount.value.replace(/\D/g, '')
  amount.value = formatCurrencyBRL(Number(value) / 100)
}

function formatCurrencyBRL(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return value
}

form.onsubmit = function(event) {
  event.preventDefault()
  
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
  try {
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    expenseItem.append(expenseIcon)
    expensesList.append(expenseItem)
  }
  catch (error) {
    alert("Ocorreu um erro ao adicionar a despesa.")
  }
}
