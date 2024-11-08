document.addEventListener('DOMContentLoaded', () => {
    const dropzone = document.getElementById('dropzone');
    const propertiesForm = document.getElementById('properties-form');
    const contentInput = document.getElementById('content');
  
    let selectedElement = null;
  
    document.querySelectorAll('.element').forEach(element => {
      element.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('type', element.getAttribute('data-type'));
      });
    });
  
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
  
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      const type = e.dataTransfer.getData('type');
      const newElement = createElement(type);
      dropzone.appendChild(newElement);
    });
  
    dropzone.addEventListener('click', (e) => {
      if (e.target.classList.contains('dropped-element')) {
        selectedElement = e.target;
        contentInput.value = selectedElement.textContent;
      }
    });
  
    propertiesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (selectedElement) {
        selectedElement.textContent = contentInput.value;
      }
    });
  
    function createElement(type) {
      const element = document.createElement('div');
      element.classList.add('dropped-element');
      element.textContent = `New ${type}`;
      if (type === 'image') {
        element.innerHTML = `<img src="https://via.placeholder.com/100" alt="Placeholder">`;
      } else if (type === 'button') {
        element.innerHTML = `<button>Button</button>`;
      }
      return element;
    }
  });
  