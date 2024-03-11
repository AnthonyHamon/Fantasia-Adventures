class Mage extends Character{
    CHARACTERAVATAR = 'img/UI/character-icons/mage.png';

    IMAGES_WALKING = [
        'img/character/Mage/Walk/walk1.png',
        'img/character/Mage/Walk/walk2.png',
        'img/character/Mage/Walk/walk3.png',
        'img/character/Mage/Walk/walk4.png',
        'img/character/Mage/Walk/walk5.png',
        'img/character/Mage/Walk/walk6.png'
    ];

    IMAGES_JUMPING = [
        'img/character/Mage/Jump/jump1.png',
        'img/character/Mage/Jump/jump2.png',
        'img/character/Mage/Jump/jump3.png',
        'img/character/Mage/Jump/jump4.png',
        'img/character/Mage/Jump/jump5.png',
        'img/character/Mage/Jump/jump6.png',
        'img/character/Mage/Jump/jump7.png',
    ];

    IMAGES_DOUBLE_JUMP = [
        'img/character/Mage/High_jump/high_jump1.png',
        'img/character/Mage/High_jump/high_jump2.png',
        'img/character/Mage/High_jump/high_jump3.png',
        'img/character/Mage/High_jump/high_jump4.png',
        'img/character/Mage/High_jump/high_jump5.png',
        'img/character/Mage/High_jump/high_jump6.png',
        'img/character/Mage/High_jump/high_jump7.png',
        'img/character/Mage/High_jump/high_jump8.png',
        'img/character/Mage/High_jump/high_jump9.png',
        'img/character/Mage/High_jump/high_jump10.png',
        'img/character/Mage/High_jump/high_jump11.png',
        'img/character/Mage/High_jump/high_jump12.png',
    ];

    IMAGES_ATTACKING = [
        'img/character/Mage/Attack/attack1.png',
        'img/character/Mage/Attack/attack2.png',
        'img/character/Mage/Attack/attack3.png',
        'img/character/Mage/Attack/attack4.png',
        'img/character/Mage/Attack/attack5.png',
        'img/character/Mage/Attack/attack6.png',
        'img/character/Mage/Attack/attack7.png',
    ];

    IMAGES_HURT = [
        'img/character/Mage/Hurt/hurt1.png',
        'img/character/Mage/Hurt/hurt2.png',
        'img/character/Mage/Hurt/hurt3.png',
        'img/character/Mage/Hurt/hurt4.png'
    ];

    IMAGES_DEATH = [
        'img/character/Mage/Death/death1.png',
        'img/character/Mage/Death/death2.png',
        'img/character/Mage/Death/death3.png',
        'img/character/Mage/Death/death4.png',
        'img/character/Mage/Death/death5.png',
        'img/character/Mage/Death/death6.png',
        'img/character/Mage/Death/death7.png',
        'img/character/Mage/Death/death8.png',
        'img/character/Mage/Death/death9.png',
        'img/character/Mage/Death/death10.png'
    ];

    IMAGES_IDLE = [
        'img/character/Mage/Idle/idle1.png',
        'img/character/Mage/Idle/idle2.png',
        'img/character/Mage/Idle/idle3.png',
        'img/character/Mage/Idle/idle4.png',
        'img/character/Mage/Idle/idle5.png',
        'img/character/Mage/Idle/idle6.png',
        'img/character/Mage/Idle/idle7.png',
        'img/character/Mage/Idle/idle8.png',
        'img/character/Mage/Idle/idle9.png',
        'img/character/Mage/Idle/idle10.png',
        'img/character/Mage/Idle/idle12.png',
        'img/character/Mage/Idle/idle13.png',
        'img/character/Mage/Idle/idle14.png'
    ];

    IMAGES_CLIMBING = [
        'img/character/Mage/Climb/climb2.png',
        'img/character/Mage/Climb/climb3.png',
        'img/character/Mage/Climb/climb4.png',
    ]

    world;
    avatar = 'img/UI/character-icons/mage.png';
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