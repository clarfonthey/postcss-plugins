import type { Calculation } from '../calculation';
import type { FunctionNode, TokenNode } from '@csstools/css-parser-algorithms';
export declare function solveTan(tanNode: FunctionNode, a: TokenNode): Calculation | -1;