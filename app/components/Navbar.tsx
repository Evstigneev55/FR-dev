import { useReducer } from 'react';
import { FaBars, FaLaptopCode, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router';

const NavBar = () => {
	const [menuOpen, toogleMenuOpen] = useReducer((prev) => !prev, false);

	return (
		<nav className='bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50'>
			<div className='max-w-6xl mx-auto px-6 py-4 flex justify-between items-center'>
				<NavLink to='/' className='flex items-center gap-2 text-lg font-bold text-blue-300' title='Go to main page'>
					<FaLaptopCode className='text-blue-400 text-xl ' />
					<span>The Friendly Developer</span>
				</NavLink>

				{/* Desktop Nav */}
				<div className='hidden md:flex items-center gap-6'>
					<div className='space-x-4 text-sm text-gray-300'>
						<NavLink to='/' className={({ isActive }) => (isActive ? active : base)}>
							Home
						</NavLink>
						<NavLink to='/projects' className={({ isActive }) => (isActive ? active : base)}>
							Projects
						</NavLink>
						<NavLink to='/blog' className={({ isActive }) => (isActive ? active : base)}>
							Blog
						</NavLink>
						<NavLink to='/about' className={({ isActive }) => (isActive ? active : base)}>
							About
						</NavLink>
						<NavLink to='/contact' className={({ isActive }) => (isActive ? active : base)}>
							Contact
						</NavLink>
					</div>
				</div>

				{/* Mobile Nav icon */}
				<div className='md:hidden flex items-center gap-4'>
					<button onClick={toogleMenuOpen} className='text-blue-400 text-xl cursor-pointer' title='Menu'>
						{menuOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>
			</div>

			{/* Mobile Nav */}
			{menuOpen && (
				<div className='md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center'>
					<NavLink onClick={toogleMenuOpen} to='/' className={({ isActive }) => (isActive ? active : base)}>
						Home
					</NavLink>
					<NavLink onClick={toogleMenuOpen} to='/projects' className={({ isActive }) => (isActive ? active : base)}>
						Projects
					</NavLink>
					<NavLink onClick={toogleMenuOpen} to='/blog' className={({ isActive }) => (isActive ? active : base)}>
						Blog
					</NavLink>
					<NavLink onClick={toogleMenuOpen} to='/about' className={({ isActive }) => (isActive ? active : base)}>
						About
					</NavLink>
					<NavLink onClick={toogleMenuOpen} to='/contact' className={({ isActive }) => (isActive ? active : base)}>
						Contact
					</NavLink>
				</div>
			)}
		</nav>
	);
};

export default NavBar;

const base = 'transition hover:text-blue-400';
const active = 'text-blue-400 font-semibold';
