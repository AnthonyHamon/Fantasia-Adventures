class Sounds {
    
    /**
     * method to play character sounds effect if passed a test
     */
    playCharacterSoundEffect() {
        const playSoundEffect = setInterval(() => {
            this.world.level.walking_sound.pause(); // pause walk sound effect
            if (!this.isInTheAir && (this.canMoveRight() || this.canMoveLeft())) this.playWalkingSound() // play walk sound effect
            if (this.isJumping) this.playJumpSound();                       // play jump sound effect
            if (this.isCollectingObject) this.playCollectionSound();        // play sound effect when item is collected
            if (this.isHurt()) this.playHurtSound();                        // play sound effect when character is hurt
        }, 100);
        allIntervals.push(playSoundEffect);
    }

    playWalkingSound() {
        this.world.level.walking_sound.play();
    }

    playJumpSound() {
        this.world.level.walking_sound.pause();
        this.jump_sound.play();
        this.isJumping = false;
    }

    playCollectionSound() {
        this.world.level.collect_sound.play();
        this.isCollectingObject = false;
    }


    /**
     * method to play enemy sounds effect if passed a test
     */
    playEnemiesSoundEffect() {
        const enemiesSoundEffect = setInterval(() => {
            if (this.world)
                if (this.isDead()) clearInterval(enemiesSoundEffect) // clear sound efect interval for enemy when dead otherwise still playing sound when character reached death position of enemy
                else if (this.isColliding(this.world.character)) this.playAttackSound() // play enemy attacking sound effect
                else if (this.isHurt()) this.playHurtSound();       // play sound effect when enemy is hurt
        }, 100);
        allIntervals.push(enemiesSoundEffect);
    }

    playAttackSound() {
        this.attack_sound.play();
    }

    playHurtSound() {
        this.hurt_sound.play();
        if (this.hurt_sound.currentTime === this.hurt_sound.duration)
            this.hurt_sound.pause();
    }

    playTornadoEffect() {
        this.tornado_effect.play();
    }

}