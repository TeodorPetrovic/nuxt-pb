<template>
  <div class="excel-app flex flex-col h-full w-full">
    <!-- Ribbon Toolbar -->
    <div class="ribbon bg-white border-b shadow-sm">
      <!-- Tab Navigation -->
      <div class="tabs border-b flex items-center px-2 bg-gray-50">
        <div 
          v-for="tab in ribbonTabs" 
          :key="tab.id"
          @click="activeRibbonTab = tab.id"
          :class="[
            'px-4 py-2 cursor-pointer transition-colors',
            activeRibbonTab === tab.id 
              ? 'bg-white border-t-2 border-x border-blue-600 text-blue-600 font-semibold' 
              : 'text-gray-600 hover:bg-gray-100'
          ]"
        >
          {{ tab.name }}
        </div>
      </div>

      <!-- Tab Content -->
      <div class="ribbon-content p-2 bg-white overflow-x-auto">
        <!-- Home Tab -->
        <div v-if="activeRibbonTab === 'home'" class="flex items-center gap-4 flex-wrap">
          <!-- Clipboard Section -->
          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Clipboard</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="paste">Paste</UButton>
              <UButton size="sm" @click="cut">Cut</UButton>
              <UButton size="sm" @click="copy">Copy</UButton>
            </div>
          </div>
          
          <div class="border-l h-12"></div>

          <!-- Font Section -->
          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Font</div>
            <div class="flex gap-1">
              <USelectMenu 
                v-model="fontFamily" 
                :options="fontFamilies" 
                size="sm"
                class="w-32"
                @update:model-value="applyFontFamily"
              />
              <USelectMenu 
                v-model="fontSize" 
                :options="fontSizes" 
                size="sm"
                class="w-20"
                @update:model-value="applyFontSize"
              />
              <UButton size="sm" @click="toggleBold" :variant="isBold ? 'solid' : 'outline'">
                <strong>B</strong>
              </UButton>
              <UButton size="sm" @click="toggleItalic" :variant="isItalic ? 'solid' : 'outline'">
                <em>I</em>
              </UButton>
              <UButton size="sm" @click="toggleUnderline" :variant="isUnderline ? 'solid' : 'outline'">
                <u>U</u>
              </UButton>
              <input 
                type="color" 
                v-model="fontColor" 
                @change="applyFontColor"
                class="w-8 h-8 cursor-pointer rounded"
                title="Font Color"
              />
              <input 
                type="color" 
                v-model="bgColor" 
                @change="applyBgColor"
                class="w-8 h-8 cursor-pointer rounded"
                title="Background Color"
              />
            </div>
          </div>

          <div class="border-l h-12"></div>

          <!-- Alignment Section -->
          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Alignment</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="alignText('left')" title="Align Left">Left</UButton>
              <UButton size="sm" @click="alignText('center')" title="Align Center">Center</UButton>
              <UButton size="sm" @click="alignText('right')" title="Align Right">Right</UButton>
              <UButton size="sm" @click="toggleWrapText">Wrap</UButton>
              <UButton size="sm" @click="mergeCells">Merge</UButton>
            </div>
          </div>

          <div class="border-l h-12"></div>

          <!-- Number Format Section -->
          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Number</div>
            <div class="flex gap-1">
              <USelectMenu 
                v-model="numberFormat" 
                :options="numberFormats" 
                size="sm"
                class="w-32"
                @update:model-value="applyNumberFormat"
              />
              <UButton size="sm" @click="formatAsPercent" title="Percentage">%</UButton>
              <UButton size="sm" @click="formatAsComma" title="Comma Style">,</UButton>
              <UButton size="sm" @click="increaseDecimals" title="Increase Decimals">+.0</UButton>
              <UButton size="sm" @click="decreaseDecimals" title="Decrease Decimals">-.0</UButton>
            </div>
          </div>

          <div class="border-l h-12"></div>

          <!-- Cells Section -->
          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Cells</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="insertRow">Insert Row</UButton>
              <UButton size="sm" @click="insertColumn">Insert Column</UButton>
              <UButton size="sm" @click="deleteRow" color="red">Delete Row</UButton>
              <UButton size="sm" @click="deleteColumn" color="red">Delete Column</UButton>
            </div>
          </div>

          <div class="border-l h-12"></div>

          <!-- Editing Section -->
          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Editing</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="autoSum">AutoSum</UButton>
              <UButton size="sm" @click="fillDown">Fill Down</UButton>
              <UButton size="sm" @click="clearContent">Clear</UButton>
              <UButton size="sm" @click="sortAscending">Sort A-Z</UButton>
              <UButton size="sm" @click="sortDescending">Sort Z-A</UButton>
              <UButton size="sm" @click="toggleFilter">Filter</UButton>
            </div>
          </div>
        </div>

        <!-- Insert Tab -->
        <div v-if="activeRibbonTab === 'insert'" class="flex items-center gap-4 flex-wrap">
          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Tables</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="insertTable">Table</UButton>
              <UButton size="sm" @click="insertPivotTable">PivotTable</UButton>
            </div>
          </div>

          <div class="border-l h-12"></div>

          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Charts</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="insertChart('column')">Column</UButton>
              <UButton size="sm" @click="insertChart('line')">Line</UButton>
              <UButton size="sm" @click="insertChart('pie')">Pie</UButton>
              <UButton size="sm" @click="insertChart('bar')">Bar</UButton>
            </div>
          </div>

          <div class="border-l h-12"></div>

          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Links & Text</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="insertHyperlink">Hyperlink</UButton>
              <UButton size="sm" @click="insertImage">Image</UButton>
              <UButton size="sm" @click="insertTextBox">Text Box</UButton>
            </div>
          </div>
        </div>

        <!-- Formulas Tab -->
        <div v-if="activeRibbonTab === 'formulas'" class="flex items-center gap-4 flex-wrap">
          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Function Library</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="insertFormula('SUM')">SUM</UButton>
              <UButton size="sm" @click="insertFormula('AVERAGE')">AVERAGE</UButton>
              <UButton size="sm" @click="insertFormula('COUNT')">COUNT</UButton>
              <UButton size="sm" @click="insertFormula('MAX')">MAX</UButton>
              <UButton size="sm" @click="insertFormula('MIN')">MIN</UButton>
              <UButton size="sm" @click="insertFormula('IF')">IF</UButton>
              <UButton size="sm" @click="insertFormula('AND')">AND</UButton>
              <UButton size="sm" @click="insertFormula('OR')">OR</UButton>
            </div>
          </div>

          <div class="border-l h-12"></div>

          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Text Functions</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="insertFormula('CONCATENATE')">CONCATENATE</UButton>
              <UButton size="sm" @click="insertFormula('UPPER')">UPPER</UButton>
              <UButton size="sm" @click="insertFormula('LOWER')">LOWER</UButton>
              <UButton size="sm" @click="insertFormula('TRIM')">TRIM</UButton>
            </div>
          </div>

          <div class="border-l h-12"></div>

          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Date & Time</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="insertFormula('TODAY')">TODAY</UButton>
              <UButton size="sm" @click="insertFormula('NOW')">NOW</UButton>
              <UButton size="sm" @click="insertFormula('DATE')">DATE</UButton>
            </div>
          </div>

          <div class="border-l h-12"></div>

          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Math Functions</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="insertFormula('ROUND')">ROUND</UButton>
              <UButton size="sm" @click="insertFormula('CEILING')">CEILING</UButton>
              <UButton size="sm" @click="insertFormula('FLOOR')">FLOOR</UButton>
              <UButton size="sm" @click="insertFormula('ABS')">ABS</UButton>
            </div>
          </div>
        </div>

        <!-- Data Tab -->
        <div v-if="activeRibbonTab === 'data'" class="flex items-center gap-4 flex-wrap">
          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Sort & Filter</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="sortAscending">Sort A-Z</UButton>
              <UButton size="sm" @click="sortDescending">Sort Z-A</UButton>
              <UButton size="sm" @click="toggleFilter">Filter</UButton>
              <UButton size="sm" @click="clearFilter">Clear Filter</UButton>
            </div>
          </div>

          <div class="border-l h-12"></div>

          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Data Tools</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="textToColumns">Text to Columns</UButton>
              <UButton size="sm" @click="removeDuplicates">Remove Duplicates</UButton>
              <UButton size="sm" @click="dataValidation">Data Validation</UButton>
            </div>
          </div>
        </div>

        <!-- View Tab -->
        <div v-if="activeRibbonTab === 'view'" class="flex items-center gap-4 flex-wrap">
          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Show</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="toggleGridlines">
                {{ showGridlines ? 'Hide' : 'Show' }} Gridlines
              </UButton>
              <UButton size="sm" @click="toggleHeadings">
                {{ showHeadings ? 'Hide' : 'Show' }} Headings
              </UButton>
              <UButton size="sm" @click="toggleFormulaBar">
                {{ showFormulaBar ? 'Hide' : 'Show' }} Formula Bar
              </UButton>
            </div>
          </div>

          <div class="border-l h-12"></div>

          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Zoom</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="zoomIn">Zoom In</UButton>
              <UButton size="sm" @click="zoomOut">Zoom Out</UButton>
              <UButton size="sm" @click="zoomReset">100%</UButton>
            </div>
          </div>

          <div class="border-l h-12"></div>

          <div class="ribbon-group">
            <div class="text-xs text-gray-500 mb-1">Window</div>
            <div class="flex gap-1">
              <UButton size="sm" @click="freezePanes">Freeze Panes</UButton>
              <UButton size="sm" @click="splitWindow">Split</UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Formula Bar -->
    <div v-if="showFormulaBar" class="formula-bar bg-white border-b p-2 flex items-center gap-2">
      <div class="cell-reference bg-gray-100 px-3 py-1 rounded text-sm font-mono">
        {{ currentCellRef }}
      </div>
      <input 
        v-model="formulaBarValue"
        @keydown.enter="applyFormulaBarValue"
        @focus="isEditingFormula = true"
        @blur="isEditingFormula = false"
        class="flex-1 px-3 py-1 border rounded text-sm font-mono"
        placeholder="Enter formula or value..."
      />
    </div>

    <!-- Main Spreadsheet Area -->
    <div class="flex-1 overflow-hidden relative">
      <div ref="spreadsheetContainer" class="w-full h-full"></div>
    </div>

    <!-- Sheet Tabs -->
    <div class="sheet-tabs bg-gray-50 border-t flex items-center gap-2 p-2">
      <div class="flex items-center gap-1 flex-1 overflow-x-auto">
        <div 
          v-for="(sheet, index) in sheets" 
          :key="sheet.id"
          @click="switchSheet(index)"
          :class="[
            'sheet-tab px-4 py-1 rounded cursor-pointer transition-colors whitespace-nowrap',
            currentSheetIndex === index 
              ? 'bg-white border-t-2 border-blue-600 text-blue-600 font-semibold shadow' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          ]"
        >
          {{ sheet.name }}
        </div>
        <UButton size="sm" @click="addSheet" color="gray">
          Add Sheet
        </UButton>
      </div>
      
      <div class="flex items-center gap-2">
        <UButton size="sm" @click="downloadExcel" color="green">
          Download Excel
        </UButton>
        <UButton size="sm" @click="uploadExcel" color="blue">
          Upload Excel
        </UButton>
        <input 
          ref="fileInput" 
          type="file" 
          accept=".xlsx,.xls" 
          @change="handleFileUpload" 
          class="hidden"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import jspreadsheet from 'jspreadsheet-ce'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

