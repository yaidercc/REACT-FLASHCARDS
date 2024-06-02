
import PropTypes from 'prop-types';
import iconos from './icons';
import "./icons.scss";

const Icono = ({ name, size }) => {
  const svg = iconos[name]; // Obtener el SVG del objeto de iconos

  const estilos = {
    width: size || '24px', // Tamaño predeterminado (24px si no se especifica)
    height: 'auto',
    display: 'block',
    background: "transparent"
  };

  return (
    <div className="icono" style={estilos}>
      <span dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
};

Icono.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string, // Tamaño opcional del icono
};

export default Icono;
