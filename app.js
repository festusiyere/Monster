new Vue({

    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning: false,
        events: []
    },
    methods:{
        startGame:function(){
            this.gameIsRunning = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
        },
        attack:function(){
            let damage = this.causeDamage(2, 12);
            this.monsterHealth -= damage;
            this.events.unshift({
                isPlayer: true,
                text: "Player hits monster for " + damage
            });
            
            if (this.checkWin()) {
                return;
            }
            
            this.attackPlayer();
        },
        specialAttack:function(){
            let damage = this.causeDamage(10, 20);
            this.monsterHealth -= damage;
            this.events.unshift({
                isPlayer: true,
                text: "Player hits monster for " + damage
            });
            if (this.checkWin()) return;
            this.attackPlayer();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100
            }
            this.events.unshift({
                isPlayer: true,
                text: "Player heals with 20"
            });
            this.attackPlayer();
        },
        giveUp:function(){
            this.gameIsRunning = false;
            this.events.unshift({
                isPlayer: true,
                text: "Player give ups"
            });
        },
        attackPlayer() {
            let damage = this.causeDamage(3, 10);
            this.playerHealth -= damage;
            this.events.unshift({
                isPlayer: false,
                text: "Monster hits player for " + damage
            });
            this.checkWin();
        },
        causeDamage: function (min,max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin() {
            if(this.monsterHealth <= 0)
            {
                if (confirm("You won ! New Game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;                    
                }
                return true;
            } else if(this.playerHealth <= 0)
            {
                if (confirm("You Lost ! New Game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;                    
                }
                return true;
            } 
            return false;
        }
    }
});