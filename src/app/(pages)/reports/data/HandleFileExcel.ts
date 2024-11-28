import * as XLSX from 'xlsx'


export function HandleFileExcel(dataGraph: any) {

    let wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(dataGraph);

    XLSX.utils.book_append_sheet(wb, ws, 'Data Excel')

    XLSX.writeFile(wb, `data.xlsx`)

}