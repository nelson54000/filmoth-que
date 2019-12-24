
    /**
     *@author Gabriel Varnier
     *
     */

var films = [
    {    name: "Deadpool",    years: 2016,    authors : "Tim Miller" },
    {    name: "Spiderman",    years: 2002,    authors : "Sam Raimi" },
    {    name: "Scream",    years: 1996,    authors : "Wes Craven" },
    {    name: "It: chapter 1",    years: 2019,    authors : "Andy Muschietti" },
    {    name: "Un jour sans fin",years: 1993, authors: "Harold Ramis"}
];
    // formulaire ajout films:
    var btnAjout = document.getElementById("btnAjout")

    /** @event <afficherFormulaire>#[event:click]<>
     * 
     * Affiche le formulaire quand l'ultilisateur clique sur le bouton "Ajouter un film" */

    afficherFormulaire.addEventListener("click", function () {
        FormulaireAjout.style.display = "contents"
    });

    /** @function
     * @name boucleDemarrage 
     * @param {number} 
     * fonction de démarrage: */

    function boucleDemarrage() {
        for (i = 0; i < films.length; i++) {
            creertable()
        }
    }
    /**@function 
     * @name creertable 
     * fonction création tableau: crée un tableau en fonction du nb de variable i*/

    function creertable() {

        //creation tr .....(une création de tr pour chaque tour de boucle)
        var tr = document.createElement("tr");

        //création td
        var tdTitre = document.createElement("td");
        var tdAnnee = document.createElement("td");
        var tdAuteur = document.createElement("td");
        var tdSup = document.createElement("td");

        //création cellule input à l'intérieur des td
        var celluleTitre = document.createElement("p");
        var celluleAnnee = document.createElement("p");
        var celluleAuteur = document.createElement("p");

        //association de la valeur de l'input avec les info du tableau film
        celluleTitre.innerText = films[i].name
        celluleAnnee.innerText = films[i].years
        celluleAuteur.innerText = films[i].authors

        //création bouton supprimer
        var btnSup = document.createElement("button")
        btnSup.type = "button"
        btnSup.textContent = "supprimer"
        btnSup.value = [i]
        btnSup.className = "button alert stack"

        /** @event <btnAjout>#[event:click]<sup>
         * 
         * évenement sut le bouton supprimer*/

        btnSup.addEventListener("click", function sup() {
            //console.log(this.parentNode.parentNode.children[0].textContent)
            var supprimer = this.parentNode.parentNode.children[0].textContent

            for (let f = 0; f < films.length; f++) {
                if (supprimer == films[f].name) {
                    films.splice(f, 1);
                }
            }
            this.parentNode.parentNode.remove(this)
        });

        //input ajouter au cellules 
        tdTitre.appendChild(celluleTitre);
        tdAnnee.appendChild(celluleAnnee);
        tdAuteur.appendChild(celluleAuteur);
        tdSup.appendChild(btnSup);

        //ajout des cellules td au tr
        tr.appendChild(tdTitre);
        tr.appendChild(tdAnnee);
        tr.appendChild(tdAuteur);
        tr.appendChild(tdSup);

        var table = document.getElementById("table");
        table.appendChild(tr);
    }
    boucleDemarrage()

    var titre = document.getElementById("titre");
    var annee = document.getElementById("annee");
    var realisateur = document.getElementById("realisateur");

    /** @event <btnAjout>#[event:click]<ajouter>
     * 
     * */
    btnAjout.addEventListener("click", function (ajouter) {
        function ajouter() {
            films.push({
                name: titre.value,
                years: annee.value,
                authors: realisateur.value
            });
            //console.log(films)
            films[i].name = capitalizeFirstLetter(titre.value);
            films[i].years = annee.value;
            films[i].authors = capitalizeFirstLetter(realisateur.value);
        }
        var message = document.getElementById("message")
        var messageErreur = document.getElementById("messageErreur")

        //recupération de la date en cours
        var dateAujourdhui = new Date();

        console.log(dateAujourdhui)

        if (titre.value.length > 2 && realisateur.value.length > 5 && annee.value > 1900 && annee.value <
            dateAujourdhui.getFullYear()) {

            message.style.padding = "2%";
            message.className = "label success"
            message.innerText = "Votre film à bien été ajouté avec succes!"
            setTimeout(function () {
                message.innerText = ""
                message.className = ""
                message.style.padding = "0%";
            }, 3000)
            FormulaireAjout.style.display = "none";

            ajouter()
            creertable()

        } else {
            if (titre.value.length <= 2) {
                var mTitre = "(titre)";
            } else {
                var mTitre = "";
            }
            if (realisateur.value.length < 5) {
                var mReal = "(réalisateur)";
            } else {
                var mReal = "";
            }
            if (annee.value < 1900 || annee.value > dateAujourdhui.getFullYear() || annee.value == 0) {
                var mAnnee = "(année, (elle doit se situer entre 1900 et la date en cours))";
            } else {
                var mAnnee = "";
            }

            message.style.padding = "2%";
            message.className = "label alert"
            message.innerText = "Erreur dans le formulaire à la case:" + mTitre + " " + mReal + " " + mAnnee
            setTimeout(function () {
                message.innerText = ""
                message.className = ""
                message.style.padding = "0%";
            }, 3000)
            FormulaireAjout.style.display = "none";
        }
    });
    var select = document.getElementById("select")
    var selectOption = select.option

    /** @event <select>#[event:change]<>
     * 
     * */
    select.addEventListener("change", function () {

        console.log(select.value)

        if (select.value == "numerique") {
            films.sort(function (a, b) {
                return b.years - a.years
            });
            console.log(films)

            //réinitialisation de table
            table.innerHTML = null;

            //appel fonct demarrage
            boucleDemarrage()

        } else if (select.value == "alphabetic") {
            films.sort(function (a, b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            });

            //réinitialisation de table
            table.innerHTML = null;

            //appel fonct demarrage
            boucleDemarrage()
        }
    });
    /** @function
     * @name capitalizeFirstLetter
     * fonction pour mettre la 1er lettre en majuscule:*/

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }