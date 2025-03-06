
/// <reference lib="es2015" />

let MidW = Renderer.screen.getWidth() / 2;
let MidH = Renderer.screen.getHeight() / 2;
let Right = MidW / 5;
let Top = MidH / 5;
let Left = Renderer.screen.getWidth() - Right;
let Bottom = Renderer.screen.getHeight() - Top;

const updateWindowSize = () => {
    MidW = Renderer.screen.getWidth() / 2;
    MidH = Renderer.screen.getHeight() / 2;
    Right = MidW / 5;
    Top = MidH / 5;
    Left = Renderer.screen.getWidth() - Right;
    Bottom = Renderer.screen.getHeight() - Top;
};

export class MikanButton {
    constructor(x, y, dx, dy, text = "", onClick = null, style = {
        color: "§f",
        bgColor: Renderer.color(255, 200, 0, 150), 
    }) {
        // dx dyがintもしくはstrでなければ
        if (! ((typeof dx === 'string' && typeof dy === 'string') || (typeof dx === 'number' && typeof dy === 'number')) ) Error("dx and dy must be number or string");
        // x, y がintもしくはstrでなければ
        if (! ((typeof x === 'string' && typeof y === 'string') || (typeof x === 'number' && typeof y === 'number')) ) Error("x and y must be number or string");
        this.x,this.y;
        this.xp,this.yp;
        if (typeof x === "string"){
            this.xp = x;
            this.yp = y;
        }
        else{
            this.x = x + Right;
            this.y = y + Top;
        }
        this.dx,this.dy;
        this.dxp,this.dyp;
        if (typeof dx === 'string'){
            this.dxp = dx;
            this.dyp = dy;
        }
        else{
            this.dx = dx;
            this.dy = dy;
        }
        this.text = text;
        this.onClick = onClick;
        this.style = style;
    }

    
    setStyle(style) {
        this.style = style;
    }

    getText() {
        return this.text;
    }


    Draw(WindowSize) {
        if (typeof this.dxp === 'string'){
            // this.dx,this.dyは%表記
            this.dx = (parseFloat(this.dxp) / 100) * WindowSize.width;
            this.dy = (parseFloat(this.dyp) / 100) * WindowSize.height;
        }
        if (typeof this.xp === 'string'){
            // this.x,this.yは%表記
            this.x = (parseFloat(this.xp) / 100) * WindowSize.width;
            this.y = (parseFloat(this.yp) / 100) * WindowSize.height;
            this.x += WindowSize.x;
            this.y += WindowSize.y;
        }
        Renderer.drawRect(this.style.bgColor, this.x, this.y, this.dx, this.dy);
        Renderer.drawString(this.style.color + this.text, this.x + (this.dx / 2) - 8, this.y + (this.dy / 2) - 4);
    }

    isClicked(mx, my) {
        return mx >= this.x && mx <= this.x + this.dx &&
               my >= this.y && my <= this.y + this.dy;
    }
}

export class MikanText {
    constructor(x, y, text, style = {
        color: "§r",
    }) {
        this.x,this.y;
        this.xp,this.yp;
        if (typeof x === "string"){
            this.xp = x;
            this.yp = y;
        }
        else{
            this.x = x + Right;
            this.y = y + Top;
        }
        this.text = text;
        this.style = style;
    }

    setStyle(style) {
        this.style = style;
    }

    getText() {
        return this.text;
    }

    Draw(WindowSize) {
        if (typeof this.xp === 'string'){
            // this.x,this.yは%表記
            this.x = (parseFloat(this.xp) / 100) * WindowSize.width;
            this.y = (parseFloat(this.yp) / 100) * WindowSize.height;
            this.x += WindowSize.x;
            this.y += WindowSize.y;
        }
        Renderer.drawString(this.style.color+this.text, this.x, this.y);
    }
}

export class MikanSwitch {
    
    constructor(x, y, mode, dx = 40, dy = 15, CallBack = (isOn) => {}) {
        // dx dyがintもしくはstrでなければ
        if (! ((typeof dx === 'string' && typeof dy === 'string') || (typeof dx === 'number' && typeof dy === 'number')) ) Error("dx and dy must be number or string");
        // x, y がintもしくはstrでなければ
        if (! ((typeof x === 'string' && typeof y === 'string') || (typeof x === 'number' && typeof y === 'number')) ) Error("x and y must be number or string");
        this.x,this.y;
        this.xp,this.yp;
        if (typeof x === "string"){
            this.xp = x;
            this.yp = y;
        }
        else{
            this.x = x + Right;
            this.y = y + Top;
        }
        this.mode = mode;
        this.dx,this.dy;
        this.dxp,this.dyp;
        if (typeof dx === 'string'){
            this.dxp = dx;
            this.dyp = dy;
        }
        else{
            this.dx = dx;
            this.dy = dy;
        }
        this.callback = CallBack;
    }

