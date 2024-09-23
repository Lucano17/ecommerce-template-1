
import type { Size } from '@/interfaces';
import styles from "./SizeSelector.module.css"

interface Props {
    selectedSize: Size;
    availableSizes: Size[];
}


export const SizeSelector = ({selectedSize, availableSizes}:Props) => {

  return (
    <div>
        <h3>Tallas disponibles</h3>
        <div>
            {
            availableSizes.map(size =>(
                // Agregar clase para que selectedSize se vea remarcado
                <button key={size}>
                    
                    {size}
                </button>
            ))
            }
        </div>
    </div>
  )
}
