export class CleanResizeConfig {
    handleCssClass?: string;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;

    constructor(config: Partial<CleanResizeConfig>) {
        Object.assign(this, config);
    }
}
