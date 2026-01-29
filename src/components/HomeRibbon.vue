<template>
  <div style="display: flex; gap: 10px;">
    <!-- Clipboard Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="paste" title="Paste">📋 Paste</button>
        <button class="ribbon-button" @click="cut" title="Cut">✂️ Cut</button>
        <button class="ribbon-button" @click="copy" title="Copy">📄 Copy</button>
        <button class="ribbon-button" @click="formatPainter" title="Format Painter">🖌️ Format</button>
      </div>
      <div class="ribbon-group-title">Clipboard</div>
    </div>

    <div class="divider"></div>

    <!-- Font Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <select v-model="fontFamily" @change="applyFontFamily" title="Font Family">
          <option>Arial</option>
          <option>Times New Roman</option>
          <option>Courier New</option>
          <option>Georgia</option>
          <option>Verdana</option>
        </select>
        <select v-model="fontSize" @change="applyFontSize" title="Font Size">
          <option>8</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
          <option>14</option>
          <option>16</option>
          <option>18</option>
          <option>20</option>
          <option>24</option>
        </select>
        <button 
          :class="['ribbon-icon-button', { active: isBold }]" 
          @click="toggleBold"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button 
          :class="['ribbon-icon-button', { active: isItalic }]" 
          @click="toggleItalic"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button 
          :class="['ribbon-icon-button', { active: isUnderline }]" 
          @click="toggleUnderline"
          title="Underline"
        >
          <u>U</u>
        </button>
        <input 
          type="color" 
          v-model="textColor" 
          @change="applyTextColor"
          class="color-picker"
          title="Text Color"
        />
        <input 
          type="color" 
          v-model="bgColor" 
          @change="applyBgColor"
          class="color-picker"
          title="Background Color"
        />
      </div>
      <div class="ribbon-group-title">Font</div>
    </div>

    <div class="divider"></div>

    <!-- Alignment Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-icon-button" @click="alignLeft" title="Align Left">⬅️</button>
        <button class="ribbon-icon-button" @click="alignCenter" title="Align Center">↔️</button>
        <button class="ribbon-icon-button" @click="alignRight" title="Align Right">➡️</button>
        <button class="ribbon-button" @click="wrapText" title="Wrap Text">Wrap</button>
        <button class="ribbon-button" @click="mergeCells" title="Merge Cells">Merge</button>
      </div>
      <div class="ribbon-group-title">Alignment</div>
    </div>

    <div class="divider"></div>

    <!-- Number Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <select v-model="numberFormat" @change="applyNumberFormat" title="Number Format">
          <option value="general">General</option>
          <option value="number">Number</option>
          <option value="currency">Currency</option>
          <option value="percent">Percent</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
        </select>
        <button class="ribbon-button" @click="formatPercent" title="Percent Style">%</button>
        <button class="ribbon-button" @click="formatComma" title="Comma Style">,</button>
        <button class="ribbon-button" @click="increaseDecimals" title="Increase Decimals">+.0</button>
        <button class="ribbon-button" @click="decreaseDecimals" title="Decrease Decimals">-.0</button>
      </div>
      <div class="ribbon-group-title">Number</div>
    </div>

    <div class="divider"></div>

    <!-- Cells Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="insertRow" title="Insert Row">Insert Row</button>
        <button class="ribbon-button" @click="deleteRow" title="Delete Row">Delete Row</button>
        <button class="ribbon-button" @click="insertColumn" title="Insert Column">Insert Col</button>
        <button class="ribbon-button" @click="deleteColumn" title="Delete Column">Delete Col</button>
      </div>
      <div class="ribbon-group-title">Cells</div>
    </div>

    <div class="divider"></div>

    <!-- Editing Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="autoSum" title="AutoSum">Σ Sum</button>
        <button class="ribbon-button" @click="fillDown" title="Fill Down">Fill</button>
        <button class="ribbon-button" @click="clear" title="Clear">Clear</button>
        <button class="ribbon-button" @click="sortAscending" title="Sort A-Z">Sort ↑</button>
        <button class="ribbon-button" @click="sortDescending" title="Sort Z-A">Sort ↓</button>
        <button class="ribbon-button" @click="filter" title="Filter">Filter</button>
        <button class="ribbon-button" @click="find" title="Find">🔍 Find</button>
      </div>
      <div class="ribbon-group-title">Editing</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSpreadsheetStore } from '../stores/spreadsheet'

