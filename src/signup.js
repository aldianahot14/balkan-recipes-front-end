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

    const response = await axios.post("http://localhost:3000/user/signup", {username: userNameSignUp, password: passwordSignUp})
    
     console.log(response.data)

     if (response.status === 200){
        window.location.href = 'http://127.0.0.1:5501/public/#';

     }

   } catch (error) {
    'your code does not run'
   }}