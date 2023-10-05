//initial product

let initialProducts = [
  {
    id: 1,
    title: "chudithor",
    description: "Women Cotton Printed Readymade Salwar Suit (Ready To Wear)",
    price: 549,
    thumbnail:
      "https://th.bing.com/th/id/OIP.TPpZ0c3jF8d5tL0XeaC-CwHaLB?pid=ImgDet&rs=1.jpg",
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
  },
  {
    id: 3,
    title: "perfume Oil",
    description: "Mega Discount, Impression of A...",
    price: 170,
    thumbnail: "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
  },
  {
    id: 4,
    title: "Infinix INBOOK",
    description: "Infinix Inbook X1 Ci3 10th 8GB...",
    price: 1099,
    thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
  },
  {
    id: 5,
    title: "MacBook Pro",
    description:
      "MacBook Pro 2021 with mini-LED display may launch between September, November",
    price: 1749,
    thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
  },
  {
    id: 6,
    title: "Samsung Galaxy Book",
    description:
      "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
    price: 1499,
    thumbnail: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
  },
];

//signup page
let initialuser = [
  {
    id: 1,
    usermail: "sowmiya123@gmail.com",
    userpassword: "sowmiya123",
  },
  {
    id: 2,
    usermail: "anu123@gmail.com",
    userpassword: "anu123",
  },
  {
    id: 3,
    usermail: "sowmiya123@admin.com",
    userpassword: "sowmiyaadmin",
  },
];

window.addEventListener("load", () => {
  if (!localStorage.getItem("users"))
    localStorage.setItem("users", JSON.stringify(initialuser));

  if (!localStorage.getItem("products"))
    localStorage.setItem("products", JSON.stringify(initialProducts));

  if (location.pathname === "/admin/user/index.html") loadHomepage(); //home page will load

  if (location.pathname === "/admin/admin.html") loadAdminpage();

  if (
    location.pathname === "/admin/user/index.html" ||
    location.pathname === "/admin/order.html" ||
    location.pathname === "/admin/user/card.html"
  )
    updateCartCount();

  if (location.pathname === "/admin/user/card.html") loadCartPage();
  if (location.pathname === "/admin/order.html") loadOrderPage();
  if (location.pathname === "/admin/adminorder.html") loadAdminorderpage();
});

// random number generator
// produce within 100 id

const getRandomNumber = (max = 1000) => {
  return Math.floor(Math.random() * max);
};

// creating user id
const getRandomUserId = (type = "users") => {
  let jsonArray = JSON.parse(localStorage.getItem(type));
  for (let i = 0; i < 10000; i++) {
    const randomId = getRandomNumber();

    const checkingId = jsonArray.find((obj) => obj.id === randomId);
    if (!checkingId) {
      return randomId;
    }
  }
};

//login page
const signup = () => {
  let usernameRef = document.getElementById("usermail");
  let userpwdRef = document.getElementById("userpassword");
  let errorRef = document.getElementById("error");

  if (usernameRef.value.length > 0 && userpwdRef.value.length > 0) {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(usernameRef.value)
    ) {
      let users = JSON.parse(localStorage.getItem("users"));
      const loggedUser = users.find(
        (user) =>
          user.usermail === usernameRef.value &&
          user.userpassword === userpwdRef.value
      );

      if (!loggedUser) {
        errorRef.innerText = "Invalid User";
      } else {
        sessionStorage.setItem("userId", loggedUser.id);
        if (usernameRef.value === "sowmiya123@admin.com")
          location.replace("/admin/admin.html");
        else location.replace("/admin/user/index.html");
      }
    } else {
      errorRef.innerText = " Please,Enter a valid mailId";
    }
  } else {
    errorRef.innerText = "Input cannot be empty";
  }
  usernameRef = "";
  userpwdRef = "";
};

//register page
const signin = () => {
  let nameRef = document.getElementById("name");
  let mailRef = document.getElementById("mail");
  let passwordRef = document.getElementById("pwd");
  let confirmpasswordRef = document.getElementById("pwd2");
  let errorRef = document.getElementById("error");
  let regexcheck = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  if (
    nameRef.value.length > 0 &&
    mailRef.value.length > 0 &&
    passwordRef.value.length > 0 &&
    confirmpasswordRef.value.length > 0
  ) {
    if (mailRef.value.match(regexcheck)) {
      console.log("inside regex");
      if (passwordRef.value === confirmpasswordRef.value) {
        let users = JSON.parse(localStorage.getItem("users"));
        users.push({
          id: getRandomUserId(),
          usermail: mailRef.value,
          userpassword: passwordRef.value,
        });
        localStorage.setItem("users", JSON.stringify(users));
        alert("login successfuly!!");
        location.href = "/admin/signin.html";
      } else {
        errorRef.innerText = "password are incorrect";
      }
    } else {
      errorRef.innerText = "Email is not in correct format";
    }
  } else {
    errorRef.innerText = "Fields are empty";
  }

  nameRef = "";
  mailRef = "";
  passwordRef = "";
  confirmpasswordRef = "";
};

