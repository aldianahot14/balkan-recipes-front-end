const signupButton = document.getElementById("signup")

let userinfo = {}

signupButton.addEventListener("click", function (e) {
    e.preventDefault()
    console.log("click")
    signup()
})

async function signup(){

   try {

    const userNameSignUp = document.getElementById("username-signup").value
    const passwordSignUp = document.getElementById("password-signup").value
    console.log(userNameSignUp)
    console.log(passwordSignUp)

    const response = await axios.post("https://backendbalkanrecipes-9d325c3004a0.herokuapp.com/user/signup", {username: userNameSignUp, password: passwordSignUp})
    
     console.log(response.data)

     if (response.status === 200){
        window.location.href = '../index.html';

     }

   } catch (error) {
    'your code does not run'
   }}