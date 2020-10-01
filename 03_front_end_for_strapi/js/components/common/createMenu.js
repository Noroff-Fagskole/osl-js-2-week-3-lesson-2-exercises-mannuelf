import { getUsername } from "../../utils/storage.js";

export default function creatMenu() {
  const { pathname } = document.location;
  const username = getUsername();
  const container = document.querySelector(".menu-container");
  let authLink = `<a href="login.html" class="${
                        pathname === "login.html" ||
                        pathname === "/03_front_end_for_strapi/login.html" ? "active" : "" }">
                          Login
                 </a>`;

  if(username) {
    authLink = `<a href="./add.html" class="${
                    pathname === "add.html" ||
                    pathname === "/03_front_end_for_strapi/add.html" ? "active" : "" }">
                  Add Products
                </a> | <span>Welcome back ${username}</span>`;
  }

  container.innerHTML = `<div class="menu">
                          <a href="./" class="${
                          pathname === "/" ||
                          pathname === "index.html" ||
                          pathname === "/03_front_end_for_strapi/index.html" ||
                          pathname === "/03_front_end_for_strapi/" ? "active" : "" }">Home</a> |

                          ${authLink}
                        </div>`;
}
