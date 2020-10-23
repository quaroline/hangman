function viewModel(){
    
    let vm = this;
    
    let api = 'https://ulbra-hanged.herokuapp.com/api';
    
    vm.novaPalavra = ko.observable();
    vm.dica = ko.observable();
    vm.escolhaCategoria = ko.observable();
    vm.novaCategoria = ko.observable();
    
    vm.palavrasArray = ko.observableArray();
    vm.categoriasArray = ko.observableArray();

    vm.cadastrarPalavra = () => {
        if (!vm.novaPalavra() || !vm.dica() || !vm.escolhaCategoria()) {
            toastr.error("Preencha todos os campos.");
        }

        $.post(`${api}/words`, {
            name: vm.novaPalavra(),
            hint: vm.dica(),
            category_id: vm.escolhaCategoria()
        }).done(function(s) {
            vm.buscarPalavras();
            alert("Sucesso. Olha o console");
        }).fail(function(e) {
            vm.buscarPalavras();
            alert("Erro. Olha o console");
        });
    }

    vm.cadastrarCategoria = () => {
        if (!vm.novaCategoria()) {
            toastr.error("Preencha todos os campos.");
        }

        $.post(`${api}/categories`, {
            name: vm.novaCategoria()
        }).done(function(s) {
            vm.buscarCategorias();
            alert("Sucesso. Olha o console");
        }).fail(function(e) {
            vm.buscarCategorias();

            alert("Erro. Olha o console");
        });
    }

    vm.buscarPalavras = () => {
        vm.palavrasArray = ko.observableArray();
        $.get(`${api}/words`)
            .done(response => {
                response?.data.map(r => vm.palavrasArray.push(r));
            }).fail(error => console.log(error));
    }

    vm.buscarCategorias = () => {
        vm.categoriasArray.destroyAll();
        vm.categoriasArray.removeAll();
        $.get(`${api}/categories`)
            .done(response => {
                response?.data.map(r => vm.categoriasArray.push(r));
            }).fail(error => console.log(error));
    }

    // vm.deletarPalavra(id) = () =>{
    //     $.delete(`${api}/words/${id}`)
    //         .done(response => {
    //             response?.data.map(r => vm.categoriasArray.push(r));
    //         }).fail(error => console.log(error));
    // }

    vm.buscarPalavras();
    vm.buscarCategorias();
}

ko.applyBindings(new viewModel());