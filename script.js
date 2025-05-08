const order = [];
let selectedIndex = 0;
const menuItems = document.querySelectorAll('.item');
const beep = document.getElementById('beep');
const inputNama = document.getElementById('nama');
const struk = document.getElementById('struk');
const orderList = document.getElementById('orderList');
const kategoriContainers = document.querySelectorAll('.category');

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

  const adminNumber = "6281513961680"; // Ganti nomor WA admin
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

// Filter kategori
const filterSelect = document.getElementById('filter-kategori');
filterSelect.addEventListener('change', () => {
  const selected = filterSelect.value;
  kategoriContainers.forEach(container => {
    if (selected === "all" || container.dataset.kategori === selected) {
      container.style.display = 'grid';
    } else {
      container.style.display = 'none';
    }
  });
});