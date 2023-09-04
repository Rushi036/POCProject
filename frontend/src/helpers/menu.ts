import {
  MENU_ITEMS,
  HORIZONTAL_MENU_ITEMS,
  TWO_COl_MENU_ITEMS,
  MenuItemTypes,
} from "../constants/menu";
// console.log("filter data", MENU_ITEMS.filter((modulePermission);)
const getMenuItems = () => {
  let filter_menu: any[] = [];
  let menuItem = [];
  const userDetails = JSON.parse(sessionStorage.getItem("User")!);
  // console.log("userdetail", JSON.parse(sessionStorage.getItem("User")!));
  let modulePermission: any[] = [];
  modulePermission = userDetails.permissions.permissions;
  const userEntity = userDetails.verifiedUser.businessEntity;
  //   NOTE - You can fetch from server and return here as well
  if (userEntity === "ABG") {
    return MENU_ITEMS;
  } else {
    filter_menu = [];
    for (let i = 0; i < modulePermission.length; i++) {
      menuItem = MENU_ITEMS.filter(
        (item) => item.label === modulePermission[i].moduleName
      );
      console.log(menuItem[0]);
      filter_menu.push(menuItem[0]);
    }
    console.log("filternenu", filter_menu);
    console.log("menu items", MENU_ITEMS);
    return filter_menu;
  }
};

const getHorizontalMenuItems = () => {
  // NOTE - You can fetch from server and return here as well
  return HORIZONTAL_MENU_ITEMS;
};

const getTwoColumnMenuItems = () => {
  // NOTE - You can fetch from server and return here as well
  return TWO_COl_MENU_ITEMS;
};

const findAllParent = (
  menuItems: MenuItemTypes[],
  menuItem: MenuItemTypes
): string[] => {
  let parents: string[] = [];
  const parent = findMenuItem(menuItems, menuItem["parentKey"]);

  if (parent) {
    parents.push(parent["key"]);
    if (parent["parentKey"])
      parents = [...parents, ...findAllParent(menuItems, parent)];
  }

  return parents;
};

const findMenuItem = (
  menuItems: MenuItemTypes[] | undefined,
  menuItemKey: MenuItemTypes["key"] | undefined
): MenuItemTypes | null => {
  if (menuItems && menuItemKey) {
    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].key === menuItemKey) {
        return menuItems[i];
      }
      var found = findMenuItem(menuItems[i].children, menuItemKey);
      if (found) return found;
    }
  }
  return null;
};

export {
  getMenuItems,
  getHorizontalMenuItems,
  getTwoColumnMenuItems,
  findAllParent,
  findMenuItem,
};
