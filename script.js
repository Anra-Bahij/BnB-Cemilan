const order = [];
let selectedIndex = 0;
const menuItems = [
  { name: "Burger", price: 15000 },
  { name: "Hotdog", price: 12000 },
  { name: "Roti Cane", price: 10000 },
  { name: "Kentang", price: 8000 }
];
const beep = document.getElementById('beep');
const inputNama = document.getElementById('nama');
const struk = document.getElementById('struk');
const orderList = document.getElementById('orderList');

highlightSelected();

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    playBeep();
    addToOrder(item.textContent);
  });
});

function highlightSelected() {
  menuItems.forEach((item, i) => {
    item.classList.toggle('selected', i === selectedIndex);
  });
}

function addToOrder(item) {
  order.push(item);
  renderOrderList();
}

function removeOrder(index) {
  order.splice(index, 1);
  renderOrderList();
}

function renderOrderList() {
  orderList.innerHTML = "";
  order.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item}</span>
      <span class="remove-btn" onclick="removeOrder(${index})">&times;</span>
    `;
    orderList.appendChild(li);
  });
}

function sendToWhatsApp() {
  const nama = inputNama.value.trim();
  if (!nama) {
    alert("Masukkan nama Anda terlebih dahulu.");
    return;
  }

  if (order.length === 0) {
    alert("Belum ada pesanan!");
    return;
  }

  const itemCount = {};
  order.forEach(item => {
    itemCount[item] = (itemCount[item] || 0) + 1;
  });

  let orderListText = '';
  let index = 1;
  for (const [item, count] of Object.entries(itemCount)) {
    orderListText += `${index++}. ${item} x${count}\n`;
  }

  const message = `Halo BnB Cemilan,%0ASaya *${nama}* ingin memesan:%0A%0A${encodeURIComponent(orderListText)}%0ATerima kasih!`;

  struk.style.display = 'block';
  struk.innerText = `Nama: ${nama}\n\n${orderListText}\nTerima kasih!`;

  const adminNumber = "6281514444777"; // Ganti nomor WA admin
  window.open(`https://wa.me/${adminNumber}?text=${message}`, '_blank');
}

function playBeep() {
  if (beep) {
    beep.currentTime = 0;
    beep.play();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    selectedIndex = (selectedIndex + 1) % menuItems.length;
    highlightSelected();
    playBeep();
  } else if (e.key === 'ArrowUp') {
    selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
    highlightSelected();
    playBeep();
  } else if (e.key === 'Enter') {
    playBeep();
    addToOrder(menuItems[selectedIndex].textContent);
  } else if (e.key === 'Escape') {
    struk.style.display = 'none';
  }
});