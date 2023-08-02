class Overworld {
    constructor (config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    init() {
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        };
        image.src = "./images/Title_Image.png";


        const x = 5;
        const y = 6;
        const player = new Image();
        player.onload = () => {
            this.ctx.drawImage(player, 
                0, 
                0, 
                132, 
                132, 
                x * 16,
                y * 16,
                32,
                32,
                );
        }
        player.src = "./images/Hero.png";


    }
}