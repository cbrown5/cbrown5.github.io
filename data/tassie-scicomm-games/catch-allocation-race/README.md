# 🎣 Fish Catch Management Game

A web-based simulation game about balancing fish catches between commercial and recreational fishing sectors while maintaining environmental sustainability.

## Game Overview

The goal is to keep everyone happy by managing fish catches over a 1-minute continuous gameplay session. Players must balance the needs of three sectors:

- 🌊 **Environment**: Wants healthy fish populations
- 🎣 **Recreational Fishing**: Wants adequate catch opportunities  
- 🚢 **Commercial Fishing**: Wants profitable catch levels

## How to Play

1. **Open the Game**: Open `index.html` in your web browser
2. **Adjust Sliders**: Use the two slider controls to set catch levels:
   - Recreational Catch: 0-200 fish/year
   - Commercial Catch: 0-500 fish/year
3. **Monitor Happiness**: Watch the emoji indicators to see how each sector responds
4. **Balance the System**: Try to keep all sectors happy while maintaining fish population
5. **Watch the Timer**: You have 60 seconds to achieve the best balance
6. **Final Score**: Aim for the highest overall balance score (0-100)

## Game Features

### Fish Population Dynamics
- Uses a **logistic growth model**: `dN/dt = rN(1 - N/K) - catches`
- Starting population: 1,000 fish
- Carrying capacity: 2,000 fish
- Growth rate: 0.1
- Fish population updates in real-time based on catches

### Three Interactive Panels

1. **Fish Pond Panel**
   - Shows current fish population
   - Visual representation with swimming fish emojis
   - Color changes based on population health
   - Displays carrying capacity and growth rate

2. **Management Panel**
   - Two slider controls for catch management
   - Real-time display of catch values
   - Shows total annual catch

3. **Happiness Panel**
   - Emoji indicators for each sector
   - Text descriptions of happiness levels
   - Overall balance score (0-100)

### Happiness System

**Environment Happiness** (based on fish population ratio):
- 😍 Thriving (80%+ of carrying capacity)
- 😊 Healthy (60-80%)
- 😐 Stressed (40-60%)
- 😟 Declining (20-40%)
- 😵 Critical (<20%)

**Recreational Happiness** (based on catch amount):
- 🤩 Excellent (80+ fish)
- 😊 Satisfied (60-80 fish)
- 😐 Okay (40-60 fish)
- 😞 Disappointed (20-40 fish)
- 😡 Angry (<20 fish)

**Commercial Happiness** (based on catch amount):
- 🤑 Profitable (200+ fish)
- 😊 Good Business (150-200 fish)
- 😐 Breaking Even (100-150 fish)
- 😟 Struggling (50-100 fish)
- 😭 Bankruptcy (<50 fish)

## Scoring System

The overall balance score considers:
- Environmental health (fish population ratio)
- Recreational satisfaction (catch adequacy)
- Commercial viability (catch profitability)
- Sustainability penalty (for overfishing)

**Score Ranges:**
- 80-100: Excellent balance 🎉
- 60-79: Good management 👍
- 40-59: Room for improvement 😐
- 0-39: Challenging balance 😞

## Strategy Tips

1. **Start Conservative**: Begin with moderate catch levels and observe the system
2. **Watch Fish Population**: Don't let it drop too low or sectors will suffer
3. **Balance is Key**: Extreme catches in either direction usually lead to problems
4. **Monitor All Sectors**: Keep an eye on all three happiness indicators
5. **Sustainable Fishing**: Generally, total catches should be around 10% of fish population

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **No Dependencies**: Runs entirely in the browser
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Game state updates every 100ms for smooth animation

## Files

- `index.html` - Main game interface
- `styles.css` - Game styling and responsive design
- `script.js` - Game logic and fish population model
- `README.md` - This documentation

## Educational Value

This game demonstrates:
- Population dynamics and logistic growth models
- Resource management and sustainability concepts
- Stakeholder balance in natural resource management
- Real-time system feedback and decision making

Perfect for educational settings, environmental awareness, or anyone interested in fisheries management!