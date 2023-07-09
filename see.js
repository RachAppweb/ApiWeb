// Setup UI
const baseUrl = "https://tarmeezacademy.com/api/v1";
let boton = document.getElementById("boton");
// let commentform = document.getElementById("commentform");

function setupUI() {
  token = localStorage.getItem("token");
  //   const login = document.getElementById("login");
  //   const register = document.getElementById("register");
  //   const logoute = document.getElementById("logoute");
  let after = document.getElementById("after");
  let logsign = document.getElementById("logsign");
  let commentA = document.getElementById("commentA");
  let Pcomm = document.getElementById("Pcomm");
  if (token == null) {
    logsign.style.setProperty("display", "flex", "important");
    after.style.setProperty("display", "none", "important");
    // if (window.location.href == `second.html`) {
    // commentA.style.setProperty("display", "none", "important");
    // Pcomm.style.setProperty("display", "none", "important");
    // }

    if (boton != null) {
      boton.style.setProperty("display", "none", "important");
    }
  } else {
    logsign.style.setProperty("display", "none", "important");
    after.style.setProperty("display", "flex", "important");
    // if (window.location.href == `second.html`) {
    //   commentA.style.setProperty("display", "flex", "important");
    //   Pcomm.style.setProperty("display", "flex", "important");
    // }

    if (boton != null) {
      boton.style.setProperty("display", "block", "important");
    }
    const user = getUser();
    document.getElementById("PROname").innerHTML = user.username;
    document.getElementById("PROimage").src = user.profile_image;
  }
}
setupUI();
//end SetupUI
//getUSER
function getUser() {
  let user = null;
  storageINfo = localStorage.getItem("user");
  if (storageINfo != null) {
    user = JSON.parse(storageINfo);
    return user;
  }
}
//end getUSer
function showAlert(messgeT, typo) {
  const alertPlaceholder = document.getElementById("liveAlert");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  appendAlert(`${messgeT}`, `${typo}`);
}

//  hideModal
function hideModal(whichmodal) {
  const modal = document.getElementById(whichmodal);
  const modalinstanCe = bootstrap.Modal.getInstance(modal);
  modalinstanCe.hide();
}
//register
function registerBtn() {
  let rname = document.getElementById("rname").value;
  let rimage = document.getElementById("rimage").files[0];
  let rusername = document.getElementById("rusername").value;
  let rpassword = document.getElementById("rpassword").value;
  let formdatA = new FormData();
  formdatA.append("name", rname);
  formdatA.append("image", rimage);
  formdatA.append("username", rusername);
  formdatA.append("password", rpassword);
  // const headers={
  //  ""
  // }
  const headers = {
    Accept: "multipart/form-data",
  };
  //console.log(rname, rusername, rpassword);
  loaderFunc(true);
  fetch(`${baseUrl}/register`, {
    method: "POST",
    body: formdatA,
    headers: headers,
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })

    .then(function (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      //   console.log(respon.data);
      hideModal("rexampleModale");
      setupUI();
      showAlert(`You logged in seccusfully :) Welcome back`, `success`);
    })
    .catch((error) => showAlert(`${error.message}:(`, `danger`))
    .finally(() => {
      loaderFunc(false);
    });
}
//end Register
function loginBtn() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  loaderFunc(true);
  fetch(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify({ username: `${username}`, password: `${password}` }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(function (respon) {
      localStorage.setItem("token", respon.token);
      localStorage.setItem("user", JSON.stringify(respon.user));
      hideModal("exampleModale");
      setupUI();
      showAlert(`You logged in seccusfully :) Welcome back`, `success`);
    })
    .catch((error) => showAlert(`${error.message}:(`, `danger`))
    .finally(() => {
      loaderFunc(false);
    });
}
function logOutBtn() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  showAlert(`You logged out seccusfully :) see you soon`, `success`);
  setupUI();
}

// ===============
function editPost(postOBJ) {
  let postInfo = postOBJ;
  //console.log(postInfo);
  loaderFunc(true);
  axios
    .get(`${baseUrl}/posts/${postOBJ}`)

    .then(function (response) {
      //console.log(response.data.data)
      let titlo = response.data.data.title;
      const bodyo = response.data.data.body;
      const imago = response.data.data.image;
      let id = response.data.data.id;
      document.getElementById("postID").value = id;
      document.getElementById("create_title").innerHTML = "Edit Post";
      document.getElementById("add").innerHTML = "Edit";
      document.getElementById("pimage").src += imago;
      document.getElementById("pbody").value = bodyo;
      document.getElementById("ptitle").value = titlo;
      let postModal = new bootstrap.Modal(
        document.getElementById("pexampleModale"),
        {}
      );
      postModal.toggle();
      loaderFunc(false);
    })
    .catch((error) => {
      showAlert(`${error.response.data.message}`, `danger`);
    })
    .finally(() => {
      loaderFunc(false);
    });
}
function deletePost(thePostId) {
  document.getElementById("posID").value = thePostId;
  let postModal = new bootstrap.Modal(
    document.getElementById("dexampleModale"),
    {}
  );
  postModal.toggle();
}

function deletePostBtn() {
  let posID = document.getElementById("posID").value;
  const token = localStorage.getItem("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };

  axios
    .delete(`${baseUrl}/posts/${posID}`, {
      headers: headers,
    })

    .then(function (response) {
      // console.log(response);
      hideModal("dexampleModale");
      showAlert("The Post has been deleted seccussfully :)", "success");
      getPosts();
    })
    .catch((error) => {
      showAlert(`${error.response.data.message}:(`, `danger`);
    });
}
// =======edit====
function addbuttonClick() {
  document.getElementById("postID").value = "";
  document.getElementById("create_title").innerHTML = "Create New Post";
  document.getElementById("add").innerHTML = "Add This Post";
  document.getElementById("pimage").src = "";
  document.getElementById("pbody").value = "";
  document.getElementById("ptitle").value = "";
  let postModal = new bootstrap.Modal(
    document.getElementById("pexampleModale"),
    {}
  );
  postModal.toggle();
}
// ========addpostbutton====
function addPostBtn() {
  let postid = document.getElementById("postID").value;
  let isCreate = postid == null || postid == "";

  ptitle = document.getElementById("ptitle").value;
  pimage = document.getElementById("pimage").files[0];
  pbody = document.getElementById("pbody").value;
  //console.log(ptitle, pbody);
  const formdata1 = new FormData();
  formdata1.append("title", ptitle);
  formdata1.append("image", pimage);
  formdata1.append("body", pbody);
  let url = ``;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${token}`,
  };
  if (isCreate) {
    url = `${baseUrl}/posts`;
  } else {
    formdata1.append("_method", "put");
    url = `${baseUrl}/posts/${postid}`;
  }
  axios
    .post(url, formdata1, {
      headers: headers,
    })
    .then((response) => {
      hideModal("pexampleModale");
      showAlert("New Post Has been created seccussfully :)", "success");
      getPosts();
      //console.log(response);
    })
    .catch((error) => {
      // console.log(error);
      showAlert(`${error.response.data.message}:(`, `danger`);
    });
}
function profileClicked() {
  let user = getUser();
  // let user=localStorage.getItem("user")
  // alert(user.id)
  let uSER_id = user.id;
  // alert(uSER_id)

  location.href = `profile.html?postID=${uSER_id}`;
}
function loaderFunc(show = true) {
  if (show) {
    document.getElementById("loader").style.visibility = "visible";
  } else {
    document.getElementById("loader").style.visibility = "hidden";
  }
}
// ===============

//   end HideModal
