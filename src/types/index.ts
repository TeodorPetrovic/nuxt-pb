export interface CellData {
  value: string | number | null
  formula?: string
  style?: CellStyle
}

export interface CellStyle {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  fontSize?: number
  fontFamily?: string
  color?: string
  backgroundColor?: string
  textAlign?: 'left' | 'center' | 'right'
  verticalAlign?: 'top' | 'middle' | 'bottom'
  border?: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
}

export interface Sheet {
  id: string
  name: string
  data: CellData[][]
  rowCount: number
  colCount: number
}

export interface ChartConfig {
  type: 'column' | 'line' | 'pie' | 'bar' | 'area' | 'scatter'
  data: any
  options: any
}

export type RibbonTab = 'Home' | 'Insert' | 'Page Layout' | 'Formulas' | 'Data' | 'Review' | 'View' | 'Draw' | 'Help' | 'Developer'
