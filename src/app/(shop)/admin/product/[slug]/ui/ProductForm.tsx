"use client";

import { Product } from "@/interfaces";

interface Props {
  product: Product;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product }: Props) => {
  return (
    <form>
      {/* Textos */}
      <div>
        <div>
          <span>Título</span>
          <input type="text"/>
        </div>

        <div>
          <span>Slug</span>
          <input type="text"/>
        </div>

        <div>
          <span>Descripción</span>
          <textarea
            rows={5}
          ></textarea>
        </div>

        <div>
          <span>Price</span>
          <input type="number"/>
        </div>

        <div>
          <span>Tags</span>
          <input type="text"/>
        </div>

        <div>
          <span>Gender</span>
          <select>
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div>
          <span>Categoria</span>
          <select>
            <option value="">[Seleccione]</option>
          </select>
        </div>

        <button>
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div>
        {/* As checkboxes */}
        <div>

          <span>Tallas</span>
          <div>
            
            {
              sizes.map( size => (
                // bg-blue-500 text-white <--- si está seleccionado
                <div key={ size }>
                  <span>{ size }</span>
                </div>
              ))
            }

          </div>


          <div>

            <span>Fotos</span>
            <input 
              type="file"
              multiple 
              accept="image/png, image/jpeg"
            />

          </div>

        </div>
      </div>
    </form>
  );
};
