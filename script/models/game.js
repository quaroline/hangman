function viewModel() {
    const user = JSON.parse(localStorage.getItem('user'));
    let seconds = 0;

    var myfunc = setInterval(function() {
        seconds++;
        document.getElementById("seconds").innerHTML = (seconds.toString().length > 1) ? seconds: `0${seconds}`;
    }, 1000)

    let vm = this;

    let query = window.location.search;

    let api = 'https://ulbra-hanged.herokuapp.com/api';

    let error = function () {
        setTimeout(function() {
            window.location.href = "iniciar_game.html";
        }, 1000);
    }

    if (!query) {
        toastr.error("Informe o código identificador da partida na URL.");

        error();

        return;
    }

    let idPartida = new URLSearchParams(query).get('partida');

    if (!idPartida) {
        toastr.error("Informe o código identificador da partida na URL.");

        error();

        return;
    }

    let palavras = [];

    let retornarVencedor = function(points_player_one, points_player_two) {
        return points_player_one == points_player_two ? "Empate." : "Vencedor: " + 
                    points_player_two > points_player_one ? "Jogador Convidado." : "Jogador da Casa.";
    }

    let palavraSorteada = "";

    let palavraSorteadaSeparada = "";

    let palavraCensuradaSeparada = "";

    vm.palavraSorteadaSeparada = ko.observableArray();

    vm.palavraCensuradaSeparada = ko.observableArray();

    $.get(`${api}/pvp-games/${idPartida}`).done(function(s) {
        if (s.points_player_one && s.points_player_two) {
            
            let resultado = retornarVencedor(s.points_player_one, s.points_player_two);

            toastr.error("Partida já finalizada. " + resultado);
            
            error();
        }

        if (!localStorage.getItem('partida')) {
            partida = { 
                player_one_id: s.player_one_id,
                player_two_id: s.player_two_id,
                indexPalavra: 0
            };

            localStorage.setItem('partida', JSON.stringify(partida));
        }

        $.get(`${api}/categories/${s.category_id}/random-words`).done(function(s2) {
            palavras = s2;

            palavraSorteada = palavras[partidaVm.indexPalavra];
            palavraSorteadaSeparada = palavraSorteada.name.split('').map(v => v.toLowerCase());
            palavraCensuradaSeparada = palavraSorteada.name.replace(/[A-zç]/gi,'_').split('').map(v => v.toLowerCase());

            vm.palavraSorteadaSeparada(palavraSorteadaSeparada);
            vm.palavraCensuradaSeparada(palavraCensuradaSeparada);
        }).fail(function(e) {
            toastr.error("Erro ao buscar palavras.");
            error();
        });
    }).fail(function(e) {
        toastr.error("Identificador de partida incorreto.");
        error();
    });

    const partida = localStorage.getItem('partida');

    const user = localStorage.getItem('hangman_user');

    if (!user) {
        window.location.href = "index.html";
    }

    let partidaVm = JSON.parse(partida);

    vm.alfabeto = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ç'
    ];

    vm.jogoFinalizado = ko.observable(false);

    vm.pontuacao = ko.observable(0);

    let pontuacaoPlayer = 0;

    vm.jogoFinalizado.subscribe(v => {
        if (v) {
            if (user.id == partidaVm.player_one_id) {
                points_player_one = pontuacaoPlayer;
            } else {
                points_player_two = pontuacaoPlayer;
            }

            $.ajax({
                type: 'PUT',
                url: `${api}/pvp-games/${idPartida}`,
                contentType: 'application/json',
                data: JSON.stringify(partidaVm)
            }).done(function(s) {
                toastr.warning("Você finalizou esta partida.");

                if (s.points_player_one && s.points_player_two) {
                    toastr.success(retornarVencedor(s.points_player_one, s.points_player_two));
                }
            }).fail(function(e) {
                toastr.error("Erro ao atualizar pontuação.");
            });
            
            setTimeout(function() {
                window.location.href = "iniciar_game.html";
            }, 1000);
            
            return;
        }
    })

    vm.pontuacao.subscribe(v => {
        if (v) {
            animar();

            if (v == 6) {
                toastr.error("Que pena, você matou o Sr. Hangman.");
                vm.jogoFinalizado(true);
            }
        }
    });

    vm.palavraCensuradaSeparada.subscribe(v => {
        if (v && !vm.palavraCensuradaSeparada().includes("_")) {
            vm.jogoFinalizado(true);

            pontuacaoPlayer += 1000;

            toastr.success("Parabéns! +1000 pontos!");
        }
    });
    
    let dicaUtilizada = false;

    vm.abrirDica = function() {
        if (!dicaUtilizada) {
            toastr.warning(palavraSorteada.hint);
            vm.pontuacao(vm.pontuacao() + 1);
        }
        else
            toastr.error('Você já utilizou sua dica!');

        dicaUtilizada = true;
    }

    vm.selecionarLetra = function(data) {
        if (data) {
            if (!palavraSorteadaSeparada.includes(data) || !palavraSorteadaSeparada.includes(data)) {
                vm.pontuacao(vm.pontuacao() + 1);
            } else {
                for (let i = 0; i < palavraSorteadaSeparada.length; i++) {
                    if (palavraSorteadaSeparada[i] == data) {
                        var clone = vm.palavraCensuradaSeparada.slice(0);
                        clone[i] = data;

                        pontuacaoPlayer += 10;

                        vm.palavraCensuradaSeparada(clone);
                    }
                }         
            }    
        }
    }

    let desenharCabeca = function() {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');

        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true);
        context.stroke();
    }

    let desenharTorso = function() { desenhar(60, 36, 60, 70); }
    let desenharBracoDireito = function() { desenhar(60, 46, 100, 50); };
    let desenharBracoEsquerdo = function() { desenhar(60, 46, 20, 50); };
    let desenharPernaDireito = function() { desenhar(60, 70, 100, 100); };
    let desenharPernaEsquerdo = function() { desenhar(60, 70, 20, 100); };

    let desenhos = [ desenharCabeca, desenharTorso, desenharBracoDireito, desenharBracoEsquerdo, desenharPernaDireito, desenharPernaEsquerdo ];

    var animar = function() {
        let drawMe = vm.pontuacao();
        debugger;
        desenhos[drawMe - 1]();
    }

    var desenhar = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke(); 
    }

    myStickman = document.getElementById("stickman");

    let context = myStickman.getContext('2d');

    context.beginPath();

    context.strokeStyle = "#4d4d4d";
    context.lineWidth = 3;

    desenhar(0, 150, 150, 150);
    desenhar(10, 0, 10, 600);
    desenhar(0, 5, 70, 5);
    desenhar(60, 5, 60, 15);
}

ko.applyBindings(new viewModel());