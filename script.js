let products = [];
function addProduct(event) {
  event.preventDefault();
  const productName = document.getElementById('product-name').value;
  const productPrice = document.getElementById('product-price').value;
  products.push({ name: productName, price: productPrice });
  updateLocalStorage();
  event.target.reset();
  updateProductTable();
}
function deleteProduct(index) {
  products.splice(index, 1);
  updateLocalStorage();
  updateProductTable();
}
function updateLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}
function retrieveProductData() {
  products = JSON.parse(localStorage.getItem('products')) || [];
}
function initializeProductTable() {
  retrieveProductData();
  updateProductTable();
}
function updateProductTable() {
  const tableBody = document.querySelector('#product-table tbody');
  tableBody.innerHTML = '';
  products.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>
        <button onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}
document.getElementById('product-form').addEventListener('submit', addProduct);
initializeProductTable();