// Types
interface Sheet {
  id: string
  name: string
  instance: any
  data: any[][]
}

// State
const spreadsheetContainer = ref<HTMLElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const activeRibbonTab = ref('home')
const currentSheetIndex = ref(0)
const sheets = ref<Sheet[]>([])
const currentCellRef = ref('A1')
const formulaBarValue = ref('')
const isEditingFormula = ref(false)
const showFormulaBar = ref(true)
const showGridlines = ref(true)
const showHeadings = ref(true)

// Formatting state
const fontFamily = ref('Arial')
const fontSize = ref('11')
const fontColor = ref('#000000')
const bgColor = ref('#ffffff')
const isBold = ref(false)
const isItalic = ref(false)
const isUnderline = ref(false)
const numberFormat = ref('General')

// Options
const ribbonTabs = [
  { id: 'home', name: 'Home' },
  { id: 'insert', name: 'Insert' },
  { id: 'formulas', name: 'Formulas' },
  { id: 'data', name: 'Data' },
  { id: 'view', name: 'View' },
]

const fontFamilies = ['Arial', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia', 'Tahoma']
const fontSizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '28', '32']
const numberFormats = ['General', 'Number', 'Currency', 'Accounting', 'Date', 'Time', 'Percentage', 'Fraction', 'Scientific', 'Text']

