import { useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import {
	OptionType,
	fontColors,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	onChange: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps) => {
	const formRef = useRef<HTMLElement | null>(null);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [params, setParams] = useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isMenuOpen]);

	const updateParameters = (
		key: keyof ArticleStateType,
		option: OptionType
	) => {
		const newParams = { ...params, [key]: option };
		setParams(newParams);
	};

	const submitParameters = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onChange(params);
	};

	const toggleForm = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const resetStyles = () => {
		setParams(defaultArticleState);
		onChange(defaultArticleState);
	};

	const sidebarStyle = clsx(
		styles.container,
		isMenuOpen && styles.container_open
	);

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={isMenuOpen} />
			<aside ref={formRef} className={sidebarStyle}>
				<form
					className={styles.form}
					onSubmit={submitParameters}
					onReset={resetStyles}>
					<fieldset style={{ display: 'grid', gap: 'clamp(10px, 4vh, 50px)' }}>
						<Text size={31} weight={800} uppercase>
							{'Задайте параметры'}
						</Text>
						<Select
							onChange={(opt) => updateParameters('fontFamilyOption', opt)}
							selected={params.fontFamilyOption}
							placeholder='Open Sans'
							title='Шрифт'
							options={fontFamilyOptions}
						/>
						<RadioGroup
							onChange={(opt) => updateParameters('fontSizeOption', opt)}
							selected={params.fontSizeOption}
							name={params.fontSizeOption.className}
							title={'Размер шрифта'}
							options={fontSizeOptions}
						/>
						<Select
							onChange={(opt) => updateParameters('fontColor', opt)}
							selected={params.fontColor}
							placeholder={params.fontColor.title}
							title='Цвет шрифта'
							options={fontColors}
						/>
						<Separator />
						<Select
							onChange={(opt) => updateParameters('backgroundColor', opt)}
							selected={params.backgroundColor}
							placeholder={params.backgroundColor.title}
							title='Цвет фона'
							options={backgroundColors}
						/>
						<Select
							onChange={(opt) => updateParameters('contentWidth', opt)}
							selected={params.contentWidth}
							placeholder={params.contentWidth.title}
							title='Ширина контента'
							options={contentWidthArr}
						/>
					</fieldset>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' buttonType='reset' />
						<Button title='Применить' buttonType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
