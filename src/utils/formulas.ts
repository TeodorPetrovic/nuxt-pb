// Basic formula evaluation
export function evaluateFormula(formula: string, getCellValue: (ref: string) => any): any {
  try {
    // Remove leading '='
    let expr = formula.startsWith('=') ? formula.slice(1) : formula
    
    // Replace cell references with values
    expr = expr.replace(/([A-Z]+)(\d+)/g, (match, col, row) => {
      const value = getCellValue(match)
      return value !== null && value !== undefined ? String(value) : '0'
    })

    // Handle common functions
    expr = handleFormulasFunction(expr)

    // Evaluate the expression
    return eval(expr)
  } catch (error) {
    return '#ERROR!'
  }
}

function handleFormulasFunction(expr: string): string {
  // SUM function
  expr = expr.replace(/SUM\(([^)]+)\)/gi, (match, range) => {
    return `(${range.split(',').map((r: string) => r.trim()).join('+')})`
  })

  // AVERAGE function
  expr = expr.replace(/AVERAGE\(([^)]+)\)/gi, (match, range) => {
    const items = range.split(',').map((r: string) => r.trim())
    return `((${items.join('+')})/${items.length})`
  })

  // MAX function
  expr = expr.replace(/MAX\(([^)]+)\)/gi, (match, range) => {
    const items = range.split(',').map((r: string) => r.trim())
    return `Math.max(${items.join(',')})`
  })

  // MIN function
  expr = expr.replace(/MIN\(([^)]+)\)/gi, (match, range) => {
    const items = range.split(',').map((r: string) => r.trim())
    return `Math.min(${items.join(',')})`
  })

  // COUNT function
  expr = expr.replace(/COUNT\(([^)]+)\)/gi, (match, range) => {
    const items = range.split(',').map((r: string) => r.trim())
    return `${items.length}`
  })

  // IF function
  expr = expr.replace(/IF\(([^,]+),([^,]+),([^)]+)\)/gi, (match, condition, trueVal, falseVal) => {
    return `(${condition.trim()} ? ${trueVal.trim()} : ${falseVal.trim()})`
  })

  return expr
}

export function columnToLetter(column: number): string {
  let temp: number
  let letter = ''
  while (column >= 0) {
    temp = column % 26
    letter = String.fromCharCode(temp + 65) + letter
    column = Math.floor(column / 26) - 1
  }
  return letter
}

export function letterToColumn(letter: string): number {
  let column = 0
  const length = letter.length
  for (let i = 0; i < length; i++) {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1)
  }
  return column - 1
}

export function getCellReference(row: number, col: number): string {
  return `${columnToLetter(col)}${row + 1}`
}

// Math functions
export const mathFunctions = {
  SUM: (...args: number[]) => args.reduce((a, b) => a + b, 0),
  AVERAGE: (...args: number[]) => args.reduce((a, b) => a + b, 0) / args.length,
  MAX: (...args: number[]) => Math.max(...args),
  MIN: (...args: number[]) => Math.min(...args),
  COUNT: (...args: any[]) => args.filter(x => x !== null && x !== undefined).length,
  ROUND: (num: number, decimals: number = 0) => Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals),
  FLOOR: (num: number) => Math.floor(num),
  CEIL: (num: number) => Math.ceil(num),
  ABS: (num: number) => Math.abs(num),
  SQRT: (num: number) => Math.sqrt(num),
  POWER: (base: number, exponent: number) => Math.pow(base, exponent),
  MOD: (dividend: number, divisor: number) => dividend % divisor
}

// Logical functions
export const logicalFunctions = {
  IF: (condition: boolean, trueVal: any, falseVal: any) => condition ? trueVal : falseVal,
  AND: (...args: boolean[]) => args.every(x => x),
  OR: (...args: boolean[]) => args.some(x => x),
  NOT: (value: boolean) => !value
}

// Text functions
export const textFunctions = {
  CONCATENATE: (...args: any[]) => args.join(''),
  LEFT: (text: string, num: number) => text.slice(0, num),
  RIGHT: (text: string, num: number) => text.slice(-num),
  MID: (text: string, start: number, length: number) => text.slice(start - 1, start - 1 + length),
  UPPER: (text: string) => text.toUpperCase(),
  LOWER: (text: string) => text.toLowerCase(),
  TRIM: (text: string) => text.trim(),
  LEN: (text: string) => text.length
}

// Date functions
export const dateFunctions = {
  NOW: () => new Date(),
  TODAY: () => new Date().toDateString(),
  YEAR: (date: Date) => date.getFullYear(),
  MONTH: (date: Date) => date.getMonth() + 1,
  DAY: (date: Date) => date.getDate(),
  HOUR: (date: Date) => date.getHours(),
  MINUTE: (date: Date) => date.getMinutes(),
  SECOND: (date: Date) => date.getSeconds()
}

// Financial functions
export const financialFunctions = {
  PMT: (rate: number, nper: number, pv: number) => {
    if (rate === 0) return -pv / nper
    return (rate * pv) / (1 - Math.pow(1 + rate, -nper))
  },
  FV: (rate: number, nper: number, pmt: number, pv: number = 0) => {
    return -pv * Math.pow(1 + rate, nper) - pmt * ((Math.pow(1 + rate, nper) - 1) / rate)
  },
  PV: (rate: number, nper: number, pmt: number) => {
    return pmt * ((1 - Math.pow(1 + rate, -nper)) / rate)
  }
}
