import { useState } from "react";
import axios from "axios";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const register = async (formData: any) => {
    setLoading(true);
    setError("");
    setSuccess("");

    console.log('formData', formData)

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        setSuccess("Registration successful!");
      }
    } catch (error) {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};