// Get current spreadsheet instance
const currentSpreadsheet = computed(() => {
  const sheet = sheets.value[currentSheetIndex.value]
  return sheet?.instance?.[0] // jspreadsheet returns an array of worksheets
})

// Initialize
onMounted(() => {
  initializeSpreadsheet()
})

// Initialize first sheet
function initializeSpreadsheet() {
  if (!spreadsheetContainer.value) return
  
  // Create initial data
  const data = Array(50).fill(null).map(() => Array(26).fill(''))
  
  const options = {
    worksheets: [{
      data: data,
      minDimensions: [26, 50],
    }],
    tableOverflow: true,
    tableWidth: '100%',
    tableHeight: '100%',
    columnSorting: true,
    columnDrag: true,
    rowResize: true,
    columnResize: true,
    toolbar: false,
    allowInsertRow: true,
    allowInsertColumn: true,
    allowDeleteRow: true,
    allowDeleteColumn: true,
    allowRenameColumn: true,
    allowComments: true,
    about: false,
    onselection: (instance: any, x1: number, y1: number, x2: number, y2: number) => {
      updateCurrentCell(x1, y1)
    },
    onchange: (instance: any, cell: any, x: number, y: number, value: string) => {
      if (!isEditingFormula.value) {
        updateFormulaBar(x, y)
      }
    }
  }
  
  const instance = jspreadsheet(spreadsheetContainer.value, options)
  
  sheets.value.push({
    id: 'sheet1',
    name: 'Sheet1',
    instance: instance,
    data: data
  })
}

