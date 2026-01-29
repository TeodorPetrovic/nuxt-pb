<template>
  <div 
    v-if="visible"
    class="context-menu"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    @click="handleClick"
  >
    <div class="context-menu-item" @click="$emit('cut')">
      ✂️ Cut
    </div>
    <div class="context-menu-item" @click="$emit('copy')">
      📄 Copy
    </div>
    <div class="context-menu-item" @click="$emit('paste')">
      📋 Paste
    </div>
    <div class="context-menu-divider"></div>
    <div class="context-menu-item" @click="$emit('insert-row')">
      ➕ Insert Row
    </div>
    <div class="context-menu-item" @click="$emit('insert-column')">
      ➕ Insert Column
    </div>
    <div class="context-menu-item" @click="$emit('delete-row')">
      ➖ Delete Row
    </div>
    <div class="context-menu-item" @click="$emit('delete-column')">
      ➖ Delete Column
    </div>
    <div class="context-menu-divider"></div>
    <div class="context-menu-item" @click="$emit('clear')">
      🗑️ Clear Contents
    </div>
    <div class="context-menu-item" @click="$emit('format')">
      🎨 Format Cells
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  visible: boolean
  position: { x: number; y: number }
}>()

defineEmits([
  'cut', 'copy', 'paste', 
  'insert-row', 'insert-column', 
  'delete-row', 'delete-column',
  'clear', 'format'
])

function handleClick(e: Event) {
  e.stopPropagation()
}
</script>

<style scoped>
.context-menu {
  position: fixed;
  background: white;
  border: 1px solid #c7c7c7;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 180px;
  padding: 4px 0;
}

.context-menu-item {
  padding: 8px 16px;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.1s;
}

.context-menu-item:hover {
  background: #e5e5e5;
}

.context-menu-divider {
  height: 1px;
  background: #e1e1e1;
  margin: 4px 0;
}
</style>
