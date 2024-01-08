const loginButton = document.getElementById("loginhere")

let userinfo = {}

loginButton.addEventListener("click", function (e){
    e.preventDefault()
    console.log("click")
    login()

})


async function login(){

    try {
        // this is getting the usn and password that was types in my login.html
    const userName = document.getElementById("username").value
    const password = document.getElementById("password").value
    console.log(userName)
    console.log(password)

    //I am communicating with my mongoDB locally - i am posting my username and password to post it - so i can work with my backend login function 
    const response = await axios.post("https://backendbalkanrecipes-9d325c3004a0.herokuapp.com/user/login", {username: userName, password: password})

    console.log(response.data)

if (response.status === 200){
    //grabbing the token that is created with someone signs in- we need this because we are going to a pswd protected portion of website 
    localStorage.setItem("token", response.data.token)
    console.log(response.data.token, response.data)

    userinfo = response.data.user
    console.log()
  // Navigate to the desired URL after successful login
    window.location.href = '../index.html';

}

    } catch (error) {
        
    }
}

