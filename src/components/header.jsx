
import { Link } from 'react-router-dom';
function Header({img}) {
    return (
        <header className="sticky top-0 h-auto w-full bg-[#F5F3EF] p-5 z-50 border-b border-b-[#E0DBD4]">
            <div className="container mx-auto px-10 md:px-20 lg:px-30 flex flex-row gap-10 items-center justify-between">
                <Link to="/">
                    <img src={img} alt="" className="h-24 w-24 p-2 bg-white rounded-full object-contain"/>
                </Link>
                
                <Link to="/login" className='text-[10px] uppercase text-[#6D6662]'>Área restrita</Link>
            </div>
        </header>
    )
}export default Header