// Update current cell reference
function updateCurrentCell(x: number, y: number) {
  const col = String.fromCharCode(65 + x)
  const row = y + 1
  currentCellRef.value = `${col}${row}`
  updateFormulaBar(x, y)
}

// Update formula bar
function updateFormulaBar(x: number, y: number) {
  if (!currentSpreadsheet.value) return
  const value = currentSpreadsheet.value.getValue(`${String.fromCharCode(65 + x)}${y + 1}`)
  formulaBarValue.value = value || ''
}

// Apply formula bar value
function applyFormulaBarValue() {
  if (!currentSpreadsheet.value) return
  currentSpreadsheet.value.setValue(currentCellRef.value, formulaBarValue.value)
}

// Clipboard Operations
function copy() {
  if (!currentSpreadsheet.value) return
  currentSpreadsheet.value.copy()
  showNotification('Copied to clipboard')
}

function cut() {
  if (!currentSpreadsheet.value) return
  currentSpreadsheet.value.cut()
  showNotification('Cut to clipboard')
}

function paste() {
  if (!currentSpreadsheet.value) return
  currentSpreadsheet.value.paste()
  showNotification('Pasted from clipboard')
}

// Font Operations
function applyFontFamily() {
  if (!currentSpreadsheet.value) return
  const selected = currentSpreadsheet.value.getSelected()
  if (!selected) return
  
  for (let cell of selected) {
    currentSpreadsheet.value.setStyle(cell, 'font-family', fontFamily.value)
  }
}

function applyFontSize() {
  if (!currentSpreadsheet.value) return
  const selected = currentSpreadsheet.value.getSelected()
  if (!selected) return
  
  for (let cell of selected) {
    currentSpreadsheet.value.setStyle(cell, 'font-size', `${fontSize.value}pt`)
  }
}

function toggleBold() {
  if (!currentSpreadsheet.value) return
  isBold.value = !isBold.value
  const selected = currentSpreadsheet.value.getSelected()
  if (!selected) return
  
  for (let cell of selected) {
    currentSpreadsheet.value.setStyle(cell, 'font-weight', isBold.value ? 'bold' : 'normal')
  }
}

function toggleItalic() {
  if (!currentSpreadsheet.value) return
  isItalic.value = !isItalic.value
  const selected = currentSpreadsheet.value.getSelected()
  if (!selected) return
  
  for (let cell of selected) {
    currentSpreadsheet.value.setStyle(cell, 'font-style', isItalic.value ? 'italic' : 'normal')
  }
}

function toggleUnderline() {
  if (!currentSpreadsheet.value) return
  isUnderline.value = !isUnderline.value
  const selected = currentSpreadsheet.value.getSelected()
  if (!selected) return
  
  for (let cell of selected) {
    currentSpreadsheet.value.setStyle(cell, 'text-decoration', isUnderline.value ? 'underline' : 'none')
  }
}

