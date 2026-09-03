import { useState, useEffect } from 'react';
import './App.css';

// ==========================================
// 1. COMPONENTES SECUNDARIOS (COMPOSICIÓN)
// ==========================================

// Encabezado con estado de conexión y contador de carrito
const Header = ({ usuario, estaConectado, cantidadCarrito }) => {
  return (
    <header
      style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        background: '#1E293B',
        color: '#FFF',
        borderRadius: '8px',
        marginBottom: '20px',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '1.4rem' }}>
        Dashboard de Seguridad & Tienda
      </h1>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <span>
          Usuario: <strong>{usuario}</strong>
        </span>
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            background: estaConectado ? '#22C55E' : '#EF4444',
            fontSize: '0.85rem',
          }}
        >
          {estaConectado ? 'Conectado' : 'Desconectado'}
        </span>
        <div
          style={{
            background: '#3B82F6',
            padding: '6px 12px',
            borderRadius: '20px',
            fontWeight: 'bold',
          }}
        >
          Carrito: {cantidadCarrito}
        </div>
      </div>
    </header>
  );
};

// Tarjeta de Usuario con opción de revocación
const UserCard = ({ name, role, onRemove }) => {
  return (
    <div
      style={{
        padding: '12px 16px',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        background: '#F8FAFC',
        minWidth: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '8px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 4px 0', color: '#0F172A' }}>{name}</h4>
        <p style={{ margin: 0, color: '#64748B', fontSize: '0.85rem' }}>
          {role}
        </p>
      </div>
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            background: '#EF4444',
            color: 'white',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.75rem',
            alignSelf: 'flex-start',
          }}
        >
          Revocar Acceso
        </button>
      )}
    </div>
  );
};

