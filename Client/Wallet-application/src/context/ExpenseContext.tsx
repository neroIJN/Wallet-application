import { createContext, } from 'react';
import { ExpenseContextType } from '../interfaces/Context';


export const ExpenseContext = createContext<ExpenseContextType | null>(null);

