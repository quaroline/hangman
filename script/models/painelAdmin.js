function viewModel(){
    console.log('dalhe')
    let vm = this;

    let api = 'https://ulbra-hanged.herokuapp.com/api';

    vm.novaPalavra = ko.observable();
    vm.dica = ko.observable();
    vm.escolhaCategoria = ko.observable();
    vm.novaCategoria = ko.observable();


    vm.cadastrarPalavra = () => {
        if (!vm.novaPalavra() || !vm.dica() || !vm.escolhaCategoria()) {
            toastr.error("Preencha todos os campos.");
        }

        $.post(`${api}/words`, {
            name: vm.novaPalavra(),
            hint: vm.dica(),
            category_id: vm.escolhaCategoria()
        }).done(function(s) {
            console.log(s);
            alert("Sucesso. Olha o console");
        }).fail(function(e) {
            console.log(e);
            alert("Erro. Olha o console");
        });
    }

    vm.cadastrarCategoria = () => {
        if (!vm.novaCategoria()) {
            toastr.error("Preencha todos os campos.");
        }

        $.post(`${api}/words`, {
            name: vm.novaCategoria()
        }).done(function(s) {
            console.log(e);
            alert("Sucesso. Olha o console");
        }).fail(function(e) {
            console.log(e);
            alert("Erro. Olha o console");
        });
    }

}

ko.applyBindings(new viewModel());