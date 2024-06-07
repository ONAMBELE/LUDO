
function selectColor(playerColor,playerList){
    let playerNomber = 0
    return new Promise((resolve,rejected)=>{
        playerColor.forEach(color =>{
            color.classList.add('active')
        })
    
        playerColor.forEach(color =>{
            color.addEventListener('click',()=>{
                if(playerList.indexOf(color) == -1){
                    playerNomber += 1
                    color.classList.remove('active')
                    color.classList.pointerEvents = 'none'
                    if(playerNomber <= 2){
                        playerList.push(color)
                    }
                    if(playerNomber == 2){
                        console.log('1'+ playerList)
                        playerColor.forEach(color =>{
                        color.classList.remove('active')
                    })
                    resolve( playerList )
                }

                }
            })
        })

  })    
}

async function getPlayer(players,playerColor,playerList){     //Recuperer e joueur apres avoir selectionne la couleur desiree
    
    setTimeout(() => {
        alert('🎲️🎲️ Cliquez pour selectionner votre couleur 🎲️🎲️') 
    }, 500);
    playerList = await selectColor(playerColor,playerList)
    await players.forEach( player =>{
        if(playerList[0].className == player.color){
            playerList[0] = player
        }
        if(playerList[1].className == player.color){
            playerList[1] = player
        }

    })
    return playerList
}


function selectPion(player){     // Fonction qui permet de selectinoner un pion dans la liste des pions ou de selectionner celui que l'on va deplacer
    let selected = false
    player.listPions.forEach(pion=>{
        pion.addEventListener('click',()=>{
            if(selected != true){
                selected = true
                let choix = pion
                pion.remove()
                return choix
            }
        })
    })
    if(choix == false){
        return null
    }
}


function turnDie(die,listFaces,turn){
    return new Promise((resolve,rejected)=>{
        die.childNodes[2].src = listFaces[0]

        turn.addEventListener('click',()=>{
            let faceNumber = Math.floor(Math.random() * 6) + 1
            //console.log('+++ ' + faceNumber + ' +++')
            //faceNumber = 6
            setTimeout(()=>{
                die.childNodes[2].src = listFaces[faceNumber]
            },500)
            resolve(faceNumber)
        })
    })
}

async function MovePion(player){
    let selected = false
    let faceNumber = await turnDie()
    let newPion = null
    let pion = null 

    if(faceNumber == 6){
        pion = selectPion(player.parcour)
        newPion = selectPion(player.listPions)

        if(pion == null){
            player.parcour[0].appendChild(pion)
        }
        else{
            if(newPion == null){
                let position = player.parcour.indexOf(pion)
                for (let index = position; index < (position + faceNumber); index++) {
                    player.parcour[index].appendChild(pion)
                }
            }
        }
    }

}


/* Fonctions de selection de la couleur dont c'est le tour de jouer */
function select(player,playerColorList){
    setTimeout(() => {
        return new Promise((resolve,rejected)=>{
            console.log('SELECTIONNER')
            playerColorList.forEach(child=>{
                if(player.color == child.id){
                    child.classList.add('lightHouse')
                }          
            })
            resolve(true)
        })
    }, 500);
}
function deSelect(player,playerColorList){
    return new Promise((resolve,rejected)=>{
        console.log('DESELECTIONNER')
        playerColorList.forEach(child=>{
            if(player.color == child.id){
                child.classList.remove('lightHouse')
            }          
        })
        resolve(true)
    })
}
/*--------------------------------------------------------------------------------*/

/* -------------------- Fonctions qui desactive ceux dont ce n'est pas le tour de jouer -------------------- */

function unActive(player1,turn,color){
    return new Promise((resolve,rejected)=>{
        console.log('Desactivation ' + player1.color)
        player1.parcour.forEach(cases=>{
            cases.childNodes.forEach(child=> child.style.pointerEvents = 'none')
            //cases.style.pointerEvents = 'none'
        })
        turn.style.pointerEvents = 'none'
        resolve(true)
    })
}

function active(player1,turn,color){
    return new Promise((resolve,rejected)=>{
        console.log('RE-Activation ' + player1.color)
        player1.parcour.forEach(cases=>{
            cases.childNodes.forEach(child=> child.style.pointerEvents = 'auto')
            //cases.style.pointerEvents = 'all'
        })
        turn.style.pointerEvents = 'auto'
        resolve(true)
    })
}


/* ------------------------------------------------------------------------------------------------------------------------ */

