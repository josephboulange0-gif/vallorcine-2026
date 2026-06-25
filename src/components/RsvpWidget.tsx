import React, { useState, useEffect } from 'react';

// =========================================================================
// SYNCHRONISATION GOOGLE SHEETS (FACULTATIF)
// =========================================================================
// Pour connecter vos sondages à une feuille Google Sheet dans votre Google Drive,
// collez l'URL de votre script déployé Google Apps Script ci-dessous :
// Exemple : 'https://script.google.com/macros/s/AKfycb.../exec'
const GOOGLE_SCRIPT_URL = '';

interface Vote {
  name: string;
  status: 'coming' | 'hesitating' | 'alternative';
  timestamp: string;
}

interface RsvpWidgetProps {
  courseId: string; // e.g., 'tour', 'miage'
  courseTitle: string;
}

export const RsvpWidget: React.FC<RsvpWidgetProps> = ({ courseId, courseTitle }) => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [name, setName] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'coming' | 'hesitating' | 'alternative'>('coming');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Charger les votes
  const loadVotes = () => {
    if (GOOGLE_SCRIPT_URL) {
      setIsLoading(true);
      setErrorMsg(null);
      fetch(GOOGLE_SCRIPT_URL)
        .then(res => {
          if (!res.ok) throw new Error('Erreur de chargement');
          return res.json();
        })
        .then(data => {
          if (Array.isArray(data)) {
            // Filtrer les votes pour cette course spécifique
            const filtered = data
              .filter((v: any) => v.courseId === courseId)
              .map((v: any) => ({
                name: v.name,
                status: v.status as any,
                timestamp: v.timestamp
              }));
            setVotes(filtered);
            // Sauvegarder en cache local au passage
            localStorage.setItem(`rsvp_votes_${courseId}`, JSON.stringify(filtered));
          }
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Erreur Google Sheets, repli sur localStorage', err);
          setErrorMsg('Connexion Google Sheet indisponible. Données locales chargées.');
          loadLocalVotes();
          setIsLoading(false);
        });
    } else {
      loadLocalVotes();
    }
  };

  const loadLocalVotes = () => {
    const savedVotes = localStorage.getItem(`rsvp_votes_${courseId}`);
    if (savedVotes) {
      try {
        setVotes(JSON.parse(savedVotes));
      } catch (e) {
        console.error('Error parsing votes from localStorage', e);
      }
    }
  };

  useEffect(() => {
    loadVotes();
  }, [courseId]);

  const saveVotes = (updatedVotes: Vote[]) => {
    setVotes(updatedVotes);
    localStorage.setItem(`rsvp_votes_${courseId}`, JSON.stringify(updatedVotes));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const cleanName = name.trim();
    const existingIndex = votes.findIndex(v => v.name.toLowerCase() === cleanName.toLowerCase());
    const timestamp = new Date().toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const updatedVotes = [...votes];
    const newVote: Vote = {
      name: cleanName,
      status: selectedStatus,
      timestamp: timestamp
    };

    if (existingIndex > -1) {
      updatedVotes[existingIndex] = newVote;
    } else {
      updatedVotes.push(newVote);
    }

    // Mise à jour locale instantanée pour réactivité de l'UI
    saveVotes(updatedVotes);
    setName('');

    // Envoi synchrone vers Google Sheets si URL configurée
    if (GOOGLE_SCRIPT_URL) {
      setIsLoading(true);
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Évite les blocages CORS preflight simples
          headers: {
            'Content-Type': 'text/plain'
          },
          body: JSON.stringify({
            courseId,
            name: cleanName,
            status: selectedStatus
          })
        });
        
        // Rafraîchir les données globales après 1 seconde pour intégrer les modifs
        setTimeout(() => loadVotes(), 1000);
      } catch (err) {
        console.error('Erreur lors de la synchronisation vers Google Sheets', err);
        setErrorMsg('Échec de synchro vers Google Sheet. Sauvegardé en local.');
        setIsLoading(false);
      }
    }
  };

  const handleRemove = async (nameToRemove: string) => {
    const updatedVotes = votes.filter(v => v.name !== nameToRemove);
    saveVotes(updatedVotes);

    if (GOOGLE_SCRIPT_URL) {
      setIsLoading(true);
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain'
          },
          body: JSON.stringify({
            courseId,
            name: nameToRemove,
            status: 'delete'
          })
        });
        
        setTimeout(() => loadVotes(), 1000);
      } catch (err) {
        console.error('Erreur lors de la suppression sur Google Sheets', err);
        setErrorMsg('Échec de suppression Google Sheet. Retiré localement.');
        setIsLoading(false);
      }
    }
  };

  const handleCopyList = () => {
    const statusMap = {
      coming: '🟢 Vient',
      hesitating: '🟡 Hésite',
      alternative: '🔵 Option alternative'
    };
    const text = votes.map(v => `- ${v.name} : ${statusMap[v.status] || v.status}`).join('\n');
    const summary = `Sondage de présence pour ${courseTitle} :\n${text}`;
    navigator.clipboard.writeText(summary);
    alert('Liste copiée dans le presse-papiers ! Vous pouvez maintenant la coller sur WhatsApp ou par e-mail.');
  };

  // Group counts
  const comingCount = votes.filter(v => v.status === 'coming').length;
  const hesitatingCount = votes.filter(v => v.status === 'hesitating').length;
  const alternativeCount = votes.filter(v => v.status === 'alternative').length;
  const totalVotes = votes.length;

  const getPercentage = (count: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((count / totalVotes) * 100);
  };

  return (
    <div className="rsvp-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h5 className="rsvp-card-title" style={{ margin: 0, borderBottom: 'none', paddingBottom: 0 }}>
          Sondage de Présence — {courseTitle}
        </h5>
        {GOOGLE_SCRIPT_URL && (
          <button 
            onClick={loadVotes} 
            className="btn-refresh" 
            disabled={isLoading}
            style={{ fontSize: '11px', padding: '3px 8px' }}
          >
            {isLoading ? 'Synchro...' : '🔄 Synchro'}
          </button>
        )}
      </div>

      {errorMsg && (
        <div style={{ fontSize: '11px', color: '#d4622a', margin: '-10px 0 10px 0', fontStyle: 'italic' }}>
          ⚠️ {errorMsg}
        </div>
      )}
      
      {/* RSVP Stats Chart */}
      <div className="rsvp-stats-container">
        <div className="rsvp-stat-row">
          <div className="rsvp-stat-label">🟢 Je viens ! ({comingCount})</div>
          <div className="rsvp-stat-bar-outer">
            <div 
              className="rsvp-stat-bar-inner coming" 
              style={{ width: `${getPercentage(comingCount)}%` }}
            ></div>
          </div>
          <div className="rsvp-stat-percent">{getPercentage(comingCount)}%</div>
        </div>

        <div className="rsvp-stat-row">
          <div className="rsvp-stat-label">🟡 J'hésite ({hesitatingCount})</div>
          <div className="rsvp-stat-bar-outer">
            <div 
              className="rsvp-stat-bar-inner hesitating" 
              style={{ width: `${getPercentage(hesitatingCount)}%` }}
            ></div>
          </div>
          <div className="rsvp-stat-percent">{getPercentage(hesitatingCount)}%</div>
        </div>

        <div className="rsvp-stat-row">
          <div className="rsvp-stat-label">🔵 Plan alternatif ({alternativeCount})</div>
          <div className="rsvp-stat-bar-outer">
            <div 
              className="rsvp-stat-bar-inner alternative" 
              style={{ width: `${getPercentage(alternativeCount)}%` }}
            ></div>
          </div>
          <div className="rsvp-stat-percent">{getPercentage(alternativeCount)}%</div>
        </div>
      </div>

      {/* RSVP Voting Form */}
      <form onSubmit={handleSubmit} className="rsvp-form">
        <div className="form-group-row">
          <input
            type="text"
            placeholder="Votre prénom / nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rsvp-input-name"
            maxLength={30}
            required
            disabled={isLoading}
          />
          
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className={`rsvp-select-status ${selectedStatus}`}
            disabled={isLoading}
          >
            <option value="coming">🟢 Je viens !</option>
            <option value="hesitating">🟡 J'hésite...</option>
            <option value="alternative">🔵 Option alternative</option>
          </select>
          
          <button type="submit" className="rsvp-btn-submit" disabled={isLoading}>
            Valider
          </button>
        </div>
      </form>

      {/* RSVP List of Participants */}
      {votes.length > 0 && (
        <div className="rsvp-participants-list">
          <div className="rsvp-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h6 style={{ margin: 0 }}>Participants ({totalVotes}) :</h6>
            <button 
              type="button" 
              onClick={handleCopyList} 
              className="btn-copy-rsvp"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--glacier-dark)',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 6px',
                borderRadius: '4px'
              }}
            >
              📋 Copier la liste
            </button>
          </div>
          <div className="rsvp-pills-container">
            {votes.map((v, idx) => (
              <span key={idx} className={`rsvp-participant-pill ${v.status}`}>
                <span className="rsvp-status-dot"></span>
                <strong className="participant-name">{v.name}</strong>
                <span className="rsvp-time">{v.timestamp}</span>
                <button 
                  type="button" 
                  onClick={() => handleRemove(v.name)} 
                  className="rsvp-remove-btn"
                  title="Supprimer la participation"
                  disabled={isLoading}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
