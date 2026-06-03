const API_BASE = "https://smart-inventory-system-3r09.onrender.com/api";

// ==========================
// GENERIC API CALL
// ==========================
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

// ==========================
// AUTH
// ==========================
async function register(username, password, email) {
  return apiCall("/auth/register", "POST", {
    username,
    password,
    email,
  });
}

async function login(username, password) {
  return apiCall("/auth/login", "POST", {
    username,
    password,
  });
}

// ==========================
// PRODUCTS
// ==========================
async function getProducts() {
  return apiCall("/products");
}

async function addProduct(productData) {
  return apiCall("/products", "POST", productData);
}

async function updateProduct(id, productData) {
  return apiCall(`/products/${id}`, "PUT", productData);
}

async function deleteProduct(id) {
  return apiCall(`/products/${id}`, "DELETE");
}

// ==========================
// SUPPLIERS
// ==========================
async function getSuppliers() {
  return apiCall("/suppliers");
}

async function addSupplier(supplierData) {
  return apiCall("/suppliers", "POST", supplierData);
}

// ==========================
// PURCHASES
// ==========================
async function getPurchases() {
  return apiCall("/purchases");
}

async function addPurchase(purchaseData) {
  return apiCall("/purchases", "POST", purchaseData);
}

// ==========================
// SALES
// ==========================
async function getSales() {
  return apiCall("/sales");
}

async function addSale(saleData) {
  return apiCall("/sales", "POST", saleData);
}

// ==========================
// REPORTS
// ==========================
async function getReports() {
  return apiCall("/reports");
}