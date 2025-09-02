import { Text } from 'src/ui/text';

import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	buttonType,
}: {
	title: string;
	onClick?: () => void;
	buttonType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	const buttonClass =
		buttonType === 'submit'
			? `${styles.button} ${styles.button_apply}`
			: `${styles.button} ${styles.button_clear}`;

	return (
		<button className={buttonClass} type={buttonType} onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
