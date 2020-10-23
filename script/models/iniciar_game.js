function viewModel() {
    let vm = this;

    vm.oponentes = ko.observableArray();
    vm.categorias = ko.observableArray();

    vm.oponenteSelecionado = ko.observable();
    vm.categoriaSelecionada = ko.observable();

    let api = 'https://ulbra-hanged.herokuapp.com/api';

    alert("Todos alerts estão zoados.");

    $.get(`${api}/categories`).done(function(s) {
        vm.categorias(s.data);
    }).fail(function(e) {
        error();
    });

    $.get(`${api}/users`).done(function(s) {
        vm.oponentes(s.data);
    }).fail(function(e) {
        error();
    });

    let error = function () {
        toastr.error("Parece que algo não deu certo. Vamos tentar novamente...");

        setTimeout(function() {
            location.reload();
        }, 2000);
    };

    vm.iniciarJogo = function () {
        if (!vm.oponenteSelecionado() || !vm.categoriaSelecionada()) {
            toastr.warning("Selecione um oponente e uma categoria antes de iniciar o jogo.");

            return;
        }

        const user = localStorage.getItem('hangman_user');

        if (!user) {
            toastr.error("Erro interno.");

            return;
        }

        let partida = {
            player_two_id: vm.oponenteSelecionado(),
            player_one_id: user.id,
            indexPalavra: 0
        };

        $.post(`${api}/pvp-games`, partida).done(function(s) {
            partida.id = s.id;

            localStorage.setItem('partida', JSON.stringify(partida));
            window.location.href = 'game.html';
        }).fail(function(e) {
            toastr.error("Credenciais erradas.");
        });
    }
}

ko.applyBindings(new viewModel());