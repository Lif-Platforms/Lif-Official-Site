function toggle_account_panel() {
    const account_panel = document.getElementById("account_panel");

    // Check class name
    if (account_panel.className === "closed") {
        account_panel.className = "open";

    } else {
        account_panel.className = "closed";
    }

}

// Authenticate with auth server
fetch("https://api.auth.lifplatforms.com/auth/verify_token")
.then((response) => {
    if (response.ok) {
        // Get username
        const username = Cookies.get("LIF_USERNAME");

        // Update avatar image
        document.getElementById("user-avatar").innerHTML = `
                                                            <img onclick='toggle_account_panel()' src='https://api.auth.lifplatforms.com/profile/get_avatar/null' alt='User Avatar'>
                                                            <iframe class='closed' id='account_panel' src='https://api.auth.lifplatforms.com/profile/get_profile/${username}?service_url="https://lifplatforms.com'></iframe>
                                                            `;
    } else {
        throw new Error("Request failed with status code: " + response.status);
    }
})
.catch((error) => {
    console.error(error);

    // Update avatar image
    document.getElementById("user-avatar").innerHTML = `
                                                        <img onclick='toggle_account_panel()' src='https://api.auth.lifplatforms.com/profile/get_avatar/null' alt='User Avatar'>
                                                        <iframe class='closed' id='account_panel' src='https://api.auth.lifplatforms.com/profile/get_profile/guest?service_url="https://lifplatforms.com'></iframe>
                                                       `;
})