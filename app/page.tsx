import { useState } from 'react';

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [calendarEmail, setCalendarEmail] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Pega a URL do seu webhook local ou ngrok
  const getUserDataUrl = 'http://localhost:3000/api/getUserData';  // ou a URL do ngrok
  const getCalendarEventsUrl = 'http://localhost:3000/api/getCalendarEvents';

  const handleGetUserData = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(`${getUserDataUrl}?phoneNumber=${encodeURIComponent(phoneNumber)}`);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse('Erro ao buscar dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetCalendar = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(`${getCalendarEventsUrl}?userEmail=${encodeURIComponent(calendarEmail)}`);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse('Erro ao buscar calendário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Teste Webhooks Moveo</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <h2>Dados do usuário</h2>
        <input
          type="text"
          placeholder="Número de telefone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={handleGetUserData} disabled={loading || !phoneNumber}>
          {loading ? 'Carregando...' : 'Buscar Dados'}
        </button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h2>Eventos do calendário</h2>
        <input
          type="email"
          placeholder="E-mail do usuário"
          value={calendarEmail}
          onChange={(e) => setCalendarEmail(e.target.value)}
        />
        <button onClick={handleGetCalendar} disabled={loading || !calendarEmail}>
          {loading ? 'Carregando...' : 'Buscar Calendário'}
        </button>
      </div>

      {response && (
        <div>
          <h3>Resposta:</h3>
          <pre style={{ background: '#f0f0f0', padding: '1rem' }}>{response}</pre>
        </div>
      )}
    </div>
  );
}