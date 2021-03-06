class Blackboard extends egret.Sprite {

    private stack: Array<TPrint> = [];

    private printNum = 0;

    private CurrentPrint: new() => TPrint;
    private getPrint() {
        if (this.CurrentPrint) {
            return new this.CurrentPrint;
        }
    }

    public constructor(w: number, h: number) {
        super();

        // 绘制黑板
        this.renderBG(w, h);
        // 绘制工具栏
        this.renderTools(w, h);

        this.touchEnabled = true;

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);

    }

    private renderBG(w: number, h: number) {
        this.graphics.beginFill(0x243138);
        this.graphics.drawRect(0, 0, w, h);
        this.graphics.endFill();
    }

    private renderTools(w: number, h: number) {
        const tools = new Tools(w, h);
        this.addChild(tools);

        tools.appendChild(ButtonPen, () => {
            this.CurrentPrint = Pen;
        });
        tools.appendChild(ButtonCircle, () => {
            this.CurrentPrint = Circle;
        });
        tools.appendChild(ButtonRect, () => {
            this.CurrentPrint = Rect;
        });
        tools.appendChild(ButtonCancel, () => {
            if (this.printNum > 0) {
                this.removeChildAt(this.numChildren - 1);
                this.printNum -= 1;
            }
        });
        tools.appendChild(ButtonSave, () => {
            log('SAVE');
        });
    }

    private onTouchBegin(e: egret.TouchEvent): void {
        const print = this.getPrint();
        if (!print) return;

        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
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