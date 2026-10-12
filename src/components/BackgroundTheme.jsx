import ThreeBackground from './ThreeBackground';

export default function BackgroundTheme() {
  return (
    <div className="site-bg-wrapper theme-cyber-aurora" aria-hidden="true">
      {/* ── Cyber Aurora Arka Plan Işık Dalgaları ── */}
      <div className="aurora-container">
        <div className="aurora-base-mesh" />
        <div className="aurora-top-ambient" />
        <div className="aurora-ribbon-primary" />
        <div className="aurora-ribbon-secondary" />
        <div className="aurora-horizon-glow" />
      </div>

      {/* 3D Reaktif Yıldız Tozu Parçacıkları */}
      <ThreeBackground />
    </div>
  );
}
