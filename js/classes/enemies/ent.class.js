class Ent extends movableObject {

    IMAGES_WAITING_ENT = [
        'img/enemies/ent/idle1.png',
        'img/enemies/ent/idle2.png',
        'img/enemies/ent/idle3.png',
        'img/enemies/ent/idle4.png'
    ];

    IMAGES_HURT = [
        'img/enemies/ent/hurt1.png',
        'img/enemies/ent/hurt2.png',
        'img/enemies/ent/hurt3.png',
    ]

    IMAGES_WALKING = [
        'img/enemies/ent/walk1.png',
        'img/enemies/ent/walk2.png',
        'img/enemies/ent/walk3.png',
        'img/enemies/ent/walk4.png',
        'img/enemies/ent/walk5.png',
        'img/enemies/ent/walk6.png',
    ]

    world;
    x = 1500;
    y = 308;
    width = 256;
    height = 256;
    speed = 0;

    offset = {
        top: 78,
        right: 112,
        bottom: 78,
        left: 52
    }

    constructor() {
        super().loadImages(this.IMAGES_WAITING_ENT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        let i = 0;

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            } else if (i < 4) {
                this.playAnimation(this.IMAGES_WAITING_ENT);
            } else {
                this.playAnimation(this.IMAGES_WALKING)

            }
            i++;

            // if (this.world.character.x > 1200 && !this.hadFirstContact) {
            //     i = 0;
            //     this.hadFirstContact = true;
            //     console.log('has first contact', this.hadFirstContact)
            // }
        }, 180);

    }
}