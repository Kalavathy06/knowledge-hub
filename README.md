# AI-Powered Collaborative Knowledge Hub (MERN + Gemini)

 Full-stack MERN application where teams can create, manage, and search knowledge documents.  
Gemini AI is integrated to provide:
- Automatic document summarization
- Intelligent tag generation
- Semantic search across documents
- Q&A over team docs with contextual answers

---

##  Demo Video
[Watch Loom Demo](https://www.loom.com/share/d0fdee19ce524b63a1f9d1f3bcfa3492?sid=26b34927-9c3e-43dd-aa50-6ada13b9b513)

---

## Features
### Backend
- Authentication with JWT (Register/Login)
- Roles: **admin** & **user**
  - Admins → full access (edit/delete any doc)
  - Users → can only manage their own docs
- Documents API with:
  - `title`, `content`, `tags`, `summary`, `createdBy`, timestamps
- Gemini AI integration:
  - Auto-summarize on creation
  - Auto-generate tags
  - Semantic search
  - AI-powered Q&A using stored documents

### Frontend
- Login/Register
- Dashboard → list of documents
- Create, edit, delete documents
- AI features integrated in UI


##  Tech Stack
- **Frontend**: React + Tailwind
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **AI Integration**: Gemini API
- **Auth**: JWT + bcrypt


### Prerequisites
- JWT_SECRET=supersecret
- MONGO_URI=mongodb+srv://kaviyakalavathy:Kalavathy01@cluster0.1zv0wl0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
- Gemini API Key - AIzaSyBlAH-ffHNxYZmYRUL_T9MXxBmWK2RKJVg


##  Getting Started

### 1. Clone Repo
```bash
git clone https://github.com/Kalavathy06/knowledge-hub.git
cd knowledge-hub
