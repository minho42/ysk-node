import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <header className="flex justify-center border-b border-gray-300 shadow-sm">
        <div className="flex items-center justify-between pl-3 py-2 h-12">
          <div className="flex items-center">
            <Link to="/" className="px-1 py-1 font-semibold text-lg">
              호주 → 한국 송금 환율 비교
            </Link>
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
