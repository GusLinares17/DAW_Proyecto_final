
export const EquipoPage = () => {
    return (
        <div className="generic-page" style={{ backgroundColor: '#FDFBF7', minHeight: '100vh', paddingBottom: '60px' }}>
            <div className="generic-header" style={{ textAlign: 'center', paddingTop: '60px', marginBottom: '40px' }}>
                <h1 style={{ fontFamily: 'Times New Roman, serif', color: '#8B3A3A', fontSize: '3rem' }}>Nuestro Equipo</h1>
                <p style={{ color: '#555' }}>La maestría culinaria detrás de cada plato.</p>
            </div>

            <div className="team-grid" style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap', padding: '0 20px' }}>
                <div className="team-member" style={{ textAlign: 'center' }}>
                    <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop" alt="Chef Ejecutivo" style={{ borderRadius: '50%', width: '220px', height: '220px', objectFit: 'cover', border: '4px solid #EAEAEA' }} />
                    <h3 style={{ marginTop: '20px', color: '#8B3A3A', fontFamily: 'serif', fontSize: '1.5rem' }}>Gustavo Linares Aquino</h3>
                    <p style={{ color: '#555', fontStyle: 'italic', letterSpacing: '1px' }}>Chef Ejecutivo</p>
                </div>

                <div className="team-member" style={{ textAlign: 'center' }}>
                    <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=400&h=400&fit=crop" alt="Jefe de Cocina" style={{ borderRadius: '50%', width: '220px', height: '220px', objectFit: 'cover', border: '4px solid #EAEAEA' }} />
                    <h3 style={{ marginTop: '20px', color: '#8B3A3A', fontFamily: 'serif', fontSize: '1.5rem' }}>Geisel Reymar Pacheco Medina</h3>
                    <p style={{ color: '#555', fontStyle: 'italic', letterSpacing: '1px' }}>Jefe de Cocina</p>
                </div>

                <div className="team-member" style={{ textAlign: 'center' }}>
                    <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop" alt="Maestro Picantero" style={{ borderRadius: '50%', width: '220px', height: '220px', objectFit: 'cover', border: '4px solid #EAEAEA' }} />
                    <h3 style={{ marginTop: '20px', color: '#8B3A3A', fontFamily: 'serif', fontSize: '1.5rem' }}>Jesús Francisco Silva Pino</h3>
                    <p style={{ color: '#555', fontStyle: 'italic', letterSpacing: '1px' }}>Maestro Picantero</p>
                </div>
            </div>
        </div>
    );
};