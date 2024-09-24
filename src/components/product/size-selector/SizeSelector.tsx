import type { Size } from "@/interfaces";
import styles from "./SizeSelector.module.css";

interface Props {
  selectedSize: Size;
  availableSizes: Size[];
  onSelectedSizeChange: (size: Size) => void; // Nueva función para manejar el cambio de talla
}

export const SizeSelector = ({ selectedSize, availableSizes, onSelectedSizeChange }: Props) => {
  return (
    <div className={styles.sizeContainer}>
      <h3>Tallas disponibles</h3>
      <div>
        {availableSizes.map(size => (
          <button
            key={size}
            className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ''}`} // Clase para talla seleccionada
            onClick={() => onSelectedSizeChange(size)} // Cambiar talla cuando se haga clic
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
