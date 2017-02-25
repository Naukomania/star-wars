function Stage (id) {
    this.jqEl=$('#'+id);
    this.addCharacter= function(character){
        this.jqEl.append(character.getTag());
        character.storeTag();
    }
}

function Luke (settings) {
    var me = this;
    this.imgSrc='images/luke.png';
    this.id='luke';

    this.posX = settings.posX ? settings.posX : 0;
    this.posY = settings.posY ? settings.posY : 0;

    this.__proto__ = new Person(this);
    this.registerKeys=function() {
        $(document).on('keydown', function(e){
            switch(event.keyCode) {
                case 87:  // w
                me.posY-=10;
                break;
                case 83: // s
                me.posY+=10;
                break;
                case 65: // a
                me.posX-=10;
                break;
                case 68: // d
                me.posX+=10;
                break;
            }
        });
    }
}

function C3po (settings) {
    this.imgSrc='images/c3po.png';
    this.id='c3po';
    this.posX = settings.posX ? settings.posX : 0;
    this.posY = settings.posY ? settings.posY : 0;
    this.__proto__ = new Person(this);

}

function Darklord (settings, id) {
    this.imgSrc='images/darklord.png';
    this.id='darklord';
    this.posX = settings.posX ? settings.posX : 0;
    this.posY = settings.posY ? settings.posY : 0;
    this.__proto__ = new Person(this);
    if (id) {
        this.id=id;
    }
}

function Person (parent) {
    this.parent = parent;
    this.getTag=function(){
        return '<img src="'+this.parent.imgSrc+'" class="hero" id="'+this.parent.id+'">';
    }
    this.storeTag=function(){
        this.parent.jqEl = $('#'+this.parent.id);
    } 
    this.updatePosition=function() {
        this.parent.jqEl.css('top', this.parent.posY+'px');
        this.parent.jqEl.css('left', this.parent.posX+'px');
    }
}

function RightBar(stage) {
    stage.jqEl.append('<div id="right-bar"></div>');
    this.jqEl=$('#right-bar');
    this.stage=stage;
}

function Door(stage){
    stage.jqEl.append('<div id="door"></div');
    this.jqEl=$('#door');
    this.stage=stage;
}

function Sword(stage){
    stage.jqEl.append('<div id="sword"></div');
    this.jqEl=$('#sword');
    this.stage=stage;
}