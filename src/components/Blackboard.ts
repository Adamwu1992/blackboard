class Blackboard extends egret.Sprite {

    private stack: Array<TPrint> = [];

    private printNum = 0;

    public constructor(w: number, h: number) {
        super();

        // 绘制黑板
        this.renderBG(w, h);

        this.touchEnabled = true;

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

        // 撤销按钮
        // const cancelBtn = new ToolButton;
        // cancelBtn.onClick = (evt: egret.TouchEvent) => {
        //     console.log('on cancel', evt)
        //     if (this.printNum > 0) {
        //         this.removeChildAt(this.numChildren - 1);
        //         this.printNum -= 1;
        //     }
        //     console.log(this.numChildren);
        // }
        // cancelBtn.x = 100;
        // cancelBtn.y = 100;
        // this.addChild(cancelBtn);

    }

    private renderBG(w: number, h: number) {
        this.graphics.beginFill(0x243138);
        this.graphics.drawRect(0, 0, w, h);
        this.graphics.endFill();

        const tools = new Tools(w, h);
        this.addChild(tools);
    }

    private onTouchBegin(e: egret.TouchEvent): void {
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        const pen = new Rect;
        pen.start(e.stageX, e.stageY);
        this.stack.push(pen);
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