import { Link } from "react-router-dom";
import { fotoCapa } from "../../utils/fotos";

function Card({ id, fotos, artista, tecnica, ano }) {
  return (
    <Link to={`/obra/${id}`} className="flex flex-col">
      <div className="overflow-hidden">
        <img
          src={fotoCapa(fotos)}
          alt={`${artista}, ${tecnica}, ${ano}`}
          loading="lazy"
          className="aspect-4/5 w-full object-cover transition-transform duration-600 hover:scale-110"
        />
      </div>
      <div className="pt-2 flex flex-col gap-0.5">
        <h3 className="text-sm font-sans font-medium text-lm-charcoal">{artista}</h3>
        <p className="text-xs font-normal text-lm-warm-gray">{tecnica}</p>
        <p className="text-xs font-normal text-lm-muted">{ano}</p>
      </div>
    </Link>
  );
}

export default Card;
