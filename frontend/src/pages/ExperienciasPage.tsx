
export const ExperienciasPage = () => {
    return (
        <div style={{ padding: '80px 20px', backgroundColor: '#FDFBF7', minHeight: '80vh', textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'Times New Roman, serif', color: '#8B3A3A', fontSize: '3rem', marginBottom: '20px' }}>Experiencias Sabor Peruano</h1>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: '#555', lineHeight: '1.8', fontSize: '1.1rem' }}>
                Más que una comida, ofrecemos un viaje sensorial. Inspirados en el calor y la tradición de las picanterías del sur, revivimos la magia de los fogones a leña. En nuestra mesa, la majestuosidad de Arequipa se siente en cada detalle, desde el aroma del rocoto recién molido en batán hasta el frescor de los insumos que llegan a nuestra cocina.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '50px', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '300px', textAlign: 'left' }}>
                    <img src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&fit=crop" alt="Cocina a la leña" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
                    <h3 style={{ color: '#8B3A3A', marginTop: '15px', fontFamily: 'serif' }}>El Batán Tradicional</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Descubre el secreto de nuestras salsas, molidas a mano sobre piedra volcánica para mantener el sabor puro de nuestros ajíes.</p>
                </div>
                <div style={{ maxWidth: '300px', textAlign: 'left' }}>
                    <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&fit=crop" alt="Maridaje" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
                    <h3 style={{ color: '#8B3A3A', marginTop: '15px', fontFamily: 'serif' }}>Maridaje Local</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Acompaña tu plato con una refrescante chicha de jora o cervezas artesanales seleccionadas de la región.</p>
                </div>
            </div>
        </div>
    );
};