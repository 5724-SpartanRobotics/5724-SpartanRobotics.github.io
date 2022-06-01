// This script is primarily for the Blue Ridge Brawl dropdown, which is unique
// because it is both a clickable link and an expandable menu. Since this is not
// directly supported in Bootstrap, this code implements it. When the menu is
// displaying in desktop mode (i.e., all across the top of the screen), hovering
// over the BRB tab makes the dropdown appear and clicking the arrow does nothing.
// When displayed in mobile mode (i.e., whole menu is collapsed by default and is
// expanded by clicking a button), clicking the dropdown arrow toggles the
// dropdown menu, and there is no concept of hovering to do anything.
document.addEventListener('DOMContentLoaded', function () {
    // The button used to expand the navbar on mobile; checking its visibility allows
    // us to detect if the navbar is in desktop or mobile mode.
    const navbarButton = document.getElementById('navExpandButton');
    const dropdowns = document.getElementsByClassName('linked-dropdown');

    // If the navbar button is set to display: none, we are in desktop mode. Otherwise,
    // if the button is visible, the navbar must be in mobile mode.
    function isDesktop() {
        return window.getComputedStyle(navbarButton, null).display == 'none';
    }

    for (let i = 0; i < dropdowns.length; i++) {
        // Note that this CANNOT be a 'var', it must be a let or a const. Otherwise,
        // this code will fail for multiple dropdown menus because of the closures.
        const dropdown = dropdowns[i];

        let dropdownToggle;
        let dropdownMenu;

        for (let i = 0; i < dropdown.children.length; i++) {
            let child = dropdown.children[i];

            if (child.classList.contains('dropdown-toggle-spartan')) {
                dropdownToggle = child;
            } else if (child.classList.contains('dropdown-menu')) {
                dropdownMenu = child;
            }
        }

        dropdownToggle.onclick = function () {
            // Click to toggle dropdown only when in mobile mode
            if (!isDesktop()) {
                if (dropdownMenu.classList.contains('show')) {
                    dropdownMenu.classList.remove('show');
                } else {
                    dropdownMenu.classList.add('show');
                }
            }
        }

        dropdown.onmouseover = function () {
            // Hover to toggle dropdown only when in desktop mode
            if (isDesktop()) {
                for (let j = 0; j < dropdown.children.length; j++) {
                    let child = dropdown.children[j];

                    if (child.classList.contains('dropdown-menu')) {
                        child.classList.add('show');
                    }
                }
            }
        };

        dropdown.onmouseout = function () {
            // Hover to toggle dropdown only when in desktop mode
            if (isDesktop()) {
                for (let j = 0; j < dropdown.children.length; j++) {
                    let child = dropdown.children[j];

                    if (child.classList.contains('dropdown-menu')) {
                        child.classList.remove('show');
                    }
                }
            }
        };
    }
});
