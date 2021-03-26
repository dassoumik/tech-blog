const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const needed_funding = document.querySelector('#project-funding').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  console.log("in del event");
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(id);
    const response = await fetch(`/api/profile/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/api/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

const createHandler = async (event) => {
  
    const response = await fetch(`/api/blogs`, {
      method: 'GET',
    });

    if (response.ok) {
      document.location.replace('/api/blogs');
    } else {
      alert('Failed to delete project');
    }
  };


document
  .querySelector('.new-project-form')
  // .addEventListener('submit', newFormHandler);

document
  .querySelector('.create-project')
  .addEventListener('click', createHandler);

// const delButton = document
//   .querySelectorAll('.fa-trash-alt');
// delButton.addEventListener('click', delButtonHandler);
$(document).on('click', delButtonHandler);
