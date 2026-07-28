document.querySelectorAll('.modal-open').forEach((el) => {
    el.addEventListener('click', (e) => {
        openModal(e.currentTarget.dataset.target);
    });
});

document.querySelectorAll('.modal-close').forEach((el) => {
  el.addEventListener('click', (e) => {
    closeModal(e.currentTarget.dataset.target);
  });
});

function openModal(target) {
    if (typeof target === 'string') {
        target = document.querySelector(target);
    }

    if (!target) {
        console.error('Modal target not found');
        return;
    }

    createElements(target.querySelector('.generated-container'), 0, 100);

    target.classList.remove('hide');
}

function closeModal(target) {
  if (typeof target === 'string') {
    target = document.querySelector(target);
  }

  if (!target) {
    console.error('Modal target not found.');
    return;
  }

  const generatedContainer = target.querySelector('.generated-container');
  
  generatedContainer.querySelectorAll('.generated-el').forEach((el) => { 
    el.remove();
  });

  target.classList.add('hide');
}

function createElements(parent, count = 0, limit = 100) {

  if (count >= limit) {
    return;
  }

  const el = document.createElement('div');
  el.textContent = `Element ${count + 1}`;
  el.classList.add('generated-el');


  parent.appendChild(el);

  createElements(parent, count + 1, limit);
}