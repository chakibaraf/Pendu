
           
            const randMot = ["chocolat", "cacahouete", "pop", "gorille", "algerie", "cocktail", "VALIDE"];
            

            
            const uiInput = document.getElementById("prompt");
            const uiTry = document.getElementById("try_show");
            const uiRestart = document.getElementById("restart");
            const uiAlert = document.getElementById("alert");
            const uiSend = document.getElementById("send");
            const uiList = document.getElementById("try_list"); 

            let targetArray = []; 
            let foundArray = [];
            let targetWord; 
            let targetReveal; 
            let alertMsg ; 
            let targetLength = 0; 
            let winCount = 0; 
            let tryNumb = 0; 
            let failNumb = 1; 
            let leftTry = targetLength - failNumb; 
            let alreadyTested = []; 
            let playerInput; 

            // fonction perdue
            function perdue() {
              
                var lostMsg = "perdu ! <br/>Le mot était <strong>"+targetWord+"</strong>";
                uiAlert.innerHTML = lostMsg;
                uiRestart.classList.remove("hidden"); // afficher
                uiInput.classList.add("hidden"); // cacher grace à la classe .hidden
                uiSend.classList.add("hidden");
            }

            //fonction victoire
            function victoire() {
                
                let winMsg = "<strong>Bravo !! </strong><br/>Vous avez réussi en "+tryNumb+" essai(s). Le mot était donc "+targetWord+" et vous vous êtes trompé "+failNumb+" fois.";
                uiRestart.classList.remove("hidden");
                uiInput.classList.add("hidden");
                uiSend.classList.add("hidden");
                uiAlert.innerHTML = winMsg;
            }

            // Fonction pour ajouter la saisie dans la liste
            function addInList(arg) {
              
                var newLi= document.createElement("li");
                newLi.innerHTML = arg;
                uiList.appendChild(newLi);
            }
            // Fonction  pour recommencer une partie
            function reset() {
               
                // Remise à zero
                targetArray = [];
                foundArray = [];
                targetWord;
                targetReveal;
                targetLength = 0;
                targetLength = 0;
                winCount = 0;
                tryNumb = 0;
                failNumb = 0;
                leftTry = targetLength - failNumb; 
                alreadyTested = [];
                uiRestart.classList.add("hidden");
                uiInput.classList.remove("hidden");
                uiSend.classList.remove("hidden");
                uiAlert.innerHTML = "";
                uiList.innerHTML = "<li class=\"start\">Vos essais &gt;</li>";
                depart(); //  fonction de démarrage
            }

            // Fonction pour définir le mot à rechercher
            function strToArray(argStr) {
                if (argStr != undefined) { 
                    
                    argStr = argStr.toUpperCase(); 
                    targetArray = argStr.split(""); 
                   
                     { 
                        for (let i in targetArray) { 
                            foundArray.splice(i,1,"_");
                        }
                    }
                            }  
                                targetWord = targetArray.join(""); 
                                targetReveal = foundArray.join(" "); 
                                alertMsg; 
                                targetLength = targetArray.length; 
                                leftTry = targetLength - failNumb; 
                                uiTry.innerHTML 
                            }



                // La fonction de lancement
             function depart() {
               
                var randOne = Math.floor(Math.random()*randMot.length);
               
                var selectSoluce = randMot[randOne];
                strToArray(selectSoluce); // Initialisation
                uiInput.setAttribute( "autocomplete", "off" ); 
                uiInput.focus(); 
            }



        // fonction principale
            function devineLettre() {

               
                playerInput = uiInput.value; // input texte
                uiInput.value = "";
                uiInput.focus(); 
                playerInput = playerInput.toUpperCase(); 
                uiAlert.innerHTML = "";
                strToArray(); // Refresh
               
                
                { 
                    alreadyTested.push(playerInput); //  
                    addInList(playerInput); 
                    tryNumb++; // 

                    if (targetArray.indexOf(playerInput) == -1 ) { 
                        failNumb++; 
                        leftTry = targetLength - failNumb; 
                        alertMsg = "Faux, plus que <strong>"+leftTry+"</strong> erreurs possibles";
                        uiAlert.innerHTML = alertMsg;
                      
                    } 
                    else {

                        
                        for ( i= 0; i < targetLength;i++) {  
                            if (playerInput == targetArray[i]) 
                            {


                                foundArray.splice(i,1,playerInput); 
                                winCount++; 
                                targetReveal = foundArray.join(" "); 
                                uiTry.innerHTML = targetReveal; 
                            }
                        } 
                        if (winCount == targetLength) { 
                            victoire(); 
                        } 
                    }
                } 
            } 
            
            uiSend.onclick = function(event){
                event.preventDefault(); // Empêche le boutton de rafraîchir 
                if (leftTry == 0) {
                    perdue();
                } else {
                    devineLettre(); 
                }
            };
            //  reset
            uiRestart.onclick = function(event){
                event.preventDefault();
                reset();
            };

            depart();
