# Artha Job Importer Assignment – Full Stack (MERN)

A scalable job importer system with queue-based processing, import history tracking, and admin UI.

---

## 📦 Tech Stack

- **Frontend:** Next.js (client)
- **Backend:** Node.js (Express)
- **Database:** MongoDB Atlas
- **Queue:** BullMQ + Redis
- **Parser:** xml2js
- **Job Management:** Mongoose
- **Deployment Ready:** Cloud compatible

---

## 🛠 Features

- Fetches jobs from external XML feeds
- Uses Redis + BullMQ for async job processing
- Upserts jobs into MongoDB
- Logs import history (timestamp, source, totals, failures)
- Admin UI (Next.js) to view import logs

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Shreyansh-deep/artha-job-board.git
cd artha-job-importer
```
2. Setup Backend

```bash
cd server
npm install
```

Create .env file
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/artha-job-importer
REDIS_URL=redis://localhost:6379

Then run:

```bash
npm run dev
```

Or to manually run importer:
node jobs/fetchJobs.js

3. Setup Frontend

```bash
cd ../client
npm install
```

Create .env.local
NEXT_PUBLIC_API_BASE=http://localhost:5000/api

Then run:

```bash
npm run dev
```

🌐 Usage

Visit http://localhost:3000/import-logs

View import history with:

Timestamp

Source URL

Total fetched

New / Updated / Failed

View failed reasons (on click)


📁 Project Structure
/server          # Node.js API + Job Queue + Mongo
/client          # Next.js UI to view import logs
/docs            # Architecture + Design
