import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { FormEvent, useState, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	backgroundColors,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';
import { useOutsideClickClose } from './hook/useOutsideClickClose';

export type ArticleProps = {
	setArticleState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleProps) => {
	const { setArticleState } = props;
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLFormElement>(null);

	const [asideFormState, setAsideFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const setFontFamily = (props: OptionType) => {
		setAsideFormState({
			fontFamilyOption: props,
			fontSizeOption: asideFormState.fontSizeOption,
			fontColor: asideFormState.fontColor,
			backgroundColor: asideFormState.backgroundColor,
			contentWidth: asideFormState.contentWidth,
		});
	};
	const setFontSize = (props: OptionType) => {
		setAsideFormState({
			fontFamilyOption: asideFormState.fontFamilyOption,
			fontSizeOption: props,
			fontColor: asideFormState.fontColor,
			backgroundColor: asideFormState.backgroundColor,
			contentWidth: asideFormState.contentWidth,
		});
	};
	const setFontColor = (props: OptionType) => {
		setAsideFormState({
			fontFamilyOption: asideFormState.fontFamilyOption,
			fontSizeOption: asideFormState.fontSizeOption,
			fontColor: props,
			backgroundColor: asideFormState.backgroundColor,
			contentWidth: asideFormState.contentWidth,
		});
	};
	const setBackgroundColor = (props: OptionType) => {
		setAsideFormState({
			fontFamilyOption: asideFormState.fontFamilyOption,
			fontSizeOption: asideFormState.fontSizeOption,
			fontColor: asideFormState.fontColor,
			backgroundColor: props,
			contentWidth: asideFormState.contentWidth,
		});
	};
	const setWidth = (props: OptionType) => {
		setAsideFormState({
			fontFamilyOption: asideFormState.fontFamilyOption,
			fontSizeOption: asideFormState.fontSizeOption,
			fontColor: asideFormState.fontColor,
			backgroundColor: asideFormState.backgroundColor,
			contentWidth: props,
		});
	};

	const toggleState = () => {
		setIsOpen((prev) => !prev);
	};

	const submitChanges = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(asideFormState);
		setIsOpen(false);
	};

	const resetChanges = () => {
		setAsideFormState(defaultArticleState);
		setArticleState(defaultArticleState);
		setIsOpen(false);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: ref,
		onClose: () => setIsOpen(false),
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleState} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={submitChanges} ref={ref}>
					<Text as='h2' weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={asideFormState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={setFontFamily}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						selected={asideFormState.fontSizeOption}
						options={fontSizeOptions}
						onChange={setFontSize}
					/>
					<Select
						title='цвет шрифта'
						selected={asideFormState.fontColor}
						options={fontColors}
						onChange={setFontColor}
					/>
					<Separator></Separator>
					<Select
						title='цвет фона'
						selected={asideFormState.backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
					/>
					<Select
						title='ширина контента'
						selected={asideFormState.contentWidth}
						options={contentWidthArr}
						onChange={setWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetChanges}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
