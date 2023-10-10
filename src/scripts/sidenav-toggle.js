function OpenSideNav() {
    document.getElementById("side-nav").className = "hamburger-menu-show";
}

function CloseSideNav() {
    document.getElementById("side-nav").className = "hamburger-menu-hide";
}

function ToggleSideNav() {
    if (document.getElementById('side-nav').classList.contains('hamburger-menu-hide')) {
        document.getElementById('side-nav').className = "hamburger-menu-show";
    } else {
        document.getElementById('side-nav').className = "hamburger-menu-hide";
    }
}