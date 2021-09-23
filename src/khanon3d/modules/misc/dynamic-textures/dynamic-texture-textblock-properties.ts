import { DimensionsWH } from '../../../models/dimensions-wh';

export interface DynamicTextureTextBlockProperties {
    fontSize: number;
    fontName: string;
    textColor: string;
    textBlock: string[];
    fontStyle?: string;
    centerH?: boolean;
    centerV?: boolean;
    bgColor?: string;
    fixedSize?: DimensionsWH;
}
