
let table = document.getElementsByClassName("sheet-body")[0],
    rows = document.getElementsByClassName("rows")[0],
    columns = document.getElementsByClassName("columns")[0]
tableExists = false


const generateTable = () => {
    if (!rows.value || !columns.value) {
        swal("Oops!", "You should enter a valid row and column number", "error");
        return
    }
    let rowsNumber = parseInt(rows.value), columnsNumber = parseInt(columns.value)
    table.innerHTML = ""
    for (let i = 0; i < rowsNumber; i++) {
        var tableRow = ""
        for (let j = 0; j < columnsNumber; j++) {
            tableRow += `<td contenteditable></td>`
        }
        table.innerHTML += tableRow
    }
    if (rowsNumber > 0 && columnsNumber > 0) {
        tableExists = true
    }
    swal("Created succesfully", `a ${rows.value} X ${columns.value} table has been created`, "success")
}

const ExportToExcel = (type, fn, dl) => {
    if (!tableExists) {
        swal("Oops!", "Nothing to be exported!!", "error");
        return
    }
    var elt = table
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" })
    return dl ? XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' })
        : XLSX.writeFile(wb, fn || ('MyNewSheet.' + (type || 'xlsx')))
}