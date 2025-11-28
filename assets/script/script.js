document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const btnAdd = $("btnAdd");
  const addModal = $("addModal");
  const closeAdd = $("closeAdd");

  const editModal = $("editModal");
  const closeEdit = $("closeEdit");

  const deleteModal = $("deleteModal");
  const closeDelete = $("closeDelete");

  const contactList = document.querySelector("section");

  let editTargetCard = null;
  let deleteTargetCard = null;

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  renderContacts();

  btnAdd.onclick = () => addModal.classList.remove("hidden");
  closeAdd.onclick = () => addModal.classList.add("hidden");

  const addInputs = addModal.querySelectorAll("input");

  addModal.querySelector("button:nth-child(2)").onclick = () => {
    const name = addInputs[0].value.trim();
    const email = addInputs[1].value.trim();
    const phone = addInputs[2].value.trim();
    const location = addInputs[3].value.trim();

    if (!name) return alert("Name cannot be empty!");

    const newContact = { id: Date.now(), name, email, phone, location };
    contacts.push(newContact);
    saveContacts();

    renderContacts();

    addInputs.forEach((input) => (input.value = ""));
    addModal.classList.add("hidden");
  };

  closeEdit.onclick = () => editModal.classList.add("hidden");

  editModal.querySelector("button:nth-child(2)").onclick = () => {
    if (!editTargetCard) return;

    const inputs = editModal.querySelectorAll("input");

    editTargetCard.name = inputs[0].value;
    editTargetCard.email = inputs[1].value;
    editTargetCard.phone = inputs[2].value;
    editTargetCard.location = inputs[3].value;

    saveContacts();
    renderContacts();

    editModal.classList.add("hidden");
  };

  closeDelete.onclick = () => deleteModal.classList.add("hidden");

  deleteModal.querySelector("button:nth-child(2)").onclick = () => {
    if (deleteTargetCard) {
      contacts = contacts.filter((c) => c.id !== deleteTargetCard.id);
      saveContacts();
      renderContacts();
    }
    deleteModal.classList.add("hidden");
  };

  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll("section > div.glass");

    cards.forEach((card) => {
      const name = card
        .querySelector(".contact-name")
        .textContent.toLowerCase();

      card.style.display = name.includes(keyword) ? "block" : "none";
    });
  });

  function renderContacts() {
    contactList.innerHTML = "";

    contacts.forEach((contact) => {
      const card = document.createElement("div");
      card.className =
        "glass p-8 rounded-3xl text-center relative overflow-hidden";

      card.innerHTML = `
        <div class="absolute -top-10 -left-10 w-40 h-40 bg-pink-300 opacity-30 blur-3xl rounded-full"></div>
        <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-400 opacity-20 blur-3xl rounded-full"></div>

        <div class="relative z-10">
          <p class="contact-name text-xl font-bold text-pink-700 tracking-wide">${contact.name}</p>
          <p class="text-sm text-gray-700 opacity-70">${contact.email}</p>
          <p class="text-sm text-gray-700 opacity-70">${contact.phone}</p>
          <p class="text-sm text-gray-700 opacity-70 mb-6">${contact.location}</p>

          <div class="flex justify-center space-x-4">
            <button class="glass-btn px-6 py-2 rounded-xl text-pink-700 font-semibold shadow btnEdit">Edit</button>
            <button class="glass-btn px-6 py-2 rounded-xl text-red-500 font-semibold shadow btnDelete">Delete</button>
          </div>
        </div>
      `;

      attachButtonEvents(card, contact);
      contactList.appendChild(card);
    });
  }

  function attachButtonEvents(card, contact) {
    const btnEdit = card.querySelector(".btnEdit");
    const btnDelete = card.querySelector(".btnDelete");

    btnEdit.onclick = () => {
      editTargetCard = contact;

      const inputs = editModal.querySelectorAll("input");
      inputs[0].value = contact.name;
      inputs[1].value = contact.email;
      inputs[2].value = contact.phone;
      inputs[3].value = contact.location;

      editModal.classList.remove("hidden");
    };

    btnDelete.onclick = () => {
      deleteTargetCard = contact;
      deleteModal.classList.remove("hidden");
    };
  }

  function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
});
