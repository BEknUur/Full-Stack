# 🌐 Full-Stack Web App — React + FastAPI

This is a **full-stack web application** powered by a modern tech stack:  
**Frontend** built with **Vite + React + TypeScript** and  
**Backend** powered by **FastAPI (Python)**.

The project serves as a robust boilerplate or foundation for building scalable, responsive, and high-performance web apps.

## 🧰 Tech Stack

**Frontend:**
- React
- TypeScript
- Vite
- Tailwind CSS

**Backend:**
- FastAPI
- Python 3.10+
- Pydantic

**Dev Tools:**
- ESLint & Prettier
- Hot Module Reloading (HMR)

## 🚀 Features

- ⚡ Super-fast frontend development via Vite  
- 📡 Fully functional RESTful API with FastAPI  
- 💡 Strong typing with TypeScript and Pydantic  
- 🎨 Responsive UI with Tailwind CSS  
- 🔐 Ready for integration with auth (JWT, OAuth, etc.)  
- 🧩 Modular and clean project structure

## 📦 Project Structure

```
Full-Stack/
├── backend/           # FastAPI application
│   ├── main.py
│   └── requirements.txt
├── frontend/          # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md
```

## ⚙️ Setup & Installation

### Backend (FastAPI)

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file (optional):
```ini
SECRET_KEY=your_secret_key
```

Run the backend server:
```bash
uvicorn main:app --reload
```

📍 API available at: http://localhost:8000  
📘 Swagger docs: http://localhost:8000/docs

### Frontend (React + Vite + TypeScript)

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

📍 App available at: http://localhost:5173

> **Tip**: If you're calling backend APIs, configure proxy in vite.config.ts.

## 📌 Roadmap

- 🔐 JWT authentication (login/register)
- 🛠 Database integration (PostgreSQL / MongoDB)
- 📄 Form validation and API error handling
- 📦 Docker support for full-stack deployment
- ☁️ Deploy on Vercel, Railway or Render
- 🔁 CI/CD with GitHub Actions

## 🤝 Contribution

Pull requests and feedback are welcome!

Fork the project or open an issue to propose changes or report bugs.

## 📄 License

MIT License — use it freely with attribution.

