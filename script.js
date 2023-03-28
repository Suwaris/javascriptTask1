var form = document.getElementById("myForm")

form.addEventListener('submit',function(e){
    e.preventDefault() //prevent auto submit the form

    var search = document.getElementById("serach").value

    var originalName = search.split(' ').join('')
    alert(originalName)

    fetch(`https://api.github.com/users?q=$(originalName)`)
    .then((result) => result.json())
    .then((data) => {
        if(data.message){
            document.getElementById("result").innerHTML = `<h3>Profile Not Found</h3>`
        } else{
            console.log(data)
            document.getElementById("result").innerHTML = `
            <img src="${data.avatar_url}"/>
            <p>${data.name} (${data.login})</p>
            `
        }
       
    }).catch(err => {
        console.log(err)
    })
})