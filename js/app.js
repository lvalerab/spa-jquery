let MainAppController=function(props) {
    for(var p in props) {
        this[p]=props[p];
    }
};

MainAppController.prototype={
    //Referencia
    mainApp:null,
    ctrlActual:null,
    //Funciones generales
    CargaControlador:function(controladorId) {
        mainApp.ctrlActual=mainApp.Controladores[controladorId].controlador;
        if(mainApp.ctrlActual) {
            if(mainApp.ctrlActual.titulo) {
                mainApp.dom.titulo.html(mainApp.ctrlActual.titulo);
            }
            //Hacemos la llamada al init del controlador
            mainApp.ctrlActual.init(mainApp);
        }
    },
    //Referencias generales
    GetReferences:function() {
        mainApp.dom={};
        mainApp.dom.titulo=$('#'+mainApp.TituloAppId);
        mainApp.dom.lienzo=$('#'+mainApp.LienzoId);
        mainApp.dom.menu=$('#'+mainApp.MenuAppID);
        mainApp.dom.submenu=$('#'+mainApp.SubMenuAppID);
    },
    PintaMenuApp:function() {
        let strMenu='';
        strMenu+='<nav class="navbar navbar-expand-lg navbar-light bg-light">';
        strMenu+='        <a class="navbar-brand" href="#">LFVB</a>';
        strMenu+='        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">';
        strMenu+='              <span class="navbar-toggler-icon"></span>';
        strMenu+='        </button>';
        strMenu+='<div class="collapse navbar-collapse" id="navbarSupportedContent">';
        strMenu+='<ul class="navbar-nav mr-auto">';
        for(var i=0;i<mainApp.Menus.length;i++) {
            strMenu+='<li class="nav-item ">';
            strMenu+='  <a class="nav-link" href="'+(mainApp.Menus[i].url?mainApp.Menus[i].url:'#')+'" id="'+mainApp.Menus[i].Id+'">'+mainApp.Menus[i].Nombre+'</a>';
            strMenu+='</li>';
            
        }
        strMenu+='</ul>';
        strMenu+='</div>';
        strMenu+='</nav>';
        mainApp.dom.menu.html(strMenu);
        for(var i=0;i<mainApp.Menus.length;i++) {
            mainApp.Menus[i].dom=$('#'+mainApp.Menus[i].Id);
            if(mainApp.Menus[i].Accion) {
                mainApp.Menus[i].dom.on('click',$.proxy(mainApp.Menus[i].Accion,mainApp));
            }
        }
    },
    //Punto de inicio
    ConfiguraMenu:function() {
        mainApp.Menus=[
            {
                Id:'LnkMenuIndice',
                Nombre:'Página principal',
                Accion:function() {
                    mainApp.CargaControlador('Index');
                }
            },
            {
                Id:'LnkMenuSegundo',
                Nombre:'Segundo',
                Accion:function() {
                    mainApp.CargaControlador('Segundo');
                }
            },
            {
                Id:'LnkMenuTercero',
                Nombre:'Tercero',
                Accion:function() {
                    mainApp.CargaControlador('Tercero');
                }
            },
        ]
    },
    init:function() {
        mainApp=this;
        mainApp.ConfiguraMenu();
        mainApp.GetReferences();
        mainApp.PintaMenuApp();
        mainApp.CargaControlador('Index');
    }
};

$(document).ready(function() {
    let appConfig={
        LienzoId:'LienzoId',
        TituloAppId:'TituloId',
        MenuAppID:'MenuId',
        Controladores:{
            'Index':{
                titulo:'Página principal',
                controlador:new IndexController()
            },
            'Segundo':{
                titulo:'Segundo controlador',
                controlador:new SecondController()
            },
            'Tercero':{
                titulo:'Tercer controlador',
                controlador:new ThirdController()
            }
        }
    };

    let app=new MainAppController(appConfig);
    app.init();
});