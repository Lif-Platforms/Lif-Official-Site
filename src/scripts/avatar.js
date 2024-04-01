// Authenticate with auth server
fetch("https://api.auth.lifplatforms.com/auth/verify_token")
.then((response) => {
    if (!response.ok) {
        // Update avatar image
        document.getElementById("user-avatar").innerHTML = "<img src='https://api.auth.lifplatforms.com/profile/get_avatar/null'>";
    }
})