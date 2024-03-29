class Level {
    levelName;
    enemies;
    clouds;
    backgroundObjects;
    blockCollision;
    ground;
    firstFloor;
    platforms;
    decorations;
    collectableObjects;
    stairway;
    throwableObjects;
    longRangeAttacks;
    closeAttacks;
    level_end_x = 2880;
    walking_sound;
    collect_sound;

    constructor(levelName, enemies, clouds, backgroundObjects, blockCollision, ground, firstFloor, wall, platforms, decorations, collectableObjects, stairway, throwableObjects, longRangeAttacks, closeAttacks, walking_sound, collect_sound) {
        this.levelName = levelName;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.blockCollision = blockCollision;
        this.ground = ground;
        this.firstFloor = firstFloor;
        this.wall = wall;
        this.platforms = platforms;
        this.decorations = decorations;
        this.collectableObjects = collectableObjects;
        this.stairway = stairway;
        this.throwableObjects = throwableObjects;
        this.longRangeAttacks = longRangeAttacks;
        this.closeAttacks = closeAttacks;
        this.walking_sound = walking_sound;
        this.collect_sound = collect_sound;
    }


}