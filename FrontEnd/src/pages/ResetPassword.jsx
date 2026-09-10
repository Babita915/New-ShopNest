import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  console.log("RESET TOKEN:", token);

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/reset-password",
        {
          token: token,
          password: password,
        }
      );

      console.log(
        "Reset Password Response:",
        response.data
      );

      alert(
        response.data.message ||
        "Password reset successfully"
      );

      navigate("/login");

    } catch (error) {
          console.log("STATUS:", error.response?.status);
  console.log("BACKEND ERROR:", error.response?.data);

      console.log(
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Password reset failed"
      );
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-header bg-primary text-white text-center">
              <h4 className="mb-0">
                Reset Password
              </h4>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    New Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Reset Password
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
