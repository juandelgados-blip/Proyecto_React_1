import React, { useState } from 'react';

const CATALOG = [
  { id: 1, name: 'Teclado Mecánico', price: 50, stock: 6 },
  { id: 2, name: 'Mouse Inalámbrico', price: 25, stock: 4 },
  { id: 3, name: 'Monitor 24"', price: 150, stock: 7 },
];

export const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCatalog = CATALOG.filter((prod) =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        if (existing.quantity >= product.stock) return prevCart;

        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === productId);

      if (existing.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div
      style={{
        border: '1px solid #0070f3',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '15px',
      }}
    >
      <h2>Carrito de Compras</h2>

      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <h4>Catálogo de Productos</h4>
      {filteredCatalog.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        filteredCatalog.map((prod) => {
          const itemInCart = cart.find((item) => item.id === prod.id);
          const cantidadEnCarrito = itemInCart ? itemInCart.quantity : 0;
          const unidadesDisponibles = prod.stock - cantidadEnCarrito;
          const sinStock = unidadesDisponibles === 0;

          return (
            <div
              key={prod.id}
              style={{
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>
                {prod.name} - ${prod.price} |
                <strong
                  style={{
                    color: sinStock ? 'red' : 'green',
                    marginLeft: '5px',
                  }}
                >
                  {sinStock ? 'Agotado' : `Quedan ${unidadesDisponibles}`}
                </strong>
              </span>

              <button
                onClick={() => addToCart(prod)}
                disabled={sinStock}
                style={{ cursor: sinStock ? 'not-allowed' : 'pointer' }}
              >
                {sinStock ? 'Sin Stock' : 'Agregar al Carrito'}
              </button>
            </div>
          );
        })
      )}

      <hr />

      <h4>Tu Carrito</h4>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cart.map((item) => {
            const catalogoItem = CATALOG.find((prod) => prod.id === item.id);
            const alcanzoLimite = item.quantity >= catalogoItem.stock;

            return (
              <li key={item.id} style={{ marginBottom: '8px' }}>
                <span>
                  {item.name} x {item.quantity} = ${item.price * item.quantity}{' '}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ marginLeft: '8px', marginRight: '4px' }}
                >
                  -
                </button>
                <button
                  onClick={() => addToCart(catalogoItem)}
                  disabled={alcanzoLimite}
                >
                  +
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <p>
        <strong>Total acumulado: ${total}</strong>
      </p>
    </div>
  );
};
