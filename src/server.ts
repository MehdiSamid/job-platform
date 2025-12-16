import app from "./api/index";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 API available at http://localhost:${PORT}/api`);
});
