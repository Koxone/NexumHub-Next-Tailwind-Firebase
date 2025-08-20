export default function StarFieldBackground({
  count = 100,
  fallPercentage = 0.3,
  colors = ['#ffffff', '#ffd700', '#87ceeb'],
  minSize = 2,
  maxSize = 4,
}) {
  const stars = Array.from({ length: count }).map((_, i) => {
    const size = Math.random() * (maxSize - minSize) + minSize;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const top = `${Math.random() * 100}vh`;
    const left = `${Math.random() * 100}vw`;
    const isFalling = Math.random() < fallPercentage;

    return {
      id: i,
      size,
      color,
      top,
      left,
      isFalling,
      duration: (6 + Math.random() * 10).toFixed(2),
      delay: (Math.random() * 5).toFixed(2),
    };
  });

  return (
    <>
      <style>{`
        @keyframes star-blink {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.5); }
        }

        @keyframes star-fall {
          0% { transform: translateY(0) translateX(0); opacity: 0.8; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh) translateX(5vw); opacity: 0; }
        }
      `}</style>

      <div className="pointer-events-nonefixed inset-0 -z-20 overflow-hidden">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: star.top,
              left: star.left,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
              opacity: 0.9,
              animation: `${
                star.isFalling ? 'star-fall' : 'star-blink'
              } ${star.duration}s ${
                star.isFalling ? 'linear' : 'ease-in-out'
              } infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
