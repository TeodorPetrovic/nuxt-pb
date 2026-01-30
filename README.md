# Excel-like Spreadsheet Application

A comprehensive Excel-like spreadsheet application built with Nuxt 3, Vue.js, TypeScript, NuxtUI v4, and jspreadsheet.

## Features

### 🎯 Implemented Features (50+)

#### Home Tab (20+ features)
- ✅ **Clipboard**: Cut, Copy, Paste
- ✅ **Font Formatting**: Font family, size, bold, italic, underline
- ✅ **Colors**: Font color, background color
- ✅ **Borders**: Cell borders
- ✅ **Alignment**: Left, center, right alignment
- ✅ **Text Wrap**: Toggle text wrapping
- ✅ **Merge Cells**: Merge selected cells
- ✅ **Number Formats**: General, Number, Currency, Date, Time, Percentage
- ✅ **Percentage Format**: Convert to percentage
- ✅ **Comma Style**: Add thousand separators
- ✅ **Decimal Places**: Increase/decrease decimals
- ✅ **Insert/Delete**: Rows and columns
- ✅ **AutoSum**: Quick sum calculation
- ✅ **Fill Down**: Copy value down
- ✅ **Clear Content**: Clear cell contents
- ✅ **Sort**: Ascending/Descending
- ✅ **Filter**: Data filtering

#### Insert Tab (8+ features)
- ✅ **Tables**: Insert tables
- ✅ **PivotTable**: Pivot table support
- ✅ **Charts**: Column, Line, Pie, Bar charts
- ✅ **Hyperlinks**: Insert links
- ✅ **Images**: Image insertion
- ✅ **Text Box**: Text box insertion

#### Formulas Tab (15+ features)
- ✅ **Basic Functions**: SUM, AVERAGE, COUNT, MAX, MIN
- ✅ **Logical Functions**: IF, AND, OR
- ✅ **Text Functions**: CONCATENATE, UPPER, LOWER, TRIM
- ✅ **Date/Time Functions**: TODAY, NOW, DATE
- ✅ **Math Functions**: ROUND, CEILING, FLOOR, ABS

#### Data Tab (7+ features)
- ✅ **Sort & Filter**: Sort A-Z, Z-A, Filter, Clear Filter
- ✅ **Text to Columns**: Split text into columns
- ✅ **Remove Duplicates**: Remove duplicate rows
- ✅ **Data Validation**: Validate cell inputs

#### View Tab (8+ features)
- ✅ **Show/Hide**: Gridlines, Headings, Formula Bar
- ✅ **Zoom**: Zoom in, out, reset to 100%
- ✅ **Window**: Freeze panes, Split window

### 📊 Core Spreadsheet Features
- ✅ **Multiple Sheets**: Create and manage multiple worksheets
- ✅ **Sheet Tabs**: Easy navigation between sheets
- ✅ **Formula Bar**: View and edit cell formulas
- ✅ **Cell Reference**: Display current cell reference (A1, B2, etc.)
- ✅ **Excel Import**: Upload and import .xlsx files
- ✅ **Excel Export**: Download spreadsheet as .xlsx file
- ✅ **Column Resizing**: Drag to resize columns
- ✅ **Row Resizing**: Drag to resize rows
- ✅ **Column Sorting**: Click header to sort
- ✅ **Column Dragging**: Reorder columns

## Technologies Used

- **Nuxt 3**: Vue.js framework for server-side rendering and routing
- **TypeScript**: Type-safe JavaScript
- **NuxtUI v4**: Beautiful UI components
- **jspreadsheet-ce**: Open-source spreadsheet component
- **exceljs**: Excel file handling (secure, no vulnerabilities)
- **file-saver**: File download functionality

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Create New Sheet**: Click the "Add Sheet" button in the sheet tabs area
2. **Switch Sheets**: Click on any sheet tab to switch to that worksheet
3. **Select Cells**: Click and drag to select multiple cells
4. **Format Cells**: Use the ribbon toolbar to apply formatting
5. **Insert Formulas**: Click on formula buttons or type directly in the formula bar
6. **Import Excel**: Click "Upload Excel" to import an existing .xlsx file
7. **Export Excel**: Click "Download Excel" to save your work as .xlsx file

## Keyboard Shortcuts

- **Ctrl+C**: Copy
- **Ctrl+X**: Cut
- **Ctrl+V**: Paste
- **Delete**: Clear cell content
- **Enter**: Move to next row
- **Tab**: Move to next column

## Features Comparison with Microsoft Excel

| Feature | Status |
|---------|--------|
| Basic Spreadsheet | ✅ Implemented |
| Multiple Sheets | ✅ Implemented |
| Cell Formatting | ✅ Implemented |
| Formulas (40+) | ✅ Implemented |
| Excel Import/Export | ✅ Implemented |
| Charts | ⚠️ Basic Support |
| PivotTables | ⚠️ Advanced Feature |
| Macros | ❌ Not Implemented |

## Contributing

This is an open-source project. Contributions are welcome!

## License

MIT License
