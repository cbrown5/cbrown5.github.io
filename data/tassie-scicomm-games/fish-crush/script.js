class OceanConservationGame {
    constructor() {
        this.fishPercentage = 50;
        this.score = 0;
        this.matches = 0;
        this.selectedTiles = [];
        this.gameRunning = true;
        this.truckSpeed = 1000; // milliseconds between fish removal
        this.fishSymbols = ['🐟', '🐠', '🐡', '🦈', '🐙', '🦀', '🐚', '⭐'];
        this.puzzleSymbols = ['🔵', '🔴', '🟢', '🟡', '🟣', '🟠', '⚫', '⚪'];
        this.gridSize = 8;
        this.grid = [];
        
        this.initializeGame();
        this.startTruckTimer();
    }

    initializeGame() {
        this.createPuzzleGrid();
        this.updateDisplay();
        this.generateFish();
        this.bindEvents();
    }

    createPuzzleGrid() {
        const puzzleGrid = document.getElementById('puzzle-grid');
        puzzleGrid.innerHTML = '';
        this.grid = [];

        for (let row = 0; row < this.gridSize; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.gridSize; col++) {
                const tile = document.createElement('div');
                tile.className = 'puzzle-tile';
                tile.dataset.row = row;
                tile.dataset.col = col;
                
                // Generate random symbol
                const symbol = this.puzzleSymbols[Math.floor(Math.random() * this.puzzleSymbols.length)];
                tile.textContent = symbol;
                this.grid[row][col] = {
                    element: tile,
                    symbol: symbol,
                    selected: false
                };

                tile.addEventListener('click', () => this.selectTile(row, col));
                puzzleGrid.appendChild(tile);
            }
        }
    }

    selectTile(row, col) {
        if (!this.gameRunning) return;

        const tile = this.grid[row][col];
        
        if (tile.selected) {
            // Deselect tile
            tile.selected = false;
            tile.element.classList.remove('selected');
            this.selectedTiles = this.selectedTiles.filter(t => !(t.row === row && t.col === col));
        } else {
            // Select tile
            if (this.selectedTiles.length < 4) {
                tile.selected = true;
                tile.element.classList.add('selected');
                this.selectedTiles.push({row, col, symbol: tile.symbol});
            }
        }

        this.updateSelectedDisplay();
        this.checkForMatch();
    }

    updateSelectedDisplay() {
        const selectedDisplay = document.getElementById('selected-tiles');
        if (this.selectedTiles.length === 0) {
            selectedDisplay.innerHTML = '<h3>Select tiles to match (need 4 of same symbol)</h3>';
        } else {
            selectedDisplay.innerHTML = `
                <h3>Selected: ${this.selectedTiles.length}/4</h3>
                <div>
                    ${this.selectedTiles.map(tile => 
                        `<span class="selected-tile-display">${tile.symbol}</span>`
                    ).join('')}
                </div>
            `;
        }
    }

    checkForMatch() {
        if (this.selectedTiles.length === 4) {
            const firstSymbol = this.selectedTiles[0].symbol;
            const allMatch = this.selectedTiles.every(tile => tile.symbol === firstSymbol);

            if (allMatch) {
                this.processMatch();
            } else {
                // No match - clear selection after a brief delay
                setTimeout(() => {
                    this.clearSelection();
                }, 1000);
            }
        }
    }

    processMatch() {
        // Mark tiles as matched
        this.selectedTiles.forEach(tile => {
            const gridTile = this.grid[tile.row][tile.col];
            gridTile.element.classList.add('matched');
        });

        // Update game state
        this.matches++;
        this.score += 100;
        this.fishPercentage = Math.min(100, this.fishPercentage + 15);

        // Check if truck should speed up
        if (this.fishPercentage > 80) {
            this.speedUpTruck();
        }

        this.updateDisplay();
        this.generateFish();

        // Replace matched tiles after animation
        setTimeout(() => {
            this.replaceMatchedTiles();
            this.clearSelection();
        }, 500);
    }

    replaceMatchedTiles() {
        this.selectedTiles.forEach(tile => {
            const gridTile = this.grid[tile.row][tile.col];
            const newSymbol = this.puzzleSymbols[Math.floor(Math.random() * this.puzzleSymbols.length)];
            
            gridTile.symbol = newSymbol;
            gridTile.element.textContent = newSymbol;
            gridTile.element.classList.remove('matched');
        });
    }

    clearSelection() {
        this.selectedTiles.forEach(tile => {
            const gridTile = this.grid[tile.row][tile.col];
            gridTile.selected = false;
            gridTile.element.classList.remove('selected');
        });
        this.selectedTiles = [];
        this.updateSelectedDisplay();
    }

    startTruckTimer() {
        this.truckInterval = setInterval(() => {
            if (this.gameRunning) {
                this.removeFish();
            }
        }, this.truckSpeed);
    }

    removeFish() {
        // Truck removes fish based on current speed
        const removalAmount = this.fishPercentage > 80 ? 8 : 5;
        this.fishPercentage = Math.max(0, this.fishPercentage - removalAmount);
        
        this.updateDisplay();
        this.updateWaterLevel();

        if (this.fishPercentage <= 0) {
            this.gameOver();
        }
    }

    speedUpTruck() {
        if (this.truckSpeed > 500) { // Don't go faster than 500ms
            this.truckSpeed = 600;
            clearInterval(this.truckInterval);
            this.startTruckTimer();
            
            const truck = document.getElementById('truck');
            const speedDisplay = document.getElementById('truck-speed');
            truck.classList.add('fast');
            speedDisplay.textContent = 'Fast!';
        }
    }

    generateFish() {
        const fishContainer = document.getElementById('fish-container');
        const fishCount = Math.floor(this.fishPercentage / 10);
        
        // Clear existing fish
        fishContainer.innerHTML = '';
        
        // Add new fish based on percentage
        for (let i = 0; i < fishCount; i++) {
            const fish = document.createElement('div');
            fish.className = 'fish';
            fish.textContent = this.fishSymbols[Math.floor(Math.random() * this.fishSymbols.length)];
            
            // Random position within the ocean
            fish.style.left = Math.random() * 80 + '%';
            fish.style.top = Math.random() * 70 + '%';
            fish.style.animationDelay = Math.random() * 3 + 's';
            
            fishContainer.appendChild(fish);
        }
    }

    updateWaterLevel() {
        const waterLevel = document.getElementById('water-level');
        waterLevel.style.height = this.fishPercentage + '%';
        
        // Change color based on fish level
        if (this.fishPercentage < 20) {
            waterLevel.style.background = 'linear-gradient(180deg, rgba(220, 20, 60, 0.6) 0%, rgba(139, 0, 0, 0.8) 100%)';
        } else if (this.fishPercentage < 50) {
            waterLevel.style.background = 'linear-gradient(180deg, rgba(255, 165, 0, 0.6) 0%, rgba(255, 140, 0, 0.8) 100%)';
        } else {
            waterLevel.style.background = 'linear-gradient(180deg, rgba(30, 144, 255, 0.6) 0%, rgba(0, 100, 200, 0.8) 100%)';
        }
    }

    updateDisplay() {
        document.getElementById('fish-percentage').textContent = Math.round(this.fishPercentage);
        document.getElementById('score').textContent = this.score;
        document.getElementById('matches').textContent = this.matches;
        this.updateWaterLevel();
    }

    gameOver() {
        this.gameRunning = false;
        clearInterval(this.truckInterval);
        
        const modal = document.getElementById('game-over-modal');
        const title = document.getElementById('game-over-title');
        const message = document.getElementById('game-over-message');
        const finalScore = document.getElementById('final-score');
        const fishSaved = document.getElementById('fish-saved');
        
        title.textContent = 'Game Over!';
        message.textContent = 'The ocean ran out of fish! The ecosystem has collapsed.';
        finalScore.textContent = this.score;
        fishSaved.textContent = this.matches * 4;
        
        modal.style.display = 'flex';
    }

    bindEvents() {
        // Handle window resize for responsive grid
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 600) {
                this.gridSize = 6;
                this.createPuzzleGrid();
            } else if (this.gridSize !== 8) {
                this.gridSize = 8;
                this.createPuzzleGrid();
            }
        });
    }
}

// Global function for restart button
function restartGame() {
    const modal = document.getElementById('game-over-modal');
    modal.style.display = 'none';
    
    // Reset truck speed display
    const truck = document.getElementById('truck');
    const speedDisplay = document.getElementById('truck-speed');
    truck.classList.remove('fast');
    speedDisplay.textContent = 'Normal';
    
    // Create new game instance
    window.game = new OceanConservationGame();
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new OceanConservationGame();
});

// Add some helpful keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (window.game) {
            window.game.clearSelection();
        }
    }
    if (e.key === 'r' || e.key === 'R') {
        if (!window.game || !window.game.gameRunning) {
            restartGame();
        }
    }
});