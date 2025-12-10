# Antigravity - E-Commerce Platform with Abandoned Cart Recovery

A modern, full-stack e-commerce platform featuring guest checkout, abandoned cart email recovery, and a beautiful UI built with React, Node.js, and Prisma.

## ✨ Features

### Customer Experience
- 🛍️ **Guest Checkout** - No account required to purchase
- 📧 **Abandoned Cart Recovery** - Automatic email reminders with product images and pricing
- 🎨 **Modern UI** - Built with React, TypeScript, and Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly on mobile and desktop
- 🔔 **Real-time Cart Updates** - Instant feedback on cart operations

### Developer Experience
- 🔄 **Robust API** - RESTful API with retry logic and error handling
- 📊 **Detailed Logging** - Comprehensive request and operation logging
- 🔌 **Health Checks** - API health monitoring endpoints
- 🧪 **Easy Testing** - Test scripts for email and cart functionality
- 🎯 **Type Safety** - TypeScript throughout the frontend

## 🏗️ Tech Stack

### Frontend
- **React** + **TypeScript** - Modern React with full type safety
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **Sonner** - Toast notifications

### Backend
- **Node.js** + **Express** - Fast, minimalist web framework
- **Prisma** - Next-generation ORM
- **SQLite** - Lightweight database (perfect for development)
- **Resend** - Modern email API
- **node-cron** - Scheduled tasks for abandoned cart emails

## 📦 Project Structure

```
Antigravity/
├── frontend/              # React TypeScript frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # React Context providers (CartContext)
│   │   ├── pages/        # Page components (Home, Products, Checkout, etc.)
│   │   ├── data/         # Product data
│   │   ├── lib/          # Utility functions
│   │   └── config.ts     # Centralized API configuration
│   └── package.json
│
├── backend/              # Node.js Express backend
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic (email, cron)
│   │   ├── data/         # Product data
│   │   ├── lib/          # Prisma client
│   │   └── app.js        # Express app setup
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Antigravity
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env and add your RESEND_API_KEY
   ```

4. **Initialize the database**
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development servers**

   In one terminal (backend):
   ```bash
   cd backend
   npm run dev
   ```

   In another terminal (frontend):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open the app**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:4000
   - Health check: http://localhost:4000/health

## 🔧 Configuration

### Environment Variables

Create `backend/.env` with:

```bash
# Database
DATABASE_URL="file:./dev.db"

# Email (get from https://resend.com)
RESEND_API_KEY="re_your_api_key_here"

# Optional
PORT=4000
```

### Email Setup

1. Sign up for [Resend](https://resend.com)
2. Get your API key
3. Add it to `backend/.env`
4. For production, verify your domain in Resend dashboard

### Cron Job Configuration

Abandoned cart emails are sent every 15 minutes by default.

To change the frequency, edit `backend/src/services/cronService.js`:

```javascript
// Every 15 minutes (default)
cron.schedule('*/15 * * * *', async () => { ... });

// Every 5 minutes (for testing)
cron.schedule('*/5 * * * *', async () => { ... });
```

## 🧪 Testing

### Test Email Sending

```bash
cd backend
node src/test-email.js your-email@example.com
```

### Test Cart API

```bash
# Create a cart
curl -X POST http://localhost:4000/api/cart \
  -H "Content-Type: application/json" \
  -d '{}'

# Add item to cart
curl -X POST http://localhost:4000/api/cart/items \
  -H "Content-Type: application/json" \
  -d '{"cartId":"YOUR_CART_ID","productId":"1","quantity":1,"price":299.99}'
```

## 📧 Email Template

The abandoned cart email includes:
- Beautiful purple gradient header
- Product images (80x80px)
- Product names and quantities
- Individual item prices
- Total cart value
- Call-to-action button linking to checkout
- Professional footer

**Preview:**
![Email Template Preview](docs/email-preview.png)

## 🛠️ API Endpoints

### Cart Management

- `POST /api/cart` - Create or get cart
- `POST /api/cart/items` - Add item to cart
- `POST /api/cart/email` - Update cart email
- `POST /api/cart/checkout` - Complete checkout

### Health & Status

- `GET /` - API status
- `GET /health` - Health check with database status

## 🔄 Workflow

1. **User browses products** → Frontend displays products
2. **User adds to cart** → `POST /api/cart/items`
3. **User enters email** → `POST /api/cart/email`
4. **User abandons cart** → Cart remains active
5. **15 minutes pass** → Cron job finds abandoned cart
6. **Email sent** → Beautiful HTML email with cart details
7. **User clicks email** → Returns to checkout
8. **User completes purchase** → `POST /api/cart/checkout`

## 🎨 Customization

### Change Brand Colors

Edit `backend/src/services/resendService.js`:

```javascript
// Header gradient
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add Products

Edit `frontend/src/data/products.ts` and `backend/src/data/products.js`

### Modify Email Template

Edit `backend/src/services/resendService.js` in the `sendAbandonedCartEmail` function

## 📊 Features in Detail

### Connection Resilience
- Retry logic with exponential backoff (3 attempts)
- 10-second request timeouts
- Automatic connection status tracking
- Visual connection status banner

### Logging
- Request logging middleware
- Detailed cart operation logs
- Email sending status logs
- Error logging with full context

### Error Handling
- Input validation on all endpoints
- Structured error responses
- Graceful degradation (Ethereal fallback for emails)

## 🚀 Deployment

### Backend

1. Use PostgreSQL or MySQL in production
2. Update `DATABASE_URL` in production `.env`
3. Run migrations: `npx prisma migrate deploy`
4. Deploy to Node.js hosting (Vercel, Railway, etc.)

### Frontend

1. Build: `npm run build`
2. Deploy `dist` folder to static hosting (Vercel, Netlify, etc.)
3. Update `API_BASE_URL` in `src/config.ts` to production backend URL

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Resend](https://resend.com) - Modern email API
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Pixabay](https://pixabay.com) - Product images

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ using React, Node.js, and Prisma
