import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen"; // Ensure this path is correct
import "./AddTestCases.css";

const AddTestCases = ({ onClose, onSuccess }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // For loading screen
  const [formData, setFormData] = useState({
    product_id: "",
    test_scenario: "",
    test_steps: "",
    actual_result: "",
    expected_result: "",
    comment: "",
    developer_comment: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.post(
          "https://xjhkkap5tmpwr3yjiw7nvadwra0jyiav.lambda-url.us-east-1.on.aws/fetch-table-data",
          {}
        );
        if (response.data?.data?.products) {
          setProducts(response.data.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.product_id) {
      toast.error("Please select a product.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const payload = {
        ...formData,
        product_id: parseInt(formData.product_id),
      };

      const response = await axios.post(
        "https://6igl2ic4ro3ans7cghpqod2hly0gaxfs.lambda-url.us-east-1.on.aws/api/add-test-case",
        payload
      );

      if (response?.data?.status?.status) {
        toast.success("Test case added successfully.");
        if (onSuccess) onSuccess();
        setFormData({
          product_id: "",
          test_scenario: "",
          test_steps: "",
          actual_result: "",
          expected_result: "",
          comment: "",
          developer_comment: "",
        });
      } else {
        toast.error("Failed to add test case.");
      }
    } catch (error) {
      console.error("Error adding test case:", error);
      toast.error("Error while submitting test case.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="add-testcase-overlay">
      {loading && <LoadingScreen />}
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="add-testcase-popup">
        <h3>Add Test Case</h3>
        <form onSubmit={handleSubmit}>
          <label>Product:</label>
          <select
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Product --</option>
            {products.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_name}
              </option>
            ))}
          </select>

          <label>Test Scenario:</label>
          <input
            type="text"
            name="test_scenario"
            value={formData.test_scenario}
            onChange={handleChange}
            required
          />

          <label>Test Steps:</label>
          <textarea
            name="test_steps"
            value={formData.test_steps}
            onChange={handleChange}
            required
          ></textarea>

          <label>Actual Result:</label>
          <textarea
            name="actual_result"
            value={formData.actual_result}
            onChange={handleChange}
            required
          ></textarea>

          <label>Expected Result:</label>
          <textarea
            name="expected_result"
            value={formData.expected_result}
            onChange={handleChange}
            required
          ></textarea>

          <label>Comment:</label>
          <input
            type="text"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />

          <label>Developer Comment:</label>
          <input
            type="text"
            name="developer_comment"
            value={formData.developer_comment}
            onChange={handleChange}
          />

          <div className="form-buttons">
            <button type="submit" className="save-button">
              Save
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestCases;
