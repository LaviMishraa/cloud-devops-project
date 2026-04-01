import { useState } from "react";
import API from "./services/api";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("🔥 FUNCTION CALLED"); // DEBUG

  try {
    if (isLogin) {
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", res.data.token);
      setMessage("✅ Login Successful");
    } else {
      const res = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setMessage("✅ Registration Successful");
    }
  } catch (err) {
    console.error(err);
    setMessage(err.response?.data?.message || "❌ Error");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          🔐 DevOps {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 mb-4 rounded bg-gray-700 outline-none"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded bg-gray-700 outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 rounded bg-gray-700 outline-none"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
  type="submit"   // 🔥 ADD THIS
  className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded font-semibold"
>
  {isLogin ? "Login" : "Register"}
</button>
        </form>

        {/* Toggle Button */}
        <p className="mt-4 text-center text-sm">
          {isLogin ? "New user?" : "Already have an account?"}
          <button
            className="ml-2 text-blue-400"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

        {message && (
          <p className="mt-4 text-center text-sm">{message}</p>
        )}
      </div>
    </div>
  );
}

export default App;