    Draw(WindowSize) {
        if (typeof this.dxp === 'string'){
            // this.dx,this.dyは%表記
            this.dx = (parseFloat(this.dxp) / 100) * WindowSize.width;
            this.dy = (parseFloat(this.dyp) / 100) * WindowSize.height;
        }
        if (typeof this.xp === 'string'){
            // this.x,this.yは%表記
            this.x = (parseFloat(this.xp) / 100) * WindowSize.width;
            this.y = (parseFloat(this.yp) / 100) * WindowSize.height;
            this.x += WindowSize.x;
            this.y += WindowSize.y;
        }
        Renderer.drawRect(Renderer.color(255, 200, 0, 150), this.x, this.y, this.dx, this.dy);
        const startY = this.y;
        const toEndY = this.dy;
        const offStartX = this.x
        const ButtonWidth = this.dx * 0.45;
        const onStartX = this.x + this.dx - ButtonWidth;
        if (this.mode){
            Renderer.drawRect(Renderer.color(100, 255, 100, 150), onStartX, startY, ButtonWidth, toEndY);
        }
        else{
            Renderer.drawRect(Renderer.color(255, 100, 100, 150), offStartX, startY, ButtonWidth, toEndY);
        }
    }

    onClick(){
        this.mode = !this.mode;
        this.callback(this.mode);
    }
    isClicked(mx, my) {
        return mx >= this.x && mx <= this.x + this.dx &&
               my >= this.y && my <= this.y + this.dy;
    }
}

export class MikanPanel{
    constructor(x, y, dx, dy) {
        // dx dyがintもしくはstrでなければ
        if (! ((typeof dx === 'string' && typeof dy === 'string') || (typeof dx === 'number' && typeof dy === 'number')) ) Error("dx and dy must be number or string");
        // x, y がintもしくはstrでなければ
        if (! ((typeof x === 'string' && typeof y === 'string') || (typeof x === 'number' && typeof y === 'number')) ) Error("x and y must be number or string");
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.opacity = 1
        this.color = Renderer.color(0, 0, 0, 200)
    }

    Draw(WindowSize) {
        let dx = this.dx;
        let dy = this.dy;
        let x = this.x;
        let y = this.y;
        // %表記なら
        if (typeof this.dx === 'string'){
            // this.dx,this.dyは%表記
            dx = (parseFloat(this.dx) / 100) * WindowSize.width;
            dy = (parseFloat(this.dy) / 100) * WindowSize.height;
        }
        if (typeof this.x === 'string'){
            // this.x,this.yは%表記
            x = (parseFloat(this.x) / 100) * WindowSize.width;
            y = (parseFloat(this.y) / 100) * WindowSize.height;
        }
        x += WindowSize.x;
        y += WindowSize.y;
        Renderer.drawLine(this.color,x          ,y          ,x +      dx,y          ,this.opacity);
        Renderer.drawLine(this.color,x +      dx,y          ,x +      dx,y +      dy,this.opacity);
        Renderer.drawLine(this.color,x +      dx,y +      dy,x          ,y +      dy,this.opacity);
        Renderer.drawLine(this.color,x          ,y +      dy,x          ,y          ,this.opacity);
    }
}

class MikanGUI {
    constructor(style = {
        bgColor: Renderer.color(255, 255, 240, 240),
    }) {
        this.name = "MikanGUI";
        this.version = "1.0.0";
        this.objects = [];
        this.enableUI = false;
        this.dummyGui = new Gui(); 
        this.bgColor = style.bgColor
    }

    CreateCanvas(){
        Renderer.drawRect(this.bgColor, Right, Top, Left - Right, Bottom - Top);
    }

    Draw() {
        if (!this.enableUI) return;
        updateWindowSize();
        this.CreateCanvas();
        this.objects.forEach(object => object.Draw({x: Right, y: Top, width: Left - Right, height: Bottom - Top}));
    }

    openGui() {
        this.dummyGui.open()
        this.enableUI = true;
    }

    closeGui() {
        this.dummyGui.close()
        this.enableUI = false;
    }

    isOpenGui() {
        return this.dummyGui.isOpen();
    }

    append(mikanObj) { 
        this.objects.push(mikanObj);
    }

    appends(mikanObjs) {
        this.objects.push(...mikanObjs);
    }

    deleteAll() {
        this.objects = [];
    }

    

    handleClick(mx, my) {
        for (let object of this.objects) {
            if ((object instanceof MikanButton || object instanceof MikanSwitch) && object.isClicked(mx, my)) {
                if (object.onClick) object.onClick();
            }
        }
    }

    getIsShow() {
        return this.enableUI;
    }
}

const guiItems = [];

export const getGUIInstance = (Forward = false, style) => {
    const item = new MikanGUI(style);
    !Forward ? guiItems.push(item) : guiItems.unshift(item);
    return item;
}

// GUI 描画イベント
register("renderOverlay", () => {
    guiItems.map((item) => {
        if (item.getIsShow() && item.dummyGui.isOpen()) 
            item.Draw();
    });
});

// マウスクリックイベント
register("guiMouseClick", (x, y, button) => {
    if (button === 0) guiItems.map((item) => {
        if (item.getIsShow()) item.handleClick(x, y);
    });
});
