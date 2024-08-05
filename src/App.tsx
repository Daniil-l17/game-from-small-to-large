import { useEffect, useState } from 'react';

interface ArrayGame {
	num?: number;
	color?: string;
}

function App() {
	const [gameArray, setGameArray] = useState<ArrayGame[]>([]);
	const [negativeItem, setNegativeItem] = useState<ArrayGame>({} as ArrayGame);
	const [error, setError] = useState(0);
	const [game, setGame] = useState(false);
	const [time, setTime] = useState(0);
	const [isGoTime, setIsGoTime] = useState(false);

	useEffect(() => {
		if (isGoTime) {
			let interval = setInterval(() => {
				setTime(prev => {
					return prev + 1;
				});
			}, 1000);
			return () => {
				clearInterval(interval);
			};
		}
	}, [isGoTime]);

	useEffect(() => {
		if (!gameArray.length) {
			for (let i = 0; i < 9; i++) {
				const m = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'd', 'a', 'c', 'f', 'b', 'e'];
				let title = '';
				let num = 0;
				for (let e = 0; e < 6; e++) {
					num += Math.floor(Math.random() * 1000);
					title += m[Math.floor(Math.random() * m.length)];
				}
				setGameArray(prev => [...prev, { color: `#${title}`, num }]);
			}
		}
		setGame(false);
	}, [game]);

	useEffect(() => {
		let interval = setInterval(() => {
			if (negativeItem.color) {
				setNegativeItem({});
			} else {
				clearInterval(interval);
			}
		}, 1500);
		return () => {
			clearInterval(interval);
		};
	}, [negativeItem]);

	const deleteitem = (items: ArrayGame) => {
		const isMinNumber = gameArray.every(item => item.num! >= items.num!);
		setIsGoTime(true);
		if (isMinNumber) {
			setGameArray(prev => [...prev].filter(element => element.num !== items.num));
			setNegativeItem({});
		} else {
			setNegativeItem(items);
			setError(prev => prev + 1);
		}
	};

	useEffect(() => {
		if (!gameArray.length) {
			setIsGoTime(false);
		}
	}, [gameArray]);

	const updateGame = () => {
		setGame(true);
		setIsGoTime(false);
		setTime(0);
		setError(0);
	};

	if (!gameArray.length)
		return (
			<div className=' gap-6 flex justify-center items-center flex-col'>
				<h2 className=' font-semibold text-3xl'> у вас {error} ошибок </h2>
				<p className='font-semibold text-2xl'>Вы прошли игру за {time} секунд</p>
				<button className=' border-[1px] border-[#d3d3d355] rounded-md px-4 py-1' onClick={updateGame}>
					попробывать еще?
				</button>
			</div>
		);

	return (
		<div className='flex flex-col gap-6 justify-center items-center'>
			<h1 className='w-[100%] max-w-[500px] text-center text-wrap text-2xl font-semibold'>Игра - продолжи последовательность от меньшего к большему </h1>
			<div className='flex gap-4 h-[250px] content-center justify-start items-center flex-wrap w-full max-w-[250px] flex-col'>
				{gameArray.map((item, index) => {
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
							<p className=' font-bold text-[18px]'>{item.num}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