function applyFontColor() {
  if (!currentSpreadsheet.value) return
  const selected = currentSpreadsheet.value.getSelected()
  if (!selected) return
  
  for (let cell of selected) {
    currentSpreadsheet.value.setStyle(cell, 'color', fontColor.value)
  }
}

function applyBgColor() {
  if (!currentSpreadsheet.value) return
  const selected = currentSpreadsheet.value.getSelected()
  if (!selected) return
  
  for (let cell of selected) {
    currentSpreadsheet.value.setStyle(cell, 'background-color', bgColor.value)
  }
}

// Alignment Operations
function alignText(alignment: string) {
  if (!currentSpreadsheet.value) return
  const selected = currentSpreadsheet.value.getSelected()
  if (!selected) return
  
  for (let cell of selected) {
    currentSpreadsheet.value.setStyle(cell, 'text-align', alignment)
  }
}

function toggleWrapText() {
  if (!currentSpreadsheet.value) return
  const selected = currentSpreadsheet.value.getSelected()
  if (!selected) return
  
  for (let cell of selected) {
    const current = currentSpreadsheet.value.getStyle(cell, 'white-space')
    currentSpreadsheet.value.setStyle(cell, 'white-space', current === 'wrap' ? 'nowrap' : 'wrap')
  }
}

function mergeCells() {
  if (!currentSpreadsheet.value) return
  const selected = currentSpreadsheet.value.getSelected(true)
  if (!selected || selected.length < 2) return
  
  currentSpreadsheet.value.setMerge(selected[0], selected.length, 1)
  showNotification('Cells merged')
}

// Number Format Operations
function applyNumberFormat() {
  showNotification(`Applied ${numberFormat.value} format`)
}

function formatAsPercent() {
  if (!currentSpreadsheet.value) return
  const selected = currentSpreadsheet.value.getSelected()
  if (!selected) return
  
  for (let cell of selected) {
    const value = parseFloat(currentSpreadsheet.value.getValue(cell))
    if (!isNaN(value)) {
      currentSpreadsheet.value.setValue(cell, `${(value * 100).toFixed(2)}%`)
    }
  }
}

function formatAsComma() {
  if (!currentSpreadsheet.value) return
  const selected = currentSpreadsheet.value.getSelected()
  if (!selected) return
  
  for (let cell of selected) {
    const value = parseFloat(currentSpreadsheet.value.getValue(cell))
    if (!isNaN(value)) {
      currentSpreadsheet.value.setValue(cell, value.toLocaleString())
    }
  }
}

function increaseDecimals() {
  showNotification('Increased decimal places')
}

function decreaseDecimals() {
  showNotification('Decreased decimal places')
}

// Cell Operations
function insertRow() {
  if (!currentSpreadsheet.value) return
  currentSpreadsheet.value.insertRow()
  showNotification('Row inserted')
}

function insertColumn() {
  if (!currentSpreadsheet.value) return
  currentSpreadsheet.value.insertColumn()
  showNotification('Column inserted')
}

function deleteRow() {
  if (!currentSpreadsheet.value) return
  currentSpreadsheet.value.deleteRow()
  showNotification('Row deleted')
}

function deleteColumn() {
  if (!currentSpreadsheet.value) return
  currentSpreadsheet.value.deleteColumn()
  showNotification('Column deleted')
}

// Editing Operations
function autoSum() {
  if (!currentSpreadsheet.value) return
  const selected = currentSpreadsheet.value.getSelected(true)
  if (!selected) return
  
  // Insert SUM formula for selected range
  formulaBarValue.value = `=SUM(${selected[0]}:${selected[selected.length - 1]})`
  applyFormulaBarValue()
}

function fillDown() {
  if (!currentSpreadsheet.value) return
  const selected = currentSpreadsheet.value.getSelected(true)
  if (!selected || selected.length < 2) return
  
  const firstValue = currentSpreadsheet.value.getValue(selected[0])
  for (let i = 1; i < selected.length; i++) {
    currentSpreadsheet.value.setValue(selected[i], firstValue)
  }
  showNotification('Filled down')
}

