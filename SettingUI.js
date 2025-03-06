// TODO あふれた時にスクロールなりページ切り替えを実装する
import { MikanButton, MikanPanel, MikanText, MikanSwitch, getGUIInstance } from "./index";


class SettingUI{
    constructor(){
        this.gui = getGUIInstance(Forward = true);
        // カテゴリを置き始める場所
        this.categoryPlaceY = 23;
        // カテゴリの名前
        this.categorys = [];
        // カテゴリのボタンオブジェクト
        this.categoryObjects = [];
        // 毎回変わらないオブジェクト
        this.uniqueObjects = {
            title: undefined
        };
        // カテゴリ内アイテム
        this.categoryItems = {};
        // カテゴリ内アイテムを置く場所
        this.categoryItemPlaceY = [];
        
        // 外枠
        this.drawFramePanel();

        // 現在のカテゴリ
        this.nowCategory = ""

        // 選択されているカテゴリのスタイル
        this.nowCategoryStyle = {color: "§1", bgColor: Renderer.color(0, 0, 0, 0.5)};
        this.categoryStyle = {color: "§6", bgColor: Renderer.color(0, 0, 0, 0.5)};
    }

    drawFramePanel(){
        // パネル(フレームもどきを作成)
        // 5%,5%の位置から長さ90%のパネルを作成
        this.gui.append(new MikanPanel("5%" , "5%" , "90%", "10%"));
        this.gui.append(new MikanPanel("5%" , "20%", "30%", "75%"));
        this.gui.append(new MikanPanel("40%", "20%", "55%", "75%"));
    }

    openGui(){
        this.gui.openGui()
        this.updateCategoryObjects();
    }

    isOpenGui(){
        return this.gui.isOpenGui();
    }

    closeGui(){
        this.gui.closeGui();
    }

    setTitle(title, style){
        const item = new MikanText("7.5%", "7.5%", title, style)
        this.uniqueObjects.title = item
        this.gui.append(item);
    }

    updateCategoryObjects(){
        // そのオブジェクトに存在しているアイテムを描写する
        const objects = this.categoryItems[this.nowCategory];
        this.gui.deleteAll();
        this.gui.append(this.uniqueObjects.title);
        this.drawFramePanel();
        this.categoryObjects.map((item) => {
            item.setStyle(this.categoryStyle);
            if (item.getText() === this.nowCategory) item.setStyle(this.nowCategoryStyle);
            this.gui.append(item);
        });
        if (objects === undefined){ 
            return;
        }
        this.gui.appends(objects);
    }

    setCategory(title){
        this.nowCategory = title;
        this.updateCategoryObjects();
    }

    setSelectCategoryStyle(style){
        this.nowCategoryStyle = style
    }

    setCategoryStyle(style){
        this.categoryStyle = style
    }

    appendCategory(title){
        // 初めてのカテゴリ追加なら
        if (this.categorys.length === 0) this.setCategory(title);
        const item = new MikanButton("7.5%", `${this.categoryPlaceY}%`,"20%","4%", title, () => this.setCategory(title), this.categoryStyle);
        // カテゴリ名を記憶
        this.categorys.push(title);
        // カテゴリオブジェクトを記憶
        if (!this.categoryItems[title]) this.categoryItems[title] = [];
        // 高さ初期値のセット
        this.categoryItemPlaceY[title] = 23;
        // uiに反映
        this.gui.append(item);
        this.categoryPlaceY += 5;
        this.categoryObjects.push(item);
    }

    appendItemWithButton(category, title, BtnMsg, CallBack, titleStyle = {
        color: "§6"
    }){
        const item = new MikanText("45%", `${this.categoryItemPlaceY[category]}%`, title, titleStyle);
        const btn = new MikanButton("85%", `${this.categoryItemPlaceY[category]}%`,"8%","4%", BtnMsg, CallBack);
        this.categoryItems[category].push(item);
        this.categoryItems[category].push(btn);
        this.categoryItemPlaceY[category] += 5;
    }

    appendItemWithSwitch(category, title, isEnable, CallBack, titleStyle = {
        color: "§6"
    }){
        const item = new MikanText("45%", `${this.categoryItemPlaceY[category]}%`, title, titleStyle);
        const swc = new MikanSwitch("85%", `${this.categoryItemPlaceY[category]}%`, isEnable,"8%","4%", CallBack);
        this.categoryItems[category].push(item);
        this.categoryItems[category].push(swc);
        this.categoryItemPlaceY[category] += 5;
    }
}



export {SettingUI}