export type Category = 'Food' | 'Transport' | 'Shopping' | 'Bills' | 'Entertainment' | 'Other';

export interface Expense {
    id: string;
    amount: number;
    description: string;
    category: Category;
    date: string; // ISO String
    createdAt: number; // Timestamp
}

export const CATEGORIES: { label: string; value: Category; color: string }[] = [
    { label: 'Food & Dining', value: 'Food', color: 'hsl(var(--primary))' },
    { label: 'Transport', value: 'Transport', color: 'hsl(25, 95%, 53%)' }, // Orange
    { label: 'Shopping', value: 'Shopping', color: 'hsl(330, 81%, 60%)' }, // Pink
    { label: 'Bills & Utilities', value: 'Bills', color: 'hsl(47, 95%, 53%)' }, // Yellow
    { label: 'Entertainment', value: 'Entertainment', color: 'hsl(262, 83%, 58%)' }, // Purple
    { label: 'Other', value: 'Other', color: 'hsl(220, 14%, 50%)' }, // Grey
];