function clearContent() {
  if (!currentSpreadsheet.value) return
  const selected = currentSpreadsheet.value.getSelected()
  if (!selected) return
  
  for (let cell of selected) {
    currentSpreadsheet.value.setValue(cell, '')
  }
  showNotification('Content cleared')
}

function sortAscending() {
  if (!currentSpreadsheet.value) return
  currentSpreadsheet.value.orderBy(0, 0)
  showNotification('Sorted A-Z')
}

function sortDescending() {
  if (!currentSpreadsheet.value) return
  currentSpreadsheet.value.orderBy(0, 1)
  showNotification('Sorted Z-A')
}

function toggleFilter() {
  showNotification('Filter toggled')
}

function clearFilter() {
  showNotification('Filter cleared')
}

// Insert Tab Operations
function insertTable() {
  showNotification('Table inserted')
}

function insertPivotTable() {
  showNotification('PivotTable feature available in advanced version')
}

function insertChart(type: string) {
  showNotification(`${type} chart feature available in advanced version`)
}

function insertHyperlink() {
  if (!currentSpreadsheet.value) return
  const url = prompt('Enter URL:')
  if (!url) return
  
  const selected = currentSpreadsheet.value.getSelected()
  if (!selected || !selected[0]) return
  
  const text = prompt('Enter display text:', url)
  currentSpreadsheet.value.setValue(selected[0], `<a href="${url}" target="_blank">${text}</a>`)
  showNotification('Hyperlink inserted')
}

function insertImage() {
  showNotification('Image insertion feature available in advanced version')
}

function insertTextBox() {
  showNotification('Text box feature available in advanced version')
}

// Formula Operations
function insertFormula(formula: string) {
  if (!currentSpreadsheet.value) return
  
  let formulaText = ''
  switch (formula) {
    case 'SUM':
    case 'AVERAGE':
    case 'COUNT':
    case 'MAX':
    case 'MIN':
      formulaText = `=${formula}(`
      break
    case 'IF':
      formulaText = `=IF(condition, value_if_true, value_if_false)`
      break
    case 'AND':
    case 'OR':
      formulaText = `=${formula}(condition1, condition2)`
      break
    case 'CONCATENATE':
      formulaText = `=CONCATENATE(text1, text2)`
      break
    case 'UPPER':
    case 'LOWER':
    case 'TRIM':
      formulaText = `=${formula}(text)`
      break
    case 'TODAY':
    case 'NOW':
      formulaText = `=${formula}()`
      currentSpreadsheet.value.setValue(currentCellRef.value, new Date().toLocaleDateString())
      return
    case 'DATE':
      formulaText = `=DATE(year, month, day)`
      break
    case 'ROUND':
    case 'CEILING':
    case 'FLOOR':
    case 'ABS':
      formulaText = `=${formula}(number)`
      break
  }
  
  formulaBarValue.value = formulaText
  showNotification(`${formula} function inserted`)
}

// Data Tab Operations
function textToColumns() {
  showNotification('Text to Columns feature available')
}

function removeDuplicates() {
  showNotification('Remove Duplicates feature available')
}

function dataValidation() {
  showNotification('Data Validation feature available')
}

// View Tab Operations
function toggleGridlines() {
  showGridlines.value = !showGridlines.value
  if (spreadsheetContainer.value) {
    const table = spreadsheetContainer.value.querySelector('table')
    if (table) {
      table.style.borderCollapse = showGridlines.value ? 'collapse' : 'separate'
    }
  }
}

function toggleHeadings() {
  showHeadings.value = !showHeadings.value
}

function toggleFormulaBar() {
  showFormulaBar.value = !showFormulaBar.value
}

function zoomIn() {
  if (!spreadsheetContainer.value) return
  const current = parseFloat(getComputedStyle(spreadsheetContainer.value).fontSize)
  spreadsheetContainer.value.style.fontSize = `${current * 1.1}px`
}

function zoomOut() {
  if (!spreadsheetContainer.value) return
  const current = parseFloat(getComputedStyle(spreadsheetContainer.value).fontSize)
  spreadsheetContainer.value.style.fontSize = `${current * 0.9}px`
}

function zoomReset() {
  if (!spreadsheetContainer.value) return
  spreadsheetContainer.value.style.fontSize = '14px'
}

function freezePanes() {
  showNotification('Freeze Panes feature available in advanced version')
}

function splitWindow() {
  showNotification('Split Window feature available in advanced version')
}

