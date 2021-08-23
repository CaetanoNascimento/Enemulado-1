// const { response } = require("express")

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

function criar() {
    /*console.log(document.getElementById("nome").value);
    console.log(document.getElementById("email").value);
    console.log(document.getElementById("cpf").value);
    console.log(document.getElementById("telefone").value);
    console.log(document.getElementById("senha").value);
    console.log(document.getElementById("confirmar").value);*/

    let senha = document.getElementById("senha").value
    let confirmar = document.getElementById("confirmar").value

    let login = {}

    login.nome = document.getElementById("nome").value;
    login.email = document.getElementById("email").value;
    login.cpf = document.getElementById("cpf").value;
    login.telefone = document.getElementById("telefone").value;
    login.senha = document.getElementById("senha").value;
    login.confirmar = document.getElementById("confirmar").value


    if (senha == confirmar) {

        adicionar(login)
        alert("conta criada")



    } else {
        alert('senha incorreta');
    }

}


async function adicionar(login) {
    try {

        /*const formData = new FormData();
        // const fileField = document.querySelector('input[type="file"]');

        formData.append('nome', login.nome);
        formData.append('email', login.email);
        // formData.append('imagem_produto', fileField.files[0]);
        formData.append('cpf', login.cpf);
        formData.append('telefone', login.telefone);
        formData.append('senha', login.senha);
        formData.append('confirmar_senha', login.confirmar);

        for (let [key, value] of formData.entries()) { 
            console.log(key, value);
          }
*/


        fetch('http://localhost:3000/cadastro', {
            method: 'POST',
            body: JSON.stringify(JSON.parse(login)),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }

        }).then(result => {
            return result.json();
        }).then(data => {
            // this.listaTabela();
            console.log(data);
            // this.arrayProdutos.push(produto);
        });

    } catch (error) {
        console.log(error);
    }
}

function mudaimagem4() {
    document.getElementById("imagemcor").src = "../img/professor_color.png"

    let foto = document.getElementById('Camera');
    let file = document.getElementById('png');

    foto.addEventListener('click', () => {
        file.click();
    });
    function teste() {
        fetch('https://localhost:3030/login')

    }
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