const store = useSpreadsheetStore()

const fontFamily = ref('Arial')
const fontSize = ref('11')
const textColor = ref('#000000')
const bgColor = ref('#ffffff')
const numberFormat = ref('general')
const isBold = ref(false)
const isItalic = ref(false)
const isUnderline = ref(false)

// Clipboard functions
function copy() {
  store.copySelectedCells()
  console.log('Copied cells')
}

function cut() {
  store.cutSelectedCells()
  console.log('Cut cells')
}

function paste() {
  if (store.selectedCells.length > 0) {
    const [row, col] = store.selectedCells[0]
    store.pasteClipboard(row, col)
    console.log('Pasted cells')
  }
}

function formatPainter() {
  console.log('Format Painter activated')
}

// Font functions
function applyFontFamily() {
  applyStyleToSelected({ fontFamily: fontFamily.value })
}

function applyFontSize() {
  applyStyleToSelected({ fontSize: parseInt(fontSize.value) })
}

function toggleBold() {
  isBold.value = !isBold.value
  applyStyleToSelected({ bold: isBold.value })
}

function toggleItalic() {
  isItalic.value = !isItalic.value
  applyStyleToSelected({ italic: isItalic.value })
}

function toggleUnderline() {
  isUnderline.value = !isUnderline.value
  applyStyleToSelected({ underline: isUnderline.value })
}

function applyTextColor() {
  applyStyleToSelected({ color: textColor.value })
}

function applyBgColor() {
  applyStyleToSelected({ backgroundColor: bgColor.value })
}

// Alignment functions
function alignLeft() {
  applyStyleToSelected({ textAlign: 'left' })
}

function alignCenter() {
  applyStyleToSelected({ textAlign: 'center' })
}

function alignRight() {
  applyStyleToSelected({ textAlign: 'right' })
}

function wrapText() {
  console.log('Wrap text')
}

function mergeCells() {
  console.log('Merge cells')
}

// Number format functions
function applyNumberFormat() {
  console.log('Apply number format:', numberFormat.value)
}

function formatPercent() {
  applyNumberFormatting('percent')
}

function formatComma() {
  applyNumberFormatting('comma')
}

function increaseDecimals() {
  console.log('Increase decimals')
}

function decreaseDecimals() {
  console.log('Decrease decimals')
}

// Cell operations
function insertRow() {
  console.log('Insert row')
}

function deleteRow() {
  console.log('Delete row')
}

function insertColumn() {
  console.log('Insert column')
}

function deleteColumn() {
  console.log('Delete column')
}

// Editing functions
function autoSum() {
  if (store.selectedCells.length > 0) {
    const [row, col] = store.selectedCells[0]
    store.updateCell(row, col, { formula: '=SUM()', value: null })
    console.log('AutoSum applied')
  }
}

function fillDown() {
  console.log('Fill down')
}

function clear() {
  store.clearSelectedCells()
  console.log('Cleared cells')
}

function sortAscending() {
  console.log('Sort ascending')
}

function sortDescending() {
  console.log('Sort descending')
}

function filter() {
  console.log('Filter')
}

function find() {
  const searchTerm = prompt('Find:')
  if (searchTerm) {
    console.log('Finding:', searchTerm)
  }
}

// Helper functions
function applyStyleToSelected(style: any) {
  for (const [row, col] of store.selectedCells) {
    store.applyCellStyle(row, col, style)
  }
}

function applyNumberFormatting(format: string) {
  console.log('Apply number formatting:', format)
}
</script>
