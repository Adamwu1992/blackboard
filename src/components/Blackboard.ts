class Blackboard extends egret.Sprite {

    private stack: Array<TPrint> = [];

    private printNum = 0;

    private CurrentPrint: new() => TPrint = Pen
    private getPrint() {
        return new this.CurrentPrint
    }

    public constructor(w: number, h: number) {
        super();

        // 绘制黑板
        this.renderBG(w, h);
        // 绘制工具栏
        this.renderTools(w, h);

        this.touchEnabled = true;

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

    }

    private renderBG(w: number, h: number) {
        this.graphics.beginFill(0x243138);
        this.graphics.drawRect(0, 0, w, h);
        this.graphics.endFill();
    }

    private renderTools(w: number, h: number) {
        const tools = new Tools(w, h);
        this.addChild(tools);

        tools.addMenu(MenuType.PEN, () => {
            log('PEN')
            this.CurrentPrint = Pen;
        });
        tools.addMenu(MenuType.CIRCLE, () => {
            log('CIRCLE')
            this.CurrentPrint = Circle;
        });
        tools.addMenu(MenuType.RECTANGLR, () => {
            log('RECTANGLR')
            this.CurrentPrint = Rect;
        });
        tools.addMenu(MenuType.CALCEL, () => {
            if (this.printNum > 0) {
                this.removeChildAt(this.numChildren - 1);
                this.printNum -= 1;
            }
        });
        tools.addMenu(MenuType.SAVE, () => {
            log('SAVE');
        });
    }

    private onTouchBegin(e: egret.TouchEvent): void {
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        const print = this.getPrint();
        print.start(e.stageX, e.stageY);
        this.stack.push(print);
    }

    private onTouchEnd(e: egret.TouchEvent): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        const print = this.stack[this.stack.length - 1];
        print.end();
    }

    private onTouchMove(e: egret.TouchEvent): void {

        const print = this.stack[this.stack.length - 1];

        if (this.contains(print)) {
            this.removeChild(print);
            this.printNum -= 1;
        }
        print.move(e.stageX, e.stageY);
        this.addChild(print);
        this.printNum += 1;
    }
}