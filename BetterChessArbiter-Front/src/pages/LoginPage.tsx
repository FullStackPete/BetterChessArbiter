import { ChangeEvent, FormEvent, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "/api/Auth/login";

function LoginPage() {
    const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",

    // role: "User", // Możesz ustawić domyślną rolę użytkownika tutaj
  });
  function handleChange(e: ChangeEvent) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, formData, {
        withCredentials: true,
      });
      console.log(response?.data);
      console.log(response?.status);
      const token = response.data.token;
      const role = response.data.role;
      setAuth({ role, token });
      if (role == "Admin") {
        navigate("/adminpanel");
      } else {navigate("/")}
    } catch (err: any) {
      alert(err.response.status);
    }
  }
  return (
    <div className="mt-12 h-[95vh] flex justify-center">
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e: ChangeEvent) => handleChange(e)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e: ChangeEvent) => handleChange(e)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
