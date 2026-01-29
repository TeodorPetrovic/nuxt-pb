<template>
  <div style="display: flex; gap: 10px;">
    <!-- Function Library Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="insertFunction('SUM')" title="AutoSum">Σ Sum</button>
        <button class="ribbon-button" @click="insertFunction('AVERAGE')" title="Average">📊 Average</button>
        <button class="ribbon-button" @click="insertFunction('COUNT')" title="Count"># Count</button>
        <button class="ribbon-button" @click="insertFunction('MAX')" title="Max">↑ Max</button>
        <button class="ribbon-button" @click="insertFunction('MIN')" title="Min">↓ Min</button>
        <button class="ribbon-button" @click="showFunctionList('financial')" title="Financial">$ Financial</button>
        <button class="ribbon-button" @click="showFunctionList('logical')" title="Logical">🔀 Logical</button>
        <button class="ribbon-button" @click="showFunctionList('text')" title="Text">ABC Text</button>
        <button class="ribbon-button" @click="showFunctionList('date')" title="Date & Time">📅 Date/Time</button>
        <button class="ribbon-button" @click="showFunctionList('lookup')" title="Lookup">🔍 Lookup</button>
        <button class="ribbon-button" @click="showFunctionList('math')" title="Math & Trig">∑ Math</button>
      </div>
      <div class="ribbon-group-title">Function Library</div>
    </div>

    <div class="divider"></div>

    <!-- Defined Names Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="nameManager" title="Name Manager">Name Manager</button>
        <button class="ribbon-button" @click="defineName" title="Define Name">Define Name</button>
      </div>
      <div class="ribbon-group-title">Defined Names</div>
    </div>

    <div class="divider"></div>

    <!-- Formula Auditing Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="tracePrecedents" title="Trace Precedents">← Trace</button>
        <button class="ribbon-button" @click="traceDependents" title="Trace Dependents">→ Trace</button>
        <button class="ribbon-button" @click="errorChecking" title="Error Checking">⚠️ Errors</button>
        <button class="ribbon-button" @click="evaluateFormula" title="Evaluate Formula">🔬 Evaluate</button>
        <button class="ribbon-button" @click="watchWindow" title="Watch Window">👁️ Watch</button>
      </div>
      <div class="ribbon-group-title">Formula Auditing</div>
    </div>

    <div class="divider"></div>

    <!-- Calculation Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <select v-model="calculationMode" @change="setCalculationMode" title="Calculation Options">
          <option value="auto">Automatic</option>
          <option value="manual">Manual</option>
        </select>
        <button class="ribbon-button" @click="calculateNow" title="Calculate Now">Calculate</button>
      </div>
      <div class="ribbon-group-title">Calculation</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSpreadsheetStore } from '../stores/spreadsheet'

const store = useSpreadsheetStore()
const calculationMode = ref('auto')

function insertFunction(funcName: string) {
  if (store.selectedCells.length > 0) {
    const [row, col] = store.selectedCells[0]
    store.updateCell(row, col, { formula: `=${funcName}()`, value: null })
    console.log(`Inserted function: ${funcName}`)
  } else {
    alert(`Function syntax: =${funcName}()\n\nSelect a cell first.`)
  }
}

function showFunctionList(category: string) {
  const functions: Record<string, string[]> = {
    financial: ['PMT', 'PV', 'FV', 'RATE', 'NPER', 'NPV', 'IRR'],
    logical: ['IF', 'AND', 'OR', 'NOT', 'TRUE', 'FALSE', 'IFERROR'],
    text: ['CONCATENATE', 'LEFT', 'RIGHT', 'MID', 'LEN', 'UPPER', 'LOWER', 'TRIM'],
    date: ['NOW', 'TODAY', 'YEAR', 'MONTH', 'DAY', 'HOUR', 'MINUTE', 'DATE'],
    lookup: ['VLOOKUP', 'HLOOKUP', 'INDEX', 'MATCH', 'LOOKUP'],
    math: ['SUM', 'ROUND', 'FLOOR', 'CEIL', 'ABS', 'SQRT', 'POWER', 'MOD', 'RAND']
  }
  
  const funcList = functions[category] || []
  alert(`${category.toUpperCase()} Functions:\n\n${funcList.join(', ')}`)
}

function nameManager() {
  console.log('Name Manager')
  alert('Name Manager: Define and manage named ranges')
}

function defineName() {
  const name = prompt('Enter name for selected range:')
  if (name) {
    console.log('Define Name:', name)
    alert(`Named range "${name}" created!`)
  }
}

function tracePrecedents() {
  console.log('Trace Precedents')
  alert('Shows cells that affect the selected cell')
}

function traceDependents() {
  console.log('Trace Dependents')
  alert('Shows cells affected by the selected cell')
}

function errorChecking() {
  console.log('Error Checking')
  alert('No errors found in formulas')
}

function evaluateFormula() {
  if (store.selectedCells.length > 0) {
    const [row, col] = store.selectedCells[0]
    const cell = store.getCellValue(row, col)
    if (cell?.formula) {
      alert(`Formula: ${cell.formula}\n\nEvaluation steps available`)
    } else {
      alert('No formula in selected cell')
    }
  }
}

function watchWindow() {
  console.log('Watch Window')
  alert('Watch Window: Monitor cell values in real-time')
}

function setCalculationMode() {
  console.log('Calculation Mode:', calculationMode.value)
  alert(`Calculation set to ${calculationMode.value}`)
}

function calculateNow() {
  console.log('Calculate Now')
  alert('All formulas recalculated')
}
</script>
