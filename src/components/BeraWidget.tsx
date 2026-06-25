import React from 'react';

export const BeraWidget: React.FC = () => {
  return (
    <div className="bera-section" style={{ marginTop: '24px' }}>
      <div className="bera-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--sand-line)', paddingBottom: '12px' }}>
        <h4 className="section-title" style={{ margin: 0, fontSize: '1.1rem', color: 'var(--slate-rock)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="icon" style={{ fontSize: '1.25rem' }}>⚠️</span> BERA · Risque Avalanche
        </h4>
        <span className="bera-badge" style={{ padding: '3px 8px', fontSize: '11px', fontWeight: 'bold', borderRadius: '12px', background: 'var(--sand-dark)', color: 'var(--paper-cream)' }}>
          Mont-Blanc
        </span>
      </div>

      <div className="bera-card" style={{ background: 'var(--paper-cream)', border: '1px solid var(--sand-line)', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ fontSize: '1.5rem' }}>☀️</span>
          <div>
            <h5 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--slate-rock)' }}>Statut : Hors-Saison Estival</h5>
            <span style={{ fontSize: '11px', color: '#7f8c8d' }}>Juin — Octobre 2026</span>
          </div>
        </div>

        <p style={{ fontSize: '12.5px', lineHeight: '1.5', margin: '0 0 12px 0', color: 'var(--slate-rock)' }}>
          Météo-France ne produit pas de bulletin d'estimation quotidienne du risque d'avalanche (BERA) en été. Cependant, la vigilance reste impérative en haute montagne au-dessus de 3 000 m.
        </p>

        {/* Summer hazards list */}
        <div className="summer-hazards" style={{ background: 'rgba(212, 98, 42, 0.05)', borderLeft: '3px solid var(--accent-orange)', padding: '10px 12px', borderRadius: '0 6px 6px 0', marginBottom: '16px' }}>
          <h6 style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--accent-orange)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Risques Alpins Estivaux Majeurs :
          </h6>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11.5px', lineHeight: '1.45', color: 'var(--slate-rock)' }}>
            <li style={{ marginBottom: '6px' }}>
              <strong>Chute de séracs :</strong> Menace permanente sur le glacier de Tré-la-Tête et la montée d'Albert 1er. Ne stagnez pas sous les zones fracturées.
            </li>
            <li style={{ marginBottom: '6px' }}>
              <strong>Ponts de neige fragiles :</strong> Avec la chaleur, les ponts couvrant les crevasses cèdent l'après-midi. Encordement glaciaire tendu obligatoire et départ très matinal.
            </li>
            <li>
              <strong>Avalanches de neige humide :</strong> Déclenchements spontanés de coulées de fonte dans les pentes raides exposées au soleil l'après-midi.
            </li>
          </ul>
        </div>

        {/* Risk Scale Guide */}
        <div className="risk-scale-guide" style={{ borderTop: '1px dashed var(--sand-line)', paddingTop: '12px' }}>
          <h6 style={{ margin: '0 0 10px 0', fontSize: '12px', color: 'var(--slate-rock)', fontWeight: 'bold' }}>
            Échelle Européenne du Risque d'Avalanche :
          </h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
              <span style={{ width: '20px', height: '14px', borderRadius: '3px', background: '#2ecc71', display: 'inline-block', textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: '9px', lineHeight: '14px' }}>1</span>
              <strong style={{ color: '#27ae60' }}>Faible :</strong> Manteau généralement bien stabilisé.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
              <span style={{ width: '20px', height: '14px', borderRadius: '3px', background: '#f1c40f', display: 'inline-block', textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: '9px', lineHeight: '14px' }}>2</span>
              <strong style={{ color: '#d35400' }}>Limité :</strong> Déclenchement sous forte surcharge dans les pentes raides.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
              <span style={{ width: '20px', height: '14px', borderRadius: '3px', background: '#e67e22', display: 'inline-block', textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: '9px', lineHeight: '14px' }}>3</span>
              <strong style={{ color: '#e67e22' }}>Marqué :</strong> Déclenchement possible sous faible surcharge (simple skieur/alpiniste).
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
              <span style={{ width: '20px', height: '14px', borderRadius: '3px', background: '#e74c3c', display: 'inline-block', textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: '9px', lineHeight: '14px' }}>4</span>
              <strong style={{ color: '#c0392b' }}>Fort :</strong> Nombreux déclenchements spontanés d'avalanches.
            </div>
          </div>
        </div>
      </div>

      {/* Direct links for security tracking */}
      <div className="bera-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <a 
          href="https://meteofrance.com/meteo-montagne/mont-blanc/bulletin-avalanches" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-bera-link"
          style={{
            display: 'block',
            textAlign: 'center',
            background: 'var(--slate-rock)',
            color: 'var(--paper-cream)',
            padding: '10px 14px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: 'background 0.2s',
            border: '1px solid transparent'
          }}
        >
          ❄️ Bulletin Avalanche Météo-France
        </a>
        <a 
          href="https://www.chamoniarde.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-bera-link"
          style={{
            display: 'block',
            textAlign: 'center',
            background: 'transparent',
            color: 'var(--slate-rock)',
            padding: '10px 14px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 'bold',
            textDecoration: 'none',
            border: '1px solid var(--slate-rock)',
            transition: 'all 0.2s'
          }}
        >
          🏔️ La Chamoniarde (Conditions en Direct)
        </a>
      </div>
    </div>
  );
};
