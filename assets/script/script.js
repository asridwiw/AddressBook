let contacts = JSON.parse(localStorage.getItem("contacts")) || [
  {
    id: 1,
    fullname: "Asri Dwi Wahyuningrum",
    phone: "6289611448239",
    email: "asridwiwningrum@gmail.com",
    location: "Bogor",
  },
  {
    id: 2,
    fullname: "Kwon Hoshi",
    phone: "625712345110",
    email: "hoshikwon17@gmail.com",
    location: "Namyangju",
  },
];

function saveToLocal() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const btnAdd = $("btnAdd");
  const addModal = $("addModal");
  const closeAdd = $("closeAdd");
  const saveAdd = $("saveAdd");

  const editModal = $("editModal");
  const closeEdit = $("closeEdit");
  const saveEdit = $("saveEdit");

  const deleteModal = $("deleteModal");
  const closeDelete = $("closeDelete");
  const confirmDelete = $("confirmDelete");

  const contactList = document.querySelector("section");

  let editTargetId = null;
  let deleteTargetId = null;

  function renderContacts() {
    contactList.innerHTML = "";

    contacts.forEach((c) => {
      const card = document.createElement("div");
      card.className =
        "glass p-8 rounded-3xl text-center relative overflow-hidden";
      card.dataset.id = c.id;

      card.innerHTML = `
        <div class="absolute -top-10 -left-10 w-40 h-40 bg-pink-300 opacity-30 blur-3xl rounded-full"></div>
        <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-400 opacity-20 blur-3xl rounded-full"></div>

        <div class="relative z-10">
          <p class="text-xl font-bold text-pink-700 tracking-wide">${c.fullname}</p>
          <p class="text-sm text-gray-700 opacity-70">${c.email}</p>
          <p class="text-sm text-gray-700 opacity-70">${c.phone}</p>
          <p class="text-sm text-gray-700 opacity-70 mb-6">${c.location}</p>

          <div class="flex justify-center space-x-4">
            <button class="glass-btn px-6 py-2 rounded-xl text-pink-700 font-semibold shadow btnEdit">Edit</button>
            <button class="glass-btn px-6 py-2 rounded-xl text-red-500 font-semibold shadow btnDelete">Delete</button>
          </div>
        </div>
      `;

      contactList.appendChild(card);
    });

    attachButtonEvents();
  }

  renderContacts();

  btnAdd.onclick = () => addModal.classList.remove("hidden");
  closeAdd.onclick = () => addModal.classList.add("hidden");

  saveAdd.onclick = () => {
    const inputs = addModal.querySelectorAll("input");

    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const phone = inputs[2].value.trim();
    const location = inputs[3].value.trim();

    if (!name) return alert("Name cannot be empty!");

    const newContact = {
      id: Date.now(),
      fullname: name,
      email,
      phone,
      location,
    };

    contacts.push(newContact);
    saveToLocal();
    renderContacts();

    inputs.forEach((i) => (i.value = ""));
    addModal.classList.add("hidden");
  };

  function attachButtonEvents() {
    document.querySelectorAll(".btnEdit").forEach((btn) => {
      btn.onclick = () => {
        const card = btn.closest(".glass");
        editTargetId = Number(card.dataset.id);

        const contact = contacts.find((c) => c.id === editTargetId);

        const inputs = editModal.querySelectorAll("input");
        inputs[0].value = contact.fullname;
        inputs[1].value = contact.email;
        inputs[2].value = contact.phone;
        inputs[3].value = contact.location;

        editModal.classList.remove("hidden");
      };
    });

    document.querySelectorAll(".btnDelete").forEach((btn) => {
      btn.onclick = () => {
        const card = btn.closest(".glass");
        deleteTargetId = Number(card.dataset.id);
        deleteModal.classList.remove("hidden");
      };
    });
  }

  closeEdit.onclick = () => editModal.classList.add("hidden");

  saveEdit.onclick = () => {
    const inputs = editModal.querySelectorAll("input");

    const contact = contacts.find((c) => c.id === editTargetId);

    contact.fullname = inputs[0].value;
    contact.email = inputs[1].value;
    contact.phone = inputs[2].value;
    contact.location = inputs[3].value;

    saveToLocal();
    renderContacts();
    editModal.classList.add("hidden");
  };

  closeDelete.onclick = () => deleteModal.classList.add("hidden");

  confirmDelete.onclick = () => {
    contacts = contacts.filter((c) => c.id !== deleteTargetId);
    saveToLocal();
    renderContacts();
    deleteModal.classList.add("hidden");
  };

  const searchInput = $("searchInput");

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    document.querySelectorAll("section > div.glass").forEach((card) => {
      const name = card.querySelector("p").textContent.toLowerCase();
      card.style.display = name.includes(keyword) ? "block" : "none";
    });
  });
});
