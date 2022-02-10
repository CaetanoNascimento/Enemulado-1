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


        localStorage.setItem("ourToken", data.token)
        setarinfo(document.getElementById('login').value)

    });


}

function jwt_auth_load() {
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
// funct retornar da PAg-login para dashboard quando tiver logado. 
function jwt_auth_load_login() {
    fetch('http://localhost:3030/home/entrar', {
        headers: {
            'Authorization': `${localStorage.getItem("ourToken")}`
        }
    }).then(result => {
        if (result.ok) {
            console.log(result)
            console.log('uepa')
            // location.assign('/usuarios/dashboard')
            return result.json()

        }
    });
}

function logout() {
    fetch('http://localhost:3030/logout', {

    }).then(result => {

        localStorage.setItem("ourToken", null);
        localStorage.setItem("email_user", null);

        localStorage.setItem("Id_user", null);
        localStorage.setItem("Nome_user", null);
        localStorage.setItem("Numero_user", null);
        localStorage.setItem("CPF_user", null);
        localStorage.setItem("Id_cargo_user", null);
        localStorage.setItem("id_tipo_simulado", null);
        localStorage.clear();

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
                                localStorage.setItem("ourToken", data.token)

                                setarinfo(email2);
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

function setarinfo(email) {

    fetch('http://localhost:3030/usuarios/lista/' + email, {
        method: 'GET'
    })
        .then(response => response.json())

        .then(data => {
            localStorage.setItem("Id_user", data.usuario.id);
            localStorage.setItem("email_user", data.usuario.Email)
            // localStorage.setItem("Nome_user", data.usuario.Nome);
            // localStorage.setItem("Numero_user", data.usuario.Numero);
            // localStorage.setItem("CPF_user", data.usuario.Cpf)
            // localStorage.setItem("Id_cargo_user", data.usuario.id_tipo_cargo)

            location.assign('/usuarios/dashboard')
        });
}




function simuladoCH() {
    localStorage.setItem("id_tipo_simulado", 1);
    location.assign('/pages/simulado')
}
function simuladoCN() {
    localStorage.setItem("id_tipo_simulado", 2);
    location.assign('/pages/simulado')
}
function simuladoLC() {
    localStorage.setItem("id_tipo_simulado", 3);
    location.assign('/pages/simulado')
}
function simuladoMT() {
    localStorage.setItem("id_tipo_simulado", 4);
    location.assign('/pages/simulado')
}
function simuladoD1() {
    localStorage.setItem("id_tipo_simulado", 5);
    location.assign('/pages/simulado')
}
function simuladoD2() {
    localStorage.setItem("id_tipo_simulado", 6);
    location.assign('/pages/simulado')
}

var arrayquestao = [];
var arrayquestao_geral = [];

function gerarsimulado(id_tipo_simulado) {
    simulado_banco();

    if (id_tipo_simulado < 5) {
        fetch('http://localhost:3030/questoes/' + id_tipo_simulado, {
            method: 'GET'
        })
            .then(response => response.json())

            .then(data => {
                data.questao1.forEach(quest => {
                    arrayquestao_geral.push(quest);

                });



                for (var af = 0; af < 15; af++) {
                    // arrayquestao.push(arrayquestao_geral[Math.floor(Math.random() * arrayquestao_geral.length)])
                    arrayquestao.push(arrayquestao_geral[af])
                }
                console.table(arrayquestao)
                fazersimulado();
            });
    } else {
        if (id_tipo_simulado == 5) {
            fetch('http://localhost:3030/questoes/dia1/' + 1 + '/' + 3, {
                method: 'GET',
            })
                .then(response => response.json())

                .then(data => {
                    data.questao1.forEach(quest => {
                        arrayquestao_geral.push(quest);
                    });
                    for (var af = 0; af < 30; af++) {
                        arrayquestao.push(arrayquestao_geral[af])

                    }
                    console.table(arrayquestao)
                    fazersimulado();
                });
        } else {
            if (id_tipo_simulado == 6) {
                fetch('http://localhost:3030/questoes/dia1/' + 2 + '/' + 4, {
                    method: 'GET',
                })
                    .then(response => response.json())

                    .then(data => {
                        data.questao1.forEach(quest => {
                            arrayquestao_geral.push(quest);
                        });
                        for (var af = 0; af < 30; af++) {
                            arrayquestao.push(arrayquestao_geral[af])

                        }
                        console.table(arrayquestao)
                        fazersimulado();
                    });
            }
        }
    }

}

function setar_ID_simu() {
    gerarsimulado(localStorage.getItem("id_tipo_simulado"))

}

function simulado_banco() {
    var tempo1 = new Date().toLocaleString();
    tempo1 = tempo1.replace('/', '-')
    tempo1 = tempo1.replace('/', '-')

    let cad2 = {}

    cad2.id_tipo_simulado = parseFloat(localStorage.getItem("id_tipo_simulado"));
    cad2.id_usuario = parseFloat(localStorage.getItem("Id_user"));
    cad2.data_inicio = tempo1;
    cad2.data_final = '00-00-0000 00:00:00';
    cad2.duracao = "00:00:00";
    cad2.nota_geral = 0;
    cad2.status = 0;

    try {

        fetch('http://localhost:3030/simulado', {
            method: 'POST',
            body: JSON.stringify(cad2),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }

        }).then(result => {
            return result.json();
        }).then(data => {

            localStorage.setItem("id_simulado", data.id_simulado);
            alert("cm")
            data_inicio_banco();



        });

    } catch (error) {
        console.log(error);
    }


}

function simulado_questao(arrayresposta, arraygabarito) {
    for (var ad = 0; ad < arrayresposta.length; ad++) {
        let inform2 = {}
        inform2.id_simulado = localStorage.getItem("id_simulado"),
            inform2.id_questoes = arrayresposta[ad].id_questao,
            inform2.resposta_usuario = arrayresposta[ad].resposta,
            inform2.status = 1
        try {
            fetch('http://localhost:3030/simulado/questao', {
                method: 'POST',
                body: JSON.stringify(inform2),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }

            }).then(result => {
                return result.json();
            })
        } catch (error) {
            console.log(error);
        }


    }
    finalizar_simu();

}

function finalizar_simu() {
    var tempof1 = new Date().toLocaleString();
    tempof1 = tempof1.replace('/', '-')
    tempof1 = tempof1.replace('/', '-')

    var inform3 = {}

    inform3.nota_geral = analisar_resposta(),
        inform3.data_final = tempof1,
        inform3.duracao = calcular_h(tempof1),
        inform3.status = 1
    inform3.id_simulado = parseFloat(localStorage.getItem("id_simulado"))


    func_finalizar_simu_banco(inform3);

    location.assign('/usuarios/Notas');
}

function func_finalizar_simu_banco(inform3) {
    fetch('http://localhost:3030/simulado/', {
        headers: {
            "Content-Type": "application/json; charset=utf-8"

        },
        method: 'PATCH',
        body: JSON.stringify(inform3)


    })
        .then(response => response.json())
        .then(json => console.log(json))

}


function analisar_resposta() {
    var acertos = 0
    for (var ae = 0; ae < arrayresposta.length; ae++) {
        if (arraygabarito[ae].gabarito == arrayresposta[ae].resposta) {

            acertos++
        }
    }
    return acertos;

}





function calcular_h(dtPartida) {
    data_inicio_banco();
    let dtChegada = new moment(localStorage.getItem("hora_inicio"), "DD-MM-YYYY HH:mm:ss");
    let parttida = new moment(dtPartida, "DD-MM-YYYY HH:mm:ss");
    console.log(dtChegada)
    console.log(parttida)

    var ms = parttida.diff(dtChegada)
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) + "h" + moment.utc(ms).format(" mm") + "m";

    s = s.replace('h', ':')
    s = s.replace(' ', '')
    s = s.replace('-', '')
    s = s.replace('m', ':00')
    console.log("ss")
    console.log(s)

    return s
}

// var data_inicio_2 = ''
// var data_inicio_1 = ''

function data_inicio_banco() {
    alert("final 2.2")
    fetch('http://localhost:3030/simulado/' + parseFloat(localStorage.getItem("id_simulado")), {
        method: 'GET',
    })
        .then(response => response.json())

        .then(data => {
            alert("final1")
            // let data_inicio_1 = data.data_inicio.replace("T", " ")
            // let data_inicio_2 = data_inicio_1.replace(".000Z", "")
            // localStorage.setItem("hora_inicio", data_inicio_2);
          
            // func_replace(data);
            console.log(data.data_inicio)
            alert(data.data_inicio)
        });

}

function func_replace(data) {
    let data_inicio_1 = data.data_inicio.replace("T", " ")
    let data_inicio_2 = data_inicio_1.replace(".000Z", "")
    localStorage.setItem("hora_inicio", data_inicio_2);
    alert("final")


}





function resposta_A() {
    localStorage.setItem("R_questao", "a")
    document.getElementById("alternativa_A").style.backgroundColor = "grey";
    document.getElementById("alternativa_B").style.backgroundColor = "";
    document.getElementById("alternativa_C").style.backgroundColor = "";
    document.getElementById("alternativa_D").style.backgroundColor = "";
    document.getElementById("alternativa_E").style.backgroundColor = "";


}
function resposta_B() {
    localStorage.setItem("R_questao", "b")
    document.getElementById("alternativa_B").style.backgroundColor = "grey";
    document.getElementById("alternativa_A").style.backgroundColor = "";
    document.getElementById("alternativa_C").style.backgroundColor = "";
    document.getElementById("alternativa_D").style.backgroundColor = "";
    document.getElementById("alternativa_E").style.backgroundColor = "";


}
function resposta_C() {
    localStorage.setItem("R_questao", "c")
    document.getElementById("alternativa_C").style.backgroundColor = "grey";
    document.getElementById("alternativa_A").style.backgroundColor = "";
    document.getElementById("alternativa_B").style.backgroundColor = "";
    document.getElementById("alternativa_D").style.backgroundColor = "";
    document.getElementById("alternativa_E").style.backgroundColor = "";


}
function resposta_D() {
    localStorage.setItem("R_questao", "d")
    document.getElementById("alternativa_D").style.backgroundColor = "grey";
    document.getElementById("alternativa_A").style.backgroundColor = "";
    document.getElementById("alternativa_B").style.backgroundColor = "";
    document.getElementById("alternativa_C").style.backgroundColor = "";
    document.getElementById("alternativa_E").style.backgroundColor = "";


}
function resposta_E() {
    localStorage.setItem("R_questao", "e")
    document.getElementById("alternativa_E").style.backgroundColor = "grey";
    document.getElementById("alternativa_A").style.backgroundColor = "";
    document.getElementById("alternativa_B").style.backgroundColor = "";
    document.getElementById("alternativa_C").style.backgroundColor = "";
    document.getElementById("alternativa_D").style.backgroundColor = "";


}


var arrayresposta = [];

function salvar_e_verificar() {
    var valor = 0
    var Pre_resposta = {
        "id_questao": localStorage.getItem("id_questao"),
        "resposta": localStorage.getItem("R_questao")
    }

    for (var ac = 0; ac < arrayresposta.length; ac++) {

        if (arrayresposta[ac].id_questao == localStorage.getItem("id_questao")) {
            valor = +1
            alert("Questão já verificada.");
        }
    }

    if (Pre_resposta.resposta == "") {
        alert("Selecione uma alternativa!")
    } else {

        if (valor == 0) {
            arrayresposta.push(Pre_resposta)
            verificar_R(arrayresposta);
        }
    }

}

function salvar_e_passar_Resposta() {
    var valor = 0
    var Pre_resposta = {
        "id_questao": localStorage.getItem("id_questao"),
        "resposta": localStorage.getItem("R_questao")
    }

    for (var ac = 0; ac < arrayresposta.length; ac++) {

        if (arrayresposta[ac].id_questao == localStorage.getItem("id_questao")) {
            valor = +1
            alert("Questão já respondida");
            limaparquestao();
        }
    }

    if (Pre_resposta.resposta == "") {
        alert("Selecione uma alternativa!")
    } else {

        if (valor == 0) {
            arrayresposta.push(Pre_resposta)
            limaparquestao();

        }
    }







}

function mudarcor() {
    switch (arraygabarito[ab].gabarito) {
        case 'a': document.getElementById("alternativa_A").style.backgroundColor = "#98FB98";
            break
        case 'b': document.getElementById("alternativa_B").style.backgroundColor = "#98FB98";
            break;
        case 'c': document.getElementById("alternativa_C").style.backgroundColor = "#98FB98";
            break;
        case 'd': document.getElementById("alternativa_D").style.backgroundColor = "#98FB98";
            break;
        case 'e': document.getElementById("alternativa_E").style.backgroundColor = "#98FB98";
            break;
        default:
    }
}

function verificar_R(arrayresposta) {

    if (arraygabarito[ab].gabarito == arrayresposta[ab].resposta) {
        mudarcor();


    } else {
        switch (arrayresposta[ab].resposta) {
            case 'a': document.getElementById("alternativa_A").style.backgroundColor = "#FA8072";
                mudarcor();
                break
            case 'b': document.getElementById("alternativa_B").style.backgroundColor = "#FA8072";
                mudarcor();
                break;
            case 'c': document.getElementById("alternativa_C").style.backgroundColor = "#FA8072";
                mudarcor();
                break;
            case 'd': document.getElementById("alternativa_D").style.backgroundColor = "#FA8072";
                mudarcor();
                break;
            case 'e': document.getElementById("alternativa_E").style.backgroundColor = "#FA8072";
                mudarcor();
                break;
            default:
        }
    }

}



var ab = 0
var arraygabarito = [];



function limaparquestao() {

    // colocar arrayquestao.length no lugar de 5, o tamanho -1
    if (1 == ab) {
        alert("simulado acabou")

        simulado_questao(arrayresposta, arraygabarito);

    }
    ab++
    var element1 = document.getElementById("numeroquestao");
    element1.removeChild(element1.childNodes[1]);
    var element2 = document.getElementById("nomeinstituicao");
    element2.removeChild(element2.childNodes[1]);
    var element3 = document.getElementById("corprova");
    element3.removeChild(element3.childNodes[1]);
    var element4 = document.getElementById("anoprova");
    element4.removeChild(element4.childNodes[1]);
    var element5 = document.getElementById("textoprincipal");
    element5.removeChild(element5.childNodes[0]);
    var element6 = document.getElementById("textoquestao");
    element6.removeChild(element6.childNodes[0]);
    var element7 = document.getElementById("alternativa_A");
    element7.removeChild(element7.childNodes[1]);
    var element8 = document.getElementById("alternativa_B");
    element8.removeChild(element8.childNodes[1]);
    var element9 = document.getElementById("alternativa_C");
    element9.removeChild(element9.childNodes[1]);
    var element10 = document.getElementById("alternativa_D");
    element10.removeChild(element10.childNodes[1]);
    var element11 = document.getElementById("alternativa_E");
    element11.removeChild(element11.childNodes[1]);

    document.getElementById("alternativa_A").style.backgroundColor = "";
    document.getElementById("alternativa_B").style.backgroundColor = "";
    document.getElementById("alternativa_C").style.backgroundColor = "";
    document.getElementById("alternativa_D").style.backgroundColor = "";
    document.getElementById("alternativa_E").style.backgroundColor = "";

    localStorage.setItem("id_questao", null);


    fazersimulado()

}

function fazersimulado() {

    localStorage.setItem("id_questao", arrayquestao[ab].id_questao);
    localStorage.setItem("R_questao", "");
    var R_gabarito = {
        "id_questao": arrayquestao[ab].id_questao,
        "gabarito": arrayquestao[ab].Gabarito
    }
    arraygabarito.push(R_gabarito);



    var a = document.createElement("SPAN")
    var numeroquestao = document.createTextNode(arrayquestao[ab].numero);
    a.appendChild(numeroquestao);
    document.getElementById("numeroquestao").appendChild(a);


    var b = document.createElement("SPAN")
    var nomeinstituicao = document.createTextNode(arrayquestao[ab].instituicao);
    b.appendChild(nomeinstituicao);
    document.getElementById("nomeinstituicao").appendChild(b);

    var c = document.createElement("SPAN")
    var corprova = document.createTextNode(arrayquestao[ab].id_corprova);
    c.appendChild(corprova);
    document.getElementById("corprova").appendChild(c);

    var d = document.createElement("SPAN")
    var anoprova = document.createTextNode(arrayquestao[ab].id_anoprova);
    d.appendChild(anoprova);
    document.getElementById("anoprova").appendChild(d);

    var e = document.createElement("P")
    var textoprincipal = document.createTextNode(arrayquestao[ab].textoprincipal);
    e.appendChild(textoprincipal);
    document.getElementById("textoprincipal").appendChild(e);

    var f = document.createElement("P")
    var textoquestao = document.createTextNode(arrayquestao[ab].textoquestao);
    f.appendChild(textoquestao);
    document.getElementById("textoquestao").appendChild(f);

    var g = document.createElement("SPAN")
    var alternativa_A = document.createTextNode(arrayquestao[ab].alternativa_A);
    g.appendChild(alternativa_A);
    document.getElementById("alternativa_A").appendChild(g);

    var h = document.createElement("SPAN")
    var alternativa_B = document.createTextNode(arrayquestao[ab].alternativa_B);
    h.appendChild(alternativa_B);
    document.getElementById("alternativa_B").appendChild(h);

    var i = document.createElement("SPAN")
    var alternativa_C = document.createTextNode(arrayquestao[ab].alternativa_C);
    i.appendChild(alternativa_C);
    document.getElementById("alternativa_C").appendChild(i);

    var j = document.createElement("SPAN")
    var alternativa_D = document.createTextNode(arrayquestao[ab].alternativa_D);
    j.appendChild(alternativa_D);
    document.getElementById("alternativa_D").appendChild(j);

    var k = document.createElement("SPAN")
    var alternativa_E = document.createTextNode(arrayquestao[ab].alternativa_E);
    k.appendChild(alternativa_E);
    document.getElementById("alternativa_E").appendChild(k);


}






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

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", () => { // Sidebar open when you click on the search iocn
    sidebar.classList.toggle("open");
    menuBtnChange(); //calling the function(optional)
});

