import { useMemo } from "react";

export default function useCurrencyFormat(options = {}){

    const defaultLocale = 'es-AR';

    const formatter = useMemo(() => {
        const userLocale = typeof window !== 'undefined' ? window.navigator.language : defaultLocale;

        return new Intl.NumberFormat(userLocale, {
            style: 'currency',
            currencyDisplay: 'symbol',
            currency: options.currency || 'USD',
            ...options
        })
    }, [options]);

    const format = (value) => {
        if(typeof value === 'number'){
            const formatted = formatter.format(value).replace(/[^\d.,-]/g, '').trim();
            return formatted;
        }else{
            console.warn('useCurrencyFormat: value is not a number');
            return '';
        }
    }

    return format;
}