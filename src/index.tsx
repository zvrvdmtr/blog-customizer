import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [asideState, setAsideState] =
		useState<ArticleStateType>(defaultArticleState);
	const [state, setState] = useState(defaultArticleState);

	const fontFamilyCallback = (props: OptionType) => {
		setAsideState({
			fontFamilyOption: props,
			fontSizeOption: asideState.fontSizeOption,
			fontColor: asideState.fontColor,
			backgroundColor: asideState.backgroundColor,
			contentWidth: asideState.contentWidth,
		});
	};
	const fontSizeCallback = (props: OptionType) => {
		setAsideState({
			fontFamilyOption: asideState.fontFamilyOption,
			fontSizeOption: props,
			fontColor: asideState.fontColor,
			backgroundColor: asideState.backgroundColor,
			contentWidth: asideState.contentWidth,
		});
	};
	const fontColorCallback = (props: OptionType) => {
		setAsideState({
			fontFamilyOption: asideState.fontFamilyOption,
			fontSizeOption: asideState.fontSizeOption,
			fontColor: props,
			backgroundColor: asideState.backgroundColor,
			contentWidth: asideState.contentWidth,
		});
	};
	const backgroundColorCallback = (props: OptionType) => {
		setAsideState({
			fontFamilyOption: asideState.fontFamilyOption,
			fontSizeOption: asideState.fontSizeOption,
			fontColor: asideState.fontColor,
			backgroundColor: props,
			contentWidth: asideState.contentWidth,
		});
	};
	const widthCallback = (props: OptionType) => {
		setAsideState({
			fontFamilyOption: asideState.fontFamilyOption,
			fontSizeOption: asideState.fontSizeOption,
			fontColor: asideState.fontColor,
			backgroundColor: asideState.backgroundColor,
			contentWidth: props,
		});
	};
	const applyButton = (event: FormEvent) => {
		event.preventDefault();
		setState(asideState);
	};
	const resetButton = () => {
		setAsideState(defaultArticleState);
		setState(defaultArticleState);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': state.fontFamilyOption.value,
					'--font-size': state.fontSizeOption.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				fontFamily={fontFamilyCallback}
				fontSize={fontSizeCallback}
				fontColor={fontColorCallback}
				backgroundColor={backgroundColorCallback}
				width={widthCallback}
				applyButton={applyButton}
				resetButton={resetButton}
				asideState={asideState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