function play(player,playerN,faceNumber,playerList,winner1){
    
    return new Promise((resolve,rejected)=>{
        
        console.log('___< PLAY >___')
        //let span = 0
        let choisis = false
        // Variable qui nous permettra d'indiquer si l'action a deja ete executee sur un pion    
        if(faceNumber === 6 ){  //&& player1.listPions.length != 0){
            
            player.listPions.forEach(pion=>{
                pion.classList.add('activate')
            })
            player.listPions.forEach( pion => {

                pion.addEventListener('click',()=>{
                    console.log('CHOIX: '+choisis)
                    if(choisis == false){
                        console.log('___CLICK___')
                        let span = document.createElement('span')
                        span.style.backgroundColor = player.color
                        span.style.width = '1.5em'
                        span.style.height = '1.5em'
                        span.style.borderRadius = '15px'
                        pion.remove()
                        console.log(player.listPions)
                        player.parcour[0].appendChild(span)
                        choisis = true
                        console.log(player.parcour[0].childNodes.length)
                        if(player.parcour[0].childNodes.length > 1){
                            //console.log('taille'+player.parcour[0].childNodes)
                            for (let i = 0; i < player.parcour[0].childNodes.length-1; i++) {
                                console.log(i+'Element: '+player.parcour[0].childNodes.length)
                                player.parcour[0].removeChild(player.parcour[0].childNodes[i])                                
                            }
                        }
                        resolve(playerN)     
                    }
                })
     
           })

           player.parcour.forEach( pion =>{    //Deplacement d'un pion si on a 'chaine' <==(6)
            pion.childNodes.forEach( child =>{
                //console.log('child' + child.getAttributeNames())
                child.addEventListener('click', ()=>{
                   // console.log('CLICK RECU')
                    let position = player.parcour.indexOf(pion)
                    console.log(child)
                    console.log(child.style.backgroundColor)
                    console.log(player.color)
                    if(player.color == child.style.backgroundColor){
                        console.log('choix: '+choisis)
                        if(choisis == false){
                            console.log('position: '+position)
                            for (let index = 0; index < faceNumber; index++) {
                                if (((position + 1) + index) == (player.parcour.length -1)) {
                                    child.remove()
                                    winner1 += 1
                                    winner1 += parseInt(winner1)
                                    console.log(`Winner1: ${winner1}`)
                                    break
                                }
                                else{
                                    //console.log('MOOVE SIX')
                                    //console.log((position + 1) + index)
                                    //console.log(player.parcour[(position + 1) + index])
                                    player.parcour[(position + 1) + index].appendChild(child)
                                    player.listPions.forEach(pion=>{
                                        pion.classList.remove('activate')
                                    })
                                }
                                if (index == (faceNumber-1)) {
                                    console.log('___CLIQUE___')
                                    resolve(playerN)
                                }
                                if (index == (faceNumber-1)) {
                                    console.log('<CLIQUE>')
                                    resolve(playerN)
                                }
                            }
                        }
                    }
                })

            })
           })
            

        }
        else{

            let position = 0,choix = false
            let outPions = 0

            player.parcour.forEach(pion=>{
                if(pion.childNodes.lenght != null){
                    outPions += 1
                    console.log(pion.childNodes)
                }
            })
            console.log('PlayerN' + outPions)

            if(outPions == 0){
                if (playerN == 1) {
                    console.log('_CLIQUE_')
                    resolve(playerN = 2)
                }
                if (playerN == 2) {
                    console.log('--CLIQUE--')
                    resolve(playerN = 1)
                }
            }

            player.parcour.forEach( pion =>{
                pion.childNodes.forEach( child =>{
                    console.log('child' + child)
                    child.addEventListener('click', ()=>{
                        position = player.parcour.indexOf(pion)
                        if(player.color == child.style.backgroundColor){
                            if(choix == false){
                                for (let index = 0; index < faceNumber; index++) {
                                   if (((position + 1) + index) == (player.parcour.length -1)) {
                                       child.remove()
                                       winner1 += 1
                                       alert(`Winner1: ${winner1}`)
                                       break
                                   }
                                   else{
                                       console.log('MOOVE another')
                                       player.parcour[(position + 1) + index].appendChild(child)
                                       player.listPions.forEach(pion=>{
                                           pion.classList.remove('activate')
                                       })
                                   }
                                if (playerN == 1 && index == (faceNumber-1)) {
                                    console.log('>__CLIQUE__<')
                                    resolve(playerN = 2)
                                }
                                if (playerN == 2 && index == (faceNumber-1)) {
                                    console.log('<>--CLIQUE--<>')
                                    resolve(playerN = 1)
                                }
                               }
                           }
                        }
                        choix = true
                    })
                })
            })
        }
    })
}