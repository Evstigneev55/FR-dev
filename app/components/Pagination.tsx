const Pagination: React.FC<PaginationProps> = ({ setCurPage, curPage, totalPages }) => {
	if (totalPages < 2) return null;

	return (
		<div className='flex justify-center gap-2 mt-8'>
			{Array.from({ length: totalPages }, (_, idx) => (
				<button
					key={idx + 1}
					onClick={() => {
						setCurPage(idx + 1);
					}}
					className={`px-3 py-1 cursor-pointer rounded ${curPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}
				>
					{idx + 1}
				</button>
			))}
		</div>
	);
};
export default Pagination;

interface PaginationProps {
	setCurPage: (idx: number) => void;
	curPage: number;
	totalPages: number;
}
