const API_URL = "https://smart-inventory-system-3r09.onrender.com";

let items = [];

/* =========================
   LOAD PRODUCTS
========================= */
document.addEventListener("DOMContentLoaded", async () => {
  const products = await getProducts();
  console.log("Products loaded:", products);
});

/* =========================
   GET PRODUCTS
========================= */
async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/api/products`);
    return await res.json();
  } catch (err) {
    console.error("Products error:", err);
    return [];
  }
}

/* =========================
   ADD ITEM
========================= */
function addItem() {
  const name = document.getElementById("productName")?.value.trim();
  const qty = parseInt(document.getElementById("productQty")?.value);
  const price = parseFloat(document.getElementById("productPrice")?.value);

  if (!name || qty <= 0 || price <= 0 || isNaN(qty) || isNaN(price)) {
    alert("Enter valid product details");
    return;
  }

  items.push({
    product_name: name,
    quantity: qty,
    unit_price: price,
    total: qty * price,
  });

  updateTable();
  updateTotals();
}

/* =========================
   TABLE UPDATE
========================= */
function updateTable() {
  const tbody = document.getElementById("billBody");
  tbody.innerHTML = "";

  items.forEach((item, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${item.product_name}</td>
        <td>${item.quantity}</td>
        <td>₹${item.unit_price}</td>
        <td>₹${item.total}</td>
        <td><button onclick="removeItem(${i})">Remove</button></td>
      </tr>
    `;
  });
}

/* =========================
   REMOVE ITEM
========================= */
function removeItem(index) {
  items.splice(index, 1);
  updateTable();
  updateTotals();
}

/* =========================
   TOTALS
========================= */
function updateTotals() {
  const subtotal = items.reduce((s, i) => s + i.total, 0);
  const gst = subtotal * 0.18;
  const grand = subtotal + gst;

  document.getElementById("subTotal").textContent = subtotal.toFixed(2);
  document.getElementById("gst").textContent = gst.toFixed(2);
  document.getElementById("grandTotal").textContent = grand.toFixed(2);
}

/* =========================
   SAVE SALE (IMPORTANT FIXED ROUTE)
========================= */
async function saveSale() {
  const customerName = document.getElementById("customerName")?.value.trim();
  const customerPhone = document.getElementById("customerPhone")?.value.trim();

  if (!customerName || items.length === 0) {
    alert("Add customer + items");
    return;
  }

  const subtotal = items.reduce((s, i) => s + i.total, 0);
  const gst = subtotal * 0.18;

  const payload = {
    invoice_number: "INV-" + Date.now(),
    customer_name: customerName,
    customer_phone: customerPhone || null,
    items,
    subtotal,
    gst,
    grand_total: subtotal + gst,
  };

  try {
    const res = await fetch(`${API_URL}/api/sales`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data?.id || data?.success) {
      alert("Sale saved successfully!");
      resetBill();
    } else {
      alert("Failed to save sale");
    }
  } catch (err) {
    console.error(err);
    alert("Backend not reachable");
  }
}

/* =========================
   RESET
========================= */
function resetBill() {
  items = [];
  updateTable();
  updateTotals();
}