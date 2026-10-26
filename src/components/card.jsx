import { Link } from "react-router-dom"

function Card({ id, img, artista, tecnica, ano }) {
  return (
    <Link to={`/obra/${id}`} className="flex flex-col">
      <div className="overflow-hidden">
        <img
          src={img}
          alt={`${artista}, ${tecnica}, ${ano}`}
          loading="lazy"
          className="aspect-4/5 w-full object-cover transition-transform duration-600 hover:scale-110"
        />
      </div>
      <div className="pt-2 flex flex-col gap-0.5">
        <h3 className="text-sm font-sans font-medium text-[#1C1B18]">{artista}</h3>
        <p className="text-xs font-normal text-[#6B6460]">{tecnica}</p>
        <p className="text-xs font-normal text-[#A09890]">{ano}</p>
      </div>
    </Link>
  )
}

export default Card