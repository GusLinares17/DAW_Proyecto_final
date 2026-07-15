
export const CocinaPage = () => {
  return (
    <div className="generic-page" style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#FDFBF7' }}>
      <h1 style={{ fontFamily: 'Times New Roman, serif', color: '#8B3A3A', fontSize: '2.5rem' }}>Nuestra Cocina</h1>
      <p style={{ maxWidth: '600px', margin: '20px auto', lineHeight: '1.8', color: '#444' }}>
        Inspirados en las tradicionales picanterías de Arequipa, llevamos a tu mesa el auténtico sabor de nuestra tierra. Respetamos las recetas ancestrales, seleccionando meticulosamente rocotos frescos, camarones de río y los mejores ingredientes locales para ofrecerte una experiencia inolvidable.
      </p>
      <img 
        src="https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=800&q=80" 
        alt="Plato tradicional" 
        style={{ width: '100%', maxWidth: '800px', borderRadius: '8px', marginTop: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
      />
    </div>
  );
};