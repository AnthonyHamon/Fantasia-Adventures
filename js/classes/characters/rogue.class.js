class Rogue extends Character {
    CHARACTERAVATAR = 'img/UI/character-icons/ninja.png';

    IMAGES_WALKING = [
        'img/character/Rogue/Walk/walk1.png',
        'img/character/Rogue/Walk/walk2.png',
        'img/character/Rogue/Walk/walk3.png',
        'img/character/Rogue/Walk/walk4.png',
        'img/character/Rogue/Walk/walk5.png',
        'img/character/Rogue/Walk/walk6.png'
    ];

    IMAGES_JUMPING = [
        'img/character/Rogue/Jump/jump1.png',
        'img/character/Rogue/Jump/jump2.png',
        'img/character/Rogue/Jump/jump3.png',
        'img/character/Rogue/Jump/jump4.png',
        'img/character/Rogue/Jump/jump5.png',
        'img/character/Rogue/Jump/jump6.png',
        'img/character/Rogue/Jump/jump7.png',
    ];

    IMAGES_DOUBLE_JUMP = [
        'img/character/Rogue/High_Jump/high_jump1.png',
        'img/character/Rogue/High_Jump/high_jump2.png',
        'img/character/Rogue/High_Jump/high_jump3.png',
        'img/character/Rogue/High_Jump/high_jump4.png',
        'img/character/Rogue/High_Jump/high_jump5.png',
        'img/character/Rogue/High_Jump/high_jump6.png',
        'img/character/Rogue/High_Jump/high_jump7.png',
        'img/character/Rogue/High_Jump/high_jump8.png',
        'img/character/Rogue/High_Jump/high_jump9.png',
        'img/character/Rogue/High_Jump/high_jump10.png',
        'img/character/Rogue/High_Jump/high_jump11.png',
        'img/character/Rogue/High_Jump/high_jump12.png',
    ];

    IMAGES_ATTACKING = [
        'img/character/Rogue/Attack/Attack1.png',
        'img/character/Rogue/Attack/Attack2.png',
        'img/character/Rogue/Attack/Attack3.png',
        'img/character/Rogue/Attack/Attack4.png',
        'img/character/Rogue/Attack/Attack5.png',
        'img/character/Rogue/Attack/Attack6.png',
        'img/character/Rogue/Attack/Attack7.png',
    ];

    IMAGES_HURT = [
        'img/character/Rogue/Hurt/hurt1.png',
        'img/character/Rogue/Hurt/hurt2.png',
        'img/character/Rogue/Hurt/hurt3.png',
        'img/character/Rogue/Hurt/hurt4.png'
    ];

    IMAGES_DEATH = [
        'img/character/Rogue/Death/death1.png',
        'img/character/Rogue/Death/death2.png',
        'img/character/Rogue/Death/death3.png',
        'img/character/Rogue/Death/death4.png',
        'img/character/Rogue/Death/death5.png',
        'img/character/Rogue/Death/death6.png',
        'img/character/Rogue/Death/death7.png',
        'img/character/Rogue/Death/death8.png',
        'img/character/Rogue/Death/death9.png',
        'img/character/Rogue/Death/death10.png'
    ];

    IMAGES_IDLE = [
        'img/character/Rogue/Idle/idle1.png',
        'img/character/Rogue/Idle/idle2.png',
        'img/character/Rogue/Idle/idle3.png',
        'img/character/Rogue/Idle/idle4.png',
        'img/character/Rogue/Idle/idle5.png',
        'img/character/Rogue/Idle/idle6.png',
        'img/character/Rogue/Idle/idle7.png',
        'img/character/Rogue/Idle/idle8.png',
        'img/character/Rogue/Idle/idle9.png',
        'img/character/Rogue/Idle/idle10.png',
        'img/character/Rogue/Idle/idle12.png',
        'img/character/Rogue/Idle/idle13.png',
        'img/character/Rogue/Idle/idle14.png',
        'img/character/Rogue/Idle/idle15.png',
        'img/character/Rogue/Idle/idle16.png',
        'img/character/Rogue/Idle/idle17.png',
        'img/character/Rogue/Idle/idle18.png'
    ];

    IMAGES_CLIMBING = [
        'img/character/Rogue/Climb/climb2.png',
        'img/character/Rogue/Climb/climb3.png',
        'img/character/Rogue/Climb/climb4.png',
    ];

    world;
    hasAlreadyJumped = false;
    isOnTheGround = false;
    isOnPlatform = false;
    isAlreadyAFK = false;
    isClimbing = false;
    maxEnergy = 80;
    maxMagicalEnergy = 80;
    maxCoin = 0;
    speed = 3;
    x = -240
    y = 134;
    height = 256;
    width = 256;
    characterAvatar = new CharacterAvatar(this.CHARACTERAVATAR);



    offset = {
        top: 124,
        right: 128,
        bottom: 80,
        left: 80
    }

    constructor() {
        super();
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DOUBLE_JUMP);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_CLIMBING);
        this.checkCharacterEvents();
        this.moveCharacter();
        this.checkCharacterStats();
        this.animate();
        this.moveCamera();
        this.magicAttack();
        this.applyGravity();
    }



}