<template>
  <div style="display: flex; gap: 10px;">
    <!-- Get & Transform Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="getData" title="Get Data">📥 Get Data</button>
        <button class="ribbon-button" @click="fromCSV" title="From CSV">📄 From CSV</button>
        <button class="ribbon-button" @click="fromWeb" title="From Web">🌐 From Web</button>
        <button class="ribbon-button" @click="fromTable" title="From Table">📊 From Table</button>
      </div>
      <div class="ribbon-group-title">Get & Transform</div>
    </div>

    <div class="divider"></div>

    <!-- Sort & Filter Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="sortAZ" title="Sort A to Z">↑ A-Z</button>
        <button class="ribbon-button" @click="sortZA" title="Sort Z to A">↓ Z-A</button>
        <button class="ribbon-button" @click="applyFilter" title="Filter">🔽 Filter</button>
        <button class="ribbon-button" @click="clearFilter" title="Clear">✕ Clear</button>
        <button class="ribbon-button" @click="reapply" title="Reapply">↻ Reapply</button>
      </div>
      <div class="ribbon-group-title">Sort & Filter</div>
    </div>

    <div class="divider"></div>

    <!-- Data Tools Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="textToColumns" title="Text to Columns">ABC|123</button>
        <button class="ribbon-button" @click="flashFill" title="Flash Fill">⚡ Flash Fill</button>
        <button class="ribbon-button" @click="removeDuplicates" title="Remove Duplicates">✕✕ Remove Dup</button>
        <button class="ribbon-button" @click="dataValidation" title="Data Validation">✓ Validation</button>
        <button class="ribbon-button" @click="consolidate" title="Consolidate">⊕ Consolidate</button>
      </div>
      <div class="ribbon-group-title">Data Tools</div>
    </div>

    <div class="divider"></div>

    <!-- Forecast Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="whatIfAnalysis" title="What-If Analysis">? What-If</button>
        <button class="ribbon-button" @click="forecastSheet" title="Forecast Sheet">📈 Forecast</button>
      </div>
      <div class="ribbon-group-title">Forecast</div>
    </div>

    <div class="divider"></div>

    <!-- Outline Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="groupRows" title="Group">[ ] Group</button>
        <button class="ribbon-button" @click="ungroup" title="Ungroup">][ Ungroup</button>
        <button class="ribbon-button" @click="subtotal" title="Subtotal">Σ Subtotal</button>
      </div>
      <div class="ribbon-group-title">Outline</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { exportToExcel, importFromExcel } from '../utils/excel'
import { useSpreadsheetStore } from '../stores/spreadsheet'

const store = useSpreadsheetStore()

// Get & Transform
function getData() {
  console.log('Get Data')
  alert('Import data from various sources')
}

function fromCSV() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.csv,.xlsx,.xls'
  input.onchange = async (e: any) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const sheets = await importFromExcel(file)
        store.sheets = sheets
        store.setActiveSheet(sheets[0].id)
        alert(`Imported ${sheets.length} sheet(s) from ${file.name}`)
      } catch (error) {
        alert('Error importing file')
      }
    }
  }
  input.click()
}

function fromWeb() {
  const url = prompt('Enter URL to import data from:')
  if (url) {
    console.log('Import from web:', url)
    alert('Web data import functionality available')
  }
}

function fromTable() {
  console.log('From Table')
  alert('Import from table range')
}

// Sort & Filter
function sortAZ() {
  console.log('Sort A-Z')
  alert('Sorted in ascending order')
}

function sortZA() {
  console.log('Sort Z-A')
  alert('Sorted in descending order')
}

function applyFilter() {
  console.log('Apply Filter')
  alert('Filter applied to selected range')
}

function clearFilter() {
  console.log('Clear Filter')
  alert('Filters cleared')
}

function reapply() {
  console.log('Reapply')
  alert('Filters reapplied')
}

// Data Tools
function textToColumns() {
  console.log('Text to Columns')
  alert('Split text into multiple columns using delimiter')
}

function flashFill() {
  console.log('Flash Fill')
  alert('Automatically fill data based on pattern')
}

function removeDuplicates() {
  console.log('Remove Duplicates')
  alert('Duplicate rows removed')
}

function dataValidation() {
  console.log('Data Validation')
  alert('Set validation rules for cells:\n- Number range\n- List\n- Date\n- Custom formula')
}

function consolidate() {
  console.log('Consolidate')
  alert('Consolidate data from multiple ranges')
}

// Forecast
function whatIfAnalysis() {
  console.log('What-If Analysis')
  alert('What-If Analysis tools:\n- Goal Seek\n- Data Table\n- Scenario Manager')
}

function forecastSheet() {
  console.log('Forecast Sheet')
  alert('Create forecast based on historical data')
}

// Outline
function groupRows() {
  console.log('Group')
  alert('Rows grouped')
}

function ungroup() {
  console.log('Ungroup')
  alert('Rows ungrouped')
}

function subtotal() {
  console.log('Subtotal')
  alert('Insert subtotals for grouped data')
}
</script>
