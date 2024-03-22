class Sounds {
    playCharacterSoundEffect() {
        const playSoundEffect = setInterval(() => {
            this.world.level.walking_sound.pause();
            if (!this.isInTheAir && (this.canMoveRight() || this.canMoveLeft())) this.playWalkingSound()
            if (this.isJumping) this.playJumpSound();
            if (this.isCollectingObject) this.playCollectionSound();
            if (this.isHurt()) this.playHurtSound();
        }, 1000 / 60);
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



    playEnemiesSoundEffect() {
        const enemiesSoundEffect = setInterval(() => {
            if (this.world)
                if (this.isDead()) clearInterval(enemiesSoundEffect)
                else if (this.isColliding(this.world.character)) this.playAttackSound()
                else if (this.isHurt()) this.playHurtSound();
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