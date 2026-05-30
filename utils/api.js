const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://smart-inventory-backend.onrender.com/api";

async function apiCall(endpoint, method = "GET", body = null) {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;

  } catch (error) {
    console.error("API Error:", error);
    alert("Server connection failed");
    throw error;
  }
}

async function register(username, password, email) {
  return await apiCall("/auth/register", "POST", {
    username,
    password,
    email,
  });
}

async function login(username, password) {
  return await apiCall("/auth/login", "POST", {
    username,
    password,
  });
}

async function getProducts() {
  return await apiCall("/products");
}

async function addProduct(productData) {
  return await apiCall("/products", "POST", productData);
}

async function updateProduct(id, productData) {
  return await apiCall(`/products/${id}`, "PUT", productData);
}

async function deleteProduct(id) {
  return await apiCall(`/products/${id}`, "DELETE");
}

async function getSuppliers() {
  return await apiCall("/suppliers");
}

async function addSupplier(supplierData) {
  return await apiCall("/suppliers", "POST", supplierData);
}

async function getPurchases() {
  return await apiCall("/purchases");
}

async function addPurchase(purchaseData) {
  return await apiCall("/purchases", "POST", purchaseData);
}

async function getSales() {
  return await apiCall("/sales");
}

async function addSale(saleData) {
  return await apiCall("/sales", "POST", saleData);
}

async function getReports() {
  return await apiCall("/reports");
}