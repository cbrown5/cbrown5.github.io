class FishCatchGame {
    constructor() {
        // Game parameters
        this.carryingCapacity = 2000;
        this.growthRate = 0.1;
        this.fishPopulation = 1800;
        this.recreationalCatch = 50;
        this.commercialCatch = 100;
        this.gameTime = 20; // seconds
        this.gameRunning = false;
        this.gameTimer = null;
        this.updateInterval = null;
        
        // Happiness thresholds
        this.happinessThresholds = {
            environment: {
                veryHappy: 0.8, // 80% of carrying capacity
                happy: 0.6,
                neutral: 0.4,
                unhappy: 0.2
            },
            recreational: {
                veryHappy: 80,
                happy: 60,
                neutral: 40,
                unhappy: 20
            },
            commercial: {
                veryHappy: 200,
                happy: 150,
                neutral: 100,
                unhappy: 50
            }
        };
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.bindEvents();
        this.startGame();
        this.updateDisplay();
    }
    
    bindEvents() {
        // Slider events
        document.getElementById('recreational-catch').addEventListener('input', (e) => {
            this.recreationalCatch = parseInt(e.target.value);
            this.updateSliderDisplay();
        });
        
        document.getElementById('commercial-catch').addEventListener('input', (e) => {
            this.commercialCatch = parseInt(e.target.value);
            this.updateSliderDisplay();
        });
        
        // Restart button
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartGame();
        });
    }
    
    startGame() {
        this.gameRunning = true;
        this.gameTime = 20;
        
        // Update game state every 100ms for smooth animation
        this.updateInterval = setInterval(() => {
            this.updateFishPopulation();
            this.updateDisplay();
        }, 100);
        
        // Timer countdown every second
        this.gameTimer = setInterval(() => {
            this.gameTime--;
            document.getElementById('timer').textContent = this.gameTime;
            
            if (this.gameTime <= 0) {
                this.endGame();
            }
        }, 1000);
        
        document.getElementById('game-message').textContent = 
            'Adjust the sliders to balance fish catches and keep everyone happy!';
        document.getElementById('restart-btn').style.display = 'none';
    }
    
    updateFishPopulation() {
        // Logistic growth model: dN/dt = rN(1 - N/K) - catches
        const totalCatch = (this.recreationalCatch + this.commercialCatch) / 10; // Scale down for real-time
        const growthTerm = this.growthRate * this.fishPopulation * 
                          (1 - this.fishPopulation / this.carryingCapacity);
        
        // Update population (scaled for real-time updates)
        this.fishPopulation += (growthTerm - totalCatch) * 0.1;
        
        // Ensure population doesn't go negative
        this.fishPopulation = Math.max(0, this.fishPopulation);
        
        // Cap at carrying capacity plus some buffer for realism
        this.fishPopulation = Math.min(this.fishPopulation, this.carryingCapacity * 1.1);
    }
    
    updateDisplay() {
        // Update fish count
        document.getElementById('fish-count').textContent = Math.round(this.fishPopulation);
        
        // Update fish visual
        this.updateFishVisual();
        
        // Update happiness indicators
        this.updateHappiness();
        
        // Update overall score
        this.updateOverallScore();
    }
    
    updateFishVisual() {
        const fishVisual = document.getElementById('fish-visual');
        const fishRatio = this.fishPopulation / this.carryingCapacity;
        
        // Calculate number of fish to display (max 20 for performance)
        const displayFish = Math.min(20, Math.max(1, Math.round(fishRatio * 20)));
        
        // Clear existing fish
        fishVisual.innerHTML = '';
        
        // Add fish emojis
        for (let i = 0; i < displayFish; i++) {
            const fish = document.createElement('span');
            fish.className = 'fish';
            fish.textContent = '🐟';
            fish.style.animationDelay = `${i * 0.2}s`;
            fishVisual.appendChild(fish);
        }
        
        // Change background color based on fish population
        if (fishRatio > 0.8) {
            fishVisual.style.background = 'linear-gradient(to bottom, #74b9ff, #0984e3)';
        } else if (fishRatio > 0.5) {
            fishVisual.style.background = 'linear-gradient(to bottom, #fdcb6e, #e17055)';
        } else {
            fishVisual.style.background = 'linear-gradient(to bottom, #e17055, #d63031)';
        }
    }
    
    updateSliderDisplay() {
        document.getElementById('recreational-value').textContent = this.recreationalCatch;
        document.getElementById('commercial-value').textContent = this.commercialCatch;
        document.getElementById('total-catch').textContent = 
            this.recreationalCatch + this.commercialCatch;
    }
    
    updateHappiness() {
        // Environment happiness (based on fish population ratio)
        const envRatio = this.fishPopulation / this.carryingCapacity;
        const envHappiness = this.calculateEnvironmentHappiness(envRatio);
        
        // Recreational happiness (based on catch amount)
        const recHappiness = this.calculateRecreationalHappiness(this.recreationalCatch);
        
        // Commercial happiness (based on catch amount)
        const comHappiness = this.calculateCommercialHappiness(this.commercialCatch);
        
        // Update displays
        this.updateHappinessDisplay('env', envHappiness);
        this.updateHappinessDisplay('rec', recHappiness);
        this.updateHappinessDisplay('com', comHappiness);
    }
    
    calculateEnvironmentHappiness(ratio) {
        const thresholds = this.happinessThresholds.environment;
        
        if (ratio >= thresholds.veryHappy) {
            return { level: 'very-happy', emoji: '😍', text: 'Thriving' };
        } else if (ratio >= thresholds.happy) {
            return { level: 'happy', emoji: '😊', text: 'Healthy' };
        } else if (ratio >= thresholds.neutral) {
            return { level: 'neutral', emoji: '😐', text: 'Stressed' };
        } else if (ratio >= thresholds.unhappy) {
            return { level: 'unhappy', emoji: '😟', text: 'Declining' };
        } else {
            return { level: 'very-unhappy', emoji: '😵', text: 'Critical' };
        }
    }
    
    calculateRecreationalHappiness(catch_amount) {
        const thresholds = this.happinessThresholds.recreational;
        
        if (catch_amount >= thresholds.veryHappy) {
            return { level: 'very-happy', emoji: '🤩', text: 'Excellent' };
        } else if (catch_amount >= thresholds.happy) {
            return { level: 'happy', emoji: '😊', text: 'Satisfied' };
        } else if (catch_amount >= thresholds.neutral) {
            return { level: 'neutral', emoji: '😐', text: 'Okay' };
        } else if (catch_amount >= thresholds.unhappy) {
            return { level: 'unhappy', emoji: '😞', text: 'Disappointed' };
        } else {
            return { level: 'very-unhappy', emoji: '😡', text: 'Angry' };
        }
    }
    
    calculateCommercialHappiness(catch_amount) {
        const thresholds = this.happinessThresholds.commercial;
        
        if (catch_amount >= thresholds.veryHappy) {
            return { level: 'very-happy', emoji: '🤑', text: 'Profitable' };
        } else if (catch_amount >= thresholds.happy) {
            return { level: 'happy', emoji: '😊', text: 'Good Business' };
        } else if (catch_amount >= thresholds.neutral) {
            return { level: 'neutral', emoji: '😐', text: 'Breaking Even' };
        } else if (catch_amount >= thresholds.unhappy) {
            return { level: 'unhappy', emoji: '😟', text: 'Struggling' };
        } else {
            return { level: 'very-unhappy', emoji: '😭', text: 'Bankruptcy' };
        }
    }
    
    updateHappinessDisplay(sector, happiness) {
        document.getElementById(`${sector}-emoji`).textContent = happiness.emoji;
        document.getElementById(`${sector}-text`).textContent = happiness.text;
        document.getElementById(`${sector}-text`).className = `happiness-text ${happiness.level}`;
    }
    
    updateOverallScore() {
        // Calculate overall balance score (0-100)
        const envRatio = this.fishPopulation / this.carryingCapacity;
        const envScore = Math.min(100, envRatio * 100);
        
        const recScore = Math.min(100, (this.recreationalCatch / 100) * 100);
        const comScore = Math.min(100, (this.commercialCatch / 250) * 100);
        
        // Balance penalty - penalize extreme imbalances
        const totalCatch = this.recreationalCatch + this.commercialCatch;
        const sustainableCatch = this.fishPopulation * 0.1; // 10% of population
        const sustainabilityPenalty = totalCatch > sustainableCatch ? 
            Math.max(0, 50 - (totalCatch - sustainableCatch)) : 0;
        
        const overallScore = Math.max(0, Math.round(
            (envScore + recScore + comScore) / 3 - sustainabilityPenalty
        ));
        
        document.getElementById('overall-score').textContent = overallScore;
        
        // Color code the score
        const scoreElement = document.getElementById('overall-score');
        if (overallScore >= 80) {
            scoreElement.style.color = '#00b894';
        } else if (overallScore >= 60) {
            scoreElement.style.color = '#fdcb6e';
        } else if (overallScore >= 40) {
            scoreElement.style.color = '#e17055';
        } else {
            scoreElement.style.color = '#d63031';
        }
    }
    
    endGame() {
        this.gameRunning = false;
        clearInterval(this.gameTimer);
        clearInterval(this.updateInterval);
        
        const finalScore = parseInt(document.getElementById('overall-score').textContent);
        let message = '';
        
        if (finalScore >= 80) {
            message = '🎉 Excellent! You achieved a great balance between all sectors!';
        } else if (finalScore >= 60) {
            message = '👍 Good job! You managed to keep most sectors reasonably happy.';
        } else if (finalScore >= 40) {
            message = '😐 Not bad, but there\'s room for improvement in balancing the sectors.';
        } else {
            message = '😞 The balance was challenging. Try adjusting catches more carefully!';
        }
        
        document.getElementById('game-message').textContent = 
            `Game Over! Final Score: ${finalScore}/100. ${message}`;
        document.getElementById('restart-btn').style.display = 'inline-block';
    }
    
    restartGame() {
        // Reset game state
        this.fishPopulation = 1000;
        this.recreationalCatch = 50;
        this.commercialCatch = 100;
        this.gameTime = 60;
        
        // Reset sliders
        document.getElementById('recreational-catch').value = 50;
        document.getElementById('commercial-catch').value = 100;
        
        // Reset timer display
        document.getElementById('timer').textContent = 60;
        
        // Clear any existing intervals
        if (this.gameTimer) clearInterval(this.gameTimer);
        if (this.updateInterval) clearInterval(this.updateInterval);
        
        // Start new game
        this.startGame();
        this.updateSliderDisplay();
        this.updateDisplay();
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new FishCatchGame();
});