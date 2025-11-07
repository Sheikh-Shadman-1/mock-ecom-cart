# 🛒 Vibe Commerce – Mock E-Commerce Cart (Full Stack Assignment)

This is a full-stack shopping cart application built as part of the **Vibe Commerce Internship Assignment**.

---

## ✅ Features (As per assignment)

✔ **Products Page** – 5–10 mock products (name, price, image)  
✔ **Add to Cart** – Add products with quantity  
✔ **Cart Page** – View items, update quantity, remove items, auto total calculation  
✔ **Checkout Flow** – Name + Email form → Receipt generated (ID, total, items, date-time)  
✔ **REST API** integration between frontend & backend  
✔ **Responsive UI** – Works on desktop and mobile  
✔ **Database SQLite** – Products + Cart data saved

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React + Vite |
| Backend    | Node.js + Express |
| Database   | SQLite (using `sqlite3`) |
| API Format | REST JSON |
| Versioning | Git & GitHub |

---

## 📁 Project Folder Structure

```
vibe-commerce-cart/
├─ backend/
│  ├─ server.js
│  ├─ db.js
│  ├─ seed.js
│  ├─ routes/
│  │  ├─ products.js
│  │  ├─ cart.js
│  │  └─ checkout.js
│  ├─ package.json
│  └─ .env.example
└─ frontend/
   ├─ src/
   │  ├─ App.jsx
   │  ├─ api.js
   │  ├─ components/
   │  │  ├─ ProductGrid.jsx
   │  │  ├─ Cart.jsx
   │  │  └─ CheckoutModal.jsx
   │  └─ styles.css
   ├─ index.html
   ├─ package.json
   └─ vite.config.js
```

---

## 🚀 How to Run the Project (Locally)

### ✅ 1. Clone Repository
```
git clone https://github.com/Sheikh-Shadman-1/vibe-commerce-cart.git
cd vibe-commerce-cart
```

---

### ✅ 2. Backend Setup
```
cd backend
cp .env.example .env
npm install
npm run seed     # Adds sample products to database
npm run dev      # Starts server at http://localhost:4000
```

---

### ✅ 3. Frontend Setup
```
cd ../frontend
npm install
# (Optional) echo "VITE_API_BASE=http://localhost:4000" > .env
npm run dev      # Runs app at http://localhost:5173
```

---

## 📌 API Endpoints

| Method | Endpoint            | Description          |
|--------|----------------------|----------------------|
| GET    | /api/products        | Get all products     |
| GET    | /api/cart            | Get cart + total     |
| POST   | /api/cart            | Add item to cart     |
| PUT    | /api/cart/:id        | Update item qty      |
| DELETE | /api/cart/:id        | Remove item          |
| POST   | /api/checkout        | Generate receipt     |

---

## 🎥 Demo Video (1–2 Minutes)

**🔗 Link:** *(Yahan aap apna Loom / YouTube unlisted video link paste karoge)*

**Must Show:**
✅ Product List → Add to Cart  
✅ Cart page → update quantity + delete  
✅ Total calculation  
✅ Checkout + receipt popup  
✅ Quick look at API/Database (bonus)

---

## 📷 Screenshots Placeholders (Optional)

You can add these in a folder `/screenshots`:

| Screenshot | Description |
|------------|-------------|
| 1-products.png | Products page |
| 2-cart.png | Cart with items |
| 3-receipt.png | Checkout receipt |

---

## ✅ Completed By

**👤 Name:** Sheikh Shadman  
**📧 Email:** sheikhshadman456@gmail.com
**🗓 Submission Date:** November 2025

---

## 📄 License
MIT License

