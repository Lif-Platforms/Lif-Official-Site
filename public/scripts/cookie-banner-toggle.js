// Wait for page to fully load before checking cookie status
document.addEventListener("DOMContentLoaded", function() {
    // Get user cookie accept cookie
    const cookie = Cookies.get("User-Cookie-Accept");

    // Check if user accepted the use of cookies
    if (!cookie) {
        // Show cookie banner
        document.getElementById("cookie-banner").className = "cookie-banner-open";
    }
});

// Sets user accept cookie and close cookie banner
function accept_cookies() {
    document.getElementById('cookie-banner').className = "cookie-banner-closed";
    Cookies.set("User-Cookie-Accept");
}