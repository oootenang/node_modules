import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { StringArrayCustomNode } from '../../../enums/custom-nodes/StringArrayCustomNode';
export declare type TStringArrayCustomNodeFactory = <TInitialData extends unknown[] = unknown[]>(stringArrayCustomNodeName: StringArrayCustomNode) => ICustomNode<TInitialData>;
