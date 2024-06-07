let spaceGame = document.getElementById('spaceGame')

let color = document.getElementById('tour')
let start = document.getElementById('start')
let die = document.getElementById('die')
let turn = document.getElementById('turn')

let red = document.getElementById('red')
let green = document.getElementById('green')
let blue = document.getElementById('blue')
let yellow = document.getElementById('yellow')

let middleOreintation = document.getElementById('middle-orientation')
let topOrientation = document.getElementById('top-orientation')
let footOrientation = document.getElementById('foot-orientation')
let greenCases = document.getElementById('greenCases')
let blueCases = document.getElementById('blueCases')


/* ============================ GESTION DES DIFFERENTS PARCOURS ============================ */

let parcourRed = [],parcourGreen = [],parcourYellow = [],parcourBlue = [] // Les differents chemins qu'auront a parcouririles pions 
                                                                            //des differentes couleurs au cas ou ils sont choisis

let next1 = [],next2 = [],next3 = [],next4 = [],next5 = []  //   Identification des differentes routes du LUDO qvec pour reference le parcours du pion rouge
next1 = middleOreintation.firstElementChild.firstElementChild.childNodes
next1 = [next1[1],next1[3],next1[5],next1[7],next1[9],next1[11]]
let next1Middle = middleOreintation.firstElementChild.firstElementChild.nextElementSibling.childNodes
next1Middle = [next1Middle[1],next1Middle[3],next1Middle[5],next1Middle[7],next1Middle[9],next1Middle[11]]
let next1End = middleOreintation.firstElementChild.lastElementChild.childNodes
next1End = [next1End[11],next1End[9],next1End[7],next1End[5],next1End[3],next1End[1]]

next2 = greenCases.firstElementChild.childNodes
next2 = [next2[11],next2[9],next2[7],next2[5],next2[3],next2[1]]
let next2Middle = greenCases.firstElementChild.nextElementSibling.childNodes
next2Middle = [next2Middle[1],next2Middle[3],next2Middle[5],next2Middle[7],next2Middle[9],next2Middle[11]]
let next2End = greenCases.lastElementChild.childNodes
next2End = [next2End[1],next2End[3],next2End[5],next2End[7],next2End[9],next2End[11]]

next3 = middleOreintation.lastElementChild.firstElementChild.childNodes
next3 = [next3[1],next3[3],next3[5],next3[7],next3[9],next3[11]]
let next3Middle = middleOreintation.lastElementChild.firstElementChild.nextElementSibling.childNodes
next3Middle = [next3Middle[11],next3Middle[9],next3Middle[7],next3Middle[5],next3Middle[3],next3Middle[1]]
let next3End = middleOreintation.lastElementChild.lastElementChild.childNodes
next3End = [next3End[11],next3End[9],next3End[7],next3End[5],next3End[3],next3End[1]]

next4 = blueCases.lastElementChild.childNodes
next4 = [next4[1],next4[3],next4[5],next4[7],next4[9],next4[11]]
let next4Middle = blueCases.firstElementChild.nextElementSibling.childNodes
next4Middle = [next4Middle[11],next4Middle[9],next4Middle[7],next4Middle[5],next4Middle[3],next4Middle[1]]
let next4End = blueCases.firstElementChild.childNodes
next4End = [next4End[11],next4End[9],next4End[7],next4End[5],next4End[3],next4End[1]]


/* PARCOUR DU ROUGE */

parcourRed = next1.slice(1,7)
next2.forEach(p => parcourRed.push(p))
parcourRed.push(next2Middle[0])
next2End.forEach(p => parcourRed.push(p))
next3.forEach(p => parcourRed.push(p))
parcourRed.push(next3Middle[0])
next3End.forEach(p => parcourRed.push(p))
next4.forEach(p => parcourRed.push(p))
parcourRed.push(next4Middle[0])
next4End.forEach(p => parcourRed.push(p))
next1End.forEach(p => parcourRed.push(p))
next1Middle.forEach(p => parcourRed.push(p))



/* PARCOUR DU VERT */

parcourGreen = next2End.slice(1,7)
next3.forEach(p => parcourGreen.push(p))
parcourGreen.push(next3Middle[0])
next3End.forEach(p => parcourGreen.push(p))
next4.forEach(p => parcourGreen.push(p))
parcourGreen.push(next4Middle[0])
next4End.forEach(p => parcourGreen.push(p))
next1End.forEach(p => parcourGreen.push(p))
parcourGreen.push(next1Middle[0])
next1.forEach(p => parcourGreen.push(p))
next2.forEach(p => parcourGreen.push(p))
next2Middle.forEach(p => parcourGreen.push(p))




/* PARCOUR DU JAUNE */

parcourYellow = next3End.slice(1,7)
next4.forEach(p => parcourYellow.push(p))
parcourYellow.push(next4Middle[0])
next4End.forEach(p => parcourYellow.push(p))
next1End.forEach(p => parcourYellow.push(p))
parcourYellow.push(next1Middle[0])
next1.forEach(p => parcourYellow.push(p))
next2.forEach(p => parcourYellow.push(p))
parcourYellow.push(next2Middle[0])
next2End.forEach(p => parcourYellow.push(p))
next3.forEach(p => parcourYellow.push(p))
next3Middle.forEach(p => parcourYellow.push(p))



