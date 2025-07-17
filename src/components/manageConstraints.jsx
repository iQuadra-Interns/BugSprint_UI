import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col, Container, ListGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import SideBar from "./Sidebar";
import "./manageConstraints.css";

const BASE_URL = "http://127.0.0.1:8000/admin/api/admin";

const ManageConstraints = () => {
  // Product state
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Scenario state
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [loadingScenarios, setLoadingScenarios] = useState(false);

  // Modal state
  const [showProductModal, setShowProductModal] = useState(false);
  const [productModalType, setProductModalType] = useState("add"); // add/edit
  const [productInput, setProductInput] = useState("");

  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [scenarioModalType, setScenarioModalType] = useState("add"); // add/edit
  const [scenarioInput, setScenarioInput] = useState("");

  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch all products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch scenarios when selectedProduct 
  useEffect(() => {
    if (selectedProduct) {
      fetchScenarios(selectedProduct.product_id);
    } else {
      setScenarios([]);
      setSelectedScenario(null);
    }
  }, [selectedProduct]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/product`);
      setProducts(res.data.products || []);
    } catch (e) {
      alert("Failed to load products");
    }
  };

  // Fetch scenarios for a product
  const fetchScenarios = async (product_id) => {
    setLoadingScenarios(true);
    try {
      const res = await axios.get(`${BASE_URL}/scenario/by-product/${product_id}`);
      setScenarios(res.data.scenarios || []);
    } catch (e) {
      alert("Failed to load scenarios");
      setScenarios([]);
    }
    setLoadingScenarios(false);
  };

  // Product handlers
  const openAddProductModal = () => {
    setProductModalType("add");
    setProductInput("");
    setShowProductModal(true);
  };

  const openEditProductModal = (product) => {
    setProductModalType("edit");
    setProductInput(product.product_name);
    setShowProductModal(true);
  };

  const handleProductSubmit = async () => {
    if (!productInput.trim()) return;
    try {
      if (productModalType === "add") {
        await axios.post(`${BASE_URL}/product`, { product_name: productInput });
        alert("Product added");
      } else if (productModalType === "edit" && selectedProduct) {
        await axios.put(`${BASE_URL}/product/${selectedProduct.product_id}`, { product_name: productInput });
        alert("Product updated");
      }
      setShowProductModal(false);
      fetchProducts();
      setSelectedProduct(null);
    } catch {
      alert("Failed to save product");
    }
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setShowDeleteProductModal(true);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(`${BASE_URL}/product/${productToDelete.product_id}`);
      alert("Product deleted");
      fetchProducts();
      setSelectedProduct(null);
      setProductToDelete(null);
      setShowDeleteProductModal(false);
    } catch {
      alert("Failed to delete product");
      setShowDeleteProductModal(false);
      setProductToDelete(null);
    }
  };

  // Scenario handlers
  const openAddScenarioModal = () => {
    setScenarioModalType("add");
    setScenarioInput("");
    setShowScenarioModal(true);
  };

  const openEditScenarioModal = (scenario) => {
    setScenarioModalType("edit");
    setScenarioInput(scenario.scenario_name);
    setShowScenarioModal(true);
  };

  const handleScenarioSubmit = async () => {
    if (!scenarioInput.trim() || !selectedProduct) return;
    try {
      if (scenarioModalType === "add") {
        await axios.post(`${BASE_URL}/scenario`, {
          scenario_name: scenarioInput,
          product_id: selectedProduct.product_id,
        });
        alert("Scenario added");
      } else if (scenarioModalType === "edit" && selectedScenario) {
        await axios.put(`${BASE_URL}/scenario/${selectedScenario.scenario_id}`, {
          scenario_name: scenarioInput,
          product_id: selectedProduct.product_id,
        });
        alert("Scenario updated");
      }
      setShowScenarioModal(false);
      fetchScenarios(selectedProduct.product_id);
      setSelectedScenario(null);
    } catch {
      alert("Failed to save scenario");
    }
  };

  const handleDeleteScenario = async (scenario) => {
    if (!window.confirm("Delete this scenario?")) return;
    try {
      await axios.delete(`${BASE_URL}/scenario/${scenario.scenario_id}`);
      alert("Scenario deleted");
      fetchScenarios(selectedProduct.product_id);
      setSelectedScenario(null);
    } catch {
      alert("Failed to delete scenario");
    }
  };

  return (
    <div className="d-flex manage-wrapper">
      <SideBar />
      <div className="manage-container">
        <Container fluid className="p-4">
          <h4 className="mb-4" style={{ color: "#000", fontWeight: "normal" }}>Manage Constraints</h4>
          <Row>
            {/* Product List */}
            <Col md={4} xs={12} className="mb-4 mb-md-0">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="section-title">Products</h5>
                <Button size="sm" variant="primary" onClick={openAddProductModal} aria-label="Add new product">
                  Add
                </Button>
              </div>
              <ListGroup className="shadow-sm rounded">
                {products.map((product) => (
                  <ListGroup.Item
                    key={product.product_id}
                    action
                    active={selectedProduct?.product_id === product.product_id}
                    onClick={() => {
                      setSelectedProduct(product);
                      setSelectedScenario(null);
                    }}
                    className="d-flex justify-content-between align-items-center list-item"
                    aria-current={selectedProduct?.product_id === product.product_id}
                  >
                    <span className="list-item-text">{product.product_name}</span>
                    <span className="list-item-actions">
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                          openEditProductModal(product);
                        }}
                        aria-label={`Edit ${product.product_name}`}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProduct(product);
                        }}
                        aria-label={`Delete ${product.product_name}`}
                      >
                        Delete
                      </Button>
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            {/* Scenario List */}
            <Col md={8} xs={12}>
              {selectedProduct ? (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="section-title">Scenarios for "{selectedProduct.product_name}"</h5>
                    <Button size="sm" variant="primary" onClick={openAddScenarioModal} aria-label="Add new scenario">
                      Add
                    </Button>
                  </div>
                  {loadingScenarios ? (
                    <div className="loading-container">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <ListGroup className="shadow-sm rounded">
                      {scenarios.map((scenario) => (
                        <ListGroup.Item
                          key={scenario.scenario_id}
                          action
                          active={selectedScenario?.scenario_id === scenario.scenario_id}
                          onClick={() => setSelectedScenario(scenario)}
                          className="d-flex justify-content-between align-items-center list-item"
                          aria-current={selectedScenario?.scenario_id === scenario.scenario_id}
                        >
                          <span className="list-item-text">{scenario.scenario_name}</span>
                          <span className="list-item-actions">
                            <Button
                              size="sm"
                              variant="warning"
                              className="me-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedScenario(scenario);
                                openEditScenarioModal(scenario);
                              }}
                              aria-label={`Edit ${scenario.scenario_name}`}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteScenario(scenario);
                              }}
                              aria-label={`Delete ${scenario.scenario_name}`}
                            >
                              Delete
                            </Button>
                          </span>
                        </ListGroup.Item>
                      ))}
                      {scenarios.length === 0 && (
                        <div className="text-muted mt-3 no-data">No scenarios found for this product.</div>
                      )}
                    </ListGroup>
                  )}
                </>
              ) : (
                <div className="text-muted no-data">Select a product to view its scenarios.</div>
              )}
            </Col>
          </Row>
        </Container>

        {/* Product Modal */}
        <Modal
          show={showProductModal}
          onHide={() => setShowProductModal(false)}
          centered
          dialogClassName="modal-animated"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {productModalType === "add" ? "Add Product" : "Edit Product"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                autoFocus
                placeholder="Enter product name"
                aria-required="true"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowProductModal(false)}
              aria-label="Cancel"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleProductSubmit}
              disabled={!productInput.trim()}
              aria-label={productModalType === "add" ? "Add product" : "Update product"}
            >
              {productModalType === "add" ? "Add" : "Update"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Product Delete Confirmation Modal */}
        <Modal
          show={showDeleteProductModal}
          onHide={() => setShowDeleteProductModal(false)}
          centered
          dialogClassName="modal-animated"
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Deleting <strong>{productToDelete?.product_name}</strong> will also delete all its scenarios. Proceed?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteProductModal(false)}
              aria-label="Cancel"
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDeleteProduct} aria-label="Confirm delete product">
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Scenario Modal */}
        <Modal
          show={showScenarioModal}
          onHide={() => setShowScenarioModal(false)}
          centered
          dialogClassName="modal-animated"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {scenarioModalType === "add" ? "Add Scenario" : "Edit Scenario"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="scenarioName">
              <Form.Label>Scenario Name</Form.Label>
              <Form.Control
                type="text"
                value={scenarioInput}
                onChange={(e) => setScenarioInput(e.target.value)}
                autoFocus
                placeholder="Enter scenario name"
                aria-required="true"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowScenarioModal(false)}
              aria-label="Cancel"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleScenarioSubmit}
              disabled={!scenarioInput.trim()}
              aria-label={scenarioModalType === "add" ? "Add scenario" : "Update scenario"}
            >
              {scenarioModalType === "add" ? "Add" : "Update"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ManageConstraints;