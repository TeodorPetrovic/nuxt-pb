import ExcelJS from 'exceljs'
import type { Sheet } from '../types'

export async function exportToExcel(sheets: Sheet[], filename: string = 'spreadsheet.xlsx') {
  const workbook = new ExcelJS.Workbook()

  sheets.forEach(sheet => {
    const worksheet = workbook.addWorksheet(sheet.name)
    
    // Add data to worksheet
    for (let row = 0; row < sheet.rowCount; row++) {
      for (let col = 0; col < sheet.colCount; col++) {
        const cell = sheet.data[row]?.[col]
        if (cell) {
          const excelCell = worksheet.getCell(row + 1, col + 1)
          
          if (cell.formula) {
            excelCell.value = { formula: cell.formula.startsWith('=') ? cell.formula.slice(1) : cell.formula }
          } else if (cell.value !== null && cell.value !== undefined) {
            excelCell.value = cell.value
          }
          
          // Apply cell styling
          if (cell.style) {
            excelCell.font = {
              bold: cell.style.bold,
              italic: cell.style.italic,
              underline: cell.style.underline,
              size: cell.style.fontSize,
              name: cell.style.fontFamily,
              color: cell.style.color ? { argb: cell.style.color.replace('#', 'FF') } : undefined
            }
            
            if (cell.style.backgroundColor) {
              excelCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: cell.style.backgroundColor.replace('#', 'FF') }
              }
            }
            
            excelCell.alignment = {
              horizontal: cell.style.textAlign as any,
              vertical: cell.style.verticalAlign as any
            }
          }
        }
      }
    }
  })

  // Generate Excel file and download
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

export async function importFromExcel(file: File): Promise<Sheet[]> {
  const buffer = await file.arrayBuffer()
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(buffer)

  const sheets: Sheet[] = []
  
  workbook.eachSheet((worksheet, sheetId) => {
    const maxRows = Math.max(worksheet.rowCount, 100)
    const maxCols = Math.max(worksheet.columnCount, 26)
    
    const sheetData: any[][] = Array(maxRows).fill(null).map(() => 
      Array(maxCols).fill(null).map(() => ({ value: null }))
    )

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
        const value = cell.value
        
        sheetData[rowNumber - 1][colNumber - 1] = {
          value: typeof value === 'object' && value !== null && 'formula' in value ? null : value,
          formula: typeof value === 'object' && value !== null && 'formula' in value ? `=${value.formula}` : undefined
        }
      })
    })

    sheets.push({
      id: String(sheetId),
      name: worksheet.name,
      data: sheetData,
      rowCount: maxRows,
      colCount: maxCols
    })
  })

  return sheets
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
