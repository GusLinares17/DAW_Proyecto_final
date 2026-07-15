
export const EventosPage = () => {
    return (
        <div style={{ padding: '80px 20px', backgroundColor: '#FDFBF7', minHeight: '80vh', textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'Times New Roman, serif', color: '#8B3A3A', fontSize: '3rem', marginBottom: '20px' }}>Eventos y Celebraciones</h1>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: '#555', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '40px' }}>
                Haz que tus momentos especiales tengan el inconfundible Sabor Peruano. Disponemos de espacios diseñados para crear recuerdos inolvidables con la mejor atención y calidez.
            </p>

            <div style={{ backgroundColor: '#fff', border: '1px solid #EAEAEA', maxWidth: '800px', margin: '0 auto', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <h2 style={{ color: '#333', fontFamily: 'serif', borderBottom: '2px solid #8B3A3A', paddingBottom: '10px', display: 'inline-block' }}>Próximos Encuentros</h2>

                <div style={{ textAlign: 'left', marginTop: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                    <h3 style={{ color: '#8B3A3A', margin: '0 0 5px 0' }}>Tardes de Jarana y Cajón</h3>
                    <p style={{ color: '#777', margin: '0 0 10px 0', fontSize: '0.9rem' }}>Todos los Sábados - 2:00 PM</p>
                    <p style={{ color: '#444' }}>Acompaña tu almuerzo con música criolla en vivo. Un ambiente lleno de ritmo, tradición y alegría garantizada para toda la familia.</p>
                </div>

                <div style={{ textAlign: 'left', marginTop: '20px' }}>
                    <h3 style={{ color: '#8B3A3A', margin: '0 0 5px 0' }}>Reservas Corporativas y Privadas</h3>
                    <p style={{ color: '#444', marginTop: '10px' }}>Ofrecemos menús degustación exclusivos para grupos. Escríbenos para planificar tu evento empresarial o celebración familiar privada con nosotros.</p>
                    <button style={{ marginTop: '15px', backgroundColor: '#8B3A3A', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontFamily: 'monospace', textTransform: 'uppercase' }}>Solicitar Información</button>
                </div>
            </div>
        </div>
    );
};