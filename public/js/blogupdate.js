const clickHandler = async (event) => {
    // if (event.target.hasAttribute('data-id')) {
    //   const id = event.target.getAttribute('data-id');
    //   console.log(id);
    //   const response = await fetch(`/api/profile/${id}`, {
    //     method: 'DELETE',
    //   });
  
    //   if (response.ok) {
    //     document.location.replace('/api/profile');
    //   } else {
    //     alert('Failed to delete project');
    //   }
    // }

    if (event.target.hasAttribute('data-update')) {
        const formData = {};
        const newTitle = $('#blog-title').val();
        const newText  = $('#blog-text').val();
        // console.log(newTitle + NewText);
        const id = event.target.getAttribute('data-update');
        formData.title = newTitle;
        formData.description = newText;
        console.log(formData);
        console.log(id);
        const response = await fetch(`/api/blogs/${id}` , {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
    
        if (response.ok) {
          document.location.replace('/api/profile');
        } else {
          alert('Failed to delete project');
        }
      }
  };



$(document).on('click', clickHandler);
