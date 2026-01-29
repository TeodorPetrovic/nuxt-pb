import * as XLSX from 'xlsx'
import type { Sheet } from '../types'

export function exportToExcel(sheets: Sheet[], filename: string = 'spreadsheet.xlsx') {
  const workbook = XLSX.utils.book_new()

  sheets.forEach(sheet => {
    // Convert our data format to Excel format
    const worksheetData: any[][] = []
    
    for (let row = 0; row < sheet.rowCount; row++) {
      const rowData: any[] = []
      for (let col = 0; col < sheet.colCount; col++) {
        const cell = sheet.data[row]?.[col]
        if (cell?.formula) {
          rowData.push(cell.formula)
        } else {
          rowData.push(cell?.value ?? '')
        }
      }
      worksheetData.push(rowData)
    }

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name)
  })

  // Generate Excel file and download
  XLSX.writeFile(workbook, filename)
}

export function importFromExcel(file: File): Promise<Sheet[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'binary' })

        const sheets: Sheet[] = workbook.SheetNames.map((sheetName, index) => {
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]

          // Convert to our format
          const maxCols = Math.max(...jsonData.map(row => row.length), 26)
          const maxRows = Math.max(jsonData.length, 100)

          const sheetData = Array(maxRows).fill(null).map((_, rowIdx) => 
            Array(maxCols).fill(null).map((_, colIdx) => {
              const value = jsonData[rowIdx]?.[colIdx]
              return {
                value: value !== undefined && value !== null ? value : null
              }
            })
          )

          return {
            id: (index + 1).toString(),
            name: sheetName,
            data: sheetData,
            rowCount: maxRows,
            colCount: maxCols
          }
        })

        resolve(sheets)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject(reader.error)
    reader.readAsBinaryString(file)
  })
}

export function exportToCSV(sheet: Sheet, filename: string = 'spreadsheet.csv') {
  const csvContent: string[] = []

  for (let row = 0; row < sheet.rowCount; row++) {
    const rowData: string[] = []
    for (let col = 0; col < sheet.colCount; col++) {
      const cell = sheet.data[row]?.[col]
      const value = cell?.value ?? ''
      // Escape quotes and wrap in quotes if contains comma or quote
      const strValue = String(value)
      if (strValue.includes(',') || strValue.includes('"') || strValue.includes('\n')) {
        rowData.push(`"${strValue.replace(/"/g, '""')}"`)
      } else {
        rowData.push(strValue)
      }
    }
    csvContent.push(rowData.join(','))
  }

  const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}
