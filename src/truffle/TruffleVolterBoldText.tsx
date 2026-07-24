import { FC } from 'react';
import { TruffleTextView } from './TruffleTextView';

interface TruffleVolterBoldTextProps
{
    text?: string | number;
    className?: string;
    color?: number;
}

export const VOLTER_REGULAR = {
    fontFamily: 'Volter',
    size: 9,
    bold: false,
    italic: false,
    color: 0x000000,
    antiAliasType: 'normal',
    gridFitType: 'none',
    sharpness: 0,
    thickness: 0,
    kerning: false
};

export const VOLTER_REGULAR_MODIFIED = {
    ...VOLTER_REGULAR,
    antiAliasType: 'advanced',
    gridFitType: 'pixel'
};

export const VOLTER_BOLD_MODIFIED = {
    fontFamily: 'Volter Bold',
    size: 9,
    bold: true,
    italic: false,
    color: 0xFFFFFF,
    antiAliasType: 'advanced',
    gridFitType: 'pixel',
    sharpness: 0,
    thickness: 0,
    kerning: false
};

export const TruffleVolterBoldText: FC<TruffleVolterBoldTextProps> = props =>
{
    const { text = '', className = '', color = 0xFFFFFF } = props;

    return <TruffleTextView text={ text } format={ VOLTER_BOLD_MODIFIED } color={ color } className={ className } />;
}
