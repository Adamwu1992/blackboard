
class Tools extends egret.Sprite {

    private menuNum = 0;

    private menuList: Array<ToolButton> = [];

    private barWidth = 80;

    public constructor(stageW: number, stageH: number) {
        super();

        this.graphics.beginFill(0xffffff, .8);
        this.graphics.drawRect(0, 0, this.barWidth, stageH - 40);
        this.graphics.endFill();
        this.x = 20;
        this.y = 20;

    }

    public addMenu(type: MenuType, onClick: Callback): ToolButton {

        const x = 5;
        const y = 75 * this.menuNum + 5;

        // width & height is are both 5
        // margin is 5
        const menu = new ToolButton(x, y, 70, 70, type);
        menu.onClick = onClick;
        menu.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            for (let i = 0; i < this.menuNum; i++) {
                const m = this.menuList[i];
                if (m === menu) {
                    m.isClicked = true;
                } else {
                    m.isClicked = false;
                }
            }
        }, this);

        this.menuNum += 1;
        this.menuList.push(menu);

        this.addChild(menu);

        return menu;
    }
}