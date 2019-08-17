// The following code controls the menu opening and closing on mobile.
/** BEGIN NAVIGATION MENU MOBILE OPEN/CLOSE CODE */

// Select DOM items
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

// Set initial state of menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add('close');
    menu.classList.add('show');
    menuNav.classList.add('show');
    menuBranding.classList.add('show');
    navItems.forEach(function(item) { item.classList.add('show'); });

    // Set menu state
    showMenu = true;
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    menuBranding.classList.remove('show');
    navItems.forEach(function(item) { item.classList.remove('show'); });

    // Set menu state
    showMenu = false;
  }
}

/** END NAVIGATION MENU MOBILE OPEN/CLOSE CODE */

// The following code controls menu subitems (such as items under
// Blue Ridge Brawl) opening and closing.
/** BEGIN NAVIGATION MENU SUB-ITEM OPEN/CLOSE CODE */

// Setup subitem opening and closing
function setup() {
  var expandableItems = document.getElementsByClassName('nav-link-expandable');

  // Process each nav item that is expandable
  for (var j = 0; j < expandableItems.length; j++) {
    var navItem = expandableItems[j];
    var downarrow;
    var sublist;

    // Find the downarrow element for the item
    for (var i = 0; i < navItem.children.length; i++) {
      if (navItem.children[i].classList.contains('nav-down-arrow')) {
        downarrow = navItem.children[i];
        break;
      }
    }

    // Find the subitem list
    var siblings = navItem.parentElement.children;

    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i].classList.contains('menu-sublist')) {
        sublist = siblings[i];
        break;
      }
    }

    // Add a click event to the menu downarrow
    downarrow.sublist = sublist;
    downarrow.onclick = function() {
      this.sublist.hidden = !this.sublist.hidden;
    };

  };
}

setup();

/** END NAVIGATION MENU SUB-ITEM OPEN/CLOSE CODE */