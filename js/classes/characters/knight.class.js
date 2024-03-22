class Knight extends Character{
    CHARACTERAVATAR = 'img/UI/character-icons/knight.png';

    IMAGES_WALKING = [
        'img/character/Knight/Walk/walk1.png',
        'img/character/Knight/Walk/walk2.png',
        'img/character/Knight/Walk/walk3.png',
        'img/character/Knight/Walk/walk4.png',
        'img/character/Knight/Walk/walk5.png',
        'img/character/Knight/Walk/walk6.png'
    ];

    IMAGES_JUMPING = [
        'img/character/Knight/Jump/jump1.png',
        'img/character/Knight/Jump/jump2.png',
        'img/character/Knight/Jump/jump3.png',
        'img/character/Knight/Jump/jump4.png',
        'img/character/Knight/Jump/jump5.png',
        'img/character/Knight/Jump/jump6.png',
        'img/character/Knight/Jump/jump7.png',
    ];

    IMAGES_DOUBLE_JUMP = [
        'img/character/Knight/High_Jump/high_jump1.png',
        'img/character/Knight/High_Jump/high_jump2.png',
        'img/character/Knight/High_Jump/high_jump3.png',
        'img/character/Knight/High_Jump/high_jump4.png',
        'img/character/Knight/High_Jump/high_jump5.png',
        'img/character/Knight/High_Jump/high_jump6.png',
        'img/character/Knight/High_Jump/high_jump7.png',
        'img/character/Knight/High_Jump/high_jump8.png',
        'img/character/Knight/High_Jump/high_jump9.png',
        'img/character/Knight/High_Jump/high_jump10.png',
        'img/character/Knight/High_Jump/high_jump11.png',
        'img/character/Knight/High_Jump/high_jump12.png',
    ];

    IMAGES_ATTACKING = [
        'img/character/Knight/Attack/attack1.png',
        'img/character/Knight/Attack/attack2.png',
        'img/character/Knight/Attack/attack3.png',
        'img/character/Knight/Attack/attack4.png',    
    ];

    IMAGES_HURT = [
        'img/character/Knight/Hurt/hurt1.png',
        'img/character/Knight/Hurt/hurt2.png',
        'img/character/Knight/Hurt/hurt3.png',
        'img/character/Knight/Hurt/hurt4.png'
    ];

    IMAGES_DEATH = [
        'img/character/Knight/Death/death1.png',
        'img/character/Knight/Death/death2.png',
        'img/character/Knight/Death/death3.png',
        'img/character/Knight/Death/death4.png',
        'img/character/Knight/Death/death5.png',
        'img/character/Knight/Death/death6.png',
        'img/character/Knight/Death/death7.png',
        'img/character/Knight/Death/death8.png',
        'img/character/Knight/Death/death9.png',
        'img/character/Knight/Death/death10.png'
    ];

    IMAGES_IDLE = [
        'img/character/Knight/Idle/idle1.png',
        'img/character/Knight/Idle/idle2.png',
        'img/character/Knight/Idle/idle3.png',
        'img/character/Knight/Idle/idle4.png',
        'img/character/Knight/Idle/idle5.png',
        'img/character/Knight/Idle/idle6.png',
        'img/character/Knight/Idle/idle7.png',
        'img/character/Knight/Idle/idle8.png',
        'img/character/Knight/Idle/idle9.png',
        'img/character/Knight/Idle/idle10.png',
        'img/character/Knight/Idle/idle12.png'
    ];

    IMAGES_CLIMBING = [
        'img/character/Knight/Climb/climb2.png',
        'img/character/Knight/Climb/climb3.png',
        'img/character/Knight/Climb/climb4.png',
    ];

    world;
    characterName = 'Knight';
    avatar = 'img/UI/character-icons/knight.png';
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
    hurt_sound = new Audio('../audio/hurt_knight.mp3');




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
        this.updateCharacter();
    }
}