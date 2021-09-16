
function mudaimagem() {
    document.getElementById("imagemcor").src = "./img/professor_color.png"

}

function mousesai() {
    document.getElementById("imagemcor").src = "./img/professor_uncolor.png"
}

function mudaimagem1() {
    document.getElementById("imagemcor1").src = "./img/mundocolor.png"
}

function mousesai1() {
    document.getElementById("imagemcor1").src = "./img/mundo.png"
}

function mudaimagem2() {
    document.getElementById("imagemcor2").src = "./img/molequinhocolor.png"
}

function mousesai2() {
    document.getElementById("imagemcor2").src = "./img/molequinho.png"
}

function mudaimagem3() {
    document.getElementById("imagemcor3").src = "./img/livroscolor.png"
}

function mousesai3() {
    document.getElementById("imagemcor3").src = "./img/livros.png"
}

function mudatexto(elemento) {

    console.log(elemento.children[2].innerText)

    let nome = elemento.children[2].innerText

    if (nome == "Caetano Nascimento") {

        document.getElementById("myP").innerHTML = "Usar o ENEMULADO me salvou porque não tinha outra ferramenta que encaixava tão bem com o meu perfil. Espero que muitas pessoas possam também encontrar esse site"
        document.getElementById("titulo").innerHTML = "ME SALVOU!"
    }

    if (nome == "Pepas El Mago") {

        document.getElementById("myP").innerHTML = "Texto de Pepas"
        document.getElementById("titulo").innerHTML = "AAAAEEE"

    }

    if (nome == "Juan Euzinho") {

        document.getElementById("myP").innerHTML = "Texto de Euzis"
        document.getElementById("titulo").innerHTML = "VALEUUUUUUU"

    }

}
function jwt_login() {

    let user = {
        email: document.getElementById("login").value,
        senha: document.getElementById("senha").value
    };

    alert(JSON.stringify(user));

    let response = fetch('http://localhost:3030/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `${localStorage.getItem("ourToken")}`

        },
        body: JSON.stringify(user)
    }).then(result => {
        if (result.ok) {
            return result.json()
        } else {
            localStorage.setItem("ourToken", null)
            alert("Senha errada")
            document.getElementById('login').value = '';
            document.getElementById('senha').value = '';
        }
    }).then(data => {
        console.log(data)

        localStorage.setItem("ourToken", data.token)
        location.assign('/usuarios/dashboard')
    });


}

function jwt_auth_load() {
    console.log("authload")
    fetch('http://localhost:3030/home/entrar', {
        headers: {
            'Authorization': `${localStorage.getItem("ourToken")}`
        }
    }).then(result => {
        if (result.ok) {
            return result.json()
        } else {
            localStorage.setItem("ourToken", null)
            location.assign('/login')
        }
    });

}

function logout() {
    fetch('http://localhost:3030/logout', {

    }).then(result => {

        localStorage.setItem("ourToken", null);

        location.assign('/login');
        
    });
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    var xhr = new XMLHttpRequest();

    var id_token = googleUser.getAuthResponse().id_token;

    var email2 = profile.getEmail();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {

        if (xhr.responseText == 'success') {

            fetch('http://localhost:3030/usuarios/' + email2, {
            })
                .then(response => response.json())
                .then(data => {

                    if (data.tamanho > 0) {

                        try {

                            fetch('http://localhost:3030/usuarios/login', {
                                method: 'POST',
                                body: JSON.stringify({
                                    email: email2,
                                    google: true
                                }),
                                headers: {
                                    "Content-Type": "application/json; charset=utf-8"
                                }

                            }).then(result => {
                                return result.json();
                            }).then(data => {
                                console.log(data);
                                localStorage.setItem("ourToken", data.token)
                                location.assign('/usuarios/dashboard')
                            });

                        } catch (error) {
                            console.log(error);
                        }

                    } else {

                        location.assign('/teste/cadastro')
                    }
                })

            signOut();
        }
    };
    xhr.send(JSON.stringify({ token: id_token }));
    
}



// area de teste
function testetoken() {
    a = "Pedro Paulo"
    b = "12312"

    localStorage.setItem("Nome do usuario", a)
    localStorage.setItem("id do usuario", b)
    console.log("foi token sett")

}

