import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditInventory() {
  const [inventory, setInventory] = useState({
    product_id: "",
    stock: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // GET Inventory
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/inventory/${id}`
        );

        console.log("GET RESPONSE:", res.data);

        setInventory(res.data.data);
      } catch (err) {
        console.log("GET ERROR:", err.response?.data || err.message);
      }
    };

    fetchInventory();
  }, [id]);

  // UPDATE Inventory
  const updateInventory = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/v1/inventory/${id}`,
        inventory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("UPDATE RESPONSE:", res.data);

      alert("Inventory Updated Successfully");

      navigate("/inventory");
    } catch (err) {
      console.log("Status:", err.response?.status);
      console.log("Data:", err.response?.data);
      console.log("Message:", err.message);

      alert(
        err.response?.data?.message || "Inventory Update Failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Update Inventory
            </h2>

            <form onSubmit={updateInventory}>

              {/* Product ID */}
              <div className="mb-3">
                <label className="form-label">
                  Product ID
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={inventory.product_id || ""}
                  onChange={(e) =>
                    setInventory({
                      ...inventory,
                      product_id: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Stock */}
              <div className="mb-3">
                <label className="form-label">
                  Stock
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={inventory.stock || ""}
                  onChange={(e) =>
                    setInventory({
                      ...inventory,
                      stock: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Update Inventory
              </button>

              <button
                type="button"
                className="btn btn-secondary w-100 mt-2"
                onClick={() => navigate("/inventory")}
              >
                Cancel
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}
