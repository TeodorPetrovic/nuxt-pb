<template>
  <div class="component-wrapper">
    <!-- Heading Component -->
    <component
      v-if="component.type === 'heading'"
      :is="`h${component.properties.level || 1}`"
      :style="{ textAlign: component.properties.align }"
    >
      {{ component.properties.text }}
    </component>

    <!-- Text Component -->
    <p
      v-else-if="component.type === 'text'"
      :style="{ textAlign: component.properties.align }"
    >
      {{ component.properties.text }}
    </p>

    <!-- Button Component -->
    <a
      v-else-if="component.type === 'button'"
      :href="component.properties.link"
      :class="['btn-component', `btn-${component.properties.style}`]"
    >
      {{ component.properties.text }}
    </a>

    <!-- Image Component -->
    <img
      v-else-if="component.type === 'image'"
      :src="component.properties.src"
      :alt="component.properties.alt"
      :style="{ width: component.properties.width }"
      class="img-component"
    />

    <!-- Container Component -->
    <div
      v-else-if="component.type === 'container'"
      class="container-component"
      :style="{
        backgroundColor: component.properties.backgroundColor,
        padding: component.properties.padding,
        margin: component.properties.margin
      }"
    >
      <p style="color: #999; text-align: center;">Container - Drop content here in future versions</p>
    </div>

    <!-- Columns Component -->
    <div
      v-else-if="component.type === 'columns'"
      class="columns-component"
      :style="{
        display: 'grid',
        gridTemplateColumns: `repeat(${component.properties.columnCount}, 1fr)`,
        gap: component.properties.gap
      }"
    >
      <div v-for="n in component.properties.columnCount" :key="n" class="column">
        <p style="color: #999; text-align: center;">Column {{ n }}</p>
      </div>
    </div>

    <!-- Divider Component -->
    <hr
      v-else-if="component.type === 'divider'"
      :style="{
        height: component.properties.height,
        backgroundColor: component.properties.color,
        border: 'none',
        margin: '10px 0'
      }"
    />

    <!-- Spacer Component -->
    <div
      v-else-if="component.type === 'spacer'"
      :style="{ height: component.properties.height }"
    ></div>

    <!-- Unknown Component -->
    <div v-else class="unknown-component">
      Unknown component type: {{ component.type }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  component: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.component-wrapper {
  width: 100%;
}

.btn-component {
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
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

.btn-outline {
  background: transparent;
  color: #4CAF50;
  border: 2px solid #4CAF50;
}

.btn-outline:hover {
  background: #4CAF50;
  color: white;
}

.img-component {
  max-width: 100%;
  height: auto;
  display: block;
}

.container-component {
  border-radius: 4px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.columns-component .column {
  background: #f8f9fa;
  border: 1px dashed #ddd;
  border-radius: 4px;
  padding: 20px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.unknown-component {
  padding: 20px;
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 4px;
  color: #856404;
}
</style>
