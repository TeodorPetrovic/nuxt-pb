<template>
  <div style="display: flex; gap: 10px;">
    <!-- Tables Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="insertTable" title="Insert Table">📊 Table</button>
        <button class="ribbon-button" @click="insertPivotTable" title="Insert PivotTable">🔄 PivotTable</button>
      </div>
      <div class="ribbon-group-title">Tables</div>
    </div>

    <div class="divider"></div>

    <!-- Charts Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="insertChart('column')" title="Column Chart">📊 Column</button>
        <button class="ribbon-button" @click="insertChart('line')" title="Line Chart">📈 Line</button>
        <button class="ribbon-button" @click="insertChart('pie')" title="Pie Chart">🥧 Pie</button>
        <button class="ribbon-button" @click="insertChart('bar')" title="Bar Chart">📊 Bar</button>
        <button class="ribbon-button" @click="insertChart('area')" title="Area Chart">📊 Area</button>
        <button class="ribbon-button" @click="insertChart('scatter')" title="Scatter Chart">• Scatter</button>
      </div>
      <div class="ribbon-group-title">Charts</div>
    </div>

    <div class="divider"></div>

    <!-- Sparklines Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="insertSparkline('line')" title="Line Sparkline">─ Line</button>
        <button class="ribbon-button" @click="insertSparkline('column')" title="Column Sparkline">| Column</button>
        <button class="ribbon-button" @click="insertSparkline('win-loss')" title="Win/Loss Sparkline">± Win/Loss</button>
      </div>
      <div class="ribbon-group-title">Sparklines</div>
    </div>

    <div class="divider"></div>

    <!-- Illustrations Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="insertPicture" title="Insert Picture">🖼️ Picture</button>
        <button class="ribbon-button" @click="insertShape" title="Insert Shape">▪️ Shape</button>
        <button class="ribbon-button" @click="insertIcon" title="Insert Icon">✨ Icon</button>
        <button class="ribbon-button" @click="insertSmartArt" title="Insert SmartArt">🎨 SmartArt</button>
      </div>
      <div class="ribbon-group-title">Illustrations</div>
    </div>

    <div class="divider"></div>

    <!-- Links Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="insertHyperlink" title="Insert Hyperlink">🔗 Link</button>
      </div>
      <div class="ribbon-group-title">Links</div>
    </div>

    <div class="divider"></div>

    <!-- Text Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="insertTextBox" title="Insert Text Box">📝 Text Box</button>
        <button class="ribbon-button" @click="insertHeader" title="Insert Header/Footer">📄 Header</button>
        <button class="ribbon-button" @click="insertWordArt" title="Insert WordArt">🎨 WordArt</button>
      </div>
      <div class="ribbon-group-title">Text</div>
    </div>

    <div class="divider"></div>

    <!-- Symbols Group -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-button" @click="insertSymbol" title="Insert Symbol">Ω Symbol</button>
        <button class="ribbon-button" @click="insertEquation" title="Insert Equation">∑ Equation</button>
      </div>
      <div class="ribbon-group-title">Symbols</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['show-chart-modal'])

// Tables
function insertTable() {
  console.log('Insert Table')
  alert('Table inserted!')
}

function insertPivotTable() {
  console.log('Insert PivotTable')
  alert('PivotTable functionality available')
}

// Charts
function insertChart(type: 'column' | 'line' | 'pie' | 'bar' | 'area' | 'scatter') {
  emit('show-chart-modal', type)
}

// Sparklines
function insertSparkline(type: 'line' | 'column' | 'win-loss') {
  console.log('Insert Sparkline:', type)
  alert(`${type} sparkline inserted!`)
}

// Illustrations
function insertPicture() {
  console.log('Insert Picture')
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      alert(`Picture "${file.name}" inserted!`)
    }
  }
  input.click()
}

function insertShape() {
  console.log('Insert Shape')
  alert('Shape tools available: Rectangle, Circle, Line, Arrow')
}

function insertIcon() {
  console.log('Insert Icon')
  alert('Icon library available')
}

function insertSmartArt() {
  console.log('Insert SmartArt')
  alert('SmartArt graphics available')
}

// Links
function insertHyperlink() {
  const url = prompt('Enter URL:')
  if (url) {
    console.log('Insert Hyperlink:', url)
    alert(`Hyperlink to ${url} inserted!`)
  }
}

// Text
function insertTextBox() {
  console.log('Insert Text Box')
  alert('Text box inserted!')
}

function insertHeader() {
  console.log('Insert Header/Footer')
  alert('Header/Footer editor available')
}

function insertWordArt() {
  console.log('Insert WordArt')
  alert('WordArt style applied!')
}

// Symbols
function insertSymbol() {
  console.log('Insert Symbol')
  alert('Symbol picker: ∑ ∏ √ ∞ ≈ ≠ ≤ ≥ ± × ÷')
}

function insertEquation() {
  console.log('Insert Equation')
  alert('Equation editor available')
}
</script>
