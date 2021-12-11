let abilities = ['Javascript', 'HTML5', 'CSS3', 'Java', 'Adobe Illustrator', 'SQL', 'PHP', 'UML'];

function autocomplete(inp, arr) {
    /*Toma dos argumentos el campo de texto y el array de habilidades*/
    let currentFocus;

    /*Ejecuta la funcion al escribir en el campo*/
    inp.addEventListener("input", function(e) {
        let a, b, i, val = this.value;

        /*Cierra las listas que esten abiertas de valores autocompletados*/
        closeAllLists();

        if(!val){ 
            return false;
        }

        currentFocus = -1;

        /*Crea un div que contiene los valores*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "-autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        /*Agrega el div como hijo del contenedor autocomplete*/
        this.parentNode.appendChild(a);

        /*Para cada item del array...*/
        for (i = 0; i < arr.length; i++) {
          /*Verifica si el item empieza con la misma letra del campo de texto*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*crea un div para cada elemento que coincide*/
            b = document.createElement("DIV");
            /*le agrega negrilla a las letras*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*Inserta un input oculto que contendrá el array de habilidades*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*Ejecuta la funcion cuando se da click en un item de la lista (elemento DIV*/
                b.addEventListener("click", function(e) {
                /*Inserta el valor en el campo de texto*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*Cierra la lista con valores autocompletados*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });

    /*Ejecuta la funcion al oprimir una tecla*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "-autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*Si se oprime la tecla "abajo" aumenta el valor de currentFocus*/
          currentFocus++;
          /*y hace el valor actual mas visible*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*Si se oprime la tecla "arriba" decrementa el valor de currentFocus*/
          currentFocus--;
          /*y hace el valor actual mas visible*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*Si se da click a enter, se evita que se envie el formulario*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*y simula in click en el item activo*/
            if (x) x[currentFocus].click();
          }
        }
    });

    function addActive(x) {
      /*una funcion que clasifica los items como activos*/
      if (!x) return false;
      /*Empieza removiendo la clase active de todos los elementos*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*agrega a clase "autocomplete-active"*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*una funcion que remueve la clase active de todos los items autocomplete*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*cierra todas las listas del documento, excepto la que se paso como parametro*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

    /*Ejecuta la funcion cuando alguien da click en el documento*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("myInput"), abilities);