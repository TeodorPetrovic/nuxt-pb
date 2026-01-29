<template>
  <div class="excel-container">
    <!-- Toolbar -->
    <Toolbar />

    <!-- Ribbon Tabs -->
    <div class="ribbon-container">
      <div class="ribbon-tabs">
        <button 
          v-for="tab in ribbonTabs" 
          :key="tab"
          :class="['ribbon-tab', { active: activeTab === tab }]"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Ribbon Content -->
      <div class="ribbon-content">
        <HomeRibbon v-if="activeTab === 'Home'" />
        <InsertRibbon v-if="activeTab === 'Insert'" @show-chart-modal="openChartModal" />
        <FormulasRibbon v-if="activeTab === 'Formulas'" />
        <DataRibbon v-if="activeTab === 'Data'" />
        <ViewRibbon v-if="activeTab === 'View'" />
        <div v-if="activeTab === 'Page Layout'" class="ribbon-group">
          <div class="ribbon-group-content">
            <button class="ribbon-button">Margins</button>
            <button class="ribbon-button">Orientation</button>
            <button class="ribbon-button">Size</button>
            <button class="ribbon-button">Print Area</button>
          </div>
          <div class="ribbon-group-title">Page Setup</div>
        </div>
        <div v-if="activeTab === 'Review'" class="ribbon-group">
          <div class="ribbon-group-content">
            <button class="ribbon-button">Spelling</button>
            <button class="ribbon-button">Comments</button>
            <button class="ribbon-button">Protect Sheet</button>
          </div>
          <div class="ribbon-group-title">Review</div>
        </div>
        <div v-if="activeTab === 'Draw'" class="ribbon-group">
          <div class="ribbon-group-content">
            <button class="ribbon-button">Pen</button>
            <button class="ribbon-button">Highlighter</button>
            <button class="ribbon-button">Eraser</button>
          </div>
          <div class="ribbon-group-title">Pens</div>
        </div>
        <div v-if="activeTab === 'Help'" class="ribbon-group">
          <div class="ribbon-group-content">
            <button class="ribbon-button">Search</button>
            <button class="ribbon-button">Help</button>
            <button class="ribbon-button">Feedback</button>
          </div>
          <div class="ribbon-group-title">Help</div>
        </div>
        <div v-if="activeTab === 'Developer'" class="ribbon-group">
          <div class="ribbon-group-content">
            <button class="ribbon-button">Visual Basic</button>
            <button class="ribbon-button">Macros</button>
            <button class="ribbon-button">Add-ins</button>
          </div>
          <div class="ribbon-group-title">Code</div>
        </div>
      </div>
    </div>

    <!-- Formula Bar -->
    <div class="formula-bar-container">
      <div class="cell-reference">{{ currentCellRef }}</div>
      <input 
        v-model="formulaBarValue" 
        class="formula-bar" 
        placeholder="Enter formula or value"
        @keyup.enter="applyFormulaBarValue"
      />
    </div>

    <!-- Spreadsheet -->
    <div class="spreadsheet-container" ref="spreadsheetContainer">
      <SpreadsheetGrid 
        :key="store.activeSheetId"
        @cell-select="onCellSelect"
        @cell-change="onCellChange"
      />
    </div>

    <!-- Sheet Tabs -->
    <div class="sheet-tabs-container">
      <button 
        v-for="sheet in store.sheets" 
        :key="sheet.id"
        :class="['sheet-tab', { active: sheet.id === store.activeSheetId }]"
        @click="store.setActiveSheet(sheet.id)"
        @dblclick="renameSheet(sheet.id)"
      >
        {{ sheet.name }}
      </button>
      <button class="add-sheet-button" @click="store.addSheet()">+ Add Sheet</button>
    </div>

    <!-- Chart Modal -->
    <ChartModal 
      v-if="showChartModal"
      :chart-type="selectedChartType"
      @close="showChartModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useSpreadsheetStore } from '../stores/spreadsheet'
import { getCellReference } from '../utils/formulas'
import type { RibbonTab } from '../types'
import SpreadsheetGrid from '../components/SpreadsheetGrid.vue'
import HomeRibbon from '../components/HomeRibbon.vue'
import InsertRibbon from '../components/InsertRibbon.vue'
import FormulasRibbon from '../components/FormulasRibbon.vue'
import DataRibbon from '../components/DataRibbon.vue'
import ViewRibbon from '../components/ViewRibbon.vue'
import ChartModal from '../components/ChartModal.vue'
import Toolbar from '../components/Toolbar.vue'

const store = useSpreadsheetStore()

const ribbonTabs: RibbonTab[] = [
  'Home', 'Insert', 'Page Layout', 'Formulas', 'Data', 
  'Review', 'View', 'Draw', 'Help', 'Developer'
]

const activeTab = ref<RibbonTab>('Home')
const currentCell = ref<[number, number]>([0, 0])
const formulaBarValue = ref('')
const showChartModal = ref(false)
const selectedChartType = ref<'column' | 'line' | 'pie' | 'bar'>('column')

const currentCellRef = computed(() => getCellReference(currentCell.value[0], currentCell.value[1]))

function openChartModal(type: 'column' | 'line' | 'pie' | 'bar' | 'area' | 'scatter') {
  selectedChartType.value = type
  showChartModal.value = true
}

function onCellSelect(row: number, col: number) {
  currentCell.value = [row, col]
  const cell = store.getCellValue(row, col)
  formulaBarValue.value = cell?.formula || cell?.value?.toString() || ''
}

function onCellChange(row: number, col: number, value: any) {
  if (typeof value === 'string' && value.startsWith('=')) {
    store.updateCell(row, col, { value: null, formula: value })
  } else {
    store.updateCell(row, col, { value, formula: undefined })
  }
}

function applyFormulaBarValue() {
  const [row, col] = currentCell.value
  onCellChange(row, col, formulaBarValue.value)
}

function renameSheet(id: string) {
  const sheet = store.sheets.find(s => s.id === id)
  if (!sheet) return
  
  const newName = prompt('Enter new sheet name:', sheet.name)
  if (newName && newName.trim()) {
    sheet.name = newName.trim()
  }
}

// Watch for cell selection changes
watch(currentCell, () => {
  const [row, col] = currentCell.value
  const cell = store.getCellValue(row, col)
  formulaBarValue.value = cell?.formula || cell?.value?.toString() || ''
})
</script>
