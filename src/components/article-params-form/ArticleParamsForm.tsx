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
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';
import { useOutsideClickClose } from './hook/useOutsideClickClose';

type ArticleParameters = {
	fontFamily: (selected: OptionType) => void;
	fontSize: (selected: OptionType) => void;
	fontColor: (selected: OptionType) => void;
	backgroundColor: (selected: OptionType) => void;
	width: (selected: OptionType) => void;
	applyButton: (event: FormEvent) => void;
	resetButton: () => void;
	asideState: ArticleStateType;
};

export const ArticleParamsForm = ({
	fontFamily,
	fontSize,
	fontColor,
	backgroundColor,
	width,
	applyButton,
	resetButton,
	asideState,
}: ArticleParameters) => {
	const [isOpen, setOpen] = useState(false);
	const ref = useRef<HTMLFormElement>(null);

	const toggleState = () => {
		setOpen((prev) => !prev);
	};

	const submitChanges = (event: FormEvent) => {
		applyButton(event);
		setOpen(false);
	};

	const resetChanges = () => {
		resetButton();
		setOpen(false);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: ref,
		onClose: () => setOpen(false),
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
						selected={asideState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={fontFamily}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						selected={asideState.fontSizeOption}
						options={fontSizeOptions}
						onChange={fontSize}
					/>
					<Select
						title='цвет шрифта'
						selected={asideState.fontColor}
						options={fontColors}
						onChange={fontColor}
					/>
					<Separator></Separator>
					<Select
						title='цвет фона'
						selected={asideState.backgroundColor}
						options={backgroundColors}
						onChange={backgroundColor}
					/>
					<Select
						title='ширина контента'
						selected={asideState.contentWidth}
						options={contentWidthArr}
						onChange={width}
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
