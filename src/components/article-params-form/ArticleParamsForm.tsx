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

export const ArticleParamsForm = ({ setArticleState }: ArticleProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLFormElement>(null);

	const [asideFormState, setAsideFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange = (key: string) => {
		return (value: OptionType) => {
			setAsideFormState({
				...asideFormState,
				[key]: value,
			});
		};
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
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						selected={asideFormState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='цвет шрифта'
						selected={asideFormState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator></Separator>
					<Select
						title='цвет фона'
						selected={asideFormState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='ширина контента'
						selected={asideFormState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
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
