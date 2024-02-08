class Level {
    enemies;
    clouds;
    backgroundObjects;
    ground;
    firstFloor;
    platforms;
    decorations;
    collectableObjects;
    throwableObjects;
    longRangeAttacks;
    stairway;
    characterInformations;
    level_end_x = 2880;
    walking_sound_grass = new Audio('../audio/walk_grass.mp3');

    constructor(enemies, clouds, backgroundObjects, ground, firstFloor, wall, platforms, decorations, collectableObjects, stairway, throwableObjects, longRangeAttacks, characterInformations) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.ground = ground;
        this.firstFloor = firstFloor;
        this.wall = wall;
        this.platforms = platforms;
        this.decorations = decorations;
        this.collectableObjects = collectableObjects;
        this.stairway = stairway;
        this.throwableObjects = throwableObjects;
        this.longRangeAttacks = longRangeAttacks;
        this.characterInformations = characterInformations;
    }
}