const createBlog = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const description = document.querySelector('#blog-text').value.trim();
  const dateCreated = document.querySelector('.current-date');
  const date_created = dateCreated.getAttribute('data-date').trim();

  if (title && description && date_created) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        date_created
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/api/profile');
    } else {
      alert('Failed to create blog');
    }
  }
};



document
  .querySelector('.create-blog')
  .addEventListener('click', createBlog);