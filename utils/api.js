const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:3001/api"
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