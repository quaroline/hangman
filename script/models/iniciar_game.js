function viewModel() {
    let vm = this;

    vm.oponentes = ko.observableArray();
    vm.categorias = ko.observableArray();

    vm.oponenteSelecionado = ko.observable();
    vm.categoriaSelecionada = ko.observable();

    let api = 'https://ulbra-hanged.herokuapp.com/api';

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
            //todo
            toastr.warning("Selecione um oponente e uma categoria antes de iniciar o jogo.");

            return;
        }

        const user = JSON.parse(localStorage.getItem('hangman_user'));

        if (!user) {
            toastr.error("Erro interno. Contate um administrador.");

            return;
        }

        localStorage.setItem('hangman_user', JSON.stringify(
            { player_one_id: user.id, player_two_id: vm.oponenteSelecionado() }
        ));

        window.location.href = 'game.html';
    }
}

ko.applyBindings(new viewModel());