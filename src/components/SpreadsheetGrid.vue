<template>
  <div class="spreadsheet-grid">
    <table>
      <thead>
        <tr>
          <th class="corner-cell"></th>
          <th v-for="col in colCount" :key="col" class="col-header">
            {{ getColumnLetter(col - 1) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rowCount" :key="row">
          <th class="row-header">{{ row }}</th>
          <td 
            v-for="col in colCount" 
            :key="`${row}-${col}`"
            :class="['cell', { selected: isCellSelected(row - 1, col - 1) }]"
            @click="selectCell(row - 1, col - 1)"
            @dblclick="editCell(row - 1, col - 1)"
          >
            <input
              v-if="editingCell && editingCell[0] === row - 1 && editingCell[1] === col - 1"
              v-model="editValue"
              @blur="saveCell"
              @keyup.enter="saveCell"
              @keyup.esc="cancelEdit"
              ref="cellInput"
              class="cell-input"
            />
            <div v-else class="cell-content" :style="getCellStyle(row - 1, col - 1)">
              {{ getCellDisplay(row - 1, col - 1) }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { useSpreadsheetStore } from '../stores/spreadsheet'
import { columnToLetter, evaluateFormula } from '../utils/formulas'

const emit = defineEmits(['cell-select', 'cell-change'])

const store = useSpreadsheetStore()
const rowCount = ref(50)
const colCount = ref(26)
const editingCell = ref<[number, number] | null>(null)
const editValue = ref('')
const cellInput = ref<HTMLInputElement>()

function getColumnLetter(col: number): string {
  return columnToLetter(col)
}

function getCellDisplay(row: number, col: number): string {
  const cell = store.getCellValue(row, col)
  if (!cell) return ''
  
  if (cell.formula) {
    try {
      const result = evaluateFormula(cell.formula, (ref: string) => {
        // Simple cell reference parsing
        return 0 // Placeholder for now
      })
      return String(result)
    } catch {
      return '#ERROR!'
    }
  }
  
  return cell.value !== null ? String(cell.value) : ''
}

function getCellStyle(row: number, col: number): any {
  const cell = store.getCellValue(row, col)
  if (!cell?.style) return {}
  
  const style = cell.style
  return {
    fontWeight: style.bold ? 'bold' : 'normal',
    fontStyle: style.italic ? 'italic' : 'normal',
    textDecoration: style.underline ? 'underline' : 'none',
    fontSize: style.fontSize ? `${style.fontSize}px` : undefined,
    fontFamily: style.fontFamily,
    color: style.color,
    backgroundColor: style.backgroundColor,
    textAlign: style.textAlign,
    verticalAlign: style.verticalAlign
  }
}

function isCellSelected(row: number, col: number): boolean {
  return store.selectedCells.some(([r, c]) => r === row && c === col)
}

function selectCell(row: number, col: number, addToSelection = false) {
  if (addToSelection) {
    store.selectedCells.push([row, col])
  } else {
    store.setSelectedCells([[row, col]])
  }
  emit('cell-select', row, col)
}

function editCell(row: number, col: number) {
  editingCell.value = [row, col]
  const cell = store.getCellValue(row, col)
  editValue.value = cell?.formula || cell?.value?.toString() || ''
  
  nextTick(() => {
    cellInput.value?.focus()
  })
}

function saveCell() {
  if (editingCell.value) {
    const [row, col] = editingCell.value
    emit('cell-change', row, col, editValue.value)
    editingCell.value = null
    editValue.value = ''
  }
}

function cancelEdit() {
  editingCell.value = null
  editValue.value = ''
}

// Keyboard navigation
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

function handleKeydown(e: KeyboardEvent) {
  if (editingCell.value) return
  
  const selected = store.selectedCells[0]
  if (!selected) return
  
  const [row, col] = selected
  
  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault()
      if (row > 0) selectCell(row - 1, col)
      break
    case 'ArrowDown':
      e.preventDefault()
      if (row < rowCount.value - 1) selectCell(row + 1, col)
      break
    case 'ArrowLeft':
      e.preventDefault()
      if (col > 0) selectCell(row, col - 1)
      break
    case 'ArrowRight':
      e.preventDefault()
      if (col < colCount.value - 1) selectCell(row, col + 1)
      break
    case 'Enter':
      e.preventDefault()
      editCell(row, col)
      break
    case 'Delete':
    case 'Backspace':
      e.preventDefault()
      store.clearSelectedCells()
      break
  }
}
</script>

<style scoped>
.spreadsheet-grid {
  width: 100%;
  height: 100%;
  overflow: auto;
}

table {
  border-collapse: collapse;
  font-size: 13px;
}

th, td {
  border: 1px solid #e1e1e1;
  min-width: 80px;
  height: 24px;
  padding: 0;
}

th {
  background: #f3f3f3;
  font-weight: normal;
  color: #333;
  text-align: center;
  position: sticky;
}

.col-header {
  top: 0;
  z-index: 2;
}

.row-header {
  left: 0;
  z-index: 1;
  min-width: 40px;
}

.corner-cell {
  left: 0;
  top: 0;
  z-index: 3;
  min-width: 40px;
}

.cell {
  cursor: cell;
  position: relative;
}

.cell.selected {
  outline: 2px solid #0078d4;
  outline-offset: -1px;
}

.cell-content {
  padding: 4px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%;
  display: flex;
  align-items: center;
}

.cell-input {
  width: 100%;
  height: 100%;
  border: none;
  padding: 4px 6px;
  font-size: 13px;
  font-family: inherit;
  outline: 2px solid #0078d4;
  outline-offset: -1px;
}

.hide-gridlines td {
  border-color: transparent !important;
}
</style>
