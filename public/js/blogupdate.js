const clickHandler = async (event) => {

    console.log("in click body");
    if (event.target.hasAttribute('data-update')) {
        const formData = {};
        const newTitle = $('#blog-title').val();
        const newText = $('#blog-text').val();
        const id = event.target.getAttribute('data-update');
        formData.title = newTitle;
        formData.description = newText;
        console.log(formData);
        console.log(id);
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            document.location.replace('/api/profile');
        } else {
            alert('Failed to delete project');
        }
    }

    if (event.target.hasAttribute('data-save')) {
        console.log("in comment save");
        commentData = {};
        commentData.description = $('.new-comment').val();
        commentData.blog_id = event.target.getAttribute('data-save');
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        });

        if (response.ok) {
            document.location.replace('/api/profile');
        } else {
            alert('Failed to add comment');
        }
    }
};

async function addComment() {
    commentArea = $('<textarea class="m-3 border new-comment rounded-lg" style="width: 80%;"></textarea><br>');
    $('.create-comment').before(commentArea);
    commentArea.addClass('comment-area');
    $('.save-comment').removeClass('d-none');
    // $('.create-comment').before('<button class="btn button btn-secondary save-comment" data-save="save-comment"><i class="fas fa-save"></i> Save</button>');
    $('.create-comment').addClass('d-none');
}

async function saveComment() {

}



$('.create-comment').on('click', addComment);
$('.save-comment').on('click', saveComment);


$(document).on('click', clickHandler);