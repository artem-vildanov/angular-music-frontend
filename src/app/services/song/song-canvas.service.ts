export class SongCanvasManager {
    private readonly context: CanvasRenderingContext2D;
    private animationProgress: number = 0;
    private animationFrameId!: number;
    private currentWidth: number = 0;
    private readonly targetWidth: number;
    private readonly currentCoords!: {
        x: number,
        y: number
    }
    private readonly targetCoords = {
        x: 0,
        y: 0
    }
    private isAnimating: boolean = false;
    private isSelectAnimation: boolean = false;

    constructor(canvasElement: HTMLCanvasElement) {
        this.targetWidth = canvasElement.width;
        this.currentCoords = this.calculateStartCoords(canvasElement);
        this.context = canvasElement.getContext('2d')!;
        this.context.fillStyle = 'blue';
    }

    private calculateStartCoords(element: HTMLCanvasElement): { x: number, y: number } {
        const x = element.width / 2;
        const y = element.height / 2;
        return { x, y };
    }

    public fillCanvas(): void {
        if (this.isAnimating) this.stopAnimation();
        this.isSelectAnimation = true;
        this.isAnimating = true;
        this.animate();
    }

    public clearCanvas(): void {
        if (this.isAnimating) this.stopAnimation();
        this.isSelectAnimation = false;
        this.isAnimating = true;
        this.animate();
    }

    private animate(): void {
        if (this.isAnimating) {
            this.handleAnimation();
            this.animationFrameId = requestAnimationFrame(() => this.animate());
        }
    }

    private handleAnimation(): void {
        if (this.isSelectAnimation) {
            this.animationProgress = Math.min(this.animationProgress + 0.01, 1);
        } else {
            this.animationProgress = Math.max(this.animationProgress - 0.01, 0);
        }

        this.currentWidth = this.targetWidth * this.animationProgress;

        this.currentCoords.x -= 1;
        this.currentCoords.y -= 1;

        this.context.clearRect(0, 0, this.targetWidth, this.context.canvas.height);
        this.drawRoundedRect(this.currentWidth);

        if (this.animationProgress === 0 || this.animationProgress === 1) {
            this.stopAnimation();
        }
    }

    private drawRoundedRect(width: number): void {
        this.context.beginPath();
        this.context.roundRect(this.currentCoords.x, this.currentCoords.y, width, width, 360);
        this.context.closePath();
        this.context.fill();
    }

    private stopAnimation(): void {
        cancelAnimationFrame(this.animationFrameId);
        this.isAnimating = false;
    }
}
