function getLocal() { /* check if data is already in local storage and if not then send request to GitHub */
    var username = document.getElementById("username").value;
    if (localStorage.getItem(username)) {

        show(JSON.parse(localStorage.getItem(username)))

    } else {

        getapi().then(x => show(x))
    }
}

async function getapi() { /* async function for handling requests and wll notify us if there is a user error or network error */
    var url = "https://api.github.com/users/" + document.getElementById("username").value;
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    if ('login' in data) {
        localStorage.setItem(data['login'], JSON.stringify(data))
        return data
    } else if (data['message'].toString().includes("Not Found")) //user error
        hide('user not found')
    else //network error
        hide('server timeout')
}

function show(x) { /* function for updating html inner parts with newly received data */
    if (x['login']) {
        document.getElementById("paragraph").style.boxShadow = "0px 1px 4px rgba(0, 0, 0, 0.16), 0px 0px 0px 3px rgba(51, 51, 51,1)";
        document.getElementById("name").innerHTML = 'name: ' + x['login'];
        document.getElementById("image").src = x['avatar_url']
        document.getElementById("blog").innerHTML = 'blog: ' + x['blog'];
        if (x['location'] != null)
            document.getElementById("location").innerHTML = 'location: ' + x['location'];
        else
            document.getElementById("location").innerHTML = "location: ";
        if (x['bio'] != null) {
            document.getElementById("bio").style.boxShadow = "0px 1px 4px rgba(0, 0, 0, 0.16), 0px 0px 0px 3px rgba(51, 51, 51,1)";
            document.getElementById("bio").innerHTML = x['bio'];
        } else {
            document.getElementById("bio").innerHTML = "";
            document.getElementById("bio").style.boxShadow = "";
        }
    }
}

function hide(message) { /* function for handling user error and network error */
    document.getElementById("third").style.display = "block";

    document.getElementById("not").innerHTML = message;

    setTimeout(() => {
        document.getElementById("third").style.display = "none";
    }, 3000);
}

var input = document.getElementById("username"); /* option for using event listener on enter key board for input username*/
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && input.toString() != '') {
        event.preventDefault();
        document.getElementById("submit").click();
    }
});
