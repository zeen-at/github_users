const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');


async function getUsers(user){
try {
    const users = await axios.get(`https://api.github.com/users/${user}`)
    createUserCard(users.data)
    getrepos(user)
    
} catch (error) {
    if(error.response.status === 404){
        createErrorCard('user not found')
     }
}
}

async function getrepos(user){
    try {
        const repos = await axios.get(`https://api.github.com/users/${user}/repos?sort=created`)
        addReposToCard(repos.data)
    } catch (error) {
        if(error.response.status === 404){
            createErrorCard('user not found')
         }
       
        
    }
}

function createErrorCard(msg) {
    const cardHTML = `
        <div>
            <h1>${msg}!</h1>
        </div>
    `

    main.innerHTML = cardHTML
}

function createUserCard(userInfo) {
    const cardHTML = `
    <div class="card">
    <div>
      <img src="${userInfo.avatar_url}" alt="${userInfo.name}" class="avatar">
    </div>
    <div class="userInfo-info">
      <h2 class="ml">${userInfo.name}</h2>
      <p class="ml">${userInfo.bio}</p>
      <ul>
        <li>${userInfo.followers} <strong>Followers</strong></li>
        <li>${userInfo.following} <strong>Following</strong></li>
        <li>${userInfo.public_repos} <strong>Repos</strong></li>
      </ul>
      <div id="repos"></div>
    </div>
  </div>
    `
    main.innerHTML = cardHTML
    
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}


form.addEventListener('submit', function(event){
    event.preventDefault()
    const user = search.value
    if(user){
        getUsers(user)
        search.value = ''
    }
    
})