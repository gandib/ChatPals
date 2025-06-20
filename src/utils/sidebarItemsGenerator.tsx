/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import type { TUserPath } from "../types";
import type { ItemType } from "antd/es/menu/interface";

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: ItemType<any>[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, []);
  return sidebarItems;
};
