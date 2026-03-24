const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

const expensesList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")

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

    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    expenseInfo.append(expenseName, expenseCategory)

    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.textContent = newExpense.amount

    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "Remover despesa")

    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
    expensesList.append(expenseItem)

    formClear()

    uptadeTotals()
  }
  catch (error) {
    alert("Ocorreu um erro ao adicionar a despesa.")
  }
}

function uptadeTotals() {
  try {
    const items = expensesList.children
    
    expenseQuantity.textContent = `${items.length} ${items.length === 1 ? "despesa" : "despesas"}`

    let total = 0

    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount")

      let value = itemAmount.textContent.replace(/[^\d,]/g, '').replace(",", ".")

      value = parseFloat(value)

      if(isNaN(value)) {
        return alert("Ocorreu um erro ao calcular o total. Verifique os valores das despesas.")
      }

      total += Number(value)
       
    }

  const symbolBRL = document.createElement("small")
  symbolBRL.textContent = "R$"

  total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

  expenseTotal.innerHTML = ""

  expenseTotal.append(symbolBRL, total)
    
  } catch (error) {
    console.log(error)
    
    alert("Ocorreu um erro ao atualizar os totais.")
  }
}

expensesList.addEventListener("click", function(event) {
  if (event.target.classList.contains("remove-icon")) {
    const expenseItem = event.target.closest(".expense")
    expenseItem.remove()
    uptadeTotals()
  }
})

function formClear() {
  expense.value = ""
  category.value = ""
  amount.value = ""

  expense.focus()
}
