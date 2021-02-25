let ThirdController=function(props) {
    for(var p in props) {
        this[p]=props[p];
    }
}

ThirdController.prototype={
    //Referencia
    indexCtrl:null,
    app:null,
    //Dibuja la vista en el lienzo
    PintaLienzo:function() {
        let str='';
        indexCtrl.app.dom.lienzo.html('Pinto el lienzo del tercer controlador');
        this.GetReferenciasLienzo();
        this.SetEventosLienzo();
    },
    GetReferenciasLienzo:function() {

    },
    SetEventosLienzo:function() {

    },
    //Inicializacion
    init:function(mainApp) {
        indexCtrl=this;
        indexCtrl.app=mainApp;
        indexCtrl.PintaLienzo();
        indexCtrl.GetReferenciasLienzo();
        indexCtrl.SetEventosLienzo();
    }
}