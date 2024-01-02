class Level{
    enemies;
    clouds;
    backgroundObjects;
    floorTiles;
    level_end_x = 2880;
    walking_sound_grass = new Audio('../audio/walk_grass.mp3');

    constructor(enemies, clouds, backgroundObjects, floorTiles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.floorTiles = floorTiles;
    }
    
}