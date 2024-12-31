import type { Size } from "@/interfaces";
import styles from "./SizeSelector.module.css";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];
  onSelectedSizeChange: (size: Size) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, onSelectedSizeChange }: Props) => {
  return (
    <div className={styles.sizeContainer}>
      <h3>Tallas disponibles</h3>
      <div>
        {availableSizes.map(size => (
          <button
            key={size}
            className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ''}`} // style class for size selected
            onClick={() => onSelectedSizeChange(size)} // Change the size
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
