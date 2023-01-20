

/*
document.addEventListener("DOMContentLoaded", () => {
    function getAllMonsters() {
        fetch("http://localhost:3000/monsters")
            .then(res => res.json())
            .then(monsters => {
                let monstersHTML = monsters.forEach(function (monster) {
                    return `
                <div class="card>
                <h2>${monster.name}</h2>
                <p>${monster.age}</p>
                <p>${monster.description}</p>
                </div>
                `
                })
                document.querySelector('#monster-container').innerHTML = monstersHTML
            })
    }
    getAllMonsters()
})
    // const div = document.querySelector
    // debugger
    // function renderMonster(monster) {
    //     let card = document.createElement("div")
    //     card.innerHTML = `
    //         <ul class="card>
    //         <h2>${monster.name}</h2>
    //         <p>${monster.age}</p>
    //         <p>${monster.description}</p>
    //         `
    //     div.appendChild(card)
    // }

    // function initialize() {
    //     getAllMonsters()
    // }
    // initialize()

*/


document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const fetchUrl = "http://localhost:3000/monsters";
    const createMonsterForm = document.querySelector('.add-monster');
    const createMonsterBtn = document.createElement("button")
    createMonsterBtn.innerText = "Create Monster"
    createMonsterBtn.className = "Create-btn"
    createMonsterForm.append(createMonsterBtn);
    // document.body.append(createMonsterForm);

    function renderMonster(monster) {
        const monsterCard = document.createElement("div");
        const monsterName = document.createElement("h2");
        const monsterAge = document.createElement("h3");
        const monsterDescription = document.createElement("h4");

        monsterCard.id = `monster-${monster.id}`;
        monsterCard.className = "book-card";
        monsterName.textContent = monster.name;
        monsterAge.textContent = monster.age;
        monsterDescription.textContent = monster.description;

        monsterCard.append(monsterName, monsterAge, monsterDescription);

        monsterContainer.append(monsterCard);
    }
    // function createMonsterForm() {
    //     return document.getElementsByTagName("form")[0]
    // }

    function initialize() {
        getAllMonsters()
    }

    initialize()

    function getAllMonsters(page_num = 1) {
        monsterContainer.dataset.currentPage = page_num
        fetch(`http://localhost:3000/monsters/?_limit=10&_page=${page_num}`)
            .then(resp => resp.json())
            .then(monsters => monsters.forEach(monster => renderMonster(monster)))
    }


    createMonsterForm.addEventListener("submit", createNewMonster)
    function createNewMonster(e) {
        e.preventDefault()
        let monsterObject = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.description.value
        }
        createMonster(monsterObject)
        createMonsterForm.reset()

    }



    function createMonster(formData) {
        fetch('http://localhost:3000/monsters', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify(formData)
            //{ name: string, age: number, description: string }
        })
            .then(resp => resp.json())
            .then(monster => renderMonster(monster))
            .catch((error) => error('error:', error))
    }


    const forwardBtn = document.getElementById('forward')
    forwardBtn.addEventListener("click", () => page("next"))
    const backBtn = document.getElementById("back")
    backBtn.addEventListener("click", () => page('back'))


    function callPageNext() {
        page("next")
    }

    function page(direction) {
        let currentPage = monsterContainer.dataset.currentPage
        if (direction === "back") {
            currentPage--
        } else {
            currentPage++
        }
        currentPage = Math.min(Math.max(currentPage, 1), 100)
        getAllMonsters(currentPage)
    }


})

/*
document.addEventListener("DOMContentLoaded", pageSetup)

function pageSetup() {
    fetchMonsters()
    monsterForm().addEventListener('submit', processMonsterForm)
    nextButton().addEventListener('click', () => paginate('next'))
    backButton().addEventListener('click', () => paginate('back'))
}

function callPaginateNext() {
    paginate('next')
}

function fetchMonsters(page_num = 1) {
    monsterContainer().innerHTML = ""
    monsterContainer().dataset.currentPage = page_num
    fetch(`http://localhost:3000/monsters?_limit=10&_page=${page_num}`)
        .then(r => r.json())
        .then(monsterJson => monsterJson.forEach(monster => renderMonster(monster)))
}

function paginate(direction) {
    let currentPage = monsterContainer().dataset.currentPage
    if (direction === 'back') {
        currentPage--
    } else {
        currentPage++
    }
    currentPage = Math.min(Math.max(currentPage, 1), 100)
    fetchMonsters(currentPage)
}

function renderMonster(monster) {
    let container = monsterContainer()
    let card = document.createElement('div')
    let monsterName = document.createElement('h2')
    monsterName.innerText = monster.name

    let monsterAge = document.createElement('div')
    monsterAge.innerText = monster.age

    let monsterDesc = document.createElement('div')
    monsterDesc.innerText = monster.description

    container.appendChild(card)
    card.appendChild(monsterName)
    card.appendChild(monsterAge)
    card.appendChild(monsterDesc)

}

function monsterContainer() {
    return document.getElementById('monster-container')
}

function monsterForm() {
    return document.getElementsByTagName('form')[0]
}

function processMonsterForm(event) {
    event.preventDefault()
    let form = event.currentTarget

    let name = form.children.name.value
    let age = form.children.age.value
    let description = form.children.description.value

    let monsterPayload = { "name": name, age: age, description: description }
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(monsterPayload)
    }).then(r => r.json())
        .then(monster => renderMonster(monster))
        .catch(error => console.log(`Paul's error: ${error}`))
    form.reset()
}

function nextButton() {
    return document.getElementById("next")
}

function backButton() {
    return document.getElementById("back")
}

*/