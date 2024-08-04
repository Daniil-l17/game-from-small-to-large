import { useEffect, useState } from 'react';

interface Result {
	num?: number;
	color?: string;
}

function App() {
	const [result, setResult] = useState<Result[]>([]);
	const [negativeItem, setNegativeItem] = useState<Result>({} as Result);
	const [error, setError] = useState(0);
	const [game, setGame] = useState(false);

	useEffect(() => {
		if (!result.length) {
			for (let i = 0; i < 9; i++) {
				const m = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'd', 'a', 'c', 'f', 'b', 'e'];
				let title = '';
				let num = 0;
				for (let e = 0; e < 6; e++) {
					const rgb = m[Math.floor(Math.random() * m.length)];
					num += Math.floor(Math.random() * 1000);
					title += rgb;
				}
				setResult(prev => [...prev, { color: `#${title}`, num }]);
			}
		}
		setGame(false);
	}, [game]);

	useEffect(() => {
		let intervel = setInterval(() => {
			if (negativeItem.color) {
				setNegativeItem({});
			} else {
				clearInterval(intervel);
			}
		}, 1500);
		return () => {
			clearInterval(intervel);
		};
	}, [negativeItem]);

	const deleteitem = (items: Result) => {
		const isMinNumber = result.every(item => item.num! >= items.num!);
		if (isMinNumber) {
			setResult(prev => [...prev].filter(element => element.num !== items.num));
			setNegativeItem({});
		} else {
			setNegativeItem(items);
			setError(prev => prev + 1);
		}
	};

	console.log(game);

	const updateGame = () => {
		setGame(true);
		setError(0);
	};

	if (!result.length)
		return (
			<div className=' gap-6 flex justify-center items-center flex-col'>
				<h2 className=' font-semibold text-3xl'> у вас {error} ошибок </h2>
				<button className=' border-[1px] border-[#d3d3d355] rounded-md px-4 py-1' onClick={updateGame}>
					попробывать еще?
				</button>
			</div>
		);

	return (
		<div className='flex flex-col gap-6 justify-center items-center'>
			<h1 className=' w-[100%] max-w-[500px] text-center text-wrap text-2xl font-semibold'>Игра - продолжи последовательность от меньшего к большему </h1>
			<div className='flex gap-4 h-[250px] content-start justify-start items-center flex-wrap w-[250px] flex-col'>
				{result.map((item, index) => {
					return (
						<div
							onClick={() => {
								deleteitem(item);
							}}
							key={index}
							style={{ background: `${item.color}` }}
							className={`cursor-pointer ${
								negativeItem.num === item.num ? 'animate-spin ' : ' hover:scale-110 transition-all duration-300'
							} flex justify-center items-center font-bold w-[60px] rounded-lg h-[60px]`}
						>
							<p>{item.num}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
