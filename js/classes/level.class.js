class Level{
    enemies;
    clouds;
    backgroundObjects;
    ground;
    firstFloor;
    platforms;
    decorations;
    level_end_x = 2880;
    walking_sound_grass = new Audio('../audio/walk_grass.mp3');

    constructor(enemies, clouds, backgroundObjects, ground, firstFloor, wall, platforms, decorations){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.ground = ground;
        this.firstFloor = firstFloor;
        this.wall = wall;
        this. platforms = platforms;
        this.decorations = decorations;
    }
    
}