function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");//replacing the iocns class
    }
}

function correto() {
    document.getElementById("ok").src = "../img/Vector.png"
}


// var arraysimulados = [];

// var  arraysimulados_tipo1 = [];

// var  arraysimulados_tipo2 = [];

// var  arraysimulados_tipo3 = [];

// var  arraysimulados_tipo4 = [];


// function Chamararraysimulados(valor_1_4) {
//     let arraysimulados = [];
//     fetch('http://localhost:3030/simulado/' + parseFloat(localStorage.getItem("Id_user")) + '/' + valor_1_4, {
//         method: 'GET'
//     })
//         .then(response => response.json())

//         .then(data => {


//             data.simulados_prontos.forEach(simu => {
//                 arraysimulados.push(simu);
//             });
//             if(valor_1_4 == 4){
//                 separar_tipos_simulado(arraysimulados)
//             }



//             // return arraysimulados
//         });

// }
// function separar_tipos_simulado(arraysimulados){
//     console.log(arraysimulados)
//     let  arraysimulados_tipo1 = [];

//     let  arraysimulados_tipo2 = [];

//     let  arraysimulados_tipo3 = [];

//     var  arraysimulados_tipo4 = [];

//      for (var aj = 0; aj < arraysimulados.length; aj++) {

//         switch (arraysimulados[aj].simulado.id_tipo_simulado) {
//             case 1:
//               console.log("1")
//                 arraysimulados_tipo1.push(arraysimulados[aj].simulado.nota_geral);
//               break;
//             case 2:
//                 console.log("2");
//                 arraysimulados_tipo2.push(arraysimulados[aj].simulado.nota_geral);
//               break;
//             case 3:
//                 console.log("3");
//                 arraysimulados_tipo3.push(arraysimulados[aj].simulado.nota_geral);
//               break;
//             case 4:
//                 console.log("4");
//                 arraysimulados_tipo4.push(arraysimulados[aj].simulado.nota_geral);
//               break;

