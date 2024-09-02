// Create Auth Cookies
function create_auth_cookies(username, token) {
    document.cookie = `LIF_USERNAME=${username};path=/;domain=.lifplatforms.com`;
    document.cookie = `LIF_TOKEN=${token};path=/;domain=.lifplatforms.com`;
}

// Remove Auth Cookies
function remove_auth_cookies() {
    document.cookie = "LIF_USERNAME=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=.lifplatforms.com";
    document.cookie = "LIF_TOKEN=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=.lifplatforms.com";
}