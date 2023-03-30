var form = document.getElementById("myForm")

form.addEventListener('submit',function(e){
    e.preventDefault() //prevent auto submit the form


    var search = document.getElementById('search').value

    var originalName = search.split(' ').join('')
    //alert(originalName)

    var token = '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';
    var headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + token);

    //get user details
    fetch(`https://api.github.com/users/${originalName}?q=Q`, {
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // }
    })
    .then((result) => result.json())
    .then((data) => {
        if(data.message){
            document.getElementById("result").innerHTML = `<h3>Profile Not Found</h3>`
        } else{
            console.log(data)
            document.getElementById("result").innerHTML = `

            <div class="detailBox">
                <a href="https://www.github.com/${originalName}"><img src="${data.avatar_url}" class="avatar"/></a>
                <p class="gitname">${data.name}</p>
                <p class="gitUname">${data.login}</p>

                <div class="location">
                    <p>${data.location}</p>
                </div>

                <div class="bio">
                    <p>${data.bio}</p>
                </div>

                <div class="data">                          
                    <p>${data.followers } Followers ${data.following } Following ${data.public_repos } Repositories</p>
                </div>        
            </div>
            
            `
        }
       
    }).catch(err => {
        console.log(err)
    })


    //repository details
    fetch(`https://api.github.com/users/${originalName}/repos`, {
        // headers: {
        //     'Authorization': `Bearer ${token}`,
        //     Accept: "application/vnd.github+json"
        // }
    })

    .then((response) => response.json())
    .then((data1) => {
        if (data1 && data1.length > 0) {
            const repos = data1.map((repo) => `<li>${repo.name}</li>`).join("");
            document.getElementById("response").innerHTML = `
                <div class="card" style="width: 100%;">
                    <div class="card-body">
                        <h5 class="card-title">Repositories</h5>
                        <ul>${repos}</ul>
                    </div>
                </div>
            `;
        } else {
            document.getElementById("response").innerHTML = `<h3>Repositories Not Found</h3>`;
        }
    }).catch((error) => console.error(error));
})
