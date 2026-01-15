<template>
  <div class="pages-list">
    <header class="pages-header">
      <h1>All Pages</h1>
      <button @click="createNew" class="btn btn-primary">
        Create New Page
      </button>
    </header>

    <div class="pages-container">
      <div v-if="loading" class="loading">
        Loading pages...
      </div>

      <div v-else-if="pages.length === 0" class="empty-state">
        <p>No pages created yet.</p>
        <button @click="createNew" class="btn btn-primary">
          Create Your First Page
        </button>
      </div>

      <div v-else class="pages-grid">
        <div v-for="page in pages" :key="page.id" class="page-card">
          <div class="page-info">
            <h3>{{ page.title }}</h3>
            <p class="page-slug">{{ page.slug }}</p>
            <p class="page-meta">
              <span :class="['status', page.published ? 'published' : 'draft']">
                {{ page.published ? 'Published' : 'Draft' }}
              </span>
              <span class="date">Updated: {{ formatDate(page.updatedAt) }}</span>
            </p>
          </div>
          <div class="page-actions">
            <button @click="editPage(page.id)" class="btn-edit">
              Edit
            </button>
            <button @click="deletePage(page.id)" class="btn-delete">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const pages = ref([])
const loading = ref(true)

onMounted(async () => {
  await loadPages()
})

const loadPages = async () => {
  loading.value = true
  try {
    pages.value = await $fetch('/api/pages')
  } catch (error) {
    console.error('Error loading pages:', error)
    alert('Failed to load pages. Make sure the database is configured.')
  } finally {
    loading.value = false
  }
}

const createNew = () => {
  router.push('/builder')
}

const editPage = (id) => {
  router.push(`/builder?id=${id}`)
}

const deletePage = async (id) => {
  if (!confirm('Are you sure you want to delete this page?')) {
    return
  }

  try {
    await $fetch(`/api/pages/${id}`, { method: 'DELETE' })
    await loadPages()
  } catch (error) {
    console.error('Error deleting page:', error)
    alert('Failed to delete page')
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.pages-list {
  min-height: 100vh;
  background: #f0f2f5;
}

.pages-header {
  background: white;
  padding: 2rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.pages-header h1 {
  margin: 0;
  font-size: 2rem;
  color: #333;
}

.pages-container {
  padding: 2rem;
}

.loading,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.empty-state p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.pages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.page-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.2s;
}

.page-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.page-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #333;
}

.page-slug {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  font-family: monospace;
}

.page-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 1rem;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.75rem;
}

.status.published {
  background: #e8f5e9;
  color: #2e7d32;
}

.status.draft {
  background: #fff3e0;
  color: #e65100;
}

.page-actions {
  display: flex;
  gap: 0.5rem;
}

.btn,
.btn-edit,
.btn-delete {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  flex: 1;
}

.btn-primary {
  background: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background: #45a049;
}

.btn-edit {
  background: #2196F3;
  color: white;
}

.btn-edit:hover {
  background: #0b7dda;
}

.btn-delete {
  background: #f44336;
  color: white;
}

.btn-delete:hover {
  background: #da190b;
}
</style>
