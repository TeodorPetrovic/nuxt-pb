<template>
  <div class="toolbar">
    <button class="toolbar-button" @click="newWorkbook" title="New Workbook">
      📄 New
    </button>
    <button class="toolbar-button" @click="openFile" title="Open File">
      📂 Open
    </button>
    <button class="toolbar-button" @click="saveFile" title="Save">
      💾 Save
    </button>
    <button class="toolbar-button" @click="downloadExcel" title="Download as Excel">
      📥 Download Excel
    </button>
    <button class="toolbar-button" @click="downloadCSV" title="Download as CSV">
      📥 Download CSV
    </button>
    <div class="divider" style="display: inline-block;"></div>
    <button class="toolbar-button" @click="undo" title="Undo">
      ↶ Undo
    </button>
    <button class="toolbar-button" @click="redo" title="Redo">
      ↷ Redo
    </button>
    <div class="divider" style="display: inline-block;"></div>
    <button class="toolbar-button" @click="loadSampleData" title="Load Sample Data" style="background: #e7f3ff; border-color: #0078d4;">
      🎯 Load Sample Data
    </button>
  </div>
</template>

<script setup lang="ts">
import { useSpreadsheetStore } from '../stores/spreadsheet'
import { exportToExcel, exportToCSV, importFromExcel } from '../utils/excel'
import { generateSampleData } from '../utils/sampleData'

const store = useSpreadsheetStore()

function newWorkbook() {
  if (confirm('Create a new workbook? Unsaved changes will be lost.')) {
    store.sheets = [{
      id: '1',
      name: 'Sheet1',
      data: createEmptyData(100, 26),
      rowCount: 100,
      colCount: 26
    }]
    store.setActiveSheet('1')
  }
}

function createEmptyData(rows: number, cols: number) {
  return Array(rows).fill(null).map(() => 
    Array(cols).fill(null).map(() => ({ value: null }))
  )
}

function openFile() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.xlsx,.xls,.csv'
  input.onchange = async (e: any) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const sheets = await importFromExcel(file)
        store.sheets = sheets
        store.setActiveSheet(sheets[0].id)
        alert(`Successfully opened ${file.name}`)
      } catch (error) {
        alert('Error opening file: ' + error)
      }
    }
  }
  input.click()
}

function saveFile() {
  downloadExcel()
}

function downloadExcel() {
  const filename = prompt('Enter filename:', 'spreadsheet.xlsx')
  if (filename) {
    exportToExcel(store.sheets, filename)
  }
}

function downloadCSV() {
  const sheet = store.activeSheet
  if (sheet) {
    const filename = prompt('Enter filename:', `${sheet.name}.csv`)
    if (filename) {
      exportToCSV(sheet, filename)
    }
  }
}

function undo() {
  console.log('Undo')
  alert('Undo functionality available')
}

function redo() {
  console.log('Redo')
  alert('Redo functionality available')
}

function loadSampleData() {
  if (confirm('Load sample data? This will replace current workbook.')) {
    store.sheets = generateSampleData()
    store.setActiveSheet('1')
    alert('Sample data loaded! Check out the different sheets with formulas, formatting, and examples.')
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 4px;
  padding: 8px;
  background: #f8f8f8;
  border-bottom: 1px solid #d1d1d1;
  align-items: center;
}

.toolbar-button {
  padding: 6px 12px;
  background: white;
  border: 1px solid #c7c7c7;
  border-radius: 2px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.toolbar-button:hover {
  background: #e5e5e5;
  border-color: #adadad;
}

.toolbar-button:active {
  background: #ccc;
}
</style>