function limpartoken() {
   

    localStorage.setItem("Nome do usuario", null)
    localStorage.setItem("id do usuario", null)
    console.log("limpar token sett")

}








// function validaCamposUser(user) {
//     let msg = '';

//     if (user.email == '') {
//         msg += '- Informe o Email.  \n';
//     }

//     if (user.senha == '') {
//         msg += '- Informe a Senha.\n';
//     }

//     if (msg != '') {
//         alert(msg);
//         return false
//     }

//     return true;
// }










function criar() {

    let senha = document.getElementById("senha").value
    let confirmar = document.getElementById("confirmar").value

    let cad = {}

    cad.nome = document.getElementById("nome").value;
    cad.email = document.getElementById("email").value;
    cad.cpf = document.getElementById("cpf").value;
    cad.telefone = document.getElementById("telefone").value;
    cad.senha = document.getElementById("senha").value;
    cad.confirmar = document.getElementById("confirmar").value


    if (senha == confirmar) {
        if (validaCampos(cad)) {
            adicionar(cad)

        }
        alert("conta criada")

    } else {
        alert('senha incorreta');
    }

}

async function adicionar(cad) {
    try {

        fetch('http://localhost:3030/usuarios/cadastro', {
            method: 'POST',
            body: JSON.stringify(cad),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }

        }).then(result => {
            return result.json();
        }).then(data => {
            console.log(data);
        });

    } catch (error) {
        console.log(error);
    }
}

function validaCampos(cad) {
    let msg = '';

    if (cad.nome == '') {
        msg += '- Informe o Nome.  \n';
    }

    if (cad.email == '') {
        msg += '- Informe o Email.\n';
    }

    if (cad.cpf == '') {
        msg += '- Informe um CPF. \n';
    }

    if (cad.telefone == '') {
        msg += '- Informe um Telefone. \n';
    }

    if (cad.senha == '') {
        msg += '- Informe uma Senha.  \n';
    }

    if (cad.confirmar == '') {
        msg += '- Informe a senha novamente. \n';
    }

    if (msg != '') {
        alert(msg);
        return false
    }

    return true;
}

function mudaimagem4() {
    document.getElementById("imagemcor").src = "../img/professor_color.png"

    let foto = document.getElementById('Camera');
    let file = document.getElementById('png');

    foto.addEventListener('click', () => {
        file.click();
    });
}

function mousesai4() {
    document.getElementById("imagemcor").src = "../img/professor_uncolor.png"
}

function mudaimagem5() {
    document.getElementById("imagemcor1").src = "../img/mundocolor.png"
}

function mousesai5() {
    document.getElementById("imagemcor1").src = "../img/mundo.png"
}

function mudaimagem6() {
    document.getElementById("imagemcor2").src = "../img/molequinhocolor.png"
}

function mousesai6() {
    document.getElementById("imagemcor2").src = "../img/molequinho.png"
}

function mudaimagem7() {
    document.getElementById("imagemcor3").src = "../img/livroscolor.png"
}

function mousesai7() {
    document.getElementById("imagemcor3").src = "../img/livros.png"
}

function mudaimagem8() {
    document.getElementById("imagemcor4").src = "../img/professor_color.png"
    document.getElementById("imagemcor5").src = "../img/molequinhocolor.png"



}

function mousesai8() {
    document.getElementById("imagemcor4").src = "../img/professor_uncolor.png"
    document.getElementById("imagemcor5").src = "../img/molequinho.png"
}

function mudaimagem9() {
    document.getElementById("imagemcor6").src = "../img/mundocolor.png"
    document.getElementById("imagemcor7").src = "../img/livroscolor.png"



}

function mousesai9() {
    document.getElementById("imagemcor6").src = "../img/mundo.png"
    document.getElementById("imagemcor7").src = "../img/livros.png"
}

let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

// closeBtn.addEventListener("click", ()=>{
//   sidebar.classList.toggle("open");
//   menuBtnChange();//calling the function(optional)
// });

// searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
//   sidebar.classList.toggle("open");
//   menuBtnChange(); //calling the function(optional)
// });

// following are the code to change sidebar button(optional)
function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");//replacing the iocns class
    }
}
