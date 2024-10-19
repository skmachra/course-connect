import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import conf from "./conf";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const email = params.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${conf.apiUrl}/api/users/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email, newPassword }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      setNewPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError(data.error || "Something went wrong!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3 focus:outline-none"
          >
            <img
              src={
                showPassword
                  ? "https://cdn-icons-png.flaticon.com/512/159/159604.png"
                  : "https://cdn-icons-png.flaticon.com/512/10812/10812267.png"
              }
              alt="Toggle Password Visibility"
              className="w-5 h-5"
            />
          </button>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out"
        >
          Reset Password
        </button>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
