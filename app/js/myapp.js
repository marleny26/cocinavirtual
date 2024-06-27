var app = new Vue({
    el: '#app',
    data: {
        ingredientes: [],
        ingredientesSeleccionados: [],
        mensaje: '',
        receta: null
    },
    created() {
        fetch('app/js/app.json')
            .then(response => response.json())
            .then(data => {
                this.ingredientes = data.ingredientes;
            });
    },
    methods: {
        cocinar() {
            fetch('app/js/app.json')
                .then(response => response.json())
                .then(data => {
                    const recetaEncontrada = data.recetas.find(receta => {
                        return this.ingredientesSeleccionados.every(ing => receta.ingredientes.includes(ing)) &&
                               receta.ingredientes.every(ing => this.ingredientesSeleccionados.includes(ing));
                    });
                    if (recetaEncontrada) {
                        this.receta = recetaEncontrada;
                        this.mensaje = '';
                    } else {
                        this.receta = null;
                        this.mensaje = 'NO hay resultados';
                    }
                });
        }
    }
});