if (typeof(Storage) === "undefined") {
  console.log("Local storage not supported!");
}

const uploadInput = document.getElementById('upload-pic');
const previewImg = document.getElementById('pfp');

// when image is clicked, trigger file upload
previewImg.addEventListener('click', () => {
  uploadInput.click();
});

// when a file is chosen, update the image preview
uploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    previewImg.src = URL.createObjectURL(file);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const statusEl = document.querySelector('.personal-msg');

  // Load saved status if it exists
  const savedStatus = localStorage.getItem('personal-status');
  if (savedStatus) {
    statusEl.innerHTML = savedStatus;
  }

  // Save on blur (when user finishes editing)
  statusEl.addEventListener('blur', () => {
    localStorage.setItem('personal-status', statusEl.innerHTML);
  });
});


window.addEventListener('DOMContentLoaded', () => {
  const lastLoginEls = document.querySelectorAll('.last-login li:nth-child(2)');

  const previousLogin = localStorage.getItem('last-login');

  const now = new Date();
  const formattedNow = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

  // Display the stored last login (or fallback)
  lastLoginEls.forEach((el) => {
    el.textContent = previousLogin || formattedNow;
  });

  // Now update localStorage with the current date
  localStorage.setItem('last-login', formattedNow);
});

document.querySelectorAll('.friend-pic-container figure').forEach((container) => {
  const img = container.querySelector('.friend-pic');
  const input = container.querySelector('.friend-upload');

  img.addEventListener('click', () => input.click());

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      img.src = URL.createObjectURL(file);
    }
  });
});

const draggables = document.querySelectorAll('.draggable-friend');
const container = document.querySelector('.friend-pic-container');

let draggedItem = null;

draggables.forEach((item) => {
  item.addEventListener('dragstart', () => {
    draggedItem = item;
    setTimeout(() => {
      item.style.display = 'none';
    }, 0);
  });

  item.addEventListener('dragend', () => {
    setTimeout(() => {
      item.style.display = 'block';
      draggedItem = null;
    }, 0);
  });

  item.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  item.addEventListener('dragenter', (e) => {
    e.preventDefault();
  });

  item.addEventListener('drop', () => {
    if (draggedItem && draggedItem !== item) {
      container.insertBefore(draggedItem, item);
    }
  });
});

document.querySelectorAll('label').forEach((label) => {
  const img = label.querySelector('.comment-pic');
  const input = label.querySelector('.comment-upload');

  if (img && input) {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        img.src = URL.createObjectURL(file);
      }
    });
  }
});

document.getElementById('submit-comment').addEventListener('click', () => {
  const author = document.getElementById('comment-author').value;
  const text = document.getElementById('comment-text').value.trim();

  if (!text) return;

  // Create a new comment block
  const comment = document.createElement('div');
  comment.classList.add('comment-box');

  comment.innerHTML = `
    <p class="comment-author"><strong>${author}</strong></p>
    <p class="comment-text">${text}</p>
  `;

  document.getElementById('comment-wall').appendChild(comment);
  document.getElementById('comment-text').value = '';
});