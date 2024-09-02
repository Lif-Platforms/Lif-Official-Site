function OpenSideNav() {
    document.getElementById("side-nav").className = "hamburger-menu-show";
}

function CloseSideNav() {
    document.getElementById("side-nav").className = "hamburger-menu-hide";
}

function ToggleSideNav() {
    // Get elements
    const sideNav = document.getElementById('side-nav');
    const navBar = document.getElementById('navbar');
    const hamburger_icon = document.getElementById('hamburger-icon');

    if (sideNav.classList.contains('hamburger-menu-hide')) {
        sideNav.className = "hamburger-menu-show";
        navBar.style.borderBottom = "1px solid white";
        hamburger_icon.className = "topnav-hamburger-icon-open";
        
    } else {
        sideNav.className = "hamburger-menu-hide";
        navBar.style.borderBottom = "1px solid black";
        hamburger_icon.className = "topnav-hamburger-icon-closed";
    }
}