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

  btnAdd.onclick = () => addModal.classList.remove("hidden");
  closeAdd.onclick = () => addModal.classList.add("hidden");

  closeEdit.onclick = () => editModal.classList.add("hidden");

  closeDelete.onclick = () => deleteModal.classList.add("hidden");

  const addInputs = addModal.querySelectorAll("input");
  const btnSaveAdd = addModal.querySelector(".btnSaveAdd");

  addModal.querySelector("button:nth-child(2)").onclick = () => {
    const name = addInputs[0].value.trim();
    const email = addInputs[1].value.trim();
    const phone = addInputs[2].value.trim();
    const location = addInputs[3].value.trim();

    if (!name) return alert("Name cannot be empty!");

    const card = document.createElement("div");
    card.className =
      "glass p-8 rounded-3xl text-center relative overflow-hidden";

    card.innerHTML = `
        <div class="absolute -top-10 -left-10 w-40 h-40 bg-pink-300 opacity-30 blur-3xl rounded-full"></div>
        <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-400 opacity-20 blur-3xl rounded-full"></div>

        <div class="relative z-10">
          <p class="text-xl font-bold text-pink-700 tracking-wide">${name}</p>
          <p class="text-sm text-gray-700 opacity-70">${email}</p>
          <p class="text-sm text-gray-700 opacity-70">${phone}</p>
          <p class="text-sm text-gray-700 opacity-70 mb-6">${location}</p>

          <div class="flex justify-center space-x-4">
            <button class="glass-btn px-6 py-2 rounded-xl text-pink-700 font-semibold shadow btnEdit">Edit</button>
            <button class="glass-btn px-6 py-2 rounded-xl text-red-500 font-semibold shadow btnDelete">Delete</button>
          </div>
        </div>
      `;

    contactList.appendChild(card);

    attachButtonEvents(card);

    addInputs.forEach((input) => (input.value = ""));

    addModal.classList.add("hidden");
  };

  function attachButtonEvents(card) {
    const btnEdit = card.querySelector(".btnEdit");
    btnEdit.onclick = () => {
      editTargetCard = card;
      const fields = card.querySelectorAll("p");

      editModal.querySelectorAll("input")[0].value = fields[0].textContent;
      editModal.querySelectorAll("input")[1].value = fields[1].textContent;
      editModal.querySelectorAll("input")[2].value = fields[2].textContent;
      editModal.querySelectorAll("input")[3].value = fields[3].textContent;

      editModal.classList.remove("hidden");
    };

    const btnDelete = card.querySelector(".btnDelete");
    btnDelete.onclick = () => {
      deleteTargetCard = card;
      deleteModal.classList.remove("hidden");
    };
  }

  document.querySelectorAll(".btnEdit, .btnDelete").forEach((btn) => {
    attachButtonEvents(btn.closest("div.glass"));
  });

  editModal.querySelector("button:nth-child(2)").onclick = () => {
    if (!editTargetCard) return;

    const inputs = editModal.querySelectorAll("input");
    const fields = editTargetCard.querySelectorAll("p");

    fields[0].textContent = inputs[0].value;
    fields[1].textContent = inputs[1].value;
    fields[2].textContent = inputs[2].value;
    fields[3].textContent = inputs[3].value;

    editModal.classList.add("hidden");
  };

  deleteModal.querySelector("button:nth-child(2)").onclick = () => {
    if (deleteTargetCard) deleteTargetCard.remove();
    deleteModal.classList.add("hidden");
  };

  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll("section > div.glass");

    cards.forEach((card) => {
      // Ambil <p> pertama yang berisi NAME
      const name = card.querySelectorAll("p")[0].textContent.toLowerCase();

      if (name.includes(keyword)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
