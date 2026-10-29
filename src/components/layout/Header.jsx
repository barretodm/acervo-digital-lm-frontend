import { Link } from "react-router-dom";

function Header({ img }) {
  return (
    <header className="sticky top-0 h-auto w-full bg-lm-ivory p-5 z-50 border-b border-b-lm-border">
      <div className="container mx-auto px-10 md:px-20 lg:px-30 flex flex-row gap-10 items-center justify-between">
        <Link to="/">
          <img
            src={img}
            alt="LM Escritório de Arte"
            className="h-24 w-24 p-2 bg-white rounded-full object-contain"
          />
        </Link>
        <Link to="/login" className="text-[10px] uppercase text-lm-warm-gray">
          Área restrita
        </Link>
      </div>
    </header>
  );
}

export default Header;