/* PARCOUR DU BLUE */

parcourBlue = next4End.slice(1,7)
next1End.forEach(p => parcourBlue.push(p))
parcourBlue.push(next1Middle[0])
next1.forEach(p => parcourBlue.push(p))
next2.forEach(p => parcourBlue.push(p))
parcourBlue.push(next2Middle[0])
next2End.forEach(p => parcourBlue.push(p))
next3.forEach(p => parcourBlue.push(p))
parcourBlue.push(next3Middle[0])
next3End.forEach(p => parcourBlue.push(p))
next4.forEach(p => parcourBlue.push(p))
next4Middle.forEach(p => parcourBlue.push(p))


/* ===============================================  GESTION DU JEUX ET REGLES   =============================================== */

let redPions = [],greenPions = [],yellowPions = [],bluePions = []   // Liste des pions assignes a chaquue couleur

red.firstElementChild.childNodes.forEach(p =>{if(p.localName == "span") {redPions.push(p)}} )
red.lastElementChild.childNodes.forEach(p =>{if(p.localName == "span") {redPions.push(p)}} )
green.firstElementChild.childNodes.forEach(p =>{if(p.localName == "span") {greenPions.push(p)}} )
green.lastElementChild.childNodes.forEach(p =>{if(p.localName == "span") {greenPions.push(p)}} )
yellow.firstElementChild.childNodes.forEach(p =>{if(p.localName == "span") {yellowPions.push(p)}} )
yellow.lastElementChild.childNodes.forEach(p =>{if(p.localName == "span") {yellowPions.push(p)}} )
blue.firstElementChild.childNodes.forEach(p =>{if(p.localName == "span") {bluePions.push(p)}} )
blue.lastElementChild.childNodes.forEach(p =>{if(p.localName == "span") {bluePions.push(p)}} )



/* ======================================== START GAME ======================================= */
spaceGame.style.display = 'grid'
turn.style.display = 'none'
color.style.display = 'none'
die.style.display = 'none'

//spaceGame.classList.add('active')


var replace = die.firstElementChild;
die.firstElementChild.remove()
let imgDe = document.createElement('img')
imgDe.src = './img/GIF-Artists-Collective-unscreen.gif';
die.appendChild(imgDe)
die.appendChild(replace)


const listFaces = ['./img/GIF-Artists-Collective-unscreen.gif','./img/d1.png','./img/d2.png','./img/d3.png','./img/d4.png','./img/d5.png','./img/d6.png']
var faceNumber = 0
let choisis = false
var winner1,winner2 = 0


let players  = [
    {
        listPions : redPions,
        parcour : parcourRed,
        color:'red'
    },
    {
        listPions : greenPions,
        parcour : parcourGreen,
        color:'green'
    },
    {
        listPions : bluePions,
        parcour : parcourBlue,
        color:'blue'
    },
    {
        listPions : yellowPions,
        parcour : parcourYellow,
        color:'yellow'
    }
]

let playerColorList = [red,green,blue,yellow]

//import { selectColor,getPlayer,selectPion,turnDie, MovePion,play,select,deSelect,active,unActive } from "./game.js"


let playerColor = []
let playerList = []

color.childNodes.forEach( c => {
    if(c.localName == "span"){
        playerColor.push(c)
    }
})


async function execute(){

    let p = 0
    playerList = await getPlayer(players,playerColor,playerList)
    turn.style.userSelect = 'none'
    color.childNodes.forEach(child=>{
        if(child.localName == 'span'){
            //child.style.desabled = true
            child.style.display = 'none'
        }
    })
    turn.style.pointerEvents = 'none'
    let tour = 1
    do {

        if(tour == 1){
            await select(playerList[0],playerColorList)
            turn.style.pointerEvents = 'all'
            faceNumber = await turnDie(die,listFaces,turn)
            turn.style.pointerEvents = 'none'
            tour = await play(playerList[0],tour,faceNumber,playerList,winner1)
            await deSelect(playerList[0],playerColorList)
        
        }
        if(tour == 2){

            await select(playerList[1],playerColorList)
            turn.style.pointerEvents = 'all'
            faceNumber = await turnDie(die,listFaces,turn)
            turn.style.pointerEvents = 'none'
            tour = await play(playerList[1],tour,faceNumber,playerList,winner2)            
            await deSelect(playerList[1],playerColorList)
        }

    } while (winner1 !=4 || winner2 != 4);

    if(winner1 == 4){
        alert(`Vainqueur: ${playerList[0].color}`)
    }
    else
        if(winner2 == 4){
            alert(`Vainqueur: ${playerList[0].color}`)
        }

}

spaceGame.classList.add('active')

start.addEventListener('click',()=>{
    start.style.pointerEvents = 'none'
    turn.style.display = 'flex'
    color.style.display = 'flex'
    die.style.display = 'flex'

    execute()
})