//add product to home page
const loadHomepage = () => {
  const productrowRef = document.getElementById("productsrow");
  const products = JSON.parse(localStorage.getItem("products"));
  console.log("loadhome page");
  let add = "";
  for (let pro of products) {
    add += `<div class="col-4 mt-3>
    <div class="border rounded p-2 bg-primary-subtle border-primary-subtle w-100 d-flex flex-column>
    <img src="${pro.thumbnail}" alt="image" style="min-width-500px;height:200px;"/>
    <p class="fs-5 my-1 mt-2 ">${pro.title}</p>
    <p class="fs-5 my-1 mt-2 ">${pro.price}</p>
    <button class="btn bg-success mb-5" onClick="addToCart(${pro.id})">Add to Cart </button>
    </div>
    </div>`;
  }
  productrowRef.innerHTML = add;
};

//addtocart page
const addToCart = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  const product = products.find((p) => p.id === parseInt(id));

  if (!sessionStorage.getItem("userId")) {
    location.href = "/admin/user/signup.html";
  } else {
    let userId = parseInt(sessionStorage.getItem("userId"));
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    const cartProduct = cart.find(
      (c) => c.userId === parseInt(userId) && c.id === parseInt(id)
    );
    if (cartProduct) {
      cart = cart.map((c) => {
        if (c.id === parseInt(id) && c.userId === parseInt(userId)) {
          return { ...c, count: c.count + 1 };
        } else {
          return c;
        }
      });
    } else {
      cart.push({ userId: parseInt(userId), count: 1, ...product });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
};

//update  a cart count
const updateCartCount = () => {
  const cartcountRef = document.getElementById("cartCount");
  if (sessionStorage.getItem("userId")) {
    const userId = parseInt(sessionStorage.getItem("userId"));

    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const usercart = cart.filter((c) => c.userId === userId);

      if (usercart.length > 0) {
        const cartcount = usercart.reduce((a, cur) => {
          a += cur.count;
          return a;
        }, 0);
        cartcountRef.innerText = `cart - ${cartcount}`;
      } else cartcountRef.innerText = `cart`;
    } else {
      location.href = "/admin/user/signup.html";
    }
  }
};

//load a cart page
const loadCartPage = () => {
  const cartTableRef = document.getElementById("cartTableBody");
  const totalRef = document.getElementById("total");
  const emptyRef = document.getElementById("emptycart");
  const tableRef = document.getElementById("table");

  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (sessionStorage.getItem("userId")) {
      const userId = parseInt(sessionStorage.getItem("userId"));
      const usercart = cart.filter((c) => c.userId === userId);

      if (usercart.length > 0) {
        tableRef.classList.remove("visually-visible");
        emptyRef.classList.add("visually-hidden");
      } else {
        emptyRef.classList.remove("visually-hidden");
        tableRef.classList.add("visually-hidden");
      }

      let add = "";
      let total = 0;
      for (let item of usercart) {
        const count = item.count * item.price;
        total += parseInt(item.count) * parseInt(item.price);

        add += `<tr>
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.count}</td>
        <td>${item.price}</td>
        <td> ₹ ${count}</td>
        </tr>`;
      }
      cartTableRef.innerHTML = add;
      totalRef.innerText = `Total - ₹ ${total}`;
    } else {
      location.href = "/admin/user/signup.html";
    }
  }
};

//checkout detail page

const checkoutdetails = () => {
  // if (!sessionStorage.getItem("userId")) {
  //   location.href = "/admin/user/signup.html";
  // } else {
  //   let userId = parseInt(sessionStorage.getItem("userId"));
  //console.log("ordered");
  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const usercart = cart.filter((c) => c.userId === userId);
      console.log(usercart);
      let orders = [];
      if (localStorage.getItem("orders")) {
        orders = JSON.parse(localStorage.getItem("orders"));
      }
      console.log(orders);
      orders.push({
        timestamp: Date.now(),
        userId: userId,
        status: "pending",
        products: usercart,
      });
      console.log(orders.usercart);

      const otherUser = cart.filter((c) => c.userId !== userId);
      localStorage.setItem("cart", JSON.stringify(otherUser));
      localStorage.setItem("orders", JSON.stringify(orders));

      updateCartCount();
      location.href = "/admin/order.html";
    } else location.href = "/admin/user/index.html";
  } else {
    location.href = "/admin/user/signup.html";
  }
};

