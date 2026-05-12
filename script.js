let items = [];

// Initialize sales module - load products on page load
document.addEventListener('DOMContentLoaded', async () => {
  const products = await getProducts();
  if (products && products.length > 0) {
    console.log('Products loaded:', products);
  }
});

async function addItem() {
  const name = document.getElementById('productName')?.value.trim();
  const qty = parseInt(document.getElementById('productQty')?.value);
  const price = parseFloat(document.getElementById('productPrice')?.value);

  if (!name || isNaN(qty) || qty <= 0 || isNaN(price) || price <= 0) {
    alert('Please enter valid item details.');
    return;
  }

  const total = qty * price;
  items.push({ product_name: name, quantity: qty, unit_price: price, total });
  updateTable();
  updateTotals();

  // Clear inputs
  document.getElementById('productName').value = '';
  document.getElementById('productQty').value = '';
  document.getElementById('productPrice').value = '';
}

function updateTable() {
  const tbody = document.getElementById('billBody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  items.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-3">${index + 1}</td>
      <td class="p-3">${item.product_name}</td>
      <td class="p-3">${item.quantity}</td>
      <td class="p-3">₹${item.unit_price.toFixed(2)}</td>
      <td class="p-3">₹${item.total.toFixed(2)}</td>
      <td class="p-3"><button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700">Remove</button></td>
    `;
    tbody.appendChild(row);
  });
}

function removeItem(index) {
  items.splice(index, 1);
  updateTable();
  updateTotals();
}

function updateTotals() {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  document.getElementById('subTotal').textContent = subtotal.toFixed(2);
  document.getElementById('gst').textContent = gst.toFixed(2);
  document.getElementById('grandTotal').textContent = grandTotal.toFixed(2);
}

function resetBill() {
  items = [];
  updateTable();
  updateTotals();
  document.getElementById('customerName').value = '';
  document.getElementById('customerPhone').value = '';
  document.getElementById('billDate').value = '';
}

async function saveSale() {
  const customerName = document.getElementById('customerName')?.value.trim();
  const customerPhone = document.getElementById('customerPhone')?.value.trim();

  if (!customerName || items.length === 0) {
    alert('Please enter customer name and add items.');
    return;
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  const invoice_number = `INV-${Date.now()}`;

  const saleData = {
    invoice_number,
    customer_name: customerName,
    customer_phone: customerPhone || null,
    items,
    subtotal,
    gst,
    grand_total: grandTotal,
  };

  const result = await createSale(saleData);
  if (result && result.id) {
    alert(`✅ Sale saved successfully!\nInvoice: ${invoice_number}`);
    resetBill();
  } else {
    alert('❌ Failed to save sale. Please check backend connection.');
  }
}

function printBill() {
  window.print();
}