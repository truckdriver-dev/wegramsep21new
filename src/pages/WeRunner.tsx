import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const WeRunner: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(1);
  
  // Game variables
  const [player, setPlayer] = useState({ x: 100, y: 300, width: 60, height: 80 });
  const [enemies, setEnemies] = useState<Array<{x: number, y: number, width: number, height: number, speed: number}>>([]);
  const [background, setBackground] = useState({ x: 0 });
  const [particles, setParticles] = useState<Array<{x: number, y: number, vx: number, vy: number, life: number}>>([]);
  
  // Animation frame reference
  const animationRef = useRef<number>();

  // Game loop
  useEffect(() => {
    if (gameState === 'playing') {
      const gameLoop = () => {
        updateGame();
        drawGame();
        animationRef.current = requestAnimationFrame(gameLoop);
      };
      gameLoop();
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [gameState, enemies, player, background, particles]);

  const updateGame = () => {
    // Update background
    setBackground(prev => ({ x: prev.x - 2 * gameSpeed }));
    if (background.x <= -800) {
      setBackground({ x: 0 });
    }

    // Spawn enemies
    if (Math.random() < 0.02) {
      const newEnemy = {
        x: 800,
        y: Math.random() * 200 + 200,
        width: 50,
        height: 60,
        speed: 2 + Math.random() * 2
      };
      setEnemies(prev => [...prev, newEnemy]);
    }

    // Update enemies
    setEnemies(prev => prev.map(enemy => ({
      ...enemy,
      x: enemy.x - enemy.speed * gameSpeed
    })).filter(enemy => enemy.x > -50));

    // Update particles
    setParticles(prev => prev.map(particle => ({
      ...particle,
      x: particle.x + particle.vx,
      y: particle.y + particle.vy,
      life: particle.life - 0.02
    })).filter(particle => particle.life > 0));

    // Check collisions
    enemies.forEach(enemy => {
      if (player.x < enemy.x + enemy.width &&
          player.x + player.width > enemy.x &&
          player.y < enemy.y + enemy.height &&
          player.y + player.height > enemy.y) {
        setGameState('gameOver');
      }
    });

    // Update score
    setScore(prev => prev + 1);
    
    // Increase game speed
    if (score % 1000 === 0) {
      setGameSpeed(prev => Math.min(prev + 0.1, 3));
    }
  };

  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw animated background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw moving stars
    for (let i = 0; i < 50; i++) {
      const x = (i * 20 + background.x) % canvas.width;
      const y = (i * 15) % canvas.height;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
      ctx.fillRect(x, y, 2, 2);
    }

    // Draw player (Anime-style character)
    ctx.save();
    ctx.translate(player.x + player.width/2, player.y + player.height/2);
    
    // Player body (blue suit)
    ctx.fillStyle = '#4a90e2';
    ctx.fillRect(-player.width/2, -player.height/2, player.width, player.height);
    
    // Player helmet
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(-player.width/2 - 5, -player.height/2 - 10, player.width + 10, 20);
    
    // Player visor (dark)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(-player.width/2 + 5, -player.height/2 - 8, player.width - 10, 15);
    
    // Player glowing eyes
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(-player.width/2 + 10, -player.height/2 - 5, 8, 5);
    ctx.fillRect(player.width/2 - 18, -player.height/2 - 5, 8, 5);
    
    // Player weapon (red glowing device)
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(player.width/2, -10, 15, 20);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(player.width/2 + 2, -8, 11, 16);
    
    ctx.restore();

    // Draw enemies (Yoda-style character)
    enemies.forEach(enemy => {
      ctx.save();
      ctx.translate(enemy.x + enemy.width/2, enemy.y + enemy.height/2);
      
      // Enemy body (green)
      ctx.fillStyle = '#4a7c59';
      ctx.fillRect(-enemy.width/2, -enemy.height/2, enemy.width, enemy.height);
      
      // Enemy head
      ctx.fillStyle = '#6b8e6b';
      ctx.fillRect(-enemy.width/2 - 5, -enemy.height/2 - 15, enemy.width + 10, 20);
      
      // Enemy ears
      ctx.fillStyle = '#5a7a5a';
      ctx.fillRect(-enemy.width/2 - 15, -enemy.height/2 - 10, 10, 15);
      ctx.fillRect(enemy.width/2 + 5, -enemy.height/2 - 10, 10, 15);
      
      // Enemy glowing eyes
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(-enemy.width/2 + 5, -enemy.height/2 - 8, 6, 4);
      ctx.fillRect(enemy.width/2 - 11, -enemy.height/2 - 8, 6, 4);
      
      // Enemy helmet with flames
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(-enemy.width/2 - 8, -enemy.height/2 - 20, enemy.width + 16, 12);
      
      // Flames
      ctx.fillStyle = '#ff4500';
      for (let i = 0; i < 5; i++) {
        const flameX = -enemy.width/2 - 8 + i * 8;
        ctx.fillRect(flameX, -enemy.height/2 - 25, 6, 8);
      }
      
      ctx.restore();
    });

    // Draw particles
    particles.forEach(particle => {
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.life})`;
      ctx.fillRect(particle.x, particle.y, 3, 3);
    });

    // Draw UI
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 200, 80);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 20, 35);
    ctx.fillText(`High: ${highScore}`, 20, 60);
    ctx.fillText(`Speed: ${gameSpeed.toFixed(1)}x`, 20, 85);
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setGameSpeed(1);
    setEnemies([]);
    setParticles([]);
  };

  const pauseGame = () => {
    setGameState(gameState === 'playing' ? 'paused' : 'playing');
  };

  const resetGame = () => {
    setGameState('menu');
    if (score > highScore) {
      setHighScore(score);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (gameState === 'playing') {
      if (e.key === 'ArrowUp' || e.key === ' ') {
        setPlayer(prev => ({ ...prev, y: Math.max(prev.y - 20, 100) }));
      }
      if (e.key === 'ArrowDown') {
        setPlayer(prev => ({ ...prev, y: Math.min(prev.y + 20, 400) }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
          >
            {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="flex items-center justify-center min-h-screen">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border-2 border-purple-500 rounded-lg shadow-2xl"
          onKeyDown={handleKeyPress}
          tabIndex={0}
        />
      </div>

      {/* Game Menu Overlay */}
      {gameState === 'menu' && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              WeRunner
            </h1>
            <p className="text-xl text-gray-300 mb-8">Epic Anime Battle Runner</p>
            
            <div className="space-y-4">
              <button
                onClick={startGame}
                className="block w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xl rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                <Play className="w-6 h-6 inline mr-2" />
                Start Battle
              </button>
              
              <div className="text-gray-400 text-sm">
                <p>Use ↑ ↓ or SPACE to dodge enemies</p>
                <p>Survive as long as possible!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {gameState === 'gameOver' && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 text-red-400">Game Over!</h2>
            <p className="text-xl text-gray-300 mb-2">Final Score: {score}</p>
            {score > highScore && (
              <p className="text-lg text-yellow-400 mb-4">🎉 New High Score!</p>
            )}
            
            <div className="space-y-3">
              <button
                onClick={startGame}
                className="block w-full py-3 px-6 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-blue-700 transition-all"
              >
                Play Again
              </button>
              
              <button
                onClick={resetGame}
                className="block w-full py-3 px-6 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-all"
              >
                Main Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pause Overlay */}
      {gameState === 'paused' && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">Paused</h2>
            
            <div className="space-y-3">
              <button
                onClick={pauseGame}
                className="block w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                <Play className="w-5 h-5 inline mr-2" />
                Resume
              </button>
              
              <button
                onClick={resetGame}
                className="block w-full py-3 px-6 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-all"
              >
                Main Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Controls */}
      {gameState === 'playing' && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={pauseGame}
            className="p-3 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
          >
            <Pause className="w-6 h-6 text-white" />
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-sm text-gray-400 z-10">
        <p>↑ ↓ or SPACE to move</p>
        <p>Dodge the enemies!</p>
      </div>
    </div>
  );
};
