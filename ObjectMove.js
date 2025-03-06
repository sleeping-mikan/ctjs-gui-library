// TODO あふれた時にスクロールなりページ切り替えを実装する
import { MikanButton, MikanPanel, MikanText, MikanSwitch, getGUIInstance } from "./index";

class MikanGraphics {
    constructor(x,y,width,height,DrawFunction,DraggedFunction){ 
        this.x = x;
        this.y = y;
        this.basewidth = width;
        this.baseheight = height;
        this.width = width;
        this.height = height;
        this.DrawFunction = DrawFunction;
        this.DraggedFunction = DraggedFunction;
        this.graceSpace = 10;
        this.isForceMove = false;
    }

    Draw() {
        this.DrawFunction();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setDisableForceMove() {
        this.isForceMove = false;
    }

    getForceMove() {
        return this.isForceMove;
    }

    setScale(scale) {
        this.width = this.basewidth * scale;
        this.height = this.baseheight * scale;
    }

    handleDrag(dx, dy, mx, my) {
        // 自身がマウスポインタの下にいるか または 前回ドラッグした対象か
        if (this.isForceMove) {
            this.DraggedFunction(dx, dy, mx, my);
        }
    }

    handleClick(mx, my, mode) {
        // 自身がマウスポインタの下にいるか または 前回ドラッグした対象か
        if ((mx >= this.x && mx <= this.x + this.width &&
            my >= this.y && my <= this.y + this.height)) {
            this.isForceMove = true;
        }
    }

    handleRelease(mx, my, mode) {
        this.isForceMove = false;
    }
}

class MikanHUD{
    constructor(style, mode){
        this.gui = getGUIInstance(false,style);
        this.objects = [];
        this.mode = mode;
    }

    // 描写アイテムの追加
    appendObj(mikanObj) { 
        this.objects.push(mikanObj);
    }

    setMode(mode){
        this.mode = mode;
    }

    getMode(){
        return this.mode;
    }

    openGui(){
        this.gui.openGui();
    }

    closeGui(){
        this.gui.closeGui();
    }

    isOpenGui(){
        return this.gui.isOpenGui();
    }

    Draw(){
        this.objects.map((item) => {
            item.Draw();
        });
    }

    handleDrag(dx, dy, mx, my) {
        // modeがmovingなら、移動ルーチンを呼ぶ
        if (this.mode === "moving") {
            this.objects.map((item) => {
                item.handleDrag(dx, dy, mx, my);
            });
        }
    }

    handleClick(mx, my) {
        this.objects.map((item) => {
            item.handleClick(mx, my, this.mode);
        });
    }
    handleRelease(mx, my) {
        this.objects.map((item) => {
            item.handleRelease(mx, my, this.mode);
        });
    }
}

const mikanHUDs = [];
const mikanGraphics = [];

export const getMikanHUD = (style, mode = null) => {
    const item = new MikanHUD(style, mode);
    mikanHUDs.push(item);
    return item;
}

export const getMikanGraphics = (x, y, width, height, DrawFunction, DraggedFunction) => {
    const item = new MikanGraphics(x, y, width, height, DrawFunction, DraggedFunction);
    mikanGraphics.push(item);
    return item;
}

register("dragged", (dx, dy, x, y, btn) => {
    if (btn !== 0) return;
    mikanHUDs.map((item) => {
        item.handleDrag(dx, dy, x, y);
    });
});

register("clicked", (x, y, btn, input) => {
    
    if (btn === 0) {  // 左クリック
        if (input){
        mikanHUDs.map((item) => {
                item.handleClick(x,y);
            });
        }
        else{
            mikanGraphics.map((item) => {
                item.handleRelease(x,y);
            });
        }

    }
});


register("renderOverlay", () => {
    mikanHUDs.map((item) => {
        item.Draw();
    });
});