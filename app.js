document.addEventListener('DOMContentLoaded', function() {
    // Set current date and time from UTC format
    const currentDate = document.getElementById('currentDate');
    currentDate.textContent = "2025-03-21 14:47:20";
    
    // Set creator
    const creator = document.getElementById('creator');
    creator.textContent = "quantumsoldship";
    
    // Handle logo image loading
    const logoImage = document.getElementById('logo-image');
    const textLogo = document.getElementById('text-logo');
    
    logoImage.addEventListener('load', function() {
        // Image loaded successfully, keep text logo hidden
        textLogo.style.display = 'none';
    });
    
    logoImage.addEventListener('error', function() {
        // Image failed to load, show text logo instead
        logoImage.style.display = 'none';
        textLogo.style.display = 'block';
    });
    
    // Get DOM elements
    const rankingsContainer = document.getElementById('rankingsContainer');
    
    // Initialize with a delay to show loading animation
    setTimeout(() => {
        // Clear loading indicator
        rankingsContainer.innerHTML = '';
        
        // Display all players
        displayPlayers();
        
    }, 1200); // 1.2 seconds delay to show loading animation
    
    // Function to display players
    function displayPlayers() {
        // Clear current players
        rankingsContainer.innerHTML = '';
        
        // Sort players by rank
        let players = [...playersData];
        players.sort((a, b) => a.rank - b.rank);
        
        // Create and append player cards with staggered animation
        players.forEach((player, index) => {
            const playerCard = createPlayerCard(player, index);
            rankingsContainer.appendChild(playerCard);
            
            // Staggered animation
            setTimeout(() => {
                playerCard.style.animationDelay = `${index * 0.08}s`;
                playerCard.style.animationPlayState = 'running';
            }, 50);
        });
    }
    
    // Function to create a player card
    function createPlayerCard(player, index) {
        const card = document.createElement('div');
        card.className = 'player-card';
        
        // Special class for top 3 players based on their rank (not index)
        if (player.rank <= 3) {
            card.classList.add('top-player', `rank-${player.rank}`);
        }
        
        // Populate card with player data
        card.innerHTML = `
            <div class="rank">#${player.rank}</div>
            <div class="player-info">
                <h3 class="player-name">${player.name}</h3>
                <div class="rating-display">${player.rating}</div>
            </div>
        `;
        
        return card;
    }
    
    // Add scroll animation for player cards
    window.addEventListener('scroll', () => {
        const playerCards = document.querySelectorAll('.player-card');
        
        playerCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });
});