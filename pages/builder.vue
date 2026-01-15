<template>
  <div class="page-builder">
    <header class="builder-header">
      <div class="header-left">
        <h1>Nuxt Page Builder</h1>
        <input
          v-model="currentPage.title"
          type="text"
          placeholder="Page Title"
          class="page-title-input"
        />
      </div>
      <div class="header-right">
        <button @click="savePage" class="btn btn-primary">
          <span v-if="!saving">Save Page</span>
          <span v-else>Saving...</span>
        </button>
        <button @click="viewPages" class="btn btn-secondary">
          View All Pages
        </button>
      </div>
    </header>

    <div class="builder-container">
      <!-- Component Palette -->
      <aside class="component-palette">
        <h3>Components</h3>
        <div v-for="category in componentCategories" :key="category" class="component-category">
          <h4>{{ category }}</h4>
          <div
            v-for="comp in getComponentsByCategory(category)"
            :key="comp.type"
            class="component-item"
            draggable="true"
            @dragstart="onDragStart($event, comp)"
          >
            <span class="component-icon">{{ comp.icon }}</span>
            <span class="component-name">{{ comp.name }}</span>
          </div>
        </div>
      </aside>

      <!-- Canvas Area -->
      <main class="canvas-area">
        <div
          class="canvas"
          @drop="onDrop($event)"
          @dragover.prevent
          @dragenter.prevent
        >
          <div v-if="currentPage.content.length === 0" class="empty-canvas">
            <p>Drag and drop components here to start building your page</p>
          </div>
          
          <div
            v-for="(component, index) in currentPage.content"
            :key="component.id"
            class="canvas-component"
            :class="{ 'selected': selectedComponent?.id === component.id }"
            @click="selectComponent(component)"
          >
            <div class="component-toolbar">
              <button @click.stop="moveUp(index)" :disabled="index === 0">↑</button>
              <button @click.stop="moveDown(index)" :disabled="index === currentPage.content.length - 1">↓</button>
              <button @click.stop="deleteComponent(index)" class="delete-btn">×</button>
            </div>
            <ComponentRenderer :component="component" />
          </div>
        </div>
      </main>

      <!-- Properties Panel -->
      <aside class="properties-panel">
        <h3>Properties</h3>
        <div v-if="selectedComponent" class="properties-form">
          <div class="property-group">
            <label>Component Type</label>
            <input type="text" :value="selectedComponent.type" disabled />
          </div>
          
          <div v-for="(value, key) in selectedComponent.properties" :key="key" class="property-group">
            <label>{{ formatLabel(key) }}</label>
            <input
              v-if="typeof value === 'string'"
              v-model="selectedComponent.properties[key]"
              type="text"
            />
            <textarea
              v-else-if="key === 'text' || key === 'content'"
              v-model="selectedComponent.properties[key]"
              rows="4"
            ></textarea>
            <input
              v-else-if="typeof value === 'number'"
              v-model.number="selectedComponent.properties[key]"
              type="number"
            />
            <input
              v-else-if="typeof value === 'boolean'"
              v-model="selectedComponent.properties[key]"
              type="checkbox"
            />
          </div>
        </div>
        <div v-else class="no-selection">
          <p>Select a component to edit its properties</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ComponentRenderer from '~/components/builder/ComponentRenderer.vue'

const router = useRouter()

// Available components for the builder
const availableComponents = ref([
  {
    name: 'Heading',
    type: 'heading',
    category: 'content',
    icon: '📝',
    defaultProps: {
      text: 'Heading',
      level: 1,
      align: 'left'
    }
  },
  {
    name: 'Text',
    type: 'text',
    category: 'content',
    icon: '📄',
    defaultProps: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      align: 'left'
    }
  },
  {
    name: 'Button',
    type: 'button',
    category: 'content',
    icon: '🔘',
    defaultProps: {
      text: 'Click me',
      link: '#',
      style: 'primary'
    }
  },
  {
    name: 'Image',
    type: 'image',
    category: 'media',
    icon: '🖼️',
    defaultProps: {
      src: 'https://via.placeholder.com/600x400',
      alt: 'Image',
      width: '100%'
    }
  },
  {
    name: 'Container',
    type: 'container',
    category: 'layout',
    icon: '📦',
    defaultProps: {
      backgroundColor: '#f5f5f5',
      padding: '20px',
      margin: '10px 0'
    }
  },
  {
    name: 'Columns',
    type: 'columns',
    category: 'layout',
    icon: '⚏',
    defaultProps: {
      columnCount: 2,
      gap: '20px'
    }
  },
  {
    name: 'Divider',
    type: 'divider',
    category: 'layout',
    icon: '➖',
    defaultProps: {
      height: '1px',
      color: '#ddd'
    }
  },
  {
    name: 'Spacer',
    type: 'spacer',
    category: 'layout',
    icon: '⬜',
    defaultProps: {
      height: '40px'
    }
  }
])

