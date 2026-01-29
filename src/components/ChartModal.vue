<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal chart-modal">
      <div class="modal-title">Insert {{ chartTypeLabel }} Chart</div>
      <div class="modal-content">
        <div class="chart-config">
          <label>
            <span>Data Range:</span>
            <input 
              type="text" 
              v-model="dataRange" 
              placeholder="e.g., A1:E10"
              class="range-input"
              @input="updatePreview"
            />
          </label>
          
          <label>
            <span>Chart Title:</span>
            <input 
              type="text" 
              v-model="chartTitle" 
              placeholder="Enter chart title"
              class="range-input"
              @input="updatePreview"
            />
          </label>
        </div>
        
        <div class="chart-preview">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>
      <div class="modal-buttons">
        <button class="button-secondary" @click="close">Cancel</button>
        <button class="button-primary" @click="insertChart">Insert Chart</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useSpreadsheetStore } from '../stores/spreadsheet'

Chart.register(...registerables)

const props = defineProps<{
  chartType: 'column' | 'line' | 'pie' | 'bar' | 'area' | 'scatter'
}>()

const emit = defineEmits(['close', 'insert'])

const store = useSpreadsheetStore()
const dataRange = ref('A2:E21')
const chartTitle = ref('Sales Data')
const chartCanvas = ref<HTMLCanvasElement>()
let chartInstance: Chart | null = null

const chartTypeLabel = computed(() => {
  return props.chartType.charAt(0).toUpperCase() + props.chartType.slice(1)
})

function close() {
  if (chartInstance) {
    chartInstance.destroy()
  }
  emit('close')
}

function parseRange(range: string) {
  // Parse range like "A2:E21"
  const match = range.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/)
  if (!match) return null
  
  const [, startCol, startRow, endCol, endRow] = match
  
  const startColNum = startCol.charCodeAt(0) - 65
  const endColNum = endCol.charCodeAt(0) - 65
  const startRowNum = parseInt(startRow) - 1
  const endRowNum = parseInt(endRow) - 1
  
  return { startColNum, endColNum, startRowNum, endRowNum }
}

function getChartData() {
  const range = parseRange(dataRange.value)
  if (!range) return null
  
  const labels: string[] = []
  const datasets: any[] = []
  const sheet = store.activeSheet
  
  if (!sheet) return null
  
  // Get headers (first row)
  for (let col = range.startColNum; col <= range.endColNum; col++) {
    const cell = sheet.data[range.startRowNum]?.[col]
    if (cell?.value) {
      labels.push(String(cell.value))
    }
  }
  
  // Get data rows
  const colors = [
    'rgba(33, 115, 70, 0.8)',
    'rgba(43, 87, 154, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(75, 192, 192, 0.8)'
  ]
  
  for (let row = range.startRowNum + 1; row <= range.endRowNum; row++) {
    const rowData: number[] = []
    let rowLabel = ''
    
    for (let col = range.startColNum; col <= range.endColNum; col++) {
      const cell = sheet.data[row]?.[col]
      if (col === range.startColNum) {
        rowLabel = cell?.value ? String(cell.value) : `Row ${row}`
      } else if (cell?.value !== null && cell?.value !== undefined) {
        rowData.push(Number(cell.value))
      }
    }
    
    if (rowData.length > 0) {
      datasets.push({
        label: rowLabel,
        data: rowData,
        backgroundColor: colors[datasets.length % colors.length],
        borderColor: colors[datasets.length % colors.length].replace('0.8', '1'),
        borderWidth: 2
      })
    }
  }
  
  return { labels: labels.slice(1), datasets }
}

function updatePreview() {
  if (!chartCanvas.value) return
  
  const data = getChartData()
  if (!data) return
  
  if (chartInstance) {
    chartInstance.destroy()
  }
  
  const chartConfig: any = {
    type: props.chartType === 'column' ? 'bar' : props.chartType,
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: chartTitle.value,
          font: { size: 16, weight: 'bold' }
        },
        legend: {
          display: props.chartType !== 'pie',
          position: 'top'
        }
      },
      scales: props.chartType === 'pie' ? {} : {
        y: {
          beginAtZero: true
        }
      }
    }
  }
  
  chartInstance = new Chart(chartCanvas.value, chartConfig)
}

function insertChart() {
  emit('insert', {
    type: props.chartType,
    range: dataRange.value,
    title: chartTitle.value
  })
  close()
}

onMounted(() => {
  updatePreview()
})

watch(() => props.chartType, () => {
  updatePreview()
})
</script>

<style scoped>
.chart-modal {
  min-width: 600px;
  max-width: 800px;
}

.chart-config {
  margin-bottom: 20px;
}

.chart-config label {
  display: block;
  margin-bottom: 12px;
}

.chart-config span {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
  color: #333;
}

.range-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  font-size: 13px;
}

.range-input:focus {
  outline: none;
  border-color: #217346;
  box-shadow: 0 0 0 1px #217346;
}

.chart-preview {
  background: white;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  min-height: 300px;
}
</style>
