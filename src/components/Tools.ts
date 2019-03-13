
interface MenuType {
    color: number
}
// color ref: https://yoshino-ui.github.io/#/docs/components/color
const MenuType = {
    PEN: {
        color: 0xe57373
    },
    CIRCLE: {
        color: 0xec407a
    },
    RECTANGLR: {
        color: 0x880e4f
    },
    CALCEL: {
        color: 0xbdbdbd
    },
    SAVE: {
        color: 0x004d40
    }
}

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
        const menu = new ToolButton(x, y, 70, 70, type.color);
        menu.onClick = onClick;
        menu.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            for (let i = 0, l = this.menuList.length; i < l; i++) {
                this.menuList[i].isClicked = false;
            }
            menu.isClicked = true;
        }, this);

        this.menuNum += 1;
        this.menuList.push(menu);

        this.addChild(menu);

        return menu
    }
}