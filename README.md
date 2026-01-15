# Nuxt Page Builder

A fully functional drag-and-drop page builder built with Nuxt 3 and MySQL database integration. Inspired by Vvveb, this project provides an intuitive visual editor for creating and managing web pages.

## 🎨 Features

- **Drag & Drop Interface**: Intuitive visual page builder with drag-and-drop functionality
- **Rich Component Library**: 
  - Content: Headings, Text, Buttons
  - Media: Images
  - Layout: Containers, Columns, Dividers, Spacers
- **MySQL Database Integration**: Save and load pages from MySQL database
- **Live Preview**: See changes in real-time as you build
- **Properties Panel**: Edit component properties on the fly
- **Page Management**: Create, edit, delete, and publish pages
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TeodorPetrovic/nuxt-pb.git
cd nuxt-pb
```

2. Install dependencies:
```bash
npm install
```

3. Configure your database:

Edit the `.env` file with your MySQL database credentials:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
```

Example:
```env
DATABASE_URL="mysql://root:password@localhost:3306/nuxt_pagebuilder"
```

4. Generate Prisma client and migrate database:
```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to:
```
http://localhost:3000
```

## 📖 Usage

### Creating a New Page

1. Click "Start Building" from the home page or navigate to `/builder`
2. Drag components from the left sidebar onto the canvas
3. Click on components to select them and edit their properties in the right panel
4. Enter a page title in the header
5. Click "Save Page" to save your page to the database

### Managing Pages

1. Navigate to "View All Pages" or go to `/pages`
2. See all your created pages
3. Edit or delete existing pages
4. Create new pages

### Available Components

#### Content Components
- **Heading**: Customizable headings (H1-H6) with alignment options
- **Text**: Paragraph text with alignment options
- **Button**: Call-to-action buttons with customizable text, links, and styles

#### Media Components
- **Image**: Images with customizable source, alt text, and width

#### Layout Components
- **Container**: Flexible containers with background color, padding, and margin options
- **Columns**: Multi-column layouts with customizable column count and gap
- **Divider**: Horizontal dividers with customizable height and color
- **Spacer**: Vertical spacing with customizable height

## 🗄️ Database Schema

The application uses two main tables:

### Pages Table
- `id`: Unique identifier (UUID)
- `title`: Page title
- `slug`: URL-friendly page identifier
- `content`: JSON structure containing page components
- `published`: Publication status (boolean)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Components Table
- `id`: Unique identifier (UUID)
- `name`: Component name
- `type`: Component type (text, image, button, etc.)
- `category`: Component category (content, media, layout)
- `icon`: Component icon
- `template`: HTML template
- `properties`: JSON structure for default properties
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## 🛠️ Technology Stack

- **Frontend**: Vue 3, Nuxt 3
- **Backend**: Nuxt Server API
- **Database**: MySQL with Prisma ORM
- **Styling**: Scoped CSS

## 📁 Project Structure

```
nuxt-pb/
├── app/
│   └── app.vue                 # Main app component
├── components/
│   └── builder/
│       └── ComponentRenderer.vue # Renders page components
├── pages/
│   ├── index.vue              # Home page
│   ├── builder.vue            # Page builder interface
│   └── pages.vue              # Pages list/management
├── server/
│   ├── api/
│   │   ├── pages/             # Page CRUD endpoints
│   │   └── components/        # Component endpoints
│   └── utils/
│       └── prisma.ts          # Prisma client singleton
├── prisma/
│   └── schema.prisma          # Database schema
├── .env                       # Environment variables
└── nuxt.config.ts             # Nuxt configuration
```

## 🔧 API Endpoints

### Pages
- `GET /api/pages` - List all pages
- `POST /api/pages` - Create a new page
- `GET /api/pages/:id` - Get a specific page
- `PUT /api/pages/:id` - Update a page
- `DELETE /api/pages/:id` - Delete a page

### Components
- `GET /api/components` - List all available components
- `POST /api/components` - Create a new component template

## 🎯 Future Enhancements

- Nested components and component trees
- Undo/redo functionality
- Copy/paste components
- Import/export pages
- Template library
- Media manager
- Form components with validation
- SEO metadata editor
- Multi-user support with authentication
- Version history
- Page preview before publishing
- Responsive breakpoint editor

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

If you have any questions or need help, please open an issue on GitHub.

## 🙏 Credits

Inspired by [Vvveb](https://github.com/givanz/Vvveb) - an open-source drag-and-drop website builder.
