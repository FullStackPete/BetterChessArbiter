import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    sex: "",
    // role: "User", // Możesz ustawić domyślną rolę użytkownika tutaj
  });

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post("https://localhost:7001/api/Auth/register", formData)
      .then((res) => {
        if (res.status == 200) {
          navigate("/login");
          alert("Successfully Registered!");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <div className="mt-12 h-[95vh] flex justify-center">
      <form onSubmit={(e: FormEvent) => handleSubmit(e)} className="w-1/2">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            className="form-input mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="surname" className="block text-gray-700">
            Surname
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={(e: ChangeEvent) => handleChange(e)}
            className="form-input mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e: ChangeEvent) => handleChange(e)}
            className="form-input mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e: ChangeEvent) => handleChange(e)}
            className="form-input mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sex" className="block text-gray-700">
            Sex
          </label>
          <select name="sex" id="sex" value={formData.sex} onChange={(e)=>handleChange(e)}required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>        
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
