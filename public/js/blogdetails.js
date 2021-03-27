const delButtonHandler = async (event) => {
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

  if (event.target.hasAttribute('data-write')) {
    const id = event.target.getAttribute('data-write');
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'GET',
    });
  }
};

$(document).on('click', delButtonHandler);