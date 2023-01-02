
        function hide(elemId) {
            document.querySelector(elemId).innerHTML = "";
        }

        function unHide(elemId) {
            document.querySelector(elemId).style = "display:block";
        }

        function cl(x) {
            console.log(x);
        }

        function show(msg = "show", divName = "#show") {
            unHide("#show");
            document.querySelector(divName).innerHTML = msg;
        }

        function show2(msg = "show2", divName = "#show2") {
            unHide("#show2");
            document.querySelector(divName).innerHTML = msg;
        }

        function show3add(msg = "show2", divName = "#show3") {
            unHide("#show3");
            document.querySelector(divName).innerHTML += "<br/>" + msg;
        }

        