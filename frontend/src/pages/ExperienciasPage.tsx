import styles from './ExperienciasPage.module.css';

export const ExperienciasPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Experiencias Sabor Peruano</h1>
            <p className={styles.description}>
                Más que una comida, ofrecemos un viaje sensorial. Inspirados en el calor y la tradición de las picanterías del sur, revivimos la magia de los fogones a leña. En nuestra mesa, la majestuosidad de Arequipa se siente en cada detalle, desde el aroma del rocoto recién molido en batán hasta el frescor de los insumos que llegan a nuestra cocina.
            </p>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <img src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&fit=crop" alt="Cocina a la leña" className={styles.image} />
                    <h3 className={styles.cardTitle}>El Batán Tradicional</h3>
                    <p className={styles.cardText}>Descubre el secreto de nuestras salsas, molidas a mano sobre piedra volcánica para mantener el sabor puro de nuestros ajíes.</p>
                </div>
                <div className={styles.card}>
                    <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&fit=crop" alt="Maridaje" className={styles.image} />
                    <h3 className={styles.cardTitle}>Maridaje Local</h3>
                    <p className={styles.cardText}>Acompaña tu plato con una refrescante chicha de jora o cervezas artesanales seleccionadas de la región.</p>
                </div>
            </div>
        </div>
    );
};