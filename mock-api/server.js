import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const dbPath = path.join(__dirname, "db.json");
console.log(`Loading database from: ${dbPath}`);

let router;
try {
  router = jsonServer.router(dbPath);
  console.log('Database loaded successfully');
} catch (error) {
  console.error('Error loading database:', error);
  process.exit(1);
}

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom routes for authentication
server.post("/auth/request-otp", (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Simulate OTP sent
  res.status(200).json({
    success: true,
    message: "OTP sent to your email",
    expiresIn: 60,
  });
});

server.post("/auth/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  // Accept "123456" as valid OTP for demo
  if (otp === "123456") {
    const token = `mock-token-${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}`;
    return res.status(200).json({
      success: true,
      token,
      user: {
        email,
        name: "Admin User",
      },
    });
  }

  res.status(401).json({
    success: false,
    error: "Invalid OTP",
  });
});

// Use default router
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Mock API Server is running on http://localhost:${PORT}`);
  console.log(`Database path: ${path.join(__dirname, "db.json")}`);
});