//load order in user page
const loadOrderPage = () => {
  //console.log("ordered");
  const tableRef = document.getElementById("table");
  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userOrder = orders.filter((c) => c.userId === userId);
      console.log(userOrder);

      let add = "";
      for (let order of userOrder) {
        let product = "";
        let total = 0;
        for (let pro of order.products) {
          product += `<p>${pro.count} * ${pro.title}</p>`;
          total += pro.count * pro.price;
        }

        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        add += `<tr>
        <td>${order.timestamp}</td>
        <td>${formattedDate}</td>
        <td>${product}</td>
        <td>₹ ${total}</td>
        <td>${order.status}</td></tr>`;
      }
      tableRef.innerHTML = add;
    } else location.href = "/admin/user/home.html";
  } else {
    location.href = "/admin/signin.html";
  }
};

//load order in admin page
const loadAdminorderpage = () => {
  const tableRef = document.getElementById("table");

  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));

      let body = "";
      for (let order of orders) {
        let product = "";
        let total = 0;
        for (let prod of order.products) {
          product += `<p>${prod.count} * ${prod.title}</p>`;
          total += prod.count * prod.price;
        }

        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        const users = JSON.parse(localStorage.getItem("users"));
        const orderedUser = users.find(
          (user) => user.id === parseInt(order.userId)
        );

        body += `<tr>
              <td>${order.timestamp}</td>
              <td>${formattedDate}</td>
              <td>${orderedUser.email}</td>
              <td>${product}</td>
              <td>₹ ${total}</td>
              <td>
                <select class="form-select" id="status-${order.timestamp}">
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>`;
      }
      tableRef.innerHTML = body;

      for (let order of orders) {
        const statusRef = document.getElementById(`status-${order.timestamp}`);
        statusRef.value = order.status;
        statusRef.addEventListener("change", () => {
          const lastUpdatedOrders = JSON.parse(localStorage.getItem("orders"));
          const updatedOrders = lastUpdatedOrders.map((o) => {
            if (o.timestamp === order.timestamp) {
              return { ...o, status: statusRef.value };
            } else return o;
          });
          localStorage.setItem("orders", JSON.stringify(updatedOrders));
        });
      }
    } else {
      location.href = "/admin/user/index.html";
    }
  } else {
    location.href = "/admin/user/signin.html";
  }
};

//add product to admin  page
const loadAdminpage = () => {
  const productsRef = document.getElementById("productsTableBody");
  const products = JSON.parse(localStorage.getItem("products"));

  let add = "";
  for (let pro of products) {
    add += `<tr>
    <td><img src ="${pro.thumbnail}" alt="image" class="img-fluid img-thumbnail" style="width:100px;height:75px"/></td>
    <td>${pro.title}</td>
    <td>${pro.description}</td>
    <td>${pro.price}</td>
    <td class="d-flex justify-content- center">
    <button class ="btn btn-primary me-2 " onClick="editproduct(${pro.id})">Edit</button>
    <button class ="btn btn-danger " onClick="deleteproduct(${pro.id})">Delete</button>
    </td>
    </tr>`;
  }
  productsRef.innerHTML = add;
};

//delete product in admin page

const deleteproduct = (id) => {
  const products = JSON.parse(localStorage.getItem("products"));
  const filteredproducts = products.filter((pro) => pro.id !== id);

  localStorage.setItem("products", JSON.stringify(filteredproducts));
  loadAdminpage();
};

//update the product
const saveorupdate = () => {
  const idRef = document.getElementById("id");
  const productRef = document.getElementById("product");
  const priceRef = document.getElementById("price");
  const descRef = document.getElementById("desc");
  const imageRef = document.getElementById("image");
  const toastRef = document.getElementById("toast");
  const toastmgsRef = document.getElementById("toastmessage");

  let products = JSON.parse(localStorage.getItem("products"));

  let id = idRef.value;
  //console.log(id);

  if (id) {
    const product = products.find((product) => product.id === parseInt(id));

    products = products.filter((product) => product.id !== parseInt(id));
    products.push({
      ...product,
      title: productRef.value,
      description: descRef.value,
      price: priceRef.value,
      thumbnail: imageRef.value,
    });

    toastRef.innerText = "Product added updatedfully!!!";
  } else {
    products.push({
      id: getRandomNumber("products"),
      title: productRef.value,
      description: descRef.value,
      price: priceRef.value,
      thumbnail: imageRef.value,
    });

    toastmgsRef.innerText = "Product added successfully!!!";
  }
  toastRef.classList.add("fade", "show");

  setTimeout(() => {
    toastRef.classList.remove("fade", "show");
  }, 2000);

  localStorage.setItem("products", JSON.stringify(products));
  location.href = "/admin/admin.html";
};

const logout = () => {
  console.log("checl");
  sessionStorage.removeItem("userId");
  location.replace("/admin/signin.html");
};
