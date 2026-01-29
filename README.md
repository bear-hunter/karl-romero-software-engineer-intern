# Ethereum Wallet Tracker

A full-stack application that allows users to connect their Ethereum wallet and view their balance and transaction history. The project consists of a **Next.js frontend** with WalletConnect integration and a **FastAPI backend** with Redis caching and PostgreSQL storage.

![Ethereum Tracker](https://img.shields.io/badge/Ethereum-Mainnet-blue) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![FastAPI](https://img.shields.io/badge/FastAPI-Python-green)

---

## 🚀 Features

### Frontend (Tier 1)
- **Wallet Connection** — Connect via MetaMask, WalletConnect, and other wallets using Web3Modal
- **Balance Display** — View ETH balance in real-time from the Ethereum network
- **Transaction History** — View last 10 transactions with details (hash, from/to, value, timestamp)
- **Error Handling** — User-friendly error messages for failed connections or API calls
- **Responsive Design** — Modern dark theme UI with Tailwind CSS

### Backend (Tier 2)
- **REST API** — Endpoint to fetch gas price, block number, and account balance
- **Redis Caching** — 5-minute cache for gas price and block number to reduce API calls
- **PostgreSQL Storage** — Persistent storage of queried account balances
- **Input Validation** — Ethereum address format validation

---

## 📋 Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** 18+ or **Bun** runtime
- **Python** 3.14
- **PostgreSQL** 15+
- **Redis** 6+
- **MetaMask** browser extension (for testing)

### API Keys Required

You'll need to obtain API keys from the following services:

| Service | Purpose | Sign Up |
|---------|---------|---------|
| **Alchemy** | Ethereum RPC provider | [alchemy.com](https://www.alchemy.com) |
| **Etherscan** | Transaction history API | [etherscan.io/apis](https://etherscan.io/apis) |
| **WalletConnect** | Wallet connection protocol | [cloud.walletconnect.com](https://cloud.walletconnect.com) |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd karl-romero-software-engineer-intern
```

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env  # Or create manually
```

**Configure `backend/.env`:**
```env
ALCHEMY_API_KEY=your_alchemy_api_key
ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/your_alchemy_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
DATABASE_URL=postgresql://username:password@localhost/ethereum_tracker
REDIS_HOST=localhost
REDIS_PORT=6379
CACHE_EXPIRY=300
```

**Setup PostgreSQL:**
```bash
sudo -u postgres psql
```
```sql
CREATE DATABASE ethereum_tracker;
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ethereum_tracker TO your_username;
ALTER DATABASE ethereum_tracker OWNER TO your_username;
\q
```

**Start the backend:**
```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000` with interactive docs at `http://localhost:8000/docs`.

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
bun install  # Or: npm install

# Create environment file
cp .env.example .env.local  # Or create manually
```

**Configure `frontend/.env.local`:**
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_ETHERSCAN_API_KEY=your_etherscan_api_key
```

**Start the frontend:**
```bash
bun run dev  # Or: npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 🏗️ Architecture & Key Decisions

### Frontend Architecture

```
frontend/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout with providers
│   │   ├── page.tsx      # Main dashboard page
│   │   └── providers.tsx # Wagmi, React Query, Web3Modal providers
│   ├── components/       # Reusable UI components
│   │   ├── WalletConnect.tsx
│   │   ├── Balance.tsx
│   │   └── TransactionHistory.tsx
│   ├── hooks/            # Custom React hooks
│   │   └── useEthereumData.ts
│   ├── lib/              # Configuration and utilities
│   │   ├── config.ts
│   │   └── wagmi.ts
│   └── types/            # TypeScript interfaces
```

**Key Decisions:**
- **Next.js 16 with App Router** — Modern React framework with server components
- **Wagmi + Web3Modal** — Industry-standard libraries for wallet connections
- **ethers.js** — For direct blockchain interactions (balance queries)
- **Etherscan API V2** — For transaction history (more reliable than RPC for historical data)
- **Dynamic imports** — Web3Modal loaded client-side only to avoid SSR issues with indexedDB

### Backend Architecture

```
backend/
├── app/
│   ├── main.py       # FastAPI app initialization, CORS, routes
│   ├── config.py     # Environment variable configuration
│   ├── database.py   # SQLAlchemy connection and session management
│   ├── models.py     # Database models (Account table)
│   ├── routes.py     # API endpoints
│   ├── services.py   # Blockchain interaction logic
│   └── cache.py      # Redis caching functions
```

**Key Decisions:**
- **FastAPI** — High-performance async Python framework with automatic OpenAPI docs
- **SQLAlchemy** — ORM for PostgreSQL with type safety
- **Redis** — In-memory caching for frequently-changing data (gas price, block number)
- **web3.py** — Python library for Ethereum RPC calls via Alchemy
- **Separation of concerns** — Services, routes, and data access are decoupled for extensibility

### Caching Strategy

| Data | Cache Duration | Reason |
|------|---------------|--------|
| Gas Price | 5 minutes | Changes frequently but not per-request critical |
| Block Number | 5 minutes | New blocks every ~12 seconds, but caching reduces API calls |
| Balance | Not cached | User expects real-time balance |

---

## 📡 API Endpoints

### Backend API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API information and available endpoints |
| `GET` | `/api/account/{address}` | Get gas price, block number, and balance for address |
| `GET` | `/api/health` | Health check endpoint |

**Example Response:**
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "gas_price": {
    "wei": "20000000000",
    "gwei": "20"
  },
  "block_number": 18500000,
  "balance": {
    "wei": "1000000000000000000",
    "eth": "1.0"
  }
}
```

---

## ⚠️ Known Issues & Limitations

1. **Etherscan Rate Limiting** — Free tier allows 5 calls/second. The frontend implements request deduplication and staggering to mitigate this.

2. **MetaMask Connection Issues** — If connection fails, try:
   - Clearing MetaMask connected sites
   - Ensuring MetaMask is on Ethereum Mainnet
   - Hard refreshing the page (Ctrl+Shift+R)

3. **PostgreSQL Authentication** — On Fedora/RHEL, you may need to modify `/var/lib/pgsql/data/pg_hba.conf` to use `md5` instead of `ident` for local connections.

4. **SSR Compatibility** — Web3Modal uses browser-only APIs (indexedDB). The app handles this with dynamic imports, but you may see brief console errors during development.

5. **Testnet Support** — Currently configured for Ethereum Mainnet only. To use testnets, update the chain configuration in `wagmi.ts`.

---

## 🧪 Testing

### Test Backend API
```bash
# Health check
curl http://localhost:8000/api/health

# Get account info (replace with a valid address)
curl http://localhost:8000/api/account/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

### Verify Redis Caching
```bash
redis-cli
KEYS *
GET gas_price
GET block_number
```

### Verify PostgreSQL Storage
```bash
psql -U your_username -d ethereum_tracker
SELECT * FROM accounts;
```

---

## 📝 License

This project is created as part of a software engineering internship assessment.

---

## 👤 Author

**Karl Romero** — Software Engineer Intern Candidate
