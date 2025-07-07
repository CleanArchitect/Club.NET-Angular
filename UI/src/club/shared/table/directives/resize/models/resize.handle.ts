import { EventEmitter, Renderer2 } from '@angular/core';
import { fromEvent, takeUntil } from 'rxjs';
import { CleanResizeConfig } from '../config/resize.config';
import { ICleanResizeEvent } from '../events/resized.event';
import { CleanResizeDirection, CleanResizeHandlePosition } from '../types/resize.types';

export class CleanResizeHandle {
    resized = new EventEmitter<ICleanResizeEvent>();

    private get resizesWidth(): boolean {
        return this.handleElement.classList.contains('left') || this.handleElement.classList.contains('right');
    }

    private get resizesHeight(): boolean {
        return this.handleElement.classList.contains('top') || this.handleElement.classList.contains('bottom');
    }

    private constructor(private handleElement: HTMLElement) { }

    static create(position: CleanResizeHandlePosition, config: CleanResizeConfig, resizeElement: HTMLElement, renderer: Renderer2): CleanResizeHandle {
        const handleElement = renderer.createElement('div') as HTMLElement;

        return new CleanResizeHandle(handleElement)
            .withClasses(position, config)
            .appendTo(resizeElement, config)
            .init(resizeElement);
    }

    private withClasses(position: CleanResizeHandlePosition, config: CleanResizeConfig): this {
        const classes = [config.handleCssClass, ...position.split(' ')]
            .filter(cssClass => !!cssClass?.trim());

        this.handleElement.classList.add('clean-resize-handle', ...classes);

        return this;
    }

    private appendTo(resizableElement: HTMLElement, config: CleanResizeConfig): this {
        resizableElement.style.position = 'relative';
        resizableElement.style.boxSizing = 'border-box';
        resizableElement.style.minWidth = `${config.minWidth}px`;
        resizableElement.style.maxWidth = `${config.maxWidth}px`;
        resizableElement.style.minHeight = `${config.minHeight}px`;
        resizableElement.style.maxHeight = `${config.maxHeight}px`;
        resizableElement.appendChild(this.handleElement);

        return this;
    }

    private init(resizableElement: HTMLElement): this {
        this.handleElement
            .addEventListener('mousedown', mouseDown => this
                .startResize(mouseDown, resizableElement), { passive: false });

        return this;
    }

    private startResize(startEvent: MouseEvent, resizableElement: HTMLElement) {
        startEvent.preventDefault();
        startEvent.stopPropagation();

        const startWidth = resizableElement.offsetWidth;
        const startHeight = resizableElement.offsetHeight;

        fromEvent<MouseEvent>(document, 'mousemove')
            .pipe(takeUntil(fromEvent<MouseEvent>(document, 'mouseup')))
            .subscribe(moveEvent => this.resize(resizableElement, startWidth, startHeight, startEvent, moveEvent));
    }

    private resize(resizableElement: HTMLElement, startWidth: number, startHeight: number, startEvent: MouseEvent, moveEvent: MouseEvent): void {
        if (this.resizesWidth)
            resizableElement.style.width = `${startWidth + this.deltaMovement(moveEvent.clientX, startEvent.clientX, 'width')}px`;

        if (this.resizesHeight)
            resizableElement.style.height = `${startHeight + this.deltaMovement(moveEvent.clientY, startEvent.clientY, 'height')}px`;

        this.resized.emit({ width: resizableElement.offsetWidth, height: resizableElement.offsetHeight });
    }

    private deltaMovement(currentPosition: number, startPosition: number, direction: CleanResizeDirection): number {
        const delta = currentPosition - startPosition;

        return this.isInverse(direction) ? -delta : delta;
    }

    private isInverse(direction: CleanResizeDirection): boolean {
        return direction === 'width' && this.handleElement.classList.contains('left')
            || direction === 'height' && this.handleElement.classList.contains('top');
    }
}