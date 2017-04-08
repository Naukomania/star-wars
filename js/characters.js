/**
 * @var string id идентификатор html-контейнера сцены
 */
 function Stage (id) {
    this.jqEl=$('#'+id);
    this.rightBar = new RightBar(this);
    this.hero=null;
    this.reload= function(){
        this.jqEl.html('');
    };
    this.addCharacter= function(character){
        this.jqEl.append(character.getTag());
        character.storeTag();
        this.hero=character;
        this.rightBar.update();
    }
    this.addPerson = function (character){
        this.jqEl.append(character.getTag());
        character.storeTag();
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
function Shooter (settings) {
    var me = this;
    var shoots = 0;
    this.imgSrc='images/shooter.png';
    this.id='shooter';

    this.posX = settings.posX ? settings.posX : 0;
    this.posY = settings.posY ? settings.posY : 0;

    this.shoot = function(){ // хранить сцену в свойстве
        shoots++;
        var bullet = new Bullet({posX: me.posX+120, posY:me.posY+55}, "shoot" + shoots, me);
        stage.addPerson(bullet);
        me.bullets["shoot" + shoots]=bullet;
        bullet.updatePosition();
        bullet.startHorisontAnimation({leftX:me.posX, rightX:900+me.posX});
    }
    this.checkBullets = function (goalOffset){
        $.each(me.bullets, function(index, bullet){
            if(realCompare(bullet.jqEl.offset(),goalOffset)){
                console.log('check');
                return true;
            } 
        });
        return false;
    };
    this.bullets = {}
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
                case 32: // space
                me.shoot();
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
function Defender (settings) {
    this.imgSrc='images/defender.png';
    this.id='defender';
    this.posX = settings.posX ? settings.posX : 0;
    this.posY = settings.posY ? settings.posY : 0;
    this.__proto__ = new Person(this);
    var me = this;


    this.teleport = function(minX, maxX, minY, maxY){ 
            me.jqEl.fadeOut(500, 'swing', function(){
            me.posX=Math.random()*(maxX - minX)+minX;
            me.posY=Math.random()*(maxY - minY)+minY;
            me.jqEl.fadeIn();
        });
    }
}
function Darklord (settings, id) {
    this.imgSrc='images/darklord.png';
    this.id='darklord';
    this.posX = settings.posX ? settings.posX : 0;
    this.posY = settings.posY ? settings.posY : 0;
    this.__proto__ = new Person(this);
    var me = this;
    if (id) {
        this.id=id;
    }
    this.startVetricalAnimation = function(settings){
        var direction = 1; 
        setInterval(function(){
            if(direction == 1){
                me.posY += 10;
            } else{
                me.posY -= 10;
            }
            if (me.posY<settings.topY){
                direction = 1;
            }
            if (me.posY>settings.bottomY) {
                direction = 0;
            }

        },100)
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
                this.stage.hero.jqEl.attr('src', 'images/luke.png');
            }
            this.jqEl.append('<p>sword</p>');
        }else{
            if (this.stage.hero) {
                this.stage.hero.jqEl.attr('src', 'images/luke-empty.png');
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

function Door(stage, settings){
    stage.jqEl.append('<div id="door"></div>');
    this.jqEl=$('#door');
    this.stage=stage;
    if(settings){
        this.jqEl.css("top", settings.posY+'px');
        this.jqEl.css("left", settings.posX+'px');
    }
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

function Key(stage, settings){
    stage.jqEl.append('<div id="key"></div>');
    this.jqEl=$('#key');
    this.stage=stage;
    if(settings){
        this.jqEl.css("top", settings.posY+'px');
        this.jqEl.css("left", settings.posX+'px');
    }
}

function compare(offset1, offset2) {
    if (offset1.top+50>offset2.top && offset1.top-50<offset2.top) {
        if (offset1.left+150>offset2.left && offset1.left-50<offset2.left){
            return true;
        } 
    }
    return false;
}

function Bullet (settings, id, shooter){
    this.imgSrc='images/bullet.png';
    this.id='bullet';
    this.posX = settings.posX ? settings.posX : 0;
    this.posY = settings.posY ? settings.posY : 0;
    this.__proto__ = new Person(this);
    var me = this;
    if (id) {
        this.id=id;
    }
    this.startHorisontAnimation = function(settings){
        var direction = 1; 
        var id = setInterval(function(){
            me.updatePosition();
            if(direction == 1){
                me.posX += 10;
            } else{
                me.posX -= 10;
            }
            if (me.posX<settings.leftX){
                direction = 1;
            }
            if (me.posX>settings.rightX) {
                direction = 0;
                me.jqEl.remove();
                delete shooter.bullets[me.id];
                clearInterval(id);
            }

        },50)
    }
}

function realCompare(offset1, offset2){
    if (offset1.top>offset2.top && offset1.top<offset2.top+100) {
        if (offset1.left>offset2.left && offset1.left<offset2.left+50){
            return true;
        } 
    }
    return false;
}