const componentCategories = computed(() => {
  const categories = new Set(availableComponents.value.map(c => c.category))
  return Array.from(categories)
})

const getComponentsByCategory = (category) => {
  return availableComponents.value.filter(c => c.category === category)
}

// Current page state
const currentPage = ref({
  id: null,
  title: 'New Page',
  slug: 'new-page',
  content: [],
  published: false
})

const selectedComponent = ref(null)
const saving = ref(false)

// Drag and drop handlers
const onDragStart = (event, component) => {
  event.dataTransfer.effectAllowed = 'copy'
  event.dataTransfer.setData('component', JSON.stringify(component))
}

const onDrop = (event) => {
  event.preventDefault()
  const componentData = JSON.parse(event.dataTransfer.getData('component'))
  
  const newComponent = {
    id: Date.now().toString(),
    type: componentData.type,
    properties: { ...componentData.defaultProps }
  }
  
  currentPage.value.content.push(newComponent)
}

// Component management
const selectComponent = (component) => {
  selectedComponent.value = component
}

const deleteComponent = (index) => {
  if (selectedComponent.value?.id === currentPage.value.content[index].id) {
    selectedComponent.value = null
  }
  currentPage.value.content.splice(index, 1)
}

const moveUp = (index) => {
  if (index > 0) {
    const temp = currentPage.value.content[index]
    currentPage.value.content[index] = currentPage.value.content[index - 1]
    currentPage.value.content[index - 1] = temp
  }
}

const moveDown = (index) => {
  if (index < currentPage.value.content.length - 1) {
    const temp = currentPage.value.content[index]
    currentPage.value.content[index] = currentPage.value.content[index + 1]
    currentPage.value.content[index + 1] = temp
  }
}

// Save page
const savePage = async () => {
  saving.value = true
  try {
    const slug = currentPage.value.title.toLowerCase().replace(/\s+/g, '-')
    const pageData = {
      title: currentPage.value.title,
      slug: slug,
      content: currentPage.value.content,
      published: currentPage.value.published
    }

    let response
    if (currentPage.value.id) {
      response = await $fetch(`/api/pages/${currentPage.value.id}`, {
        method: 'PUT',
        body: pageData
      })
    } else {
      response = await $fetch('/api/pages', {
        method: 'POST',
        body: pageData
      })
      currentPage.value.id = response.id
    }

    alert('Page saved successfully!')
  } catch (error) {
    console.error('Error saving page:', error)
    alert('Failed to save page. Make sure the database is configured.')
  } finally {
    saving.value = false
  }
}

const viewPages = () => {
  router.push('/pages')
}

const formatLabel = (key) => {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
}
</script>

<style scoped>
.page-builder {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

.builder-header {
  background: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-left h1 {
  font-size: 1.5rem;
  margin: 0;
  color: #333;
}

.page-title-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 300px;
}

.header-right {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btn-primary {
  background: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background: #45a049;
}

.btn-secondary {
  background: #2196F3;
  color: white;
}

.btn-secondary:hover {
  background: #0b7dda;
}

.builder-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.component-palette {
  width: 250px;
  background: white;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  padding: 1rem;
}

.component-palette h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #333;
}

.component-category {
  margin-bottom: 1.5rem;
}

.component-category h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  font-weight: 600;
}

.component-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: move;
  transition: all 0.2s;
}

.component-item:hover {
  background: #e9ecef;
  border-color: #4CAF50;
  transform: translateX(5px);
}

.component-icon {
  font-size: 1.2rem;
}

.component-name {
  font-size: 0.9rem;
  color: #333;
}

.canvas-area {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

.canvas {
  min-height: 100%;
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.empty-canvas {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  color: #999;
}

.canvas-component {
  position: relative;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.2s;
}

.canvas-component:hover {
  border-color: #4CAF50;
  background: #f8f9fa;
}

.canvas-component.selected {
  border-color: #2196F3;
  background: #e3f2fd;
}

.component-toolbar {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 0.25rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.canvas-component:hover .component-toolbar,
.canvas-component.selected .component-toolbar {
  opacity: 1;
}

.component-toolbar button {
  padding: 0.25rem 0.5rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.8rem;
}

.component-toolbar button:hover {
  background: #f0f0f0;
}

.component-toolbar .delete-btn {
  color: #f44336;
  font-weight: bold;
}

.properties-panel {
  width: 300px;
  background: white;
  border-left: 1px solid #e0e0e0;
  overflow-y: auto;
  padding: 1rem;
}

.properties-panel h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #333;
}

.properties-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.property-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.property-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #666;
}

.property-group input[type="text"],
.property-group input[type="number"],
.property-group textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.property-group input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.no-selection {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #999;
  text-align: center;
}
</style>
