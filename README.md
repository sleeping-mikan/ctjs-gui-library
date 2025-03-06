# MiGUI


## Use it

このライブラリには以下の機能が含まれます
 - gui生成
 - gui操作
 - gui表示
 - buttonオブジェクトなどの配置オブジェクトの生成

また、MikanObjectとして
 - MikanButton
 - MikanText
 - MikanSwitch
 - MikanPanel
が含まれます。

また説明に当たり以下の型を定義します。
|type|説明|
|----|----|
|CFormat|§で始まる2文字のminecraft装飾コード|
|PerStr|%で終わる、%以前が全て数字で表される数値(通常座標をdisplayの広さに対して扱う際に利用します)|

index.js - GUIに関する基本的な機能を提供します
|class(func).method|機能|
|----|----|
|getGUIInstance() -> MikanGUI|GUIinstanceを受け取ります。戻り値はMikanGUIのインスタンスです。このオブジェクトに、MikanObjectを追加します。|
|MikanGUI.openGui() -> undefined|uiを開きます。|
|MikanGUI.closeGui() -> undefined|uiを閉じます。|
|MikanGUI.Draw() -> undefined|登録されたオブジェクトを描写します。通常、uiが開いている間自動で呼び出されるため使う必要はありません。|
|MikanGUI.isOpenGui() -> boolean|uiが開いているかどうかを返します。|
|MikanGUI.append(obj: MikanObject) -> undefined|uiにオブジェクトを追加します。|
|MikanGUI.appends(objs: Array<MikanObject>) -> undefined|uiに複数のオブジェクトを追加します。|
|MikanGUI.deleteAll() -> undefined|uiに追加されたオブジェクトを全て削除します。|
|MikanGUI.getIsShow() -> boolean|uiを表示しているかどうかを返します。|
|MikanButton(x: int / PerStr, y: int / PerStr, dx: int / PerStr, dy: int / PerStr, text: str, onClick: func, style: {color: CFormatstr, bgColor: Renderer.Color}) -> MikanButton|MikanButtonを生成します。このオブジェクトは一般的なGUIライブラリで提供されるようなボタンを生成するためのオブジェクトです|
|MikanButton.setStyle(style: {color: CFormatstr, bgColor: Renderer.Color}) -> undefined|MikanButtonのスタイルを変更します。|
|MikanButton.getText() -> str|MikanButtonのテキストを返します。|
|MikanButton.Draw() -> undefined|ボタンを描写します。通常、MikanGUI.Drawが呼び出します。|
|MikanButton.isClicked() -> boolean|マウスカーソルがボタンの上に存在するかどうかを返します。|
|MikanText(x: int / PerStr, y: int / PerStr, text: str, style: {color: CFormatstr}) -> MikanText|MikanTextを生成します。このオブジェクトはテキストを表示するためのオブジェクトです|
|MikanText.setStyle(style: {color: CFormatstr}) -> undefined|MikanTextのスタイルを変更します。|
|MikanText.getText() -> str|MikanTextのテキストを返します。|
|MikanText.Draw() -> undefined|MikanTextを描写します。通常、MikanGUI.Drawが呼び出します。|
|MikanSwitch(x: int / PerStr, y: int / PerStr, dx: int / PerStr, dy: int / PerStr, CallBack: func) -> MikanSwitch|MikanSwitchを生成します。|
|MikanSwitch.Draw() -> undefined|MikanSwitchを描写します。通常、MikanGUI.Drawが呼び出します。このオブジェクトはON/OFFスイッチとして利用されます|
|MikanSwitch.isClicked() -> boolean|マウスカーソルがスイッチの上に存在するかどうかを返します。|
|onClick() -> undefined|通常スイッチが押された時に呼び出されます。on/offを切り替え、インスタンス生成時のCallBackを呼び出します。|
|MikanPanel(x: int / PerStr, y: int / PerStr, dx: int / PerStr, dy: int / PerStr) -> MikanPanel|MikanPanelを生成します。このオブジェクトは簡易的な枠を生成するために利用されます。|
|MikanPanel.Draw() -> undefined|MikanPanelを描写します。通常、MikanGUI.Drawが呼び出します。|


