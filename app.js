

const text = document.getElementById("text-box");
const search = document.getElementById("search")
const result = document.getElementById("result")
const sound = document.getElementById("sound")



const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"

search.addEventListener("click",function start(){
    let wordToSearch = text.value
    console.log(wordToSearch);

    fetch(`${url}${wordToSearch}`)
    .then((response)=> response.json())
    .then((data) => {
        console.log(data);

        result.innerHTML = 
        `
        <div class="word">
        <h1> ${wordToSearch}</h1>
        <button onclick= "playSound()">
            <i class="fa-solid fa-volume-low" id="playSound"></i>
        </button>
    </div>
    <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>/${data[0].phonetic}/</p>
    </div>
    <p class="word-meaning">
       ${data[0].meanings[0].definitions[0].definition}
    <p class="word-example">
    ${data[0].meanings[0].definitions[0].example || ""}
    </p>
        
        `
        sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch(() => {
        result.innerHTML = `<h3 class="error">Sorry! couldn't Find The Word</h3>`;
    });
    });
    function playSound() {
    sound.play();
    }

