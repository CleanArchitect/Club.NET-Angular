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

    private constructor(private handleElement: HTMLElement, private config: CleanResizeConfig) { }

    static create(position: CleanResizeHandlePosition, config: CleanResizeConfig, resizeElement: HTMLElement, renderer: Renderer2): CleanResizeHandle {
        const handleElement = renderer.createElement('div') as HTMLElement;

        return new CleanResizeHandle(handleElement, config)
            .withClasses(position)
            .appendTo(resizeElement)
            .registerReset(resizeElement)
            .registerResize(resizeElement);
    }

    private withClasses(position: CleanResizeHandlePosition): this {
        const classes = [this.config.handleCssClass, ...position.split(' ')]
            .filter(cssClass => !!cssClass?.trim());

        this.handleElement.classList.add('clean-resize-handle', ...classes);

        return this;
    }

    private appendTo(resizableElement: HTMLElement): this {
        resizableElement.style.position = 'relative';
        resizableElement.style.boxSizing = 'border-box';
        resizableElement.style.minWidth = `${this.config.minWidth}px`;
        resizableElement.style.maxWidth = `${this.config.maxWidth}px`;
        resizableElement.style.minHeight = `${this.config.minHeight}px`;
        resizableElement.style.maxHeight = `${this.config.maxHeight}px`;
        resizableElement.appendChild(this.handleElement);

        return this;
    }

    private registerReset(resizableElement: HTMLElement): this {
        fromEvent<MouseEvent>(this.handleElement, 'dblclick')
            .subscribe(event => this.stopEvents(event).reset(resizableElement));

        return this;
    }

    private reset(resizableElement: HTMLElement): void {
        if (this.resizesHeight)
            resizableElement.style.height = '';

        if (this.resizesWidth)
            resizableElement.style.width = '';
    }

    private registerResize(resizableElement: HTMLElement): this {
        fromEvent<MouseEvent>(this.handleElement, 'mousedown', { passive: false })
            .subscribe(mouseDown => this.stopEvents(mouseDown).startResize(mouseDown, resizableElement));

        return this;
    }

    private startResize(startEvent: MouseEvent, resizableElement: HTMLElement) {
        const startWidth = resizableElement.offsetWidth;
        const startHeight = resizableElement.offsetHeight;

        fromEvent<MouseEvent>(document, 'mousemove')
            .pipe(takeUntil(fromEvent<MouseEvent>(document, 'mouseup')))
            .subscribe(moveEvent => this.stopEvents(moveEvent).resize(resizableElement, startWidth, startHeight, startEvent, moveEvent));
    }

    private resize(resizableElement: HTMLElement, startWidth: number, startHeight: number, startEvent: MouseEvent, moveEvent: MouseEvent): void {
        if (this.resizesWidth)
            resizableElement.style.width = `${startWidth + this.deltaMovement(moveEvent.clientX, startEvent.clientX, 'width')}px`;

        if (this.resizesHeight)
            resizableElement.style.height = `${startHeight + this.deltaMovement(moveEvent.clientY, startEvent.clientY, 'height')}px`;

        this.resized.emit({ width: `${resizableElement.offsetWidth}px`, height: `${resizableElement.offsetHeight}px` });
    }

    // private emitEvent(resizableElement: HTMLElement): void {
    //     this.resized.emit({ width: `${resizableElement.offsetWidth}px`, height: `${resizableElement.offsetHeight}px` });
    // }

    private deltaMovement(currentPosition: number, startPosition: number, direction: CleanResizeDirection): number {
        const delta = currentPosition - startPosition;

        return this.isInverse(direction) ? -delta : delta;
    }

    private isInverse(direction: CleanResizeDirection): boolean {
        return direction === 'width' && this.handleElement.classList.contains('left')
            || direction === 'height' && this.handleElement.classList.contains('top');
    }

    private stopEvents(mouseEvent: MouseEvent): this {
        mouseEvent.preventDefault();
        mouseEvent.stopPropagation();
        return this;
    }
}