// Tarjeta de Producto para el Catálogo
const Producto = ({ nombre, precio, disponible, onAgregar, onQuitar }) => {
  return (
    <div
      style={{
        border: '1px solid #CBD5E1',
        borderRadius: '8px',
        padding: '15px',
        width: '180px',
        background: disponible ? '#FFF' : '#F1F5F9',
        opacity: disponible ? 1 : 0.6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>{nombre}</h4>
        <p
          style={{ fontWeight: 'bold', color: '#0D9488', margin: '0 0 8px 0' }}
        >
          ${precio}
        </p>
        <span
          style={{
            fontSize: '0.8rem',
            color: disponible ? '#16A34A' : '#DC2626',
          }}
        >
          {disponible ? 'Disponible' : 'Agotado'}
        </span>
      </div>
      {disponible && (
        <div style={{ display: 'flex', gap: '5px', marginTop: '12px' }}>
          <button
            onClick={onAgregar}
            style={{
              flex: 1,
              padding: '6px',
              background: '#2563EB',
              color: '#FFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            +
          </button>
          <button
            onClick={onQuitar}
            style={{
              flex: 1,
              padding: '6px',
              background: '#64748B',
              color: '#FFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            -
          </button>
        </div>
      )}
    </div>
  );
};

// Componente interactivo de resumen de Carrito
const ShoppingCart = ({ itemsCount }) => {
  return (
    <div
      style={{
        background: '#F0FDF4',
        border: '1px solid #BBF7D0',
        padding: '15px',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', color: '#166534' }}>
        Resumen de Compra
      </h3>
      <p style={{ margin: 0, color: '#15803D' }}>
        {itemsCount > 0
          ? `Tienes ${itemsCount} producto(s) listo(s) para procesar.`
          : 'El carrito está actualmente vacío.'}
      </p>
    </div>
  );
};

// ==========================================
// 2. COMPONENTE PRINCIPAL (DASHBOARD COMPLETO)
// ==========================================

export default function App() {
  // --- ESTADOS DE LA APLICACIÓN ---
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [count, setCount] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  // Lista dinámica de usuarios iniciales usando UUIDs
  const [users, setUsers] = useState([
    {
      id: crypto.randomUUID(),
      name: 'Juan Delgado',
      role: 'Frontend Developer',
    },
    { id: crypto.randomUUID(), name: 'Diomedes', role: 'UI/UX Designer' },
  ]);

  // Catálogo de productos con UUIDs
  const [productosData] = useState([
    {
      id: crypto.randomUUID(),
      nombre: 'Laptop Deluxe',
      precio: 1200,
      disponible: true,
    },
    {
      id: crypto.randomUUID(),
      nombre: 'Mouse Inalámbrico',
      precio: 25,
      disponible: true,
    },
    {
      id: crypto.randomUUID(),
      nombre: 'Teclado Inalambrico',
      precio: 80,
      disponible: false,
    },
    {
      id: crypto.randomUUID(),
      nombre: 'Monitor 4K',
      precio: 350,
      disponible: true,
    },
    {
      id: crypto.randomUUID(),
      nombre: 'Speaker Bluetooth',
      precio: 45,
      disponible: true,
    },
    {
      id: crypto.randomUUID(),
      nombre: 'Mouse Ryzen',
      precio: 15,
      disponible: false,
    },
  ]);

  // --- MANEJADORES DEL CARRITO ---
  const agregarAlCarrito = (incremento) => {
    setCantidadCarrito((prev) => Math.max(0, prev + incremento));
  };

  // --- VALIDACIÓN EN TIEMPO REAL (FORMULARIO CONTROLADO) ---
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!val) {
      setErrors((prev) => ({ ...prev, email: 'El correo es obligatorio.' }));
    } else if (!emailRegex.test(val)) {
      setErrors((prev) => ({
        ...prev,
        email: 'El formato del correo es inválido.',
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);

    if (!val) {
      setErrors((prev) => ({
        ...prev,
        password: 'La contraseña es obligatoria.',
      }));
    } else if (val.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: 'Debe contener al menos 8 caracteres.',
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!errors.email && !errors.password && email && password) {
      // Agregar usuario registrado a la lista activa
      const newUser = {
        id: crypto.randomUUID(),
        name: email.split('@')[0],
        role: 'Operador del Sistema',
      };
      setUsers((prev) => [...prev, newUser]);

      setIsLoggedIn(true);
      setTimeLeft(60);
    }
  };

  const handleRemoveUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  // --- CICLO DE VIDA Y CLEANUP CON useEffect ---
  useEffect(() => {
    if (!isLoggedIn) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsLoggedIn(false);
          alert('Tu sesión de seguridad ha expirado por inactividad.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // FUNCIÓN DE LIMPIEZA OBLIGATORIA (Evita fugas de memoria)
    return () => clearInterval(intervalId);
  }, [isLoggedIn]);

  const isFormInvalid =
    !!errors.email || !!errors.password || !email || !password;

  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        padding: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        color: '#334155',
      }}
    >
      {/* Encabezado */}
      <Header
        usuario="Estudiante"
        estaConectado={isLoggedIn}
        cantidadCarrito={cantidadCarrito}
      />

      {/* 1. Módulo de Autenticación y Temporizador de Sesión */}
      <section
        style={{
          margin: '20px 0',
          padding: '20px',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          background: '#FFF',
        }}
      >
        {!isLoggedIn ? (
          <div>
            <h2 style={{ marginTop: 0, color: '#1E293B' }}>
              Control de Accesos Seguros
            </h2>
            <form
              onSubmit={handleLogin}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                maxWidth: '400px',
              }}
            >
              <div>
                <label
                  style={{
                    fontWeight: '600',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="ejemplo@dominio.com"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    boxSizing: 'border-box',
                  }}
                />
                {errors.email && (
                  <small
                    style={{
                      color: '#EF4444',
                      display: 'block',
                      marginTop: '4px',
                    }}
                  >
                    {errors.email}
                  </small>
                )}
              </div>

              <div>
                <label
                  style={{
                    fontWeight: '600',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Contraseña:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Mínimo 8 caracteres"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    boxSizing: 'border-box',
                  }}
                />
                {errors.password && (
                  <small
                    style={{
                      color: '#EF4444',
                      display: 'block',
                      marginTop: '4px',
                    }}
                  >
                    {errors.password}
                  </small>
                )}
              </div>

              <button
                type="submit"
                disabled={isFormInvalid}
                style={{
                  padding: '10px 16px',
                  background: isFormInvalid ? '#94A3B8' : '#2563EB',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: isFormInvalid ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  transition: 'background 0.2s',
                }}
              >
                Ingresar al Sistema
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <h2 style={{ color: '#16A34A', margin: '0 0 10px 0' }}>
              ✓ Sesión Autorizada
            </h2>
            <p style={{ fontSize: '1.1rem' }}>
              Tiempo restante de sesión:{' '}
              <strong
                style={{
                  color: timeLeft < 15 ? '#DC2626' : '#0F172A',
                  fontSize: '1.2rem',
                }}
              >
                {timeLeft}s
              </strong>
            </p>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setEmail('');
                setPassword('');
              }}
              style={{
                padding: '8px 16px',
                background: '#64748B',
                color: '#FFF',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </section>

      {/* 2. Módulo de Estado, Contador y Gestión de Usuarios */}
      <section
        style={{
          margin: '20px 0',
          padding: '20px',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          background: '#FFF',
        }}
      >
        <h2 style={{ marginTop: 0, color: '#1E293B' }}>
          Unidad 1: Estado y Props
        </h2>

        {/* Contador */}
        <div
          style={{
            marginBottom: '24px',
            background: '#F8FAFC',
            padding: '15px',
            borderRadius: '6px',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0' }}>Contador Dinámico: {count}</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setCount(count + 1)}
              style={{ padding: '8px 12px', cursor: 'pointer' }}
            >
              Incrementar
            </button>
            <button
              onClick={() => setCount(count - 1)}
              style={{ padding: '8px 12px', cursor: 'pointer' }}
            >
              Decrementar
            </button>
            <button
              onClick={() => setCount(0)}
              style={{ padding: '8px 12px', cursor: 'pointer' }}
            >
              Reiniciar
            </button>
          </div>
        </div>

        {/* Lista de Usuarios con .map() y keys UUID */}
        <h3>Usuarios Activos en el Sistema</h3>
        {users.length === 0 ? (
          <p style={{ color: '#94A3B8' }}>No hay usuarios con acceso activo.</p>
        ) : (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {users.map((user) => (
              <UserCard
                key={user.id}
                name={user.name}
                role={user.role}
                onRemove={() => handleRemoveUser(user.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 3. Módulo del Catálogo de Productos */}
      <section
        style={{
          margin: '20px 0',
          padding: '20px',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          background: '#FFF',
        }}
      >
        <h2 style={{ marginTop: 0, color: '#1E293B' }}>
          Catálogo de Productos
        </h2>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {productosData.map((producto) => (
            <Producto
              key={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              disponible={producto.disponible}
              onAgregar={() => agregarAlCarrito(1)}
              onQuitar={() => agregarAlCarrito(-1)}
            />
          ))}
        </div>
      </section>

      {/* 4. Carrito Interactivo */}
      <section
        style={{
          margin: '20px 0',
          padding: '20px',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          background: '#FFF',
        }}
      >
        <h2 style={{ marginTop: 0, color: '#1E293B' }}>Carrito Interactivo</h2>
        <ShoppingCart itemsCount={cantidadCarrito} />
      </section>
    </div>
  );
}
