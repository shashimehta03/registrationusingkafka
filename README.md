# registrationusingkafka
# 🚀 Real-Time User Registration & Login System

This project implements real-time user registration and login using ReactJS (frontend), Node.js + Express (backend), Kafka (event streaming), and MongoDB (database).

## 📦 Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Frontend   | ReactJS            |
| Backend    | Node.js, Express   |
| Messaging  | Kafka              |
| Database   | MongoDB (Mongoose) |

## 🔥 Features

- User registration and login
- Kafka events for registration/login
- User data stored in MongoDB
- JWT-based authentication

## 🚀 Project Folder Structure

```
registrationusingkafka/
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── producers/
│   ├── consumers/
│   └── .env
├── frontend/
│   └── (React app)
└── README.md
```

## 🔥 How to Run This Project

### 1️⃣ Start MongoDB
Run MongoDB locally or use a MongoDB Atlas URI:
```bash
mongod
```
Mongo runs on `mongodb://localhost:27017` by default.

### 2️⃣ Start Kafka & ZooKeeper

#### Step 1: Start ZooKeeper
```bash
cd C:\kafka_2.13-3.9.0
.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
```

#### Step 2: Start Kafka Broker
In a new terminal:
```bash
cd C:\kafka_2.13-3.9.0
.\bin\windows\kafka-server-start.bat .\config\server.properties
```

#### Step 3: Create Kafka Topics
```bash
.\bin\windows\kafka-topics.bat --create --topic user-registered --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
.\bin\windows\kafka-topics.bat --create --topic user-logged-in --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

#### Step 4: Verify Topics (Optional)
```bash
.\bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092
```

### 3️⃣ Configure `.env` Files

#### Backend `.env`
In `registrationusingkafka/backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/registration
KAFKA_BROKERS=localhost:9092
JWT_SECRET=my-secret-key
```

#### Frontend `.env`
In `registrationusingkafka/frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_JWT_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwibmFtZSI6IkpvaG4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTcwNTkyMDAsImV4cCI6MTY5NzE0NTYwMH0.Signature
```

**Note**: Replace `JWT_SECRET` with a secure key (e.g., generate with `openssl rand -base64 32`). The `REACT_APP_JWT_TOKEN` is for development; in production, JWTs should be dynamic.

### 4️⃣ Start Backend (Node.js)
```bash
cd registrationusingkafka/backend
npm install
node server.js
```
Output:
```
Server running on port 5000
Mongo Connected
Kafka Producer connected
```

### 5️⃣ Start Frontend (React)
```bash
cd registrationusingkafka/frontend
npm install
npm start
```
Opens: `http://localhost:3000`

### 6️⃣ Test API with `curl`

#### Register a User
```bash
curl --location 'http://localhost:5000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "testuser",
    "email": "test8@example.com",
    "password": "test123"
}'
```

#### Login a User
```bash
curl --location 'http://localhost:5000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test8@example.com",
    "password": "test123"
}'
```

## ✅ API Endpoints

| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| POST   | `/api/auth/register`   | User Registration    |
| POST   | `/api/auth/login`      | User Login           |

## 💥 Kafka Topics

| Topic Name         | Event Triggered On     |
|--------------------|------------------------|
| `user-registered`  | User registration      |
| `user-logged-in`   | User login             |