//             default:


//           }



//     }
//     console.log(arraysimulados_tipo1)
//     console.log(arraysimulados_tipo2)
//     console.log(arraysimulados_tipo3)
//     console.log(arraysimulados_tipo4)

// }


// function mudar_valor_1_4() {
//     for (var ah = 1; ah < 5; ah++) {
//         Chamararraysimulados(ah)

//     }

// }





// var ctx = document.getElementById('myChart')

// var data_chart = {
//     labels:  ['Porcentem de acerto', 'y', 'z', 'a', 'b'],
//     datasets: [{
//         label: 'CIÊNCIAS DA NATUREZA',
//         backgroundColor: '#73DA73',
//         borderColor: '#73DA73',
//         data:  arraysimulados_tipo2,
//     },{
//         label: 'CIÊNCIAS HUMANAS',
//         backgroundColor: '#E7EC49',
//         borderColor: '#E7EC49',
//         data: arraysimulados_tipo1,
//     },{
//         label: 'MATEMÁTICA',
//         backgroundColor: '#3B91E7',
//         borderColor: '#3B91E7',
//         data:  arraysimulados_tipo4,
//     },{
//         label: 'LINGUAGENS E CÓDIGOS',
//         backgroundColor: 'rgb(255, 99, 132)',
//         borderColor: 'rgb(255, 99, 132)',
//         data: arraysimulados_tipo3,
//     }]
// };


// const myChart = new Chart(ctx, {
//     type: 'line',
//     data: data_chart,
//     options: {

//     }

// });







