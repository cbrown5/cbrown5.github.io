class FisheryGame {
    constructor() {
        this.gameState = {
            money: 0,
            fishPopulation: 50,
            fishCaught: 0,
            timeLeft: 60,
            waterQuality: 80,
            pollution: 20,
            algae: 30,
            oxygen: 70,
            gameRunning: false,
            gameWon: false
        };

        this.equipment = {
            betterNet: false,
            waterFilter: false,
            waterMonitor: false
        };

        this.gameSettings = {
            maxFishPopulation: 100,
            targetFishCaught: 25,
            maxFishCaught: 40,
            fishPrice: 5,
            reproductionRate: 0.02,
            pollutionIncrease: 0.5,
            algaeGrowthRate: 0.3,
            oxygenDecreaseRate: 0.2
        };

        this.fish = [];
        this.gameTimer = null;
        this.environmentTimer = null;

        this.initializeGame();
        this.bindEvents();
    }

    initializeGame() {
        this.updateDisplay();
        this.spawnInitialFish();
        this.startGame();
    }

    bindEvents() {
        document.getElementById('catch-fish').addEventListener('click', () => this.castNet());
        document.getElementById('clean-water').addEventListener('click', () => this.cleanWater());
        document.getElementById('restart-game').addEventListener('click', () => this.restartGame());
        
        // Equipment purchases
        document.getElementById('buy-net').addEventListener('click', () => this.buyEquipment('betterNet', 50));
        document.getElementById('buy-filter').addEventListener('click', () => this.buyEquipment('waterFilter', 100));
        document.getElementById('buy-monitor').addEventListener('click', () => this.buyEquipment('waterMonitor', 75));

        // Pond click for individual fish catching
        document.getElementById('pond').addEventListener('click', (e) => this.clickFish(e));
    }

    startGame() {
        this.gameState.gameRunning = true;
        this.gameTimer = setInterval(() => this.updateTimer(), 1000);
        this.environmentTimer = setInterval(() => this.updateEnvironment(), 2000);
        this.addMessage("Game started! Maintain a sustainable fishery.", "info");
    }

    updateTimer() {
        this.gameState.timeLeft--;
        document.getElementById('timer').textContent = this.gameState.timeLeft;

        if (this.gameState.timeLeft <= 0) {
            this.endGame();
        }
    }

    updateEnvironment() {
        if (!this.gameState.gameRunning) return;

        // Natural environmental changes
        this.gameState.pollution += this.gameSettings.pollutionIncrease * (1 - (this.equipment.waterFilter ? 0.5 : 0));
        this.gameState.algae += this.gameSettings.algaeGrowthRate * (this.gameState.pollution / 100);
        this.gameState.oxygen -= this.gameSettings.oxygenDecreaseRate * (this.gameState.algae / 100);

        // Fish population dynamics
        this.updateFishPopulation();

        // Clamp values
        this.gameState.pollution = Math.max(0, Math.min(100, this.gameState.pollution));
        this.gameState.algae = Math.max(0, Math.min(100, this.gameState.algae));
        this.gameState.oxygen = Math.max(0, Math.min(100, this.gameState.oxygen));

        // Calculate water quality
        this.gameState.waterQuality = Math.max(0, 100 - (this.gameState.pollution * 0.4 + this.gameState.algae * 0.3 + (100 - this.gameState.oxygen) * 0.3));

        this.updateDisplay();
        this.checkEnvironmentalEvents();
    }

    updateFishPopulation() {
        const carryingCapacity = this.gameSettings.maxFishPopulation * (this.gameState.waterQuality / 100);
        const growthRate = this.gameSettings.reproductionRate * (this.gameState.waterQuality / 100);
        
        // Logistic growth model
        const populationGrowth = growthRate * this.gameState.fishPopulation * (1 - this.gameState.fishPopulation / carryingCapacity);
        this.gameState.fishPopulation += populationGrowth;

        // Population collapse if conditions are too poor
        if (this.gameState.waterQuality < 20) {
            this.gameState.fishPopulation *= 0.95; // 5% die off per update
        }

        this.gameState.fishPopulation = Math.max(0, Math.min(this.gameSettings.maxFishPopulation, this.gameState.fishPopulation));
        
        // Update visual fish count
        this.updateFishDisplay();
    }

    spawnInitialFish() {
        const pond = document.getElementById('pond');
        const fishEmojis = ['🐟', '🐠', '🐡', '🦈'];
        
        for (let i = 0; i < Math.floor(this.gameState.fishPopulation / 2); i++) {
            this.createFishElement(pond, fishEmojis);
        }
    }

    updateFishDisplay() {
        const pond = document.getElementById('pond');
        const currentFishElements = pond.querySelectorAll('.fish').length;
        const targetFishElements = Math.floor(this.gameState.fishPopulation / 2);
        const fishEmojis = ['🐟', '🐠', '🐡', '🦈'];

        if (targetFishElements > currentFishElements) {
            // Add fish
            for (let i = currentFishElements; i < targetFishElements; i++) {
                this.createFishElement(pond, fishEmojis);
            }
        } else if (targetFishElements < currentFishElements) {
            // Remove fish
            const fishToRemove = currentFishElements - targetFishElements;
            const fishElements = pond.querySelectorAll('.fish');
            for (let i = 0; i < fishToRemove && i < fishElements.length; i++) {
                fishElements[i].remove();
            }
        }
    }

    createFishElement(pond, fishEmojis) {
        const fish = document.createElement('div');
        fish.className = 'fish';
        fish.textContent = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
        
        // Random position within pond
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 120 + 40; // Keep fish away from edges
        const x = 200 + Math.cos(angle) * radius;
        const y = 150 + Math.sin(angle) * radius * 0.6; // Elliptical pond
        
        fish.style.left = x + 'px';
        fish.style.top = y + 'px';
        
        // Random movement
        this.animateFish(fish);
        
        pond.appendChild(fish);
    }

    animateFish(fishElement) {
        const moveInterval = setInterval(() => {
            if (!document.body.contains(fishElement)) {
                clearInterval(moveInterval);
                return;
            }

            const currentX = parseInt(fishElement.style.left) || 200;
            const currentY = parseInt(fishElement.style.top) || 150;
            
            const newX = Math.max(50, Math.min(350, currentX + (Math.random() - 0.5) * 40));
            const newY = Math.max(50, Math.min(250, currentY + (Math.random() - 0.5) * 30));
            
            fishElement.style.left = newX + 'px';
            fishElement.style.top = newY + 'px';
        }, 2000 + Math.random() * 3000);
    }

    castNet() {
        if (!this.gameState.gameRunning) return;

        const netEfficiency = this.equipment.betterNet ? 1.5 : 1;
        const fishToCatch = Math.min(
            Math.floor(Math.random() * 4 + 2) * netEfficiency,
            this.gameState.fishPopulation
        );

        if (fishToCatch > 0) {
            this.catchFish(fishToCatch);
            this.createRippleEffect();
            this.addMessage(`Cast net and caught ${fishToCatch} fish!`, "success");
        } else {
            this.addMessage("No fish caught - population too low!", "warning");
        }
    }

    clickFish(event) {
        if (!this.gameState.gameRunning) return;

        const fishElement = event.target.closest('.fish');
        if (fishElement && this.gameState.fishPopulation > 0) {
            this.catchFish(1);
            fishElement.classList.add('caught');
            setTimeout(() => fishElement.remove(), 500);
            
            // Create ripple at click position
            this.createRippleAt(event.offsetX, event.offsetY);
        }
    }

    catchFish(amount) {
        this.gameState.fishPopulation -= amount;
        this.gameState.fishCaught += amount;
        this.gameState.money += amount * this.gameSettings.fishPrice;
        
        // Increase pollution from fishing activity
        this.gameState.pollution += amount * 0.5;
        
        this.updateDisplay();
    }

    cleanWater() {
        if (this.gameState.money >= 10) {
            this.gameState.money -= 10;
            this.gameState.pollution = Math.max(0, this.gameState.pollution - 15);
            this.gameState.algae = Math.max(0, this.gameState.algae - 10);
            this.gameState.oxygen = Math.min(100, this.gameState.oxygen + 10);
            
            this.updateDisplay();
            this.addMessage("Water cleaned! Pollution reduced.", "success");
        } else {
            this.addMessage("Not enough money to clean water!", "warning");
        }
    }

    buyEquipment(equipmentType, cost) {
        if (this.gameState.money >= cost && !this.equipment[equipmentType]) {
            this.gameState.money -= cost;
            this.equipment[equipmentType] = true;
            
            const button = document.getElementById(`buy-${equipmentType.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
            button.textContent = button.textContent.replace('$' + cost, '✓ Owned');
            button.classList.add('owned');
            button.disabled = true;
            
            this.updateDisplay();
            this.addMessage(`Purchased ${equipmentType}!`, "success");
        } else if (this.equipment[equipmentType]) {
            this.addMessage("Equipment already owned!", "info");
        } else {
            this.addMessage("Not enough money!", "warning");
        }
    }

    createRippleEffect() {
        const pond = document.getElementById('pond');
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        
        const x = Math.random() * 300 + 50;
        const y = Math.random() * 200 + 50;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        
        pond.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    createRippleAt(x, y) {
        const pond = document.getElementById('pond');
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        
        pond.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    checkEnvironmentalEvents() {
        if (this.gameState.pollution > 80) {
            this.addMessage("High pollution is killing fish!", "danger");
        } else if (this.gameState.algae > 70) {
            this.addMessage("Algae bloom detected! Fish struggling to breathe.", "warning");
        } else if (this.gameState.oxygen < 30) {
            this.addMessage("Low oxygen levels - fish population declining!", "danger");
        }

        if (this.gameState.fishPopulation < 10) {
            this.addMessage("Fish population critically low!", "danger");
        }
    }

    updateDisplay() {
        document.getElementById('money').textContent = Math.floor(this.gameState.money);
        document.getElementById('fish-count').textContent = Math.floor(this.gameState.fishPopulation);
        document.getElementById('fish-caught').textContent = this.gameState.fishCaught;

        // Update bars
        const caughtPercentage = (this.gameState.fishCaught / this.gameSettings.maxFishCaught) * 100;
        document.getElementById('caught-bar').style.width = Math.min(100, caughtPercentage) + '%';

        document.getElementById('water-quality').style.width = this.gameState.waterQuality + '%';
        document.getElementById('pollution-bar').style.width = this.gameState.pollution + '%';
        document.getElementById('algae-bar').style.width = this.gameState.algae + '%';
        document.getElementById('oxygen-bar').style.width = this.gameState.oxygen + '%';

        // Update equipment buttons
        this.updateEquipmentButtons();
    }

    updateEquipmentButtons() {
        const buttons = [
            { id: 'buy-net', cost: 50, owned: this.equipment.betterNet },
            { id: 'buy-filter', cost: 100, owned: this.equipment.waterFilter },
            { id: 'buy-monitor', cost: 75, owned: this.equipment.waterMonitor }
        ];

        buttons.forEach(btn => {
            const button = document.getElementById(btn.id);
            if (!btn.owned) {
                button.disabled = this.gameState.money < btn.cost;
            }
        });
    }

    addMessage(text, type = 'info') {
        const messagesContainer = document.getElementById('messages');
        const message = document.createElement('p');
        message.textContent = text;
        message.className = `message-${type}`;
        
        messagesContainer.appendChild(message);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Remove old messages if too many
        const messages = messagesContainer.querySelectorAll('p');
        if (messages.length > 10) {
            messages[0].remove();
        }
    }

    endGame() {
        this.gameState.gameRunning = false;
        clearInterval(this.gameTimer);
        clearInterval(this.environmentTimer);

        const gameOverScreen = document.getElementById('game-over');
        const gameResult = document.getElementById('game-result');
        const finalScore = document.getElementById('final-score');
        const gameMessage = document.getElementById('game-message');

        // Determine win/lose conditions
        const isWin = this.checkWinConditions();
        
        if (isWin) {
            gameResult.textContent = "Congratulations! You Win!";
            gameResult.style.color = "#4CAF50";
            gameMessage.textContent = "You successfully managed a sustainable fishery!";
        } else {
            gameResult.textContent = "Game Over";
            gameResult.style.color = "#F44336";
            gameMessage.textContent = this.getFailureReason();
        }

        finalScore.textContent = `Final Score: $${Math.floor(this.gameState.money)}`;
        gameOverScreen.style.display = 'flex';
    }

    checkWinConditions() {
        const caughtInRange = this.gameState.fishCaught >= this.gameSettings.targetFishCaught && 
                             this.gameState.fishCaught <= this.gameSettings.maxFishCaught;
        const populationHealthy = this.gameState.fishPopulation >= 30;
        const environmentHealthy = this.gameState.waterQuality >= 50;
        const profitableBusiness = this.gameState.money >= 100;

        return caughtInRange && populationHealthy && environmentHealthy && profitableBusiness;
    }

    getFailureReason() {
        if (this.gameState.fishCaught > this.gameSettings.maxFishCaught) {
            return "You overfished! The population collapsed.";
        } else if (this.gameState.fishCaught < this.gameSettings.targetFishCaught) {
            return "You didn't catch enough fish to be profitable.";
        } else if (this.gameState.fishPopulation < 30) {
            return "Fish population too low - poor environmental management.";
        } else if (this.gameState.waterQuality < 50) {
            return "Water quality too poor - fish couldn't survive.";
        } else if (this.gameState.money < 100) {
            return "Not profitable enough - need better business management.";
        } else {
            return "Try to balance fishing with environmental care!";
        }
    }

    restartGame() {
        // Reset game state
        this.gameState = {
            money: 0,
            fishPopulation: 50,
            fishCaught: 0,
            timeLeft: 60,
            waterQuality: 80,
            pollution: 20,
            algae: 30,
            oxygen: 70,
            gameRunning: false,
            gameWon: false
        };

        this.equipment = {
            betterNet: false,
            waterFilter: false,
            waterMonitor: false
        };

        // Clear pond
        const pond = document.getElementById('pond');
        pond.querySelectorAll('.fish').forEach(fish => fish.remove());

        // Clear messages
        document.getElementById('messages').innerHTML = '<p>Welcome to your fishery! Maintain a sustainable balance.</p>';

        // Reset equipment buttons
        const equipmentButtons = ['buy-net', 'buy-filter', 'buy-monitor'];
        const costs = [50, 100, 75];
        const names = ['Better Net', 'Water Filter', 'Water Monitor'];
        
        equipmentButtons.forEach((id, index) => {
            const button = document.getElementById(id);
            button.textContent = `${names[index]} ($${costs[index]})`;
            button.classList.remove('owned');
            button.disabled = false;
        });

        // Hide game over screen
        document.getElementById('game-over').style.display = 'none';

        // Restart game
        this.initializeGame();
    }
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new FisheryGame();
});