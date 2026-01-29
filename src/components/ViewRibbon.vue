<template>
  <div style="display: flex; gap: 10px;">
    <!-- Workbook Views Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button 
          :class="['ribbon-button', { active: viewMode === 'normal' }]"
          @click="setViewMode('normal')" 
          title="Normal View"
        >
          📄 Normal
        </button>
        <button 
          :class="['ribbon-button', { active: viewMode === 'page-layout' }]"
          @click="setViewMode('page-layout')" 
          title="Page Layout"
        >
          📋 Page Layout
        </button>
        <button 
          :class="['ribbon-button', { active: viewMode === 'page-break' }]"
          @click="setViewMode('page-break')" 
          title="Page Break Preview"
        >
          📄 Page Break
        </button>
      </div>
      <div class="ribbon-group-title">Workbook Views</div>
    </div>

    <div class="divider"></div>

    <!-- Show Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <label style="display: flex; align-items: center; gap: 4px;">
          <input type="checkbox" v-model="showRuler" @change="toggleRuler" />
          <span>Ruler</span>
        </label>
        <label style="display: flex; align-items: center; gap: 4px;">
          <input type="checkbox" v-model="showGridlines" @change="toggleGridlines" />
          <span>Gridlines</span>
        </label>
        <label style="display: flex; align-items: center; gap: 4px;">
          <input type="checkbox" v-model="showFormulaBar" @change="toggleFormulaBar" />
          <span>Formula Bar</span>
        </label>
        <label style="display: flex; align-items: center; gap: 4px;">
          <input type="checkbox" v-model="showHeadings" @change="toggleHeadings" />
          <span>Headings</span>
        </label>
      </div>
      <div class="ribbon-group-title">Show</div>
    </div>

    <div class="divider"></div>

    <!-- Zoom Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="zoomIn" title="Zoom In">+ Zoom In</button>
        <button class="ribbon-button" @click="zoomOut" title="Zoom Out">- Zoom Out</button>
        <button class="ribbon-button" @click="zoom100" title="100%">100%</button>
        <button class="ribbon-button" @click="zoomToSelection" title="Zoom to Selection">🔍 Selection</button>
      </div>
      <div class="ribbon-group-title">Zoom</div>
    </div>

    <div class="divider"></div>

    <!-- Window Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="freezePanes" title="Freeze Panes">❄️ Freeze</button>
        <button class="ribbon-button" @click="splitWindow" title="Split">✂️ Split</button>
        <button class="ribbon-button" @click="hideWindow" title="Hide">👁️‍🗨️ Hide</button>
        <button class="ribbon-button" @click="arrangeAll" title="Arrange All">🗂️ Arrange</button>
        <button class="ribbon-button" @click="newWindow" title="New Window">🪟 New Window</button>
      </div>
      <div class="ribbon-group-title">Window</div>
    </div>

    <div class="divider"></div>

    <!-- Macros Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="viewMacros" title="View Macros">⚙️ Macros</button>
      </div>
      <div class="ribbon-group-title">Macros</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const viewMode = ref('normal')
const showRuler = ref(false)
const showGridlines = ref(true)
const showFormulaBar = ref(true)
const showHeadings = ref(true)
const zoomLevel = ref(100)

// Workbook Views
function setViewMode(mode: string) {
  viewMode.value = mode
  console.log('View mode:', mode)
  alert(`Switched to ${mode} view`)
}

// Show
function toggleRuler() {
  console.log('Ruler:', showRuler.value)
}

function toggleGridlines() {
  console.log('Gridlines:', showGridlines.value)
  const container = document.querySelector('.handsontable')
  if (container) {
    container.classList.toggle('hide-gridlines', !showGridlines.value)
  }
}

function toggleFormulaBar() {
  console.log('Formula Bar:', showFormulaBar.value)
  const formulaBar = document.querySelector('.formula-bar-container')
  if (formulaBar) {
    (formulaBar as HTMLElement).style.display = showFormulaBar.value ? 'flex' : 'none'
  }
}

function toggleHeadings() {
  console.log('Headings:', showHeadings.value)
}

// Zoom
function zoomIn() {
  zoomLevel.value = Math.min(400, zoomLevel.value + 10)
  applyZoom()
}

function zoomOut() {
  zoomLevel.value = Math.max(10, zoomLevel.value - 10)
  applyZoom()
}

function zoom100() {
  zoomLevel.value = 100
  applyZoom()
}

function zoomToSelection() {
  console.log('Zoom to Selection')
  alert('Zoomed to fit selection')
}

function applyZoom() {
  const container = document.querySelector('.spreadsheet-container')
  if (container) {
    (container as HTMLElement).style.transform = `scale(${zoomLevel.value / 100})`
    (container as HTMLElement).style.transformOrigin = 'top left'
  }
  console.log('Zoom:', zoomLevel.value + '%')
}

// Window
function freezePanes() {
  console.log('Freeze Panes')
  alert('Panes frozen at current selection')
}

function splitWindow() {
  console.log('Split Window')
  alert('Window split into panes')
}

function hideWindow() {
  console.log('Hide Window')
  alert('Window hidden')
}

function arrangeAll() {
  console.log('Arrange All')
  alert('Windows arranged')
}

function newWindow() {
  console.log('New Window')
  alert('New window opened')
}

// Macros
function viewMacros() {
  console.log('View Macros')
  alert('Macro list:\n- No macros recorded yet\n\nUse Developer tab to record macros')
}
</script>
