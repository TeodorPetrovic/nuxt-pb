import type { Sheet } from '../types'

export function generateSampleData(): Sheet[] {
  return [
    {
      id: '1',
      name: 'Sales Data',
      rowCount: 100,
      colCount: 26,
      data: createSalesData()
    },
    {
      id: '2',
      name: 'Budget',
      rowCount: 100,
      colCount: 26,
      data: createBudgetData()
    },
    {
      id: '3',
      name: 'Analysis',
      rowCount: 100,
      colCount: 26,
      data: createAnalysisData()
    }
  ]
}

function createSalesData() {
  const data: any[][] = Array(100).fill(null).map(() => 
    Array(26).fill(null).map(() => ({ value: null }))
  )

  // Headers
  data[0][0] = { value: 'Date', style: { bold: true, backgroundColor: '#4472C4', color: '#ffffff' } }
  data[0][1] = { value: 'Product', style: { bold: true, backgroundColor: '#4472C4', color: '#ffffff' } }
  data[0][2] = { value: 'Quantity', style: { bold: true, backgroundColor: '#4472C4', color: '#ffffff' } }
  data[0][3] = { value: 'Price', style: { bold: true, backgroundColor: '#4472C4', color: '#ffffff' } }
  data[0][4] = { value: 'Total', style: { bold: true, backgroundColor: '#4472C4', color: '#ffffff' } }
  data[0][5] = { value: 'Region', style: { bold: true, backgroundColor: '#4472C4', color: '#ffffff' } }

  // Sample data
  const products = ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Headset', 'Webcam']
  const regions = ['North', 'South', 'East', 'West']
  
  for (let i = 1; i <= 20; i++) {
    const qty = Math.floor(Math.random() * 100) + 1
    const price = Math.floor(Math.random() * 1000) + 100
    
    data[i][0] = { value: `2024-01-${String(i).padStart(2, '0')}` }
    data[i][1] = { value: products[Math.floor(Math.random() * products.length)] }
    data[i][2] = { value: qty }
    data[i][3] = { value: price }
    data[i][4] = { formula: `=C${i+1}*D${i+1}`, value: qty * price }
    data[i][5] = { value: regions[Math.floor(Math.random() * regions.length)] }
  }

  // Summary
  data[22][0] = { value: 'Total Sales:', style: { bold: true } }
  data[22][4] = { formula: '=SUM(E2:E21)', value: null, style: { bold: true } }

  data[23][0] = { value: 'Average:', style: { bold: true } }
  data[23][4] = { formula: '=AVERAGE(E2:E21)', value: null, style: { bold: true } }

  return data
}

function createBudgetData() {
  const data: any[][] = Array(100).fill(null).map(() => 
    Array(26).fill(null).map(() => ({ value: null }))
  )

  // Headers
  data[0][0] = { value: '2024 Budget', style: { bold: true, fontSize: 16 } }
  
  data[2][0] = { value: 'Category', style: { bold: true, backgroundColor: '#70AD47', color: '#ffffff' } }
  data[2][1] = { value: 'Q1', style: { bold: true, backgroundColor: '#70AD47', color: '#ffffff' } }
  data[2][2] = { value: 'Q2', style: { bold: true, backgroundColor: '#70AD47', color: '#ffffff' } }
  data[2][3] = { value: 'Q3', style: { bold: true, backgroundColor: '#70AD47', color: '#ffffff' } }
  data[2][4] = { value: 'Q4', style: { bold: true, backgroundColor: '#70AD47', color: '#ffffff' } }
  data[2][5] = { value: 'Total', style: { bold: true, backgroundColor: '#70AD47', color: '#ffffff' } }

  // Categories
  const categories = [
    { name: 'Marketing', values: [50000, 55000, 60000, 65000] },
    { name: 'Development', values: [100000, 110000, 105000, 115000] },
    { name: 'Sales', values: [80000, 85000, 90000, 95000] },
    { name: 'Operations', values: [40000, 42000, 44000, 46000] },
    { name: 'HR', values: [30000, 32000, 31000, 33000] }
  ]

  categories.forEach((cat, idx) => {
    const row = idx + 3
    data[row][0] = { value: cat.name }
    cat.values.forEach((val, qIdx) => {
      data[row][qIdx + 1] = { value: val }
    })
    data[row][5] = { formula: `=SUM(B${row+1}:E${row+1})`, value: null }
  })

  // Totals
  data[9][0] = { value: 'Total', style: { bold: true } }
  for (let i = 1; i <= 5; i++) {
    data[9][i] = { formula: `=SUM(${String.fromCharCode(65 + i)}4:${String.fromCharCode(65 + i)}8)`, value: null, style: { bold: true } }
  }

  return data
}

function createAnalysisData() {
  const data: any[][] = Array(100).fill(null).map(() => 
    Array(26).fill(null).map(() => ({ value: null }))
  )

  // Title
  data[0][0] = { value: 'Data Analysis Dashboard', style: { bold: true, fontSize: 18 } }

  // KPIs
  data[2][0] = { value: 'Key Metrics', style: { bold: true, fontSize: 14, backgroundColor: '#FFC000' } }
  
  data[4][0] = { value: 'Total Revenue', style: { bold: true } }
  data[4][1] = { value: 1250000 }
  
  data[5][0] = { value: 'Growth Rate', style: { bold: true } }
  data[5][1] = { value: '15.5%' }
  
  data[6][0] = { value: 'Customer Count', style: { bold: true } }
  data[6][1] = { value: 3450 }
  
  data[7][0] = { value: 'Avg Order Value', style: { bold: true } }
  data[7][1] = { formula: '=B5/B7', value: null }

  // Formulas Examples
  data[10][0] = { value: 'Formula Examples', style: { bold: true, fontSize: 14, backgroundColor: '#5B9BD5', color: '#ffffff' } }
  
  data[12][0] = { value: 'IF Function:' }
  data[12][1] = { formula: '=IF(B5>1000000,"High","Low")', value: null }
  
  data[13][0] = { value: 'ROUND Function:' }
  data[13][1] = { formula: '=ROUND(B8,2)', value: null }
  
  data[14][0] = { value: 'CONCATENATE:' }
  data[14][1] = { formula: '=CONCATENATE("Total: $",B5)', value: null }

  return data
}
