document.addEventListener('DOMContentLoaded', () => {
    
    var grid = []
    var table = []

    let sudokuGrid = document.getElementById('sudoku-grid')
    let solveButton = document.getElementById('solveButton')

    sudokuGrid.childNodes.forEach( node=>{
        if(node.localName=='div'){
            grid.push(node)
        }
    })
    
    execute(grid,table)

    async function execute(grid,table){

        table = await initTableau(grid)
        let Colomns = await somColonne(table)
        //console.log(somCol)
        document.addEventListener('click',()=>{
            table.forEach(tableau=>{
                let liste = []
                let i = -1
                tableau.forEach( cases=>{
                    liste.push(cases.textContent)
                })
                
                tableau.forEach( cases=>{
                    
                    cases.addEventListener('input',(event)=>{
                        cases.textContent = '' // On vide d'abord cette case de la nuvelle valeur car cela peut causer des erreurs lors des test LIGNE/COLONNE
                        i = tableau.indexOf(cases) // Recuperation de la colonne correspondante a la case qui a ete cliquee
                        console.log(Colomns[i])
                        if(liste.indexOf(event.data) == -1  && Colomns[i].indexOf(event.data) == -1){
                            cases.textContent = event.data
                            cases.style.color = 'green'
                            setTimeout(() => {
                                Colomns[i][table.indexOf(tableau)] = (event.data)
                            }, 1);
                        }
                        else{
                            cases.textContent = event.data
                            cases.style.color = 'red'
                        }
                    })    
                })

            })
        })

        verify(table)
    }

})

    function initTableau(grid){      
        return new Promise((resolve,rejected)=>{
            let j = 0
            let table = []
            for (let index = 0; index < 9; index++) {
                j = index
                table.push(grid.slice(j*9,(index+1)*9)) 
            }
            table.forEach(tableau=>{
                tableau.forEach(cases=>{
                    if (parseInt(cases.textContent)) {
                        cases.style.backgroundColor = "green"
                        cases.style.color = "#fff"
                    }     
                })
            })
            resolve(table)
        })
    }

    function somColonne(table){ //Recuperation de la listes des elements sur les colonnes
        return new Promise((resolve,rejected)=>{
            let listCol = []
            for (let j = 0; j < 9; j++) {
             listCol.push([])                                                                                                            
            }
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    listCol[i].push(table[j][i].textContent)                                                                             
                }
                
            }
            resolve(listCol)
        })
    }
    function verify(table){ //Verification des combinaisons et conclusion du jeu
        return new Promise((resolve,rejected)=>{
            let somX,somY = 0
            x = []
            y = []
            let total = true
            solveButton.addEventListener('click',()=>{
                for (let i = 0; i < 9; i++) {
                    for (let j = 0; j < 9; j++) {
                        if(parseInt(table[i][j])){
                            somX += parseInt(table[i][j])
                        }
                    }
                    for (let j = 0; j < 9; j++) {
                        if(parseInt(table[j][i])){
                            somX += parseInt(table[j][i])
                        }
                    }
                    x.push(somX)
                    y.push(somY)
                }
                for (let i = 0; i < x.length; i++) {
                    if(x[i] != 45){
                        total =false
                    }
                    if(y[i] != 45){
                        total =false
                    }
                }
                if(total != false){
                    alert('COMBINAISON VALIDE ')
                }
                else{
                    alert('COMBINAISON INVALIDE ')
                }
            })
            resolve(true)
        })
        
    }




