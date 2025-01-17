/**
 * Creates an account panel element and inserts it into the DOM.
 * The panel's content depends on whether the user is signed in or not.
 *
 * @param {boolean} signedIn - Indicates if the user is signed in.
 */
function create_account_panel(signedIn) {
    // Get current URL path
    // Used to redirect users back to the current page after signing in or logging out
    const currentPath = window.location.pathname;

    // Create the html of the account panel depending on if the user is signed in
    const panelHtml = signedIn ? `
        <div class='panel-header'>
            <img src='https://api.auth.lifplatforms.com/profile/get_avatar/${Cookies.get('LIF_USERNAME')}.png'>
            <h1>${Cookies.get('LIF_USERNAME')}</h1>
        </div>
        <div class='panel-controls'>
            <button onclick="window.location.href = 'https://my.lifplatforms.com'">Manage Account</button>
            <button onclick="window.location.href = 'https://api.auth.lifplatforms.com/auth/logout?redirect=https://lifplatforms.com${currentPath}'">Log Out</button>
        </div>
    ` : `
        <div class='panel-header'>
            <img src='https://api.auth.lifplatforms.com/profile/get_avatar/default'>
            <h1>Guest</h1>
        </div>
        <div class='panel-controls'>
            <button onclick="window.location.href = 'https://my.lifplatforms.com/login?redirect=https://lifplatforms.com${currentPath}'">Sign In</button>
        </div>
    `;

    // Create account panel element
    const accountPanel = document.createElement('div');
    accountPanel.className = "nav-account-panel-hidden";
    accountPanel.id = "account-panel"
    accountPanel.innerHTML = panelHtml;

    // Insert panel into dom
    const panelParentElement = document.getElementById('topnav-user-avatar');
    panelParentElement.appendChild(accountPanel);
}

/**
 * Creates and inserts a user avatar image element into the DOM.
 *
 * @param {boolean} signedIn - Indicates whether the user is signed in.
 */
function create_user_avatar(signedIn) {
    // Get parent element for user avatar
    const avatarParentElement = document.getElementById('topnav-user-avatar');

    // Set image URL based on if the user is signed in
    const avatarURL = signedIn 
        ? `https://api.auth.lifplatforms.com/profile/get_avatar/${Cookies.get('LIF_USERNAME')}.png` 
        : 'https://api.auth.lifplatforms.com/profile/get_avatar/default';

    // Create avatar element
    const userAvatar = document.createElement('img');
    userAvatar.src = avatarURL;
    userAvatar.alt = "user avatar";
    userAvatar.onclick = toggle_account_panel;

    // Insert avatar into dom
    avatarParentElement.appendChild(userAvatar);
}

/**
 * Toggles the visibility of the account panel by changing its class name.
 * If the current class name is 'nav-account-panel-hidden', it changes to 'nav-account-panel-show'.
 * Otherwise, it changes back to 'nav-account-panel-hidden'.
 */
function toggle_account_panel() {
    // Get current class name of account panel
    const currentClass = document.getElementById('account-panel').className;

    if (currentClass === 'nav-account-panel-hidden') {
        document.getElementById('account-panel').className = "nav-account-panel-show";
    } else {
        document.getElementById('account-panel').className = "nav-account-panel-hidden";
    }
}

/**
 * Hides the account panel by changing its class name to "nav-account-panel-hidden".
 * This function selects the element with the ID 'account-panel' and modifies its class name
 * to hide the account panel from view.
 */
function hide_account_panel() {
    // Get account panel element
    const accountPanel = document.getElementById('account-panel');

    // Hide account panel
    accountPanel.className = "nav-account-panel-hidden";
}

// Verify auth credentials
fetch('https://api.auth.lifplatforms.com/auth/verify_token', {
    credentials: 'include'
})
.then((response) => {
    if (response.ok) {
        // Add avatar to dom
        create_user_avatar(true);

        // Add account panel to dom
        create_account_panel(true);
    } else {
        throw new Error('Request failed with status code: ' + response.status);
    }
})
.catch(() => {
    // Add avatar to dom
    create_user_avatar(false);

    // Add account panel to dom
    create_account_panel(false);
})

// Add event listener to document to close account panel when clicking outside of it
document.addEventListener('click', (event) => {
    const accountPanel = document.getElementById('account-panel');
    const avatar = document.getElementById('topnav-user-avatar');
    if (accountPanel && !accountPanel.contains(event.target) && !avatar.contains(event.target)) {
        hide_account_panel();
    }
});