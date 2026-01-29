import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Sheet, CellData, CellStyle } from '../types'

export const useSpreadsheetStore = defineStore('spreadsheet', () => {
  const sheets = ref<Sheet[]>([
    {
      id: '1',
      name: 'Sheet1',
      data: createEmptyData(100, 26),
      rowCount: 100,
      colCount: 26
    }
  ])
  
  const activeSheetId = ref('1')
  const selectedCells = ref<Array<[number, number]>>([])
  const clipboard = ref<CellData[][] | null>(null)
  const history = ref<any[]>([])
  const historyIndex = ref(-1)

  const activeSheet = computed(() => 
    sheets.value.find(s => s.id === activeSheetId.value)
  )

  function createEmptyData(rows: number, cols: number): CellData[][] {
    return Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => ({ value: null }))
    )
  }

  function addSheet(name?: string) {
    const newId = (sheets.value.length + 1).toString()
    const newName = name || `Sheet${sheets.value.length + 1}`
    sheets.value.push({
      id: newId,
      name: newName,
      data: createEmptyData(100, 26),
      rowCount: 100,
      colCount: 26
    })
  }

  function deleteSheet(id: string) {
    if (sheets.value.length === 1) return
    const index = sheets.value.findIndex(s => s.id === id)
    if (index !== -1) {
      sheets.value.splice(index, 1)
      if (activeSheetId.value === id) {
        activeSheetId.value = sheets.value[0].id
      }
    }
  }

  function setActiveSheet(id: string) {
    activeSheetId.value = id
  }

  function updateCell(row: number, col: number, data: Partial<CellData>) {
    const sheet = activeSheet.value
    if (!sheet) return
    
    if (!sheet.data[row]) {
      sheet.data[row] = Array(sheet.colCount).fill(null).map(() => ({ value: null }))
    }
    if (!sheet.data[row][col]) {
      sheet.data[row][col] = { value: null }
    }
    
    sheet.data[row][col] = { ...sheet.data[row][col], ...data }
  }

  function getCellValue(row: number, col: number): CellData | null {
    const sheet = activeSheet.value
    if (!sheet || !sheet.data[row] || !sheet.data[row][col]) return null
    return sheet.data[row][col]
  }

  function applyCellStyle(row: number, col: number, style: Partial<CellStyle>) {
    const cell = getCellValue(row, col) || { value: null }
    updateCell(row, col, {
      ...cell,
      style: { ...cell.style, ...style }
    })
  }

  function copySelectedCells() {
    const sheet = activeSheet.value
    if (!sheet || selectedCells.value.length === 0) return

    const copiedData: CellData[][] = []
    for (const [row, col] of selectedCells.value) {
      if (!copiedData[row]) copiedData[row] = []
      copiedData[row][col] = getCellValue(row, col) || { value: null }
    }
    clipboard.value = copiedData
  }

  function cutSelectedCells() {
    copySelectedCells()
    const sheet = activeSheet.value
    if (!sheet) return

    for (const [row, col] of selectedCells.value) {
      updateCell(row, col, { value: null, formula: undefined })
    }
  }

  function pasteClipboard(startRow: number, startCol: number) {
    if (!clipboard.value) return
    const sheet = activeSheet.value
    if (!sheet) return

    clipboard.value.forEach((row, rowIndex) => {
      if (!row) return
      row.forEach((cell, colIndex) => {
        if (cell) {
          updateCell(startRow + rowIndex, startCol + colIndex, cell)
        }
      })
    })
  }

  function setSelectedCells(cells: Array<[number, number]>) {
    selectedCells.value = cells
  }

  function clearSelectedCells() {
    for (const [row, col] of selectedCells.value) {
      updateCell(row, col, { value: null, formula: undefined, style: undefined })
    }
  }

  return {
    sheets,
    activeSheetId,
    activeSheet,
    selectedCells,
    clipboard,
    addSheet,
    deleteSheet,
    setActiveSheet,
    updateCell,
    getCellValue,
    applyCellStyle,
    copySelectedCells,
    cutSelectedCells,
    pasteClipboard,
    setSelectedCells,
    clearSelectedCells
  }
})
