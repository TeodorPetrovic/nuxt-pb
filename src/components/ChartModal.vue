<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal">
      <div class="modal-title">Insert {{ chartType }} Chart</div>
      <div class="modal-content">
        <p>Select data range for chart:</p>
        <input 
          type="text" 
          v-model="dataRange" 
          placeholder="e.g., A1:B10"
          style="width: 100%; margin-top: 8px;"
        />
        
        <div style="margin-top: 16px;">
          <canvas ref="chartCanvas" width="400" height="200"></canvas>
        </div>
      </div>
      <div class="modal-buttons">
        <button class="button-secondary" @click="close">Cancel</button>
        <button class="button-primary" @click="insertChart">Insert</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  chartType: 'column' | 'line' | 'pie' | 'bar' | 'area' | 'scatter'
}>()

const emit = defineEmits(['close'])

const dataRange = ref('A1:B10')
const chartCanvas = ref<HTMLCanvasElement>()

function close() {
  emit('close')
}

function insertChart() {
  alert(`${props.chartType} chart inserted for range ${dataRange.value}`)
  close()
}

onMounted(() => {
  // Sample chart preview
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#f0f0f0'
      ctx.fillRect(0, 0, 400, 200)
      ctx.fillStyle = '#0078d4'
      ctx.fillText('Chart Preview', 160, 100)
    }
  }
})
</script>