// Sheet Management
function addSheet() {
  const sheetNum = sheets.value.length + 1
  const newSheet: Sheet = {
    id: `sheet${sheetNum}`,
    name: `Sheet${sheetNum}`,
    instance: null,
    data: Array(50).fill(null).map(() => Array(26).fill(''))
  }
  sheets.value.push(newSheet)
  switchSheet(sheets.value.length - 1)
  showNotification(`Sheet${sheetNum} added`)
}

function switchSheet(index: number) {
  if (index === currentSheetIndex.value) return
  
  // Save current sheet data
  if (currentSpreadsheet.value) {
    const activeWorksheet = currentSpreadsheet.value[0]
    if (activeWorksheet && activeWorksheet.getData) {
      sheets.value[currentSheetIndex.value].data = activeWorksheet.getData()
    }
  }
  
  currentSheetIndex.value = index
  
  // Recreate spreadsheet for new sheet
  if (spreadsheetContainer.value) {
    spreadsheetContainer.value.innerHTML = ''
    
    const options = {
      worksheets: [{
        data: sheets.value[index].data,
        minDimensions: [26, 50],
      }],
      tableOverflow: true,
      tableWidth: '100%',
      tableHeight: '100%',
      columnSorting: true,
      columnDrag: true,
      rowResize: true,
      columnResize: true,
      toolbar: false,
      allowInsertRow: true,
      allowInsertColumn: true,
      allowDeleteRow: true,
      allowDeleteColumn: true,
      allowRenameColumn: true,
      allowComments: true,
      about: false,
      onselection: (instance: any, x1: number, y1: number, x2: number, y2: number) => {
        updateCurrentCell(x1, y1)
      },
      onchange: (instance: any, cell: any, x: number, y: number, value: string) => {
        if (!isEditingFormula.value) {
          updateFormulaBar(x, y)
        }
      }
    }
    
    sheets.value[index].instance = jspreadsheet(spreadsheetContainer.value, options)
  }
}

// Excel Import/Export
function downloadExcel() {
  try {
    const workbook = XLSX.utils.book_new()
    
    // Add all sheets to workbook
    sheets.value.forEach(sheet => {
      let data = sheet.data
      if (sheet.instance?.[0]?.getData) {
        data = sheet.instance[0].getData()
      }
      const worksheet = XLSX.utils.aoa_to_sheet(data)
      XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name)
    })
    
    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    
    // Download file
    saveAs(blob, 'spreadsheet.xlsx')
    showNotification('Excel file downloaded successfully')
  } catch (error) {
    console.error('Error downloading Excel:', error)
    showNotification('Error downloading Excel file')
  }
}

function uploadExcel() {
  fileInput.value?.click()
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      
      // Clear existing sheets
      sheets.value = []
      
      // Load all sheets from Excel
      workbook.SheetNames.forEach((sheetName, index) => {
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]
        
        sheets.value.push({
          id: `sheet${index + 1}`,
          name: sheetName,
          instance: null,
          data: jsonData
        })
      })
      
      // Switch to first sheet
      currentSheetIndex.value = 0
      if (spreadsheetContainer.value) {
        spreadsheetContainer.value.innerHTML = ''
        initializeSpreadsheet()
      }
      
      showNotification('Excel file imported successfully')
    } catch (error) {
      console.error('Error importing Excel:', error)
      showNotification('Error importing Excel file')
    }
  }
  reader.readAsArrayBuffer(file)
}

// Utility
function showNotification(message: string) {
  // Using browser notification
  console.log(message)
  // In a real app, you'd use a toast/notification component
}
</script>

<style scoped>
.excel-app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.ribbon {
  min-height: 120px;
}

.ribbon-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sheet-tab {
  min-width: 100px;
  text-align: center;
}

:deep(.jexcel) {
  font-family: Arial, sans-serif;
  font-size: 11pt;
}

:deep(.jexcel thead td) {
  background-color: #f0f0f0;
  font-weight: bold;
  text-align: center;
  border: 1px solid #ccc;
}

:deep(.jexcel tbody td) {
  border: 1px solid #e0e0e0;
  padding: 4px;
  min-height: 21px;
}

:deep(.jexcel tbody td.selected) {
  background-color: #e3f2fd !important;
}

:deep(.jexcel_container) {
  overflow: auto;
}
</style>
