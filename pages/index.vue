<template>
  <div class="home">
    <div class="hero">
      <h1>🎨 Nuxt Page Builder</h1>
      <p>A powerful drag-and-drop page builder for Nuxt.js with MySQL database integration</p>
      
      <div class="actions">
        <NuxtLink to="/builder" class="btn btn-primary">
          Start Building
        </NuxtLink>
        <NuxtLink to="/pages" class="btn btn-secondary">
          View All Pages
        </NuxtLink>
      </div>

      <div class="features">
        <div class="feature">
          <div class="feature-icon">🎯</div>
          <h3>Drag & Drop</h3>
          <p>Intuitive drag-and-drop interface for building pages visually</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🧩</div>
          <h3>Rich Components</h3>
          <p>Text, images, buttons, containers, columns, and more</p>
        </div>
        <div class="feature">
          <div class="feature-icon">💾</div>
          <h3>MySQL Database</h3>
          <p>Save and load pages from MySQL database</p>
        </div>
        <div class="feature">
          <div class="feature-icon">⚡</div>
          <h3>Live Preview</h3>
          <p>See changes in real-time as you build</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.hero {
  text-align: center;
  color: white;
  max-width: 1200px;
}

.hero h1 {
  font-size: 3.5rem;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.hero > p {
  font-size: 1.5rem;
  margin: 0 0 3rem 0;
  opacity: 0.95;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 4rem;
}

.btn {
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-block;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.btn-secondary {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: rgba(255,255,255,0.3);
  transform: translateY(-2px);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature {
  background: rgba(255,255,255,0.1);
  padding: 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
}

.feature p {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero > p {
    font-size: 1.2rem;
  }
  
  .actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
