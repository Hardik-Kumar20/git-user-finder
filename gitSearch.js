let api = "https://api.github.com/users/";
let fetch = document.createElement("script");
fetch.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js" ;
// fetch.integrity = ;

fetch.crossOrigin = "anonymous";
document.head.appendChild(fetch);

let data_box = document.querySelector(".data-box") ;
let search = document.querySelector(".input");
let avatar = document.querySelector(".profile-photo");
let user = document.querySelector(".userName");
let followers = document.querySelector(".followers");
let following = document.querySelector(".following");
let repos = document.querySelector(".repos");

data_box.style.display = "none";


const errorfn = (message)=>{
    alert(message);
    data_box.style.display = "none";
}

const userGetFunction = (name) =>{
    axios(api + name).then((response)=>{
        userCard(response.data);
        repoGetInfo(name);
    })
    .catch((err)=>{
        if(err.response.status == 404){
            errorfn("No profile with this username");
        }else{
            errorfn("An unexpected error came");
        }
    })
    data_box.style.display = "block";
}


const repoGetInfo = (name)=>{
    axios(api + name + "/repos?sort=created").then((response)=>{
        repoCardInfo(response.data);
    })
    // .catch((err)=>{errorfn("repos facing proplems")})
    
}

const userCard = (user)=>{
    let id = user.name || user.login;
    let info = user.bio ? `<p>${user.bio}</p>` : "";
    avatar.src = user.avatar_url;
    followers.innerHTML = user.followers;
    following.innerHTML = user.following;
    repos.innerHTML = user.public_repos;
}


// const repoCardInfo = (repositories) => {
//     repoListContainer.innerHTML = ""; // Clear previous list

//     if (repositories.length === 0) {
//         repoListContainer.innerHTML = "<p>No repositories found</p>";
//         return;
//     }

//     repositories.forEach((repo) => {
//         const repoItem = document.createElement("div");
//         repoItem.classList.add("repo-item");

//         repoItem.innerHTML = `
//             <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
//             <p>${repo.description || "No description provided"}</p>
//             <p>⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${repo.forks_count}</p>
//         `;

//         repoListContainer.appendChild(repoItem);
//     });
// };

search.addEventListener("keydown" , (event)=>{
    if (event.key === "Enter") {
        const search = event.target.value;
        userGetFunction(search);
    }
})

