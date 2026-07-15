import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <section style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: 'calc(100vh - 80px)', /* Modificado para ocupar el resto de la pantalla exacta */
      width: '100vw', /* Ocupa todo el ancho */
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      margin: 0,
      padding: 0
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        color: '#FDFBF7',
        padding: '0 20px',
        maxWidth: '800px'
      }}>
        <p style={{
          textTransform: 'uppercase',
          letterSpacing: '4px',
          fontSize: '0.9rem',
          marginBottom: '20px',
          color: '#EAEAEA'
        }}>
          Experiencia Culinaria
        </p>

        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 5.5rem)',
          fontFamily: 'Times New Roman, serif',
          margin: '0 0 20px 0',
          textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
          color: '#FFFFFF'
        }}>
          Sabor Peruano
        </h1>

        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: '300',
          marginBottom: '40px',
          fontStyle: 'italic',
          lineHeight: '1.6',
          color: '#DEDEDE'
        }}>
          Descubre la auténtica gastronomía de nuestra tierra, respetando las recetas ancestrales en cada plato.
        </h2>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link to="/menu" style={{
            backgroundColor: '#8B3A3A',
            color: '#fff',
            padding: '14px 32px',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontSize: '0.9rem',
            border: '1px solid #8B3A3A',
            transition: 'background-color 0.3s'
          }}>Ver la Carta</Link>

          <Link to="/reservations/new" style={{
            backgroundColor: 'transparent',
            color: '#fff',
            padding: '14px 32px',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontSize: '0.9rem',
            border: '1px solid #fff',
            transition: 'background-color 0.3s'
          }}>Reservar Mesa</Link>
        </div>
      </div>
    </section>
  );
}