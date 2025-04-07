# BedConnect

So far, a test project to practice my skills in JavaScript, Node.js, and PostgreSQL.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installing

1. Clone the repository
2. Install the dependencies

```bash
git clone https://github.com/estudio-dev/bedconnect.git
cd bedconnect
npm install
```

3. Create a `.env` file in the root directory with the following content:

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=estudio
POSTGRES_DB=bedconnect
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

4. Run your PostgreSQL database:

5. Initialize the database:

```bash
node initDB.js
```

6. Start the server:

```bash
npm run dev
```

7. Open the application in your browser at `http://localhost:3000`.

## Contributing

Contributions are welcome!