ObjectMove.js - HUD表示に関する機能を提供します
|class(func).method|機能|
|----|----|
|getMikanHUD() -> MikanHUD|HUDinstanceを受け取ります。戻り値はMikanHUDのインスタンスです。このインスタンス上にGraphicオブジェクトを配置します。|
|MikanHUD.appendObj(obj: MikanGraphics) -> undefined|HUDにオブジェクトを追加します。MikanGraphicsについては以下に続きます。|
|MikanHUD.setMode(mode: str)|HUDの表示モードを変更します。表示モードについてはMikanGraphicsに関連するため、以下に続きます|
|MikanHUD.openGui() -> undefined|GUIを開き、マウス操作を可能にします。この操作を行わなくても描写は行われます。|
|MikanHUD.closeGui() -> undefined|GUIを閉じます。|
|MikanHUD.isOpenGui() -> boolean|GUIを開いているかどうかを返します。|
|MikanHUD.Draw() -> undefined|HUDを描写します。通常、自動で呼び出されます。|
|MikanHUD.handleDrag(dx: int, dy: int, mx: int, my: int) -> undefined|modeがmovingであるときに追加されたMikanGraphicsのhandleDrag methodを呼び出します。通常マウス操作時に自動で呼び出されます。|
|MikanHUD.handleClick(mx: int, my: int) -> undefined|追加されたMikanGraphicsのhandleClick methodを呼び出します。通常マウス操作時に自動で呼び出されます。|
|MikanHUD.handleRelease(mx: int, my: int) -> undefined|追加されたMikanGraphicsのhandleRelease methodを呼び出します。通常マウス操作時に自動で呼び出されます。|
|getMikanGraphics() -> MikanGraphics|MikanGraphicsを生成します|
|MikanGraphics(x: int, y: int, width: int, weight: int, DrawFunction: func, DraggedFunction: func) -> MikanGraphics|MikanGraphicsを生成します。DrawFunctionでは描写を、DraggedFunctionにはマウス操作時に操作する内容を記述してください。|
|MikanGraphics.Draw() -> undefined|MikanGraphicsを描写します。通常、MikanHUD.Drawが呼び出します。|
|MikanGraphics.handleDrag(dx: int, dy: int, mx: int, my: int) -> undefined|MikanGraphicsのhandleDrag methodを呼び出します。通常、MikanHUD.handleDragが呼び出します。この関数はオブジェクトをクリックし、ドラッグしたときに発火し、DragFunctionにdx,dy,mx,myを引数として渡し実行します。|
|MikanGraphics.setPosition(x: int, y: int) -> undefined|MikanGraphicsの位置を変更します。|
|MikanGraphics.setDisableForceMove() -> undefined|ドラッグ状態を解除します。|
|MikanGraphics.getForceMove() -> boolean|ドラッグ状態を返します。|
|MikanGraphics.setScale(scale: float)|MikanGraphicsのサイズを変更します。1が標準のサイズです。|


SettingUI - Modの設定UIを提供します(このオブジェクトは最上位であるため、呼び出しが推奨されないメソッドについては記載しません)
|class(func).method|機能|
|----|----|
|SettingUI() -> SettingUI|SettingUIを生成します。|
|SettingUI.openGUI() -> undefined|設定UIを開きます。|
|SettingUI.closeGUI() -> undefined|設定UIを閉じます。|
|SettingUI.isOpenGui() -> boolean|設定UIを開いているかどうかを返します。|
|SettingUI.setTitle(title: str, style: {color: CFormatstr}) -> undefined|設定UIのタイトルを変更します。意図がない限り1度のみ呼び出します。|
|SettingUI.setCategory(title: str) -> undefined|設定UIにおける選択中のカデゴリを変更します。|
|SettingUI.setSelectCategoryStyle(style: {color: CFormatstr, bgColor: Renderer.Color}) -> undefined|設定UIにおける選択中のカデゴリボタンのスタイルを変更します。|
|SettingUI.setCategoryStyle(style: {color: CFormatstr, bgColor: Renderer.Color}) -> undefined|設定UIにおけるカデゴリボタンのスタイルを変更します。|
|SettingUI.appendCategory(title: str) -> undefined|設定UIにカデゴリを追加します。初めての追加である場合、該当のカデゴリボタンは選択中になります。|
|SettingUI.appendItemWithButton(category: str, title: str, BtnMsg: str, CallBack: func, titleStyle : {color: CFormatstr})|カテゴリ内に説明文(title)とそれを実行するためのボタンを追加します。CallBackはボタンクリック時に実行されます。|
|SettingUI.appendItemWithSwitch(category: str, title: str, isEnable: boolean, CallBack: func, titleStyle : {color: CFormatstr})|カテゴリ内に説明文(title)とその実行をON/OFFするためのSwitchを追加します。CallBackはOnOFFにかかわらず操作時に呼び出され、引数には現在のON/OFF状態が渡されます。|