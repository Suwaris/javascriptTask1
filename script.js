var form = document.getElementById("myForm")

form.addEventListener('submit',function(e){
    e.preventDefault() //prevent auto submit the form


    var search = document.getElementById('search').value

    var originalName = search.split(' ').join('')
    //alert(originalName)

    var token = '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';
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);

    fetch(`https://api.github.com/users/${originalName}?q=Q`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((result) => result.json())
    .then((data) => {
        if(data.message){
            document.getElementById("result").innerHTML = `<h3>Profile Not Found</h3>`
        } else{
            console.log(data)
            document.getElementById("result").innerHTML = `

            <a href="https://www.github.com/${originalName}"><img src="${data.avatar_url}" class="avatar"/></a>
            <p class="gitname">${data.name}</p>
            <p class="gitUname">${data.login}</p>

            <div class="data">           
            <i class="fa fa-user-o" aria-hidden="true" id="userIcon"><p>${data.followers } Followers ${data.following } Following ${data.public_repos } Repositories</p></i>
            <div>
            <i class="fa fa-user-o" aria-hidden="true"><p>${data.location }</p></i>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">Bio</h5>
                      <p>${data.bio}</p>
                    </div>
                </div>   
            </div>
            `
        }
       
    }).catch(err => {
        console.log(err)
    })
})
