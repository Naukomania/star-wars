function Stage (id) {
    this.jqEl=$('#'+id);
    this.rightBar = new RightBar(this);
    this.hero=null;
    this.addCharacter= function(character){
        this.jqEl.append(character.getTag());
        character.storeTag();
        this.hero=character;
        this.rightBar.update();
    }
}

function Luke (settings) {
    var me = this;
    this.imgSrc='images/luke-empty.png';
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
    this.keyExist= function(item){
        if (this.items[item]){
            return true;
        }else{
            return false;
        }
    }
    this.items = {
        sword: 0,
        keyVal: 0
    };
    this.addItem = function(item) {
        this.items[item] = 1;
        localStorage[item] = 1;
        this.update();
    }
    this.removeItem = function(item){
        this.items[item] = 0;
        localStorage[item] = 0;
        this.update();
    }
    this.update = function() {
        this.jqEl.html('');
        if (this.items['sword']) {
            if (this.stage.hero) {
                this.stage.hero.jqEl.css('background-image', 'url(images/luke.png)');
            }
            this.jqEl.append('<p>sword</p>');
        }else{
            if (this.stage.hero) {
                this.stage.hero.jqEl.css('background-image', 'url(images/luke-empty.png)');
            }
        }
        if (this.items['keyVal']) {
            this.jqEl.append('<p>key</p>');
        }
    }
    if (localStorage['sword']) {
        this.items['sword'] = parseInt(localStorage['sword']);
    }
     if (localStorage['keyVal']) {
        this.items['keyVal'] = parseInt(localStorage['keyVal']);
    }
    this.update();
}

function Door(stage){
    stage.jqEl.append('<div id="door"></div>');
    this.jqEl=$('#door');
    this.stage=stage;
    this.open = function() {
        this.jqEl.css('background-image', 'url(images/door-opened.png)');
        this.stage.rightBar.removeItem("keyVal");

    }
}

function Sword(stage){
    stage.jqEl.append('<div id="sword"></div>');
    this.jqEl=$('#sword');
    this.stage=stage;
}

function Key(stage){
    stage.jqEl.append('<div id="key"></div>');
    this.jqEl=$('#key');
    this.stage=stage;
}

function compare(offset1, offset2) {
    if (offset1.top+50>offset2.top && offset1.top-50<offset2.top) {
        if (offset1.left+150>offset2.left && offset1.left-50<offset2.left){
            return true;
        } 
    }